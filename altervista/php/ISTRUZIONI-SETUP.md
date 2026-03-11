# Istruzioni per configurare PHPMailer con Gmail

## STEP 1: Scarica PHPMailer

Vai su: https://github.com/PHPMailer/PHPMailer/releases

1. Clicca su "Source code (zip)" per scaricare l'ultima versione
2. Estrai lo zip
3. Copia questi 3 file dalla cartella `src/` nella cartella `php/PHPMailer/`:
   - Exception.php
   - PHPMailer.php
   - SMTP.php

La struttura finale deve essere:
```
php/
├── send-email.php
└── PHPMailer/
    ├── Exception.php
    ├── PHPMailer.php
    └── SMTP.php
```

---

## STEP 2: Crea una Password App di Google

Gmail non permette l'accesso diretto con la password normale.
Devi creare una "Password per le app":

1. Vai su: https://myaccount.google.com/security

2. Assicurati di avere la **Verifica in 2 passaggi** attivata
   - Se non è attiva, attivala prima

3. Vai su: https://myaccount.google.com/apppasswords

4. In "Seleziona app" scegli "Posta"

5. In "Seleziona dispositivo" scegli "Altro" e scrivi "K-Marketing Website"

6. Clicca "Genera"

7. Google ti mostrerà una password di 16 caratteri tipo: `abcd efgh ijkl mnop`

8. **COPIA QUESTA PASSWORD** (senza spazi): `abcdefghijklmnop`

---

## STEP 3: Configura send-email.php

Apri il file `php/send-email.php` e modifica questa riga:

```php
$gmail_password = "INSERISCI_QUI_LA_PASSWORD_APP";
```

Sostituisci con la password generata:

```php
$gmail_password = "abcdefghijklmnop";
```

---

## STEP 4: Carica tutto sul server

Carica via FTP tutta la cartella del sito sul tuo hosting.

---

## STEP 5: Testa il form

1. Vai sul sito
2. Compila il form di contatto
3. Clicca "Invia messaggio"
4. Controlla la casella kmarketing.ivan@gmail.com

---

## Troubleshooting

**Errore "Authentication failed"**
- Verifica che la Password App sia corretta (16 caratteri, senza spazi)
- Verifica che l'email sia corretta

**Errore "Connection timed out"**
- Il tuo hosting potrebbe bloccare le connessioni SMTP in uscita
- Contatta il supporto dell'hosting

**Email non arriva**
- Controlla la cartella Spam
- Aspetta qualche minuto

---

## Sicurezza

⚠️ NON condividere mai la Password App!
⚠️ NON caricare send-email.php su repository pubblici con la password visibile!

Per maggiore sicurezza, puoi spostare le credenziali in un file separato:
1. Crea `php/config.php` con le credenziali
2. Aggiungi `config.php` al `.gitignore`
3. In `send-email.php` usa `require 'config.php';`
