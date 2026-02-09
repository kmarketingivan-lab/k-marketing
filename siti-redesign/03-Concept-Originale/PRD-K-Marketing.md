# PRD - K-Marketing Website Redesign
## Product Requirements Document per Gemini AI Studio

---

## 1. EXECUTIVE SUMMARY

### 1.1 Obiettivo del Progetto
Realizzare un sito web completamente nuovo per K-Marketing (Ivan Crescini - Digital Marketing Specialist) che si posizioni come leader di mercato nella zona di Brescia e provincia. Il sito deve differenziarsi radicalmente dai competitor locali, comunicare innovazione tecnologica e convertire visitatori in clienti.

### 1.2 Target Primario
- PMI e professionisti di Brescia e provincia
- Imprenditori che cercano servizi di digital marketing
- Aziende della Franciacorta, Lago di Garda, Valle Trompia, Valle Sabbia

### 1.3 Obiettivi Chiave
1. **Posizionamento SEO**: Raggiungere la prima pagina Google per keyword locali
2. **Conversione**: Massimizzare le richieste di consulenza
3. **Differenziazione**: Distinguersi visivamente e funzionalmente dai competitor
4. **Professionalità**: Comunicare competenza e affidabilità superiori

---

## 2. ANALISI COMPETITOR BRESCIA

### 2.1 Competitor Analizzati

| Competitor | Punti di Forza | Punti Deboli |
|------------|----------------|--------------|
| **Agenzia P** | 20+ anni esperienza, 500+ clienti, buona SEO locale | Design datato, UI poco moderna, troppo testo |
| **Web Marketing Aziendale** | Focus AI/Lead Generation, posizionamento chiaro | Sito poco accessibile (403), UI generica |
| **Dacuna Studio** | Design moderno, buon branding, D-Vision concept | Troppo corporate, meno personale |
| **Visionova** | 25 anni esperienza, focus green website | Design pulito ma standard |
| **Web Heroes** | Buon portfolio, servizi completi | Nessun elemento distintivo |
| **EVO Studios** | Certificazione UX Nielsen Norman, Craft CMS | Troppo tecnico per PMI |
| **Dexa** | Esperienza ventennale, radicamento locale | Sito vecchio stile |
| **Gasp! Design** | Approccio personale (Giulia Gasperini), framework 9 step | Meno tech-forward |

### 2.2 Gap di Mercato Identificati
1. **Nessun competitor** comunica in modo veramente innovativo/tech-forward
2. **Troppi siti** usano design generici e template standard
3. **Manca** un approccio "consulente personale" vs "agenzia impersonale"
4. **Assenza** di elementi interattivi e immersivi
5. **Copy** spesso generico e non orientato alla conversione immediata

### 2.3 Opportunità di Differenziazione
- Design futuristico con elementi 3D/glassmorphism
- Micro-animazioni e interazioni sofisticate
- Copy diretto, conversazionale, orientato ai risultati
- Focus sul rapporto personale (non sei un numero)
- Showcase visivo dei progetti con risultati misurabili

---

## 3. SPECIFICHE TECNICHE

### 3.1 Stack Tecnologico Raccomandato
```
Frontend:
- HTML5 semantico
- CSS3 (Custom Properties, Grid, Flexbox, Animations)
- JavaScript ES6+ (Vanilla o con libreria leggera)
- GSAP per animazioni avanzate (opzionale)

Performance:
- Lazy loading immagini
- Preload font critici
- CSS/JS minificati
- WebP per immagini
- Core Web Vitals ottimizzati

Hosting:
- Altervista o hosting con HTTPS
- CDN per assets statici (opzionale)
```

### 3.2 Requisiti Performance
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1
- **Mobile Score PageSpeed**: > 90
- **Desktop Score PageSpeed**: > 95

### 3.3 Responsive Breakpoints
```css
/* Mobile First */
320px  - Base mobile
480px  - Mobile large
768px  - Tablet
1024px - Desktop small
1280px - Desktop
1440px - Desktop large
1920px - Wide screens
```

