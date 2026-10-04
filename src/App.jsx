import { useEffect, useState } from "react";

const APP_STORE_URL = "https://apps.apple.com/app/id6756011983";
const PRIVACY_URL = "https://bentosoftware.com/app-privacy";
const TERMS_URL = "https://www.apple.com/legal/internet-services/itunes/dev/stdeula/";
const asset = (name) => import.meta.env.BASE_URL + "assets/" + name;

const steps = [
  {
    number: "01",
    title: "Importieren oder scannen",
    description:
      "Übernimm ein Bild aus deiner Mediathek oder erfasse eine vorhandene Karte mit der Kamera. So ist sie schnell auf deinem iPhone griffbereit.",
    image: "scan-card.jpg",
    alt: "Eine Visitenkarte wird mit der iPhone-Kamera erfasst.",
  },
  {
    number: "02",
    title: "Nach deinem Stil gestalten",
    description:
      "Platziere Texte, Bilder, Logos, Symbole und QR-Codes. Passe Farben und Schrift an und gestalte Vorder- und Rückseite individuell.",
    image: "design-front-back.jpg",
    alt: "Vorder- und Rückseite einer selbst gestalteten digitalen Visitenkarte.",
  },
  {
    number: "03",
    title: "Zeigen und teilen",
    description:
      "Präsentiere deine aktive Karte in der Vollbildansicht – hochkant oder quer. Teile sie über iOS oder exportiere dein Design als PNG.",
    image: "show-share.jpg",
    alt: "Eine Person zeigt ihre digitale Visitenkarte in CardDisplay auf dem iPhone.",
  },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-parallax]");
    const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const resetParallax = () => {
      targets.forEach((target) => target.style.setProperty("--parallax-y", "0px"));
    };

    const updateParallax = () => {
      if (frame) return;

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        if (motionPreference.matches) {
          resetParallax();
          return;
        }

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        targets.forEach((target) => {
          const bounds = target.getBoundingClientRect();
          if (bounds.bottom < -80 || bounds.top > viewportHeight + 80) return;

          const compactViewport = window.matchMedia("(max-width: 780px)").matches;
          const image = target.firstElementChild;
          const imageScaleY = Number.parseFloat(
            window.getComputedStyle(image).getPropertyValue("--parallax-scale-y"),
          ) || 1.1;
          const visibleBleed = Math.max(0, (bounds.height * (imageScaleY - 1)) / 2 - 2);
          const maxRange = compactViewport ? 46 : 88;
          const range = Math.min(Number(target.dataset.parallax) || 0, maxRange, visibleBleed);
          const progress = Math.max(
            0,
            Math.min(1, (viewportHeight - bounds.top) / (viewportHeight + bounds.height)),
          );
          const offset = (0.5 - progress) * 2 * range;
          target.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
        });
      });
    };

    const handleMotionPreference = () => {
      if (motionPreference.matches) {
        if (frame) window.cancelAnimationFrame(frame);
        frame = 0;
        resetParallax();
        return;
      }
      updateParallax();
    };

    window.addEventListener("scroll", updateParallax, { passive: true });
    window.addEventListener("resize", updateParallax, { passive: true });
    if (motionPreference.addEventListener) {
      motionPreference.addEventListener("change", handleMotionPreference);
    } else {
      motionPreference.addListener(handleMotionPreference);
    }
    updateParallax();

    return () => {
      window.removeEventListener("scroll", updateParallax);
      window.removeEventListener("resize", updateParallax);
      if (motionPreference.removeEventListener) {
        motionPreference.removeEventListener("change", handleMotionPreference);
      } else {
        motionPreference.removeListener(handleMotionPreference);
      }
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

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
              So funktioniert’s
            </a>
            <a href="#kartenstudio" onClick={closeMenu}>
              Kartenstudio
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
            <div className="hero-art" data-parallax="100">
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
              Importiere oder scanne vorhandene Karten. Gestalte neue Visitenkarten
              mit deinen Motiven und QR-Codes – und zeige alles direkt vom iPhone.
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
              Für Beruf, Projekte und private Kontakte · lokal auf deinem iPhone gespeichert
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
                Von der vorhandenen Papierkarte bis zum eigenen Design: CardDisplay
                bringt Import, Gestaltung und Präsentation an einen Ort.
              </p>
            </div>

            <div className="steps-grid">
              {steps.map((step) => (
                <article className="step" key={step.number}>
                  <div className="step-image" data-parallax="54">
                    <img
                      src={asset(step.image)}
                      alt={step.alt}
                      loading="lazy"
                    />
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

        <section className="studio-section section-pad" id="kartenstudio" aria-labelledby="studio-title">
          <div className="container studio-layout">
            <div className="studio-copy">
              <p className="eyebrow">DEIN KARTENSTUDIO</p>
              <h2 id="studio-title">
                Mach aus Kontaktdaten
                <br />
                <span>deinen Auftritt.</span>
              </h2>
              <p>
                Gestalte deine digitale Visitenkarte direkt auf dem iPhone. Setze
                Texte, Bilder, Logos und Symbole frei zusammen, stimme Farben und
                Schrift auf dich ab und füge einen passenden QR-Code hinzu.
              </p>
              <ul className="feature-list">
                <li>
                  <strong>Beide Seiten gestalten</strong>
                  <span>Vorder- und Rückseite separat entwerfen und später weiterbearbeiten.</span>
                </li>
                <li>
                  <strong>Elemente frei anordnen</strong>
                  <span>Inhalte verschieben, skalieren, drehen und in Ebenen sortieren.</span>
                </li>
                <li>
                  <strong>Entwürfe behalten</strong>
                  <span>Automatisch speichern und jederzeit an deinem Design weiterarbeiten.</span>
                </li>
              </ul>
            </div>
            <figure className="studio-art" data-parallax="82">
              <img
                src={asset("design-front-back.jpg")}
                alt="Individuell gestaltete Vorder- und Rückseite einer digitalen Visitenkarte mit QR-Code."
                loading="lazy"
              />
              <figcaption>Vorderseite und Rückseite – passend zu deinem Design</figcaption>
            </figure>
          </div>
        </section>

        <section className="sharing-section section-pad" aria-labelledby="sharing-title">
          <div className="container sharing-layout">
            <figure className="sharing-art" data-parallax="78">
              <img
                src={asset("show-share.jpg")}
                alt="Eine Person zeigt ihre CardDisplay-Visitenkarte auf dem iPhone."
                loading="lazy"
              />
            </figure>
            <div className="sharing-copy">
              <p className="eyebrow">BEREIT FÜR DEN MOMENT</p>
              <h2 id="sharing-title">
                Zeigen. Teilen.
                <br />
                <span>Weiterverbinden.</span>
              </h2>
              <p>
                Öffne deine aktive Karte in einer klaren Vollbildansicht und
                wechsle bei Bedarf zwischen Vorder- und Rückseite. Fürs
                Weitergeben nutzt du das iOS-Share-Sheet oder exportierst deine
                Karte als hochwertige PNG-Datei.
              </p>
              <div className="feature-tags" aria-label="Möglichkeiten zum Präsentieren und Teilen">
                <span>Hoch- und Querformat</span>
                <span>Vorder- und Rückseite</span>
                <span>PNG-Export</span>
              </div>
            </div>
          </div>
        </section>

        <section className="use-cases-section section-pad" aria-labelledby="use-cases-title">
          <div className="container">
            <div className="section-heading">
              <p className="eyebrow">MEHR ALS EINE KARTE</p>
              <h2 id="use-cases-title">
                Verschiedene Rollen.
                <br />
                <span>Ein Platz dafür.</span>
              </h2>
              <p>
                Speichere mehrere Karten und halte sie für unterschiedliche
                Situationen bereit – ganz gleich, ob du beruflich, selbstständig
                oder privat unterwegs bist.
              </p>
            </div>
            <div className="use-cases-grid">
              <article className="use-case-card">
                <span className="use-case-index">01 / BERUF</span>
                <h3>Dein beruflicher Kontakt</h3>
                <p>Mit den Angaben und Links, die bei einem Kundentermin oder Networking wichtig sind.</p>
              </article>
              <article className="use-case-card">
                <span className="use-case-index">02 / PROJEKTE</span>
                <h3>Deine eigene Marke</h3>
                <p>Eine eigene Karte für deine Selbstständigkeit, dein Unternehmen oder ein Projekt.</p>
              </article>
              <article className="use-case-card">
                <span className="use-case-index">03 / PRIVAT</span>
                <h3>Deine persönliche Karte</h3>
                <p>Auch private Kontakte oder Karten für Vereine bleiben übersichtlich beieinander.</p>
              </article>
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
                Deine Karten, Entwürfe und Designdateien werden lokal im
                App-Speicher auf deinem Gerät abgelegt. So bleiben deine
                Designs bei dir und stehen in CardDisplay zum Zeigen und
                Weiterbearbeiten bereit.
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

        <section className="faq-section section-pad" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-heading">
              <p className="eyebrow">GUT ZU WISSEN</p>
              <h2 id="faq-title">Häufige Fragen</h2>
              <p>Die wichtigsten Antworten rund um deine digitale Visitenkarte.</p>
            </div>
            <div className="faq-list">
              <details>
                <summary>Kann ich eine vorhandene Papierkarte übernehmen?</summary>
                <p>Ja. Wähle ein Foto aus deiner Mediathek oder erfasse deine Karte direkt mit der iPhone-Kamera.</p>
              </details>
              <details>
                <summary>Was kann ich mit dem Kartenstudio gestalten?</summary>
                <p>Du kannst Texte, Bilder, Logos, Symbole und QR-Codes hinzufügen, Farben und Schrift anpassen sowie Vorder- und Rückseite gestalten.</p>
              </details>
              <details>
                <summary>Welche Informationen kann ein QR-Code enthalten?</summary>
                <p>Zum Beispiel Kontaktdaten als vCard, eine Website, E-Mail-Adresse, Telefonnummer oder eigenen Text.</p>
              </details>
              <details>
                <summary>Wie kann ich meine Karte weitergeben?</summary>
                <p>Teile deine aktive Karte über das iOS-Share-Sheet oder exportiere gestaltete Karten als PNG. Vorder- und Rückseite können einzeln oder zusammen geteilt werden.</p>
              </details>
              <details>
                <summary>Wo speichert CardDisplay meine Designs?</summary>
                <p>Karten, Entwürfe und Designdateien werden lokal im App-Speicher auf deinem Gerät abgelegt.</p>
              </details>
            </div>
          </div>
        </section>

        <section className="final-cta" aria-labelledby="cta-title">
          <div className="container final-cta-layout">
            <div className="final-cta-copy">
              <p className="eyebrow">ZEIG DEINE KARTE</p>
              <h2 id="cta-title">Bereit für deinen nächsten Auftritt?</h2>
              <p>
                Importiere deine bestehende Karte, gestalte ein eigenes Design
                oder erstelle einen QR-Code für deine Kontaktdaten. CardDisplay
                bringt deine Karte dorthin, wo du sie brauchst: auf dein iPhone.
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
            <div className="final-cta-art" data-parallax="72">
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
