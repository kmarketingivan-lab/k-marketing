# Setup Form Contatti

Guida passo-passo per configurare l'invio del form contatti via EmailJS e Telegram.

## 1. EmailJS (gratuito fino a 200 email/mese)

1. Crea un account su [emailjs.com](https://www.emailjs.com/)
2. Vai su **Email Services** > **Add New Service**
3. Seleziona **Gmail**, connetti il tuo account Google e salva
4. Copia il **Service ID** (es. `service_abc123`)
5. Vai su **Email Templates** > **Create New Template**
6. Configura il template con queste variabili:
   - `{{from_name}}` — Nome del contatto
   - `{{from_email}}` — Email del contatto
   - `{{company}}` — Azienda
   - `{{industry}}` — Settore
   - `{{budget}}` — Budget
   - `{{message}}` — Messaggio
7. Salva e copia il **Template ID** (es. `template_xyz789`)
8. Vai su **Account** > **API Keys** e copia la **Public Key**

## 2. Telegram Bot

1. Apri Telegram e cerca **@BotFather**
2. Invia `/newbot` e segui le istruzioni per creare un bot
3. Copia il **Bot Token** (es. `123456:ABC-DEF...`)
4. Per ottenere il **Chat ID**:
   - Invia un messaggio qualsiasi al tuo bot
   - Apri nel browser: `https://api.telegram.org/bot<TOKEN>/getUpdates`
   - Trova `"chat":{"id":NUMERO}` — quel numero e il tuo Chat ID
5. Per ricevere in un gruppo: aggiungi il bot al gruppo e usa l'ID del gruppo (negativo)

## 3. Server-side Telegram (Vercel)

Su Vercel il form usa l'API route `/api/contact` per inviare notifiche Telegram in modo sicuro (il token resta server-side).

1. In Vercel dashboard > **Settings** > **Environment Variables**, aggiungi:
   - `TELEGRAM_BOT_TOKEN` = `123456:ABC-DEF...` (SENZA `NEXT_PUBLIC_`!)
   - `TELEGRAM_CHAT_ID` = `987654321` (SENZA `NEXT_PUBLIC_`!)
2. Redeploy il progetto.
3. L'API route `/api/contact` e automaticamente attiva.
4. Per Altervista (static export), l'API route non funziona — il form usa EmailJS come fallback.

## 4. Configurazione .env.local

```bash
cp .env.example .env.local
```

Compila i valori in `.env.local`:

```env
# EmailJS (client-side, funziona ovunque)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=la_tua_public_key

# Telegram Bot (server-side only — NON usare NEXT_PUBLIC_!)
TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
TELEGRAM_CHAT_ID=987654321

# Site URL
NEXT_PUBLIC_SITE_URL=https://k-marketing.it
```

## 5. Test

Senza credenziali configurate il form funziona comunque in modalita simulata: logga un avviso in console e simula un successo dopo 1 secondo.

Il form prova prima l'API route `/api/contact` (Telegram server-side su Vercel). Se non disponibile (static export), usa EmailJS come fallback.