---

## 4. DESIGN SYSTEM

### 4.1 Palette Colori - "Tech Innovation"

```css
:root {
  /* Primary - Electric Indigo (Innovazione, Tecnologia) */
  --primary-50: #eef2ff;
  --primary-100: #e0e7ff;
  --primary-200: #c7d2fe;
  --primary-300: #a5b4fc;
  --primary-400: #818cf8;
  --primary-500: #6366f1;  /* Main */
  --primary-600: #4f46e5;
  --primary-700: #4338ca;
  
  /* Secondary - Cyan (Dinamismo, Digitale) */
  --secondary-400: #22d3ee;
  --secondary-500: #06b6d4;
  --secondary-600: #0891b2;
  
  /* Accent - Sky Blue (Fiducia, Professionalità) */
  --accent-400: #38bdf8;
  --accent-500: #0ea5e9;
  
  /* Neutrals - Deep Space (Sofisticato, Premium) */
  --dark-950: #030712;    /* Background principale */
  --dark-900: #0a0a0f;
  --dark-800: #12121a;    /* Card background */
  --dark-700: #1a1a24;    /* Elevated surfaces */
  --dark-600: #2a2a35;    /* Borders */
  
  /* Text */
  --text-primary: #ffffff;
  --text-secondary: rgba(255,255,255,0.7);
  --text-muted: rgba(255,255,255,0.5);
  
  /* Semantic */
  --success: #10b981;     /* Verde - Risultati */
  --warning: #f59e0b;     /* Ambra - Attenzione */
  --error: #ef4444;       /* Rosso - Errori */
}
```

### 4.2 Typography
```css
/* Font Stack */
--font-display: 'Space Grotesk', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;

/* Scale (Mobile First) */
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */

/* Desktop Scale (1024px+) */
Hero Title: clamp(2.5rem, 6vw, 4.5rem)
Section Title: clamp(2rem, 4vw, 3rem)
Body Large: 1.125rem - 1.25rem
Body: 1rem
Small: 0.875rem

/* Line Heights */
--leading-tight: 1.1;
--leading-snug: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;

/* Letter Spacing */
--tracking-tight: -0.02em;   /* Titles */
--tracking-normal: 0;         /* Body */
--tracking-wide: 0.05em;      /* Labels/Tags */
--tracking-wider: 0.1em;      /* Buttons uppercase */
```

### 4.3 Spacing System
```css
/* 8px base unit */
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */

/* Section Padding */
--section-py: clamp(80px, 10vw, 140px);
--container-px: clamp(20px, 5vw, 48px);
--container-max: 1280px;
```

### 4.4 Effects & Shadows
```css
/* Shadows */
--shadow-sm: 0 2px 8px rgba(0,0,0,0.3);
--shadow-md: 0 8px 30px rgba(0,0,0,0.4);
--shadow-lg: 0 20px 60px rgba(0,0,0,0.5);
--shadow-glow: 0 0 40px rgba(99,102,241,0.3);
--shadow-glow-lg: 0 0 80px rgba(99,102,241,0.4);

/* Borders */
--border-subtle: rgba(255,255,255,0.08);
--border-default: rgba(255,255,255,0.12);
--border-strong: rgba(255,255,255,0.2);
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 16px;
--radius-xl: 20px;
--radius-full: 9999px;

/* Glassmorphism */
--glass-bg: rgba(18,18,26,0.8);
--glass-blur: blur(20px);
--glass-border: 1px solid rgba(255,255,255,0.1);

/* Transitions */
--ease-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.6, 1);
--duration-fast: 150ms;
--duration-base: 300ms;
--duration-slow: 500ms;

/* Gradients */
--gradient-primary: linear-gradient(135deg, #6366f1 0%, #0ea5e9 100%);
--gradient-glow: linear-gradient(135deg, rgba(99,102,241,0.2) 0%, rgba(14,165,233,0.2) 100%);
--gradient-radial: radial-gradient(ellipse at center, rgba(99,102,241,0.15) 0%, transparent 70%);
--gradient-hero: radial-gradient(ellipse at 30% 20%, rgba(99,102,241,0.15) 0%, transparent 50%),
                 radial-gradient(ellipse at 70% 80%, rgba(14,165,233,0.1) 0%, transparent 50%);
```

