#!/bin/bash
# ============================================================
# Setup risorse AWS — K-Marketing News Agent
# ============================================================
# Prerequisiti: AWS CLI configurato con credenziali K-Marketing
# Utilizzo:     bash setup-aws.sh
# ============================================================

set -e

REGION="eu-south-1"
LAMBDA_FUNCTION_NAME="kmarketing-news"
LAMBDA_QUERY_NAME="kmarketing-news-query"
S3_BUCKET="kmarketing-news-data"
DYNAMODB_TABLE="kmarketing-news-articles"
IAM_LAMBDA_ROLE="kmarketing-news-lambda-role"
IAM_DEPLOY_USER="kmarketing-deploy"

echo "=== K-Marketing News Agent — Setup AWS ==="
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "Account ID : $ACCOUNT_ID"
echo "Regione    : $REGION"
echo ""

# ─────────────────────────────────────────────
# 1. S3 Bucket
# ─────────────────────────────────────────────
echo "→ [1/6] S3 bucket: $S3_BUCKET"
aws s3api create-bucket \
  --bucket "$S3_BUCKET" \
  --region "$REGION" \
  --create-bucket-configuration LocationConstraint="$REGION"

# Blocca accesso pubblico diretto (CloudFront userà OAC)
aws s3api put-public-access-block \
  --bucket "$S3_BUCKET" \
  --public-access-block-configuration \
    "BlockPublicAcls=true,IgnorePublicAcls=true,BlockPublicPolicy=false,RestrictPublicBuckets=false"

echo "   OK: s3://$S3_BUCKET"

# ─────────────────────────────────────────────
# 2. DynamoDB Table con TTL
# ─────────────────────────────────────────────
echo "→ [2/6] DynamoDB table: $DYNAMODB_TABLE"
aws dynamodb create-table \
  --table-name "$DYNAMODB_TABLE" \
  --attribute-definitions AttributeName=id,AttributeType=S \
  --key-schema AttributeName=id,KeyType=HASH \
  --billing-mode PAY_PER_REQUEST \
  --region "$REGION"

aws dynamodb wait table-exists \
  --table-name "$DYNAMODB_TABLE" \
  --region "$REGION"

aws dynamodb update-time-to-live \
  --table-name "$DYNAMODB_TABLE" \
  --time-to-live-specification "Enabled=true,AttributeName=ttl" \
  --region "$REGION"

echo "   OK: $DYNAMODB_TABLE (TTL abilitato su attributo 'ttl')"

# ─────────────────────────────────────────────
# 3. IAM Role per esecuzione Lambda
# ─────────────────────────────────────────────
echo "→ [3/6] IAM Role Lambda: $IAM_LAMBDA_ROLE"
aws iam create-role \
  --role-name "$IAM_LAMBDA_ROLE" \
  --assume-role-policy-document '{
    "Version": "2012-10-17",
    "Statement": [{
      "Effect": "Allow",
      "Principal": {"Service": "lambda.amazonaws.com"},
      "Action": "sts:AssumeRole"
    }]
  }'

aws iam attach-role-policy \
  --role-name "$IAM_LAMBDA_ROLE" \
  --policy-arn "arn:aws:iam::aws:policy/service-role/AWSLambdaBasicExecutionRole"

aws iam put-role-policy \
  --role-name "$IAM_LAMBDA_ROLE" \
  --policy-name "kmarketing-news-lambda-policy" \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"s3:GetObject\",\"s3:PutObject\",\"s3:DeleteObject\",\"s3:ListBucket\"],
        \"Resource\": [\"arn:aws:s3:::$S3_BUCKET\",\"arn:aws:s3:::$S3_BUCKET/*\"]
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"dynamodb:GetItem\",\"dynamodb:PutItem\",\"dynamodb:UpdateItem\",\"dynamodb:DeleteItem\",\"dynamodb:Query\",\"dynamodb:Scan\"],
        \"Resource\": \"arn:aws:dynamodb:$REGION:$ACCOUNT_ID:table/$DYNAMODB_TABLE\"
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"cloudfront:CreateInvalidation\"],
        \"Resource\": \"*\"
      }
    ]
  }"

LAMBDA_ROLE_ARN="arn:aws:iam::$ACCOUNT_ID:role/$IAM_LAMBDA_ROLE"
echo "   OK: $LAMBDA_ROLE_ARN"
echo "   Attendo propagazione IAM (12s)..."
sleep 12

