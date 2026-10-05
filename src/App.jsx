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
    image: "carddisplay-app-screen.png",
    alt: "Eine gestaltete GymMix-Karte in der CardDisplay-App.",
  },
  {
    number: "03",
    title: "Zeigen und teilen",
    description:
      "Präsentiere deine aktive Karte in der Vollbildansicht – hochkant oder quer. Teile sie über iOS oder exportiere dein Design als PNG.",
    image: "design-front-back.jpg",
    alt: "Eine gestaltete digitale Visitenkarte mit Vorder- und Rückseite.",
  },
];

const demoSteps = [
  {
    label: "Übernehmen",
    title: "Karte erfassen",
    description:
      "Wähle ein Kartenfoto aus oder erfasse eine bestehende Visitenkarte mit der Kamera.",
    appTitle: "Karte hinzufügen",
  },
  {
    label: "Gestalten",
    title: "Dein Design formen",
    description:
      "Ordne Text, Bild und QR-Code an. Passe Farben und Schrift an und gestalte beide Seiten.",
    appTitle: "Kartenstudio",
  },
  {
    label: "Präsentieren",
    title: "Bereit zum Zeigen",
    description:
      "Öffne deine aktive Karte groß auf dem iPhone oder gib sie über iOS weiter.",
    appTitle: "Deine aktive Karte",
  },
];