---

## 5. STRUTTURA PAGINE

### 5.1 Sitemap
```
/
├── index.html          (Homepage)
├── servizi.html        (Pagina Servizi dettagliata)
├── portfolio.html      (Case Studies con risultati)
├── contatti.html       (Form + info contatto) [opzionale, può essere sezione in index]
└── privacy.html        (Privacy Policy)
```

### 5.2 Homepage - Struttura Sezioni

```
┌─────────────────────────────────────────────────────────────┐
│ HEADER (Fixed, Glass effect on scroll)                      │
│ Logo | Nav Links | CTA Button | Mobile Toggle               │
├─────────────────────────────────────────────────────────────┤
│ HERO SECTION (100vh)                                         │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Background: Gradient orbs + Grid pattern                │ │
│ │ Badge: "Digital Marketing Specialist — Brescia"         │ │
│ │ H1: "Trasformo la tua visibilità online in clienti"     │ │
│ │ Subtitle: Value proposition chiara                      │ │
│ │ CTAs: [Consulenza Gratuita] [Guarda Risultati]          │ │
│ │ Stats: 50+ Progetti | 98% Soddisfatti | 3x ROI          │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ SERVIZI SECTION                                              │
│ Tag: "Cosa Posso Fare Per Te"                               │
│ Title: "Servizi di Digital Marketing a Brescia"             │
│ Grid 4 cards:                                                │
│ [SEO] [Advertising] [Web Design] [Social Media]             │
│ Ogni card: Icon + Title + Desc + Features + Link            │
├─────────────────────────────────────────────────────────────┤
│ PORTFOLIO SECTION                                            │
│ Tag: "Risultati Concreti"                                   │
│ Title: "I Miei Progetti a Brescia e Provincia"              │
│ Grid progetti con immagini/video dalla cartella media:      │
│ - Peruvià (P1.webp, P2.webp, P3.webp)                       │
│ - Charme (C1.png, C2.png)                                   │
│ - Nemesis (N1.mp4, N2.mp4)                                  │
│ Overlay con: Category, Title, Results, CTA                  │
├─────────────────────────────────────────────────────────────┤
│ DIFFERENTIATOR SECTION                                       │
│ Tag: "Perché Scegliermi"                                    │
│ Title: "Non Sono un'Agenzia. Sono il Tuo Partner."          │
│ Left: Features list (Risultati, Risposta 24h, Focus locale) │
│ Right: Comparison Card (Grandi Agenzie vs K-Marketing)      │
├─────────────────────────────────────────────────────────────┤
│ CHI SONO SECTION                                             │
│ Tag: "Chi Sono"                                              │
│ Grid: Image + Content                                        │
│ Photo Ivan + Bio + CTA                                       │
├─────────────────────────────────────────────────────────────┤
│ TESTIMONIALS SECTION                                         │
│ Tag: "Dicono di Me"                                         │
│ Grid 3 cards: Stars + Quote + Author + Company              │
├─────────────────────────────────────────────────────────────┤
│ CTA BANNER                                                   │
│ Full-width gradient background                               │
│ "Pronto a Far Crescere il Tuo Business?"                    │
│ [Prenota Consulenza Gratuita]                               │
├─────────────────────────────────────────────────────────────┤
│ CONTACT SECTION                                              │
│ Tag: "Contattami"                                            │
│ Grid: Info + Form                                            │
│ Left: Title, Desc, Email, LinkedIn, Zone servite            │
│ Right: Form (Nome, Email, Tel, Servizio, Messaggio)         │
├─────────────────────────────────────────────────────────────┤
│ FOOTER                                                       │
│ Logo + Desc | Links Servizi | Links Risorse | Zone          │
│ Divider                                                      │
│ Copyright | Social Icons                                     │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. COPY & SEO

### 6.1 Meta Tags Homepage
```html
<title>K-Marketing | Consulente Digital Marketing Brescia e Provincia | SEO, Web Design, Advertising</title>