# ─────────────────────────────────────────────
# 4. Lambda Functions (placeholder — il codice
#    reale viene deployato dal workflow GitHub)
# ─────────────────────────────────────────────
echo "→ [4/6] Lambda functions"
printf 'def lambda_handler(event, context):\n    return {"statusCode": 200}\n' > /tmp/placeholder.py
cd /tmp && zip -q placeholder.zip placeholder.py && cd - > /dev/null

aws lambda create-function \
  --function-name "$LAMBDA_FUNCTION_NAME" \
  --runtime python3.11 \
  --role "$LAMBDA_ROLE_ARN" \
  --handler "lambda_function.lambda_handler" \
  --zip-file "fileb:///tmp/placeholder.zip" \
  --timeout 300 \
  --memory-size 512 \
  --region "$REGION"

aws lambda create-function \
  --function-name "$LAMBDA_QUERY_NAME" \
  --runtime python3.11 \
  --role "$LAMBDA_ROLE_ARN" \
  --handler "lambda_function.lambda_handler" \
  --zip-file "fileb:///tmp/placeholder.zip" \
  --timeout 30 \
  --memory-size 256 \
  --region "$REGION"

echo "   OK: $LAMBDA_FUNCTION_NAME + $LAMBDA_QUERY_NAME (placeholder)"

# ─────────────────────────────────────────────
# 5. CloudFront Distribution (OAC → S3)
# ─────────────────────────────────────────────
echo "→ [5/6] CloudFront"

OAC_ID=$(aws cloudfront create-origin-access-control \
  --origin-access-control-config \
    "Name=kmarketing-news-oac,Description=OAC for $S3_BUCKET,SigningProtocol=sigv4,SigningBehavior=always,OriginAccessControlOriginType=s3" \
  --query 'OriginAccessControl.Id' --output text)

DIST_CONFIG=$(mktemp)
cat > "$DIST_CONFIG" << EOF
{
  "CallerReference": "kmarketing-news-$(date +%s)",
  "Comment": "K-Marketing News Agent",
  "Enabled": true,
  "HttpVersion": "http2and3",
  "Origins": {
    "Quantity": 1,
    "Items": [{
      "Id": "S3-${S3_BUCKET}",
      "DomainName": "${S3_BUCKET}.s3.${REGION}.amazonaws.com",
      "S3OriginConfig": {"OriginAccessIdentity": ""},
      "OriginAccessControlId": "${OAC_ID}"
    }]
  },
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-${S3_BUCKET}",
    "ViewerProtocolPolicy": "redirect-to-https",
    "AllowedMethods": {
      "Quantity": 2,
      "Items": ["HEAD", "GET"],
      "CachedMethods": {"Quantity": 2, "Items": ["HEAD", "GET"]}
    },
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {"Forward": "none"},
      "Headers": {"Quantity": 0},
      "QueryStringCacheKeys": {"Quantity": 0}
    },
    "MinTTL": 0,
    "DefaultTTL": 86400,
    "MaxTTL": 31536000,
    "Compress": true,
    "TrustedSigners": {"Enabled": false, "Quantity": 0},
    "TrustedKeyGroups": {"Enabled": false, "Quantity": 0},
    "FieldLevelEncryptionId": ""
  }
}
EOF

DIST_OUTPUT=$(aws cloudfront create-distribution --distribution-config "file://$DIST_CONFIG")
rm "$DIST_CONFIG"

CLOUDFRONT_ID=$(echo "$DIST_OUTPUT"   | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Distribution']['Id'])")
CLOUDFRONT_DOMAIN=$(echo "$DIST_OUTPUT" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['Distribution']['DomainName'])")

# Bucket policy: consente solo CloudFront OAC
aws s3api put-bucket-policy \
  --bucket "$S3_BUCKET" \
  --policy "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [{
      \"Sid\": \"AllowCloudFront\",
      \"Effect\": \"Allow\",
      \"Principal\": {\"Service\": \"cloudfront.amazonaws.com\"},
      \"Action\": \"s3:GetObject\",
      \"Resource\": \"arn:aws:s3:::$S3_BUCKET/*\",
      \"Condition\": {
        \"StringEquals\": {
          \"AWS:SourceArn\": \"arn:aws:cloudfront::$ACCOUNT_ID:distribution/$CLOUDFRONT_ID\"
        }
      }
    }]
  }"

