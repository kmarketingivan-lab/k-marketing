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

// Headers per risposta JSON
header('Content-Type: application/json');

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
$cognome = htmlspecialchars(trim($_POST['cognome'] ?? ''));
$email = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$telefono = htmlspecialchars(trim($_POST['telefono'] ?? ''));
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
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ff6700, #ff8533); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border: 1px solid #ddd; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #ff6700; }
        .footer { background: #060724; color: #999; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2 style='margin:0;'>Nuovo messaggio dal sito K-Marketing</h2>
        </div>
        <div class='content'>
            <div class='field'><span class='label'>Nome:</span> $nome $cognome</div>
            <div class='field'><span class='label'>Email:</span> <a href='mailto:$email'>$email</a></div>
            <div class='field'><span class='label'>Telefono:</span> " . ($telefono ?: "Non specificato") . "</div>
            <div class='field'><span class='label'>Messaggio:</span><br>" . nl2br($messaggio ?: "Nessun messaggio") . "</div>
        </div>
        <div class='footer'>
            Inviato il " . date('d/m/Y') . " alle " . date('H:i') . " dal form di contatto K-Marketing
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
    $mail->addReplyTo($email, "$nome $cognome");

    // Contenuto email
    $mail->isHTML(true);
    $mail->Subject = "Nuovo contatto: $nome $cognome";
    $mail->Body    = $corpo_html;
    $mail->AltBody = "Nuovo messaggio da $nome $cognome ($email). Telefono: $telefono. Messaggio: $messaggio";

    $mail->send();
    
    echo json_encode([
        "success" => true,
        "message" => "Messaggio inviato con successo! Ti contatterò presto."
    ]);

} catch (Exception $e) {
    echo json_encode([
        "success" => false,
        "message" => "Errore durante l'invio. Riprova più tardi.",
        "debug" => $mail->ErrorInfo // Rimuovi in produzione
    ]);
}
?>