<meta name="description" content="K-Marketing | Consulente Digital Marketing a Brescia. Strategie SEO, Web Design, Advertising su Google e Meta. Trasformo la tua visibilità online in clienti reali. Prima consulenza gratuita.">

<meta name="keywords" content="digital marketing brescia, consulente marketing brescia, seo brescia, web design brescia, social media marketing brescia, google ads brescia, agenzia marketing brescia provincia, web agency brescia, posizionamento google brescia">

<meta name="geo.region" content="IT-BS">
<meta name="geo.placename" content="Brescia">

<link rel="canonical" href="https://k-marketing.it/">
```

### 6.2 Heading Structure (SEO Optimized)
```html
<h1>Trasformo la tua visibilità online in clienti reali</h1>
<!-- Solo 1 H1 per pagina -->

<h2>Servizi di Digital Marketing a Brescia</h2>
<h3>SEO & Posizionamento</h3>
<h3>Digital Advertising</h3>
<h3>Web Design</h3>
<h3>Social Media Marketing</h3>

<h2>I Miei Progetti a Brescia e Provincia</h2>
<h3>I Peruvià - Social Media Marketing</h3>
<h3>Charme Extensions - Web Design</h3>
<h3>Nemesis - Video & Grafica</h3>

<h2>Perché Scegliere un Consulente vs un'Agenzia</h2>

<h2>Ivan Crescini - Digital Marketing Specialist Brescia</h2>

<h2>Testimonianze Clienti Brescia</h2>

<h2>Contatta il Tuo Consulente Marketing a Brescia</h2>
```


### 6.3 Copy Principale (Conversion-Focused)

#### Hero Section
```
Badge: "Digital Marketing Specialist — Brescia"

H1: "Trasformo la tua visibilità online in clienti reali"

Subtitle: "Non prometto numeri vuoti. Costruisco strategie digitali concrete — SEO, advertising, web design — che portano risultati misurabili al tuo business. Ogni euro investito deve tornare moltiplicato."

CTA Primary: "Richiedi Consulenza Gratuita"
CTA Secondary: "Guarda i Risultati"

Stats:
- "50+" / "Progetti Completati"
- "98%" / "Clienti Soddisfatti"  
- "3x" / "ROI Medio"
```

#### Servizi Copy

**SEO & Posizionamento**
```
Titolo: "SEO & Posizionamento"
Desc: "Porterò il tuo sito in prima pagina su Google. Non con trucchi, ma con contenuti di valore e ottimizzazione tecnica che durano nel tempo."
Features:
- Audit SEO completo
- Ottimizzazione on-page
- Link building strategico
- SEO locale Brescia
```

**Digital Advertising**
```
Titolo: "Digital Advertising"
Desc: "Campagne Google Ads e Meta Ads che convertono. Ogni centesimo del tuo budget viene ottimizzato per massimizzare il ritorno."
Features:
- Google Ads certificato
- Meta Ads (Facebook/Instagram)
- Remarketing avanzato
- Report ROI trasparenti
```

**Web Design**
```
Titolo: "Web Design"
Desc: "Siti web che non solo sono belli, ma convertono. Design moderno, velocità massima, esperienza utente impeccabile."
Features:
- Design responsive
- Ottimizzato per conversioni
- Performance eccellenti
- SEO-ready
```

**Social Media**
```
Titolo: "Social Media Marketing"
Desc: "Gestione professionale dei tuoi canali social. Contenuti che creano engagement reale e trasformano follower in clienti."
Features:
- Piano editoriale
- Content creation
- Community management
- Analytics e report
```

#### Differentiator Section
```
Tag: "Perché Scegliermi"
Title: "Non Sono un'Agenzia. Sono il Tuo Partner."