echo "   OK: $CLOUDFRONT_ID → https://$CLOUDFRONT_DOMAIN"

# ─────────────────────────────────────────────
# 6. IAM Deploy User per GitHub Actions
# ─────────────────────────────────────────────
echo "→ [6/6] IAM deploy user: $IAM_DEPLOY_USER"
aws iam create-user --user-name "$IAM_DEPLOY_USER"

aws iam put-user-policy \
  --user-name "$IAM_DEPLOY_USER" \
  --policy-name "kmarketing-deploy-policy" \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"lambda:UpdateFunctionCode\",\"lambda:GetFunctionConfiguration\",\"lambda:InvokeFunction\"],
        \"Resource\": [
          \"arn:aws:lambda:$REGION:$ACCOUNT_ID:function:$LAMBDA_FUNCTION_NAME\",
          \"arn:aws:lambda:$REGION:$ACCOUNT_ID:function:$LAMBDA_QUERY_NAME\"
        ]
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"s3:PutObject\",\"s3:GetObject\",\"s3:ListBucket\"],
        \"Resource\": [\"arn:aws:s3:::$S3_BUCKET\",\"arn:aws:s3:::$S3_BUCKET/*\"]
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"dynamodb:*\"],
        \"Resource\": \"arn:aws:dynamodb:$REGION:$ACCOUNT_ID:table/$DYNAMODB_TABLE\"
      },
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"cloudfront:CreateInvalidation\",\"cloudfront:GetDistribution\",\"cloudfront:GetInvalidation\"],
        \"Resource\": \"arn:aws:cloudfront::$ACCOUNT_ID:distribution/$CLOUDFRONT_ID\"
      }
    ]
  }"

DEPLOY_KEYS=$(aws iam create-access-key --user-name "$IAM_DEPLOY_USER")
DEPLOY_ACCESS_KEY=$(echo "$DEPLOY_KEYS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['AccessKey']['AccessKeyId'])")
DEPLOY_SECRET_KEY=$(echo "$DEPLOY_KEYS" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d['AccessKey']['SecretAccessKey'])")

# ─────────────────────────────────────────────
# OUTPUT FINALE
# ─────────────────────────────────────────────
echo ""
echo "========================================"
echo "  SETUP COMPLETATO"
echo "========================================"
echo ""
echo "GITHUB SECRETS (repo: agente-informativo-privato):"
echo "  AWS_ACCESS_KEY_ID     = $DEPLOY_ACCESS_KEY"
echo "  AWS_SECRET_ACCESS_KEY = $DEPLOY_SECRET_KEY"
echo "  AWS_REGION            = $REGION"
echo ""
echo "CLOUDFRONT (aggiorna news-feed.ts e next.config.js):"
echo "  https://$CLOUDFRONT_DOMAIN"
echo ""
echo "LAMBDA ENV VARS — esegui questo comando per configurarle:"
echo ""
echo "  aws lambda update-function-configuration \\"
echo "    --function-name $LAMBDA_FUNCTION_NAME \\"
echo "    --environment \"Variables={"
echo "      DYNAMODB_TABLE=$DYNAMODB_TABLE,"
echo "      S3_BUCKET=$S3_BUCKET,"
echo "      CLOUDFRONT_DISTRIBUTION_ID=$CLOUDFRONT_ID,"
echo "      CLOUDFRONT_DOMAIN=$CLOUDFRONT_DOMAIN,"
echo "      GROQ_API_KEY=<valore>,"
echo "      TELEGRAM_BOT_TOKEN=<valore>,"
echo "      TELEGRAM_CHAT_ID=<valore>,"
echo "      PINECONE_API_KEY=<valore>,"
echo "      PINECONE_INDEX_HOST=<valore>,"
echo "      CLOUDFLARE_ACCOUNT_ID=<valore>,"
echo "      CLOUDFLARE_API_TOKEN=<valore>"
echo "    }\" \\"
echo "    --region $REGION"
echo ""
echo "  (ripeti per $LAMBDA_QUERY_NAME se necessario)"
echo ""
echo "NOTA: CloudFront impiega ~10 minuti per propagarsi globalmente."
