<?php
/**
 * K-Marketing - Script invio email con PHPMailer + SMTP Gmail
 * Invia email a: kmarketing.ivan@gmail.com
 * 
 * CONFIGURAZIONE RICHIESTA:
 * 1. Vai su https://myaccount.google.com/apppasswords
 * 2. Genera una "Password per le app" per "Posta"
 * 3. Inserisci la password in config.php
 */

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

// Carica configurazione e PHPMailer
require 'config.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';

// Usa le costanti dal config
$gmail_email = GMAIL_EMAIL;
$gmail_password = GMAIL_APP_PASSWORD;
$destinatario = EMAIL_DESTINATARIO;

// Headers per risposta JSON e CORS
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Verifica che sia una richiesta POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    echo json_encode([
        "success" => false,
        "message" => "Metodo non consentito"
    ]);
    exit;
}

// Recupera e sanitizza i dati dal form
$nome = htmlspecialchars(trim($_POST['nome'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars(trim($_POST['telefono'] ?? ''));
$servizio = htmlspecialchars(trim($_POST['servizio'] ?? 'Non specificato'));
$messaggio = htmlspecialchars(trim($_POST['messaggio'] ?? ''));

// Validazione campi obbligatori
if (empty($nome) || empty($email)) {
    echo json_encode([
        "success" => false,
        "message" => "Nome e email sono obbligatori"
    ]);
    exit;
}

// Validazione email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Indirizzo email non valido"
    ]);
    exit;
}

// Costruzione del corpo dell'email (HTML)
$corpo_html = "
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background: #f5f5f5; }
        .container { max-width: 600px; margin: 20px auto; padding: 0; }
        .header { background: linear-gradient(135deg, #6366f1, #0ea5e9); color: white; padding: 30px; border-radius: 16px 16px 0 0; text-align: center; }
        .header h2 { margin: 0; font-size: 24px; }
        .content { background: #ffffff; padding: 30px; border: 1px solid #e5e5e5; }
        .field { margin-bottom: 20px; padding: 15px; background: #f9fafb; border-radius: 8px; }
        .label { font-weight: bold; color: #6366f1; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; display: block; margin-bottom: 5px; }
        .value { font-size: 16px; color: #1f2937; }
        .footer { background: #030712; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 16px 16px; font-size: 12px; }
        .badge { display: inline-block; background: #6366f1; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>📩 Nuovo Contatto dal Sito</h2>
            <p style='margin: 10px 0 0 0; opacity: 0.9;'>K-Marketing Website</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Nome</span>
                <span class='value'>$nome</span>
            </div>
            <div class='field'>
                <span class='label'>Email</span>
                <span class='value'><a href='mailto:$email' style='color: #6366f1;'>$email</a></span>
            </div>
            <div class='field'>
                <span class='label'>Telefono</span>
                <span class='value'>" . ($telefono ?: "Non specificato") . "</span>
            </div>
            <div class='field'>
                <span class='label'>Servizio Richiesto</span>
                <span class='badge'>$servizio</span>
            </div>
            <div class='field'>
                <span class='label'>Messaggio</span>
                <span class='value'>" . nl2br($messaggio ?: "Nessun messaggio aggiuntivo") . "</span>
            </div>
        </div>
        <div class='footer'>
            📅 Inviato il " . date('d/m/Y') . " alle " . date('H:i') . "<br>
            <small>Dal form di contatto K-Marketing</small>
        </div>
    </div>
</body>
</html>
";

// Invio email con PHPMailer
$mail = new PHPMailer(true);

try {
    // Configurazione server SMTP Gmail
    $mail->isSMTP();
    $mail->Host       = 'smtp.gmail.com';
    $mail->SMTPAuth   = true;
    $mail->Username   = $gmail_email;
    $mail->Password   = $gmail_password;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // Mittente e destinatario
    $mail->setFrom($gmail_email, 'K-Marketing Website');
    $mail->addAddress($destinatario, 'Ivan Crescini');
    $mail->addReplyTo($email, $nome);

    // Contenuto email
    $mail->isHTML(true);
    $mail->Subject = "🔔 Nuovo contatto: $nome - $servizio";
    $mail->Body    = $corpo_html;
    $mail->AltBody = "Nuovo messaggio da $nome ($email). Telefono: $telefono. Servizio: $servizio. Messaggio: $messaggio";

    $mail->send();
    
    echo json_encode([
        "success" => true,
        "message" => "Messaggio inviato con successo! Ti contatterò entro 24 ore."
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Errore durante l'invio. Riprova più tardi."
    ]);
}
?>