Intro: "Le grandi agenzie ti trattano come un numero. Io ti tratto come un partner. Il tuo successo è il mio successo — lavoro come se la tua azienda fosse la mia."

Feature 1:
Title: "Risultati Misurabili"
Desc: "Report trasparenti, KPI chiari. Sai sempre dove vanno i tuoi soldi."

Feature 2:
Title: "Risposta in 24h"
Desc: "Niente attese infinite. Rispondo sempre entro un giorno lavorativo."

Feature 3:
Title: "Focus su Brescia"
Desc: "Conosco il territorio, il mercato locale, i tuoi competitor diretti."

Comparison Card:
Left Column - "Grandi Agenzie":
- Account manager che cambia ogni mese
- Report incomprensibili
- Budget minimo €2000/mese
- Risposte in 5-7 giorni

Right Column - "K-Marketing":
- Lavori sempre con me, direttamente
- Report chiari che capisci
- Budget flessibili per ogni esigenza
- Risposta in 24h garantita
```

#### Chi Sono Section
```
Tag: "Chi Sono"
Title: "Ivan Crescini"
Subtitle: "Digital Marketing Specialist — Brescia"

Bio Paragraph 1:
"Non faccio questo lavoro per riempire un portfolio. Lo faccio perché vedere un business crescere grazie al mio lavoro è la cosa più gratificante che esista."

Bio Paragraph 2:
"Affronto ogni progetto come se fossi io il titolare dell'attività. Il tuo budget è sacro — ogni euro che investi deve portare risultati concreti e misurabili."

Bio Paragraph 3:
"Alla base di tutto c'è l'ascolto. Prima di proporti qualsiasi strategia, devo capire davvero chi sei, cosa vuoi ottenere, e quali sono i tuoi vincoli reali. Solo così posso costruire qualcosa che funziona."

CTA: "Parliamo del Tuo Progetto"
```

#### Testimonials
```
Testimonial 1:
Quote: "Ivan ha trasformato completamente la nostra presenza online. In 3 mesi abbiamo triplicato le richieste di preventivo dal sito."
Author: "Marco P."
Company: "Impresa Edile — Brescia"
Stars: 5/5

Testimonial 2:
Quote: "Finalmente qualcuno che spiega le cose in modo chiaro. So esattamente dove vanno i miei soldi e che risultati portano."
Author: "Laura R."
Company: "Studio Dentistico — Garda"
Stars: 5/5

Testimonial 3:
Quote: "Il sito che ci ha realizzato converte molto meglio del precedente. E finalmente siamo in prima pagina per le ricerche che contano."
Author: "Stefano C."
Company: "Ristorante — Franciacorta"
Stars: 5/5
```

#### CTA Banner
```
Title: "Pronto a Far Crescere il Tuo Business?"
Desc: "La prima consulenza è gratuita e senza impegno. Analizzerò la tua situazione attuale e ti dirò esattamente cosa puoi migliorare — anche se poi deciderai di non lavorare con me."
CTA: "Prenota Consulenza Gratuita"
```

#### Contact Section
```
Tag: "Contattami"
Title: "Iniziamo a Parlare del Tuo Progetto"
Desc: "Compila il form o scrivimi direttamente. Ti rispondo entro 24 ore — promesso."

Email: info@k-marketing.it
LinkedIn: Ivan Crescini

Zone Servite:
Title: "Opero in:"
Desc: "Brescia città, Franciacorta, Lago di Garda, Valle Trompia, Valle Sabbia e tutta la provincia di Brescia. Disponibile anche per progetti in tutta Italia in modalità remota."

