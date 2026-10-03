import { useState } from "react";

const APP_STORE_URL = "https://apps.apple.com/app/id6756011983";
const PRIVACY_URL = "https://bentosoftware.com/app-privacy";
const TERMS_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const asset = (name) => import.meta.env.BASE_URL + "assets/" + name;

const steps = [
  {
    number: "01",
    title: "Importieren oder scannen",
    description:
      "Wähle ein Foto deiner Visitenkarte oder erfasse sie direkt mit der Kamera.",
    image: "scan-card.jpg",
    alt: "Eine Visitenkarte wird mit der iPhone-Kamera erfasst.",
  },
  {
    number: "02",
    title: "Nach deinem Stil gestalten",
    description:
      "Kombiniere Text, Bilder, Symbole und QR-Codes. Gestalte Vorder- und Rückseite.",
    image: "design-front-back.jpg",
    alt: "Vorder- und Rückseite einer selbst gestalteten digitalen Visitenkarte.",
  },
  {
    number: "03",
    title: "Zeigen und teilen",
    description:
      "Zeige deine aktive Karte auf dem iPhone oder teile sie über das iOS-Menü.",
    image: "show-share.jpg",
    alt: "Eine Person zeigt ihre digitale Visitenkarte in CardDisplay auf dem iPhone.",
  },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content">
        Zum Inhalt springen
      </a>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#start" onClick={closeMenu} aria-label="CardDisplay – Startseite">
            <img src={asset("carddisplay-app-icon.png")} alt="" />
            <span>CardDisplay</span>
          </a>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="primary-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Schließen" : "Menü"}
          </button>

          <nav
            className={menuOpen ? "primary-nav is-open" : "primary-nav"}
            id="primary-navigation"
            aria-label="Hauptnavigation"
          >
            <a href="#ablauf" onClick={closeMenu}>
              Funktionen
            </a>
            <a href="#datenschutz" onClick={closeMenu}>
              Datenschutz
            </a>
            <a
              className="button button-small"
              href={APP_STORE_URL}
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
            >
              Im App Store laden
            </a>
          </nav>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="start" aria-labelledby="hero-title">
          <div className="hero-art">
            <img
              src={asset("hero-carddisplay.jpg")}
              alt="Eine digitale Visitenkarte und ein iPhone mit CardDisplay auf dunklem Untergrund."
              fetchPriority="high"
            />
          </div>

          <div className="container hero-copy">
            <p className="eyebrow">ZEIG DEINE KARTE</p>
            <h1 id="hero-title">
              Deine Karte.
              <br />
              <span>Dein Auftritt.</span>
            </h1>
            <p className="hero-description">
              Scanne, gestalte oder importiere digitale Visitenkarten – und
              zeige sie direkt auf deinem iPhone.
            </p>
            <div className="hero-actions">
              <a
                className="button"
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
              >
                Im App Store laden
              </a>
              <a className="text-link" href="#ablauf">
                So funktioniert’s
              </a>
            </div>
            <p className="local-note">
              Deine Karten werden lokal auf deinem iPhone gespeichert.
            </p>
          </div>
        </section>

        <section className="steps-section section-pad" id="ablauf" aria-labelledby="steps-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">SO EINFACH GEHT’S</p>
              <h2 id="steps-title">
                Scannen. Gestalten.
                <br />
                <span>Zeigen.</span>
              </h2>
              <p>
                Deine Visitenkarte ist schnell bereit – ob übernommen, selbst
                gestaltet oder direkt vom iPhone gezeigt.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((step) => (
                <article className="step" key={step.number}>
                  <div className="step-image">
                    <img src={asset(step.image)} alt={step.alt} loading="lazy" />
                  </div>
                  <div className="step-copy">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          className="privacy-section section-pad"
          id="datenschutz"
          aria-labelledby="privacy-title"
        >
          <div className="container privacy-layout">
            <div className="privacy-copy">
              <p className="eyebrow">DEINE KARTEN BLEIBEN BEI DIR</p>
              <h2 id="privacy-title">
                Bereit, wenn du sie
                <br />
                <span>brauchst.</span>
              </h2>
              <p>
                CardDisplay speichert deine Karten, Entwürfe und Designdateien
                lokal im App-Speicher auf deinem iPhone. So kannst du deine
                aktive Karte schnell zeigen oder teilen.
              </p>
              <a
                className="text-link"
                href={PRIVACY_URL}
                target="_blank"
                rel="noreferrer"
              >
                Datenschutzinformationen
              </a>
            </div>

            <figure className="screen-preview">
              <img
                src={asset("carddisplay-app-screen.png")}
                alt="CardDisplay zeigt eine gespeicherte Visitenkarte in der App."
                loading="lazy"
              />
              <figcaption>Deine aktive Karte in CardDisplay</figcaption>
            </figure>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="container final-cta-layout">
            <div className="final-cta-copy">
              <p className="eyebrow">ZEIG DEINE KARTE</p>
              <h2 id="cta-title">Bereit für deinen nächsten Auftritt?</h2>
              <p>
                Lade CardDisplay und habe deine digitale Visitenkarte auf dem
                iPhone schnell zur Hand.
              </p>
              <a
                className="button"
                href={APP_STORE_URL}
                target="_blank"
                rel="noreferrer"
              >
                CardDisplay im App Store
              </a>
            </div>
            <div className="final-cta-art">
              <img
                src={asset("design-front-back.jpg")}
                alt="Zwei Seiten einer individuell gestalteten Visitenkarte."
                loading="lazy"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <a className="brand footer-brand" href="#start">
            <img src={asset("carddisplay-app-icon.png")} alt="" loading="lazy" />
            <span>CardDisplay</span>
          </a>
          <p>© {new Date().getFullYear()} Bento Software</p>
          <div className="footer-links">
            <a href={PRIVACY_URL} target="_blank" rel="noreferrer">
              Datenschutz
            </a>
            <a href={TERMS_URL} target="_blank" rel="noreferrer">
              Nutzungsbedingungen
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