const useCaseCards = [
  {
    id: "career",
    label: "01 / BERUF",
    title: "Dein beruflicher Kontakt",
    description: "Kontaktdaten und Links, die bei Kundenterminen und Networking zählen.",
    name: "MARA KLEIN",
    detail: "ARCHITEKTUR · MÜNCHEN",
    mark: "MK",
  },
  {
    id: "project",
    label: "02 / PROJEKTE",
    title: "Deine eigene Marke",
    description: "Ein eigenständiger Auftritt für dein Unternehmen oder dein nächstes Projekt.",
    name: "NOVA",
    detail: "DIGITAL STUDIO",
    mark: "✳",
  },
  {
    id: "private",
    label: "03 / PRIVAT",
    title: "Deine persönliche Karte",
    description: "Auch private Kontakte, Hobbys und Vereinsleben bleiben an einem Ort.",
    name: "Mara & Jonas",
    detail: "SCHÖN, DICH KENNENZULERNEN",
    mark: "M + J",
  },
];

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDemo, setActiveDemo] = useState(0);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    const targets = document.querySelectorAll("[data-parallax], [data-parallax-item]");
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
        const compactViewport = window.matchMedia("(max-width: 780px)").matches;
        targets.forEach((target) => {
          const bounds = target.getBoundingClientRect();
          const isContentItem = target.hasAttribute("data-parallax-item");
          const currentOffset = Number.parseFloat(target.style.getPropertyValue("--parallax-y")) || 0;
          const stableTop = bounds.top - (isContentItem ? currentOffset : 0);
          const height = target.offsetHeight || bounds.height;
          if (stableTop + height < -80 || stableTop > viewportHeight + 80) return;

          const requestedRange = Number(
            isContentItem ? target.dataset.parallaxItem : target.dataset.parallax,
          ) || 0;
          const maxRange = isContentItem
            ? compactViewport ? 28 : 40
            : compactViewport ? 46 : 88;
          let visibleBleed = maxRange;

          if (!isContentItem) {
            const image = target.firstElementChild;
            if (!image) return;
            const imageScaleY = Number.parseFloat(
              window.getComputedStyle(image).getPropertyValue("--parallax-scale-y"),
            ) || 1.08;
            const zoomBleed = (image.offsetHeight * (imageScaleY - 1)) / 2;
            if (target.classList.contains("hero-art")) {
              const reservedSpace = Math.max(0, (target.clientHeight - image.offsetHeight) / 2);
              visibleBleed = Math.max(0, reservedSpace - zoomBleed - 2);
            } else {
              visibleBleed = Math.max(0, zoomBleed - 2);
            }
          }

          const range = Math.min(requestedRange, maxRange, visibleBleed);
          const progress = Math.max(
            0,
            Math.min(1, (viewportHeight - stableTop) / (viewportHeight + height)),
          );
          const direction = target.dataset.parallaxDirection === "reverse" ? -1 : 1;
          const offset = (0.5 - progress) * 2 * range * direction;
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
            <a href="#vorschau" onClick={closeMenu}>
              Vorschau
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
          <div className="hero-art">
            <img
              src={asset("hero-carddisplay-person.jpg")}
              alt="Eine Person zeigt ihre CardDisplay-Visitenkarte auf dem iPhone."
              fetchPriority="high"
            />
          </div>

          <div className="container hero-copy">
            <div className="hero-title-copy" data-parallax-item="40">
              <p className="eyebrow">ZEIG DEINE KARTE</p>
              <h1 id="hero-title">
                Deine Karte.
                <br />
                <span>Dein Auftritt.</span>
              </h1>
            </div>
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
            <div className="section-heading" data-parallax-item="22">
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
                  <div className="step-copy" data-parallax-item="18">
                    <span className="step-number">{step.number}</span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="demo-section section-pad" id="vorschau" aria-labelledby="demo-title">
          <div className="container demo-layout">
            <div className="demo-copy" data-parallax-item="20">
              <p className="eyebrow">EIN BLICK IN CARDDISPLAY</p>
              <h2 id="demo-title">
                Von der Idee
                <br />
                <span>bis zum Auftritt.</span>
              </h2>
              <p>
                Entdecke die wichtigsten Schritte in einer kleinen interaktiven
                Vorschau. Tippe dich durch Übernahme, Gestaltung und Präsentation.
              </p>
              <div className="demo-tabs" role="tablist" aria-label="CardDisplay Vorschau">
                {demoSteps.map((step, index) => (
                  <button
                    className={activeDemo === index ? "demo-tab is-active" : "demo-tab"}
                    key={step.label}
                    type="button"
                    role="tab"
                    aria-selected={activeDemo === index}
                    aria-controls="demo-preview"
                    onClick={() => setActiveDemo(index)}
                  >
                    <span className="demo-tab-index">0{index + 1}</span>
                    <span>{step.label}</span>
                    <span className="demo-tab-arrow" aria-hidden="true">↗</span>
                  </button>
                ))}
              </div>
              <div className="demo-caption" aria-live="polite">
                <span className="demo-live-dot" />
                <span>{demoSteps[activeDemo].title}</span>
                <p>{demoSteps[activeDemo].description}</p>
              </div>
            </div>

            <div className="demo-stage" data-parallax-item="24">
              <div className={`demo-device demo-device--step-${activeDemo}`} id="demo-preview" role="tabpanel">
                <div className="demo-island" aria-hidden="true" />
                <div className="demo-statusbar"><span>9:41</span><span>●●●　◉　▰</span></div>
                <div className="demo-appbar">
                  <span className="demo-app-icon">C</span>
                  <span>{demoSteps[activeDemo].appTitle}</span>
                  <span className="demo-app-menu">···</span>
                </div>

                {activeDemo === 0 && (
                  <div className="demo-screen demo-screen--scan">
                    <div className="demo-screen-heading">
                      <span>Bestehende Karte</span>
                      <strong>Foto aufnehmen oder wählen</strong>
                    </div>
                    <div className="scan-window">
                      <div className="scan-corner scan-corner--tl" />
                      <div className="scan-corner scan-corner--tr" />
                      <div className="scan-corner scan-corner--bl" />
                      <div className="scan-corner scan-corner--br" />
                      <div className="scan-sample-card">
                        <span className="scan-sample-mark">MK</span>
                        <span><strong>Mara Klein</strong><small>Architektur & Raum</small></span>
                      </div>
                      <span className="scan-line" />
                    </div>
                    <div className="demo-screen-footer">
                      <span className="demo-gallery-icon">▧</span>
                      <span className="demo-shutter" />
                      <span className="demo-flash-icon">✳</span>
                    </div>
                  </div>
                )}

                {activeDemo === 1 && (
                  <div className="demo-screen demo-screen--edit">
                    <div className="editor-toolbar"><span>‹ Zurück</span><span>Vorderseite　⌄</span><span>Fertig</span></div>
                    <div className="editor-canvas">
                      <div className="editor-card">
                        <span className="editor-card-mark">N</span>
                        <div><strong>NORD</strong><small>STUDIO FÜR RÄUME</small></div>
                        <span className="editor-card-stamp">DESIGN<br />01</span>
                      </div>
                      <span className="editor-handle editor-handle--one" />
                      <span className="editor-handle editor-handle--two" />
                      <span className="editor-handle editor-handle--three" />
                      <span className="editor-handle editor-handle--four" />
                    </div>
                    <div className="editor-tools">
                      <span><b>T</b> Text</span><span><b>◈</b> Bild</span><span><b>▦</b> QR-Code</span><span><b>◐</b> Stil</span>
                    </div>
                    <p className="editor-save"><span /> Entwurf gespeichert</p>
                  </div>
                )}

                {activeDemo === 2 && (
                  <div className="demo-screen demo-screen--show">
                    <div className="show-screen-tools"><span>☼</span><span>Vorderseite</span><span>↗</span></div>
                    <div className="show-card">
                      <span className="show-card-orbit" />
                      <span className="show-card-kicker">STUDIO NORD　·　MÜNCHEN</span>
                      <strong>Mara<br />Klein<span>.</span></strong>
                      <span className="show-card-role">ARCHITEKTUR & RAUM</span>
                      <span className="show-card-rule" />
                      <span className="show-card-contact">+49 89 123 45 67<br />studio-nord.de</span>
                      <span className="show-card-qr" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /><i /></span>
                    </div>
                    <div className="show-screen-bottom"><span>Vorderseite</span><span className="show-side-toggle"><i /></span><span>Rückseite</span></div>
                    <div className="show-share-pill"><span>↑</span> Karte teilen</div>
                  </div>
                )}
              </div>
              <p className="demo-footnote">Interaktive Produktvorschau · beispielhafte Kartenansicht</p>
            </div>
          </div>
        </section>

        <section className="studio-section section-pad" id="kartenstudio" aria-labelledby="studio-title">
          <div className="container studio-layout">
            <div className="studio-copy" data-parallax-item="24">
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
            <div className="studio-visual" data-parallax-item="22" role="img" aria-label="Gestaltungselemente für eine Karte: Text, Bild, QR-Code und Farbpalette">
              <div className="studio-visual-top"><span>DESIGN-LEINWAND</span><span>VORDERSEITE <i /> RÜCKSEITE</span></div>
              <div className="studio-layer-stack">
                <div className="studio-layer studio-layer--back"><span>04</span><b>QR-Code</b><i>▦</i></div>
                <div className="studio-layer studio-layer--mid"><span>03</span><b>Logo & Bild</b><i>◈</i></div>
                <div className="studio-layer studio-layer--front"><span>02</span><b>Text und Schrift</b><i>Tt</i></div>
              </div>
              <div className="studio-palette"><span>FARBE WÄHLEN</span><i /><i /><i /><i /><b>+</b></div>
              <div className="studio-visual-note"><span>01</span><span>Elemente frei anordnen</span></div>
            </div>
          </div>
        </section>

        <section className="sharing-section section-pad" aria-labelledby="sharing-title">
          <div className="container sharing-layout">
            <div className="sharing-copy" data-parallax-item="24">
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
            <div className="sharing-visual" data-parallax-item="18" role="img" aria-label="Vorschau der Kartenansicht und des iOS-Teilen-Menüs">
              <div className="sharing-preview-card">
                <span className="sharing-card-eyebrow">CARD DISPLAY</span>
                <strong>Dein Kontakt.<br /><i>Dein Stil.</i></strong>
                <span className="sharing-card-footer"><span>Visitenkarte</span><b>↗</b></span>
              </div>
              <div className="sharing-sheet">
                <div className="sharing-sheet-grabber" />
                <div className="sharing-sheet-head"><span className="sharing-sheet-icon">↗</span><span><b>Karte teilen</b><small>Visitenkarte · PNG</small></span></div>
                <div className="sharing-destinations"><span><i>◉</i>AirDrop</span><span><i>✉</i>Nachrichten</span><span><i>•••</i>Mehr</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="use-cases-section section-pad" aria-labelledby="use-cases-title">
          <div className="container">
            <div className="section-heading" data-parallax-item="20">
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
              {useCaseCards.map((card, index) => (
                <article
                  className="use-case-card"
                  data-parallax-item={index === 1 ? "22" : "16"}
                  data-parallax-direction={index === 1 ? "reverse" : undefined}
                  key={card.id}
                >
                  <div className={`sample-card sample-card--${card.id}`} aria-hidden="true">
                    <span className="sample-card-mark">{card.mark}</span>
                    <span className="sample-card-copy"><strong>{card.name}</strong><small>{card.detail}</small></span>
                    <span className="sample-card-orbit" />
                  </div>
                  <span className="use-case-index">{card.label}</span>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
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
            <div className="privacy-copy" data-parallax-item="22">
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
            <div className="privacy-visual" data-parallax-item="18" role="img" aria-label="CardDisplay auf dem iPhone, mit lokal gespeicherten Kartenentwürfen">
              <div className="privacy-phone">
                <div className="privacy-phone-island" />
                <div className="privacy-phone-head"><span>9:41</span><span>•••　◉　▰</span></div>
                <div className="privacy-phone-title"><span>CardDisplay</span><b>⚙</b></div>
                <div className="privacy-card-mini"><span>MEINE KARTEN</span><b>Studio Nord</b><small>Entwurf · lokal auf diesem iPhone</small><i /></div>
                <div className="privacy-lock"><span>✓</span></div>
              </div>
              <div className="privacy-callout"><span className="privacy-callout-icon">⌂</span><span><b>Dein Gerät, deine Dateien</b><small>Karten und Entwürfe bleiben im App-Speicher.</small></span></div>
            </div>
          </div>
        </section>

        <section className="faq-section section-pad" aria-labelledby="faq-title">
          <div className="container faq-layout">
            <div className="faq-heading" data-parallax-item="20">
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
            <div className="final-cta-copy" data-parallax-item="24">
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
                src={asset("hero-carddisplay.jpg")}
                alt="Eine digitale GymMix-Visitenkarte neben einem iPhone mit CardDisplay."
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