Form Fields:
- Nome e Cognome (required)
- Email (required)
- Telefono (optional)
- Servizio di Interesse (select: SEO, Advertising, Web Design, Social, Altro)
- Messaggio: "Come Posso Aiutarti?" (required, placeholder: "Raccontami del tuo progetto, i tuoi obiettivi, le tue sfide...")
- Privacy checkbox (required)
- Submit: "Invia Richiesta"
```

---

## 7. ASSETS MEDIA

### 7.1 Immagini Disponibili
```
/media/
├── Charme/
│   ├── C1.png    (Web Design project - screenshot 1)
│   └── C2.png    (Web Design project - screenshot 2)
├── Nemesis/
│   ├── N1.mp4    (Video project 1)
│   └── N2.mp4    (Video project 2)
└── Peruvià/
    ├── P1.webp   (Social content 1)
    ├── P2.webp   (Social content 2)
    └── P3.webp   (Social content 3)
```

### 7.2 Immagini da Reperire/Creare
- Foto professionale Ivan Crescini (attualmente su k-marketing.it)
- Favicon (K logo)
- OG Image per social sharing (1200x630px)
- Background patterns/shapes (SVG)

### 7.3 Specifiche Visualizzazione Portfolio
```
LAYOUT GRID:
- Prima riga: 1 item large (Peruvià) - span 2 columns
- Seconda riga: 2 items medium (Charme + Nemesis)
- Terza riga: 1 CTA card

HOVER EFFECT:
- Image scale 1.05
- Overlay fade in con gradient
- Content slide up

VIDEO HANDLING:
- Autoplay muted loop
- Poster frame dal video
- Play icon overlay (opzionale)

RISULTATI DA MOSTRARE:
Peruvià: "+340% Engagement", "+2.5K Followers"
Charme: "+180% Conversioni"
Nemesis: "Brand awareness triplicata"
```

---

## 8. COMPONENTI UI

### 8.1 Header Component
```
States:
- Default: Transparent background, white text
- Scrolled: Glass effect (blur + dark bg), subtle border bottom

Elements:
- Logo: "K" gradient + "-Marketing" white
- Nav Links: Home, Servizi, Portfolio, Chi Sono
- CTA: "Parliamo" button with gradient
- Mobile: Hamburger toggle

Behavior:
- Fixed position
- Transition on scroll (background, padding)
- Mobile menu: Full screen overlay, centered links
```

### 8.2 Button Components
```
Primary Button:
- Background: gradient-primary
- Text: white, font-weight 600
- Padding: 14px 28px (default), 18px 36px (large)
- Border-radius: 10px
- Shadow: shadow-glow
- Hover: translateY(-2px), shadow increased
- Icon: arrow right, translateX on hover

Secondary Button:
- Background: transparent
- Border: 1px solid border-light
- Text: white
- Hover: background elevated, border primary
```

### 8.3 Card Components
```
Service Card:
- Background: bg-card
- Border: 1px solid border-subtle
- Border-radius: 16px
- Padding: 32px
- Before pseudo: 2px top gradient line (scaleX 0 → 1 on hover)
- Hover: translateY(-4px), border lighter

Portfolio Card:
- Overflow hidden
- Border-radius: 16px
- Aspect-ratio: 16/9 (default), 21/9 (large)
- Image: cover, grayscale 0, scale 1.05 on hover
- Overlay: gradient to top, opacity 0 → 1 on hover

Testimonial Card:
- Background: bg-card
- Border: 1px solid border-subtle
- Border-radius: 16px
- Padding: 32px
- Hover: border lighter
```

### 8.4 Form Components
```
Input/Textarea:
- Background: bg-card
- Border: 1px solid border-subtle
- Border-radius: 10px
- Padding: 14px 16px
- Focus: border primary, box-shadow subtle
- Placeholder: text-muted

Select:
- Same as input
- Custom arrow icon

Checkbox:
- Accent-color: primary
- Custom styled label
```

### 8.5 Badge/Tag Component
```
Section Tag:
- Display: inline-block
- Padding: 6px 14px
- Background: gradient-glow
- Border: 1px solid border-light
- Border-radius: 100px
- Font: 0.8rem, uppercase, letter-spacing 1px
- Color: primary-light

Hero Badge:
- Same + dot animation (pulse)
```

---

## 9. ANIMAZIONI & INTERAZIONI

### 9.1 Page Load
```javascript
// Loader
- Display "K" logo with pulse animation
- Fade out after window.load + 500ms delay

// Hero elements
- Staggered fade in from bottom
- Badge → Title → Subtitle → CTAs → Stats
- Delay: 100ms between each
```

### 9.2 Scroll Animations
```javascript
// Intersection Observer config
threshold: 0.1
rootMargin: '-50px'

// Animation
opacity: 0 → 1
transform: translateY(30px) → translateY(0)
duration: 600ms
easing: cubic-bezier(0.4, 0, 0.2, 1)

// Elements to animate
- Section headers
- Service cards
- Portfolio items
- Testimonial cards
- Feature items
```

### 9.3 Counter Animation
```javascript
// Trigger when hero-stats enters viewport
// Animate from 0 to target value
// Duration: 2000ms
// Use requestAnimationFrame for smooth animation
```

### 9.4 Micro-interactions
```css
/* Button hover */
transform: translateY(-2px);
box-shadow: increased glow;

/* Card hover */
transform: translateY(-4px) or translateY(-8px);
border-color: lighter;

/* Link underline */
::after width: 0 → 100%;

/* Form focus */
border-color: primary;
box-shadow: 0 0 0 3px rgba(primary, 0.1);
```

---

## 10. STRUCTURED DATA (JSON-LD)


```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "K-Marketing - Ivan Crescini",
  "description": "Consulente Digital Marketing a Brescia. Servizi SEO, Web Design, Google Ads, Social Media Marketing per aziende.",
  "url": "https://k-marketing.it",
  "telephone": "",
  "email": "info@k-marketing.it",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Brescia",
    "addressRegion": "BS",
    "postalCode": "25100",
    "addressCountry": "IT"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "45.5416",
    "longitude": "10.2118"
  },
  "areaServed": [
    {
      "@type": "City",
      "name": "Brescia"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Provincia di Brescia"
    },
    {
      "@type": "Place",
      "name": "Franciacorta"
    },
    {
      "@type": "Place",
      "name": "Lago di Garda"
    }
  ],
  "priceRange": "€€",
  "openingHours": "Mo-Fr 09:00-18:00",
  "sameAs": [
    "https://www.linkedin.com/in/ivan-crescini-358a87248/"
  ],
  "founder": {
    "@type": "Person",
    "name": "Ivan Crescini",
    "jobTitle": "Digital Marketing Specialist"
  },
  "makesOffer": [
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "SEO e Posizionamento",
        "description": "Ottimizzazione per motori di ricerca e posizionamento su Google per aziende di Brescia"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Digital Advertising",
        "description": "Campagne Google Ads e Meta Ads per aziende bresciane"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Web Design",
        "description": "Realizzazione siti web moderni e responsive per aziende di Brescia"
      }
    },
    {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Social Media Marketing",
        "description": "Gestione professionale canali social per PMI bresciane"
      }
    }
  ]
}
```

---

## 11. CHECKLIST IMPLEMENTAZIONE

### 11.1 Setup Iniziale
- [ ] Creare struttura cartelle (css, js, media, img)
- [ ] Impostare HTML5 boilerplate semantico
- [ ] Configurare CSS custom properties
- [ ] Importare font Google (Inter + Space Grotesk)
- [ ] Creare file favicon

### 11.2 Componenti Base
- [ ] Header + mobile menu
- [ ] Button styles (primary, secondary, sizes)
- [ ] Card components
- [ ] Form elements
- [ ] Section headers
- [ ] Footer

### 11.3 Sezioni Homepage
- [ ] Hero section completa
- [ ] Servizi grid
- [ ] Portfolio grid con media
- [ ] Differentiator section
- [ ] Chi sono section
- [ ] Testimonials
- [ ] CTA banner
- [ ] Contact form

### 11.4 Funzionalità JS
- [ ] Loader animation
- [ ] Header scroll effect
- [ ] Mobile menu toggle
- [ ] Smooth scroll anchors
- [ ] Counter animation
- [ ] Scroll reveal animations
- [ ] Form validation + submission feedback

### 11.5 SEO & Performance
- [ ] Meta tags completi
- [ ] Structured data JSON-LD
- [ ] Alt text tutte le immagini
- [ ] Lazy loading immagini
- [ ] Ottimizzazione immagini (WebP, dimensioni corrette)
- [ ] Minificazione CSS/JS
- [ ] Test Core Web Vitals

### 11.6 Testing
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Responsive (320px → 1920px)
- [ ] Form submission
- [ ] Links funzionanti
- [ ] Accessibilità base (contrasti, focus states)

---

## 12. ISTRUZIONI PER GEMINI AI STUDIO

### 12.1 Prompt di Setup
```
Crea un sito web professionale per K-Marketing seguendo esattamente le specifiche del PRD allegato.

TECNOLOGIE:
- HTML5 semantico
- CSS3 puro (no framework)
- JavaScript vanilla ES6+

PRIORITÀ:
1. Mobile-first responsive design
2. Performance ottimali (90+ PageSpeed)
3. SEO on-page completo
4. Animazioni fluide ma non invasive
5. Conversione: ogni elemento deve guidare verso il form contatto

DESIGN KEYWORDS:
- Tech-forward
- Premium/Professional
- Dark mode con accenti gradient
- Glassmorphism subtle
- Micro-animazioni sofisticate

EVITARE:
- Template generici
- Overload di animazioni
- Copy corporate/impersonale
- Design già visti sui competitor bresciani
```

### 12.2 Ordine di Generazione Consigliato
1. **Prima fase**: CSS completo con design system
2. **Seconda fase**: HTML Homepage con tutti i componenti
3. **Terza fase**: JavaScript per interazioni
4. **Quarta fase**: Pagine secondarie (servizi.html, portfolio.html)
5. **Quinta fase**: Ottimizzazioni e testing

### 12.3 Riferimenti Visivi da Seguire
- **Ispirazione generale**: Stripe, Linear, Vercel (tech companies)
- **Colori**: Palette indigo/cyan su dark background
- **Typography**: Clean, bold titles, readable body
- **Layout**: Generoso white space, grid asimmetrici
- **Effetti**: Glow gradients, glassmorphism, smooth transitions

---

## 13. NOTE FINALI

### 13.1 Elementi Differenzianti vs Competitor
1. **Design futuristico** che nessun competitor locale ha
2. **Copy diretto e personale** (non corporate)
3. **Risultati numerici** in evidenza (social proof)
4. **Confronto diretto** agenzia vs consulente
5. **Focus geografico forte** (Brescia e zone specifiche)
6. **Micro-animazioni** che comunicano qualità

### 13.2 Keyword SEO Prioritarie
Primarie:
- "digital marketing brescia"
- "consulente marketing brescia"
- "seo brescia"
- "web design brescia"

Secondarie:
- "social media marketing brescia"
- "google ads brescia"
- "agenzia marketing brescia provincia"
- "posizionamento google brescia"

Long-tail locali:
- "consulente seo franciacorta"
- "web agency lago di garda"
- "marketing digitale valle trompia"

### 13.3 Metriche di Successo
- Posizione 1-3 per "digital marketing brescia" entro 6 mesi
- Bounce rate < 40%
- Tempo medio sessione > 2 minuti
- Conversion rate form > 3%
- PageSpeed score > 90

---

**Fine PRD**

*Documento creato per K-Marketing - Ivan Crescini*
*Versione: 1.0*
*Data: Gennaio 2026*
