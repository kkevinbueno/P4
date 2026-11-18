/* ==========================================================================
   COMPONENTS.JS — Componentes e comportamentos reutilizáveis
   --------------------------------------------------------------------------
   1. Ícones (SVG inline)
   2. Utilitários de interface (escape, links, placeholders de texto)
   3. Templates (cabeçalho, rodapé, cards...)
   4. Renderizadores de blocos [data-render]
   5. Placeholders de imagem [data-image]
   6. Animações de entrada [data-reveal]
   7. Validador de formulários reutilizável
   ========================================================================== */

(function (App) {
  "use strict";

  /* 1. ÍCONES ============================================================== */
  const ICONS = {
    dumbbell:
      '<rect x="5" y="6" width="3" height="12" rx="1"/><rect x="16" y="6" width="3" height="12" rx="1"/><path d="M2.5 9.5v5M21.5 9.5v5M8 12h8"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20.5c1.5-3.6 4.5-5.5 8-5.5s6.5 1.9 8 5.5"/>',
    users:
      '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 19.5c1.2-3 3.6-4.5 6.5-4.5s5.3 1.5 6.5 4.5"/><path d="M16 4.8a3.5 3.5 0 0 1 0 6.4M18 15.3c1.6.6 2.8 2 3.5 4.2"/>',
    target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    award: '<circle cx="12" cy="9" r="6"/><path d="M8.5 13.8 7 21l5-2.5 5 2.5-1.5-7.2"/>',
    clipboard:
      '<rect x="5" y="4" width="14" height="17" rx="2"/><rect x="9" y="2.5" width="6" height="3" rx="1"/><path d="M9 10.5h6M9 14h6M9 17.5h3"/>',
    activity: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    settings:
      '<path d="M4 6h10M18 6h2M4 12h4M12 12h8M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="10" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.6 0l3-3a4 4 0 0 0-5.6-5.6l-1 1"/><path d="M14 10a4 4 0 0 0-5.6 0l-3 3a4 4 0 0 0 5.6 5.6l1-1"/>',
    heart:
      '<path d="M12 20s-7.5-4.6-7.5-10.2A4.3 4.3 0 0 1 12 7.3a4.3 4.3 0 0 1 7.5 2.5C19.5 15.4 12 20 12 20Z"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    pin: '<path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>',
    phone:
      '<path d="M5 4h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2 4.5 1.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4Z"/>',
    whatsapp:
      '<path d="M4 20l1.3-4.1A8.5 8.5 0 1 1 8.4 19L4 20Z"/><path d="M9 9.2c.2 2.6 2.2 4.6 4.8 4.8l1-1.3-1.6-.9-.8.6a3.3 3.3 0 0 1-1.8-1.8l.6-.8-.9-1.6-1.3 1Z"/>',
    instagram:
      '<rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.2 6.8h0"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="9.5" r="1.8"/><path d="m21 16-5-5-9 9"/>',
    shield: '<path d="M12 3 5 6v5.5c0 4.4 3 8 7 9.5 4-1.5 7-5.1 7-9.5V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>',
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="2"/><path d="M3.5 10h17M8 3v4M16 3v4"/>',
    alert: '<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h0"/>',
    checkCircle: '<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.8 2.8L16.5 9.5"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>',
  };

  /* 2. UTILITÁRIOS ========================================================= */
  const ui = {
    icon(name, extraClass = "") {
      const paths = ICONS[name] || ICONS.image;
      const cls = ["icon", name === "arrow" ? "icon--arrow" : "", extraClass].filter(Boolean).join(" ");
      return `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${paths}</svg>`;
    },

    escape(value) {
      return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    },

    /* Escapa o texto e destaca trechos "[provisórios]" como placeholders */
    text(value) {
      return ui
        .escape(value)
        .replace(/\[([^\]]+)\]/g, '<span class="ph-token" title="Conteúdo provisório">[$1]</span>');
    },

    isPlaceholder(value) {
      return /\[[^\]]+\]/.test(String(value ?? ""));
    },

    /* Monta um caminho a partir da raiz do projeto (funciona em / e /pages/) */
    url(path) {
      return `${App.root || "./"}${path}`;
    },

    externalAttrs: 'target="_blank" rel="noopener noreferrer"',

    formatPrice(value) {
      return new Intl.NumberFormat("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(value);
    },

    /* Aplica atraso escalonado às animações de entrada de uma lista */
    stagger(elements, step = 0.08) {
      elements.forEach((el, i) => el.style.setProperty("--reveal-delay", `${(i % 4) * step}s`));
    },

    /* Links de contato: só viram <a> quando o dado oficial existir */
    contactLink(type, item) {
      if (!item) return "";
      const label = ui.text(item.display);
      switch (type) {
        case "phone":
          return item.number ? `<a href="tel:${ui.escape(item.number)}">${label}</a>` : label;
        case "whatsapp":
          return item.number
            ? `<a href="https://wa.me/${ui.escape(item.number)}" ${ui.externalAttrs}>${label}</a>`
            : label;
        case "email":
          return item.address ? `<a href="mailto:${ui.escape(item.address)}">${label}</a>` : label;
        case "instagram":
          return item.url ? `<a href="${ui.escape(item.url)}" ${ui.externalAttrs}>${label}</a>` : label;
        default:
          return label;
      }
    },
  };

  /* 3. TEMPLATES =========================================================== */
  const templates = {
    brand() {
      const { brand } = App.config;
      const mark = brand.logo.enabled
        ? `<img class="brand__logo" src="${ui.url(brand.logo.src)}" alt="${ui.escape(brand.logo.alt)}" width="40" height="40">`
        : '<span class="brand__mark" aria-hidden="true"></span>';
      return `
        <a class="brand" href="${ui.url("index.html")}" aria-label="${ui.escape(brand.name)} — página inicial">
          ${mark}
          <span class="brand__text">
            <span class="brand__name">${ui.escape(brand.name)}</span>
            <span class="brand__tag">${ui.escape(brand.tagline)}</span>
          </span>
        </a>`;
    },

    current(id) {
      return id === App.page ? ' aria-current="page"' : "";
    },

    header() {
      const { navigation, headerCta } = App.config;
      const items = navigation
        .map(
          (item) =>
            `<li><a class="nav__link" href="${ui.url(item.href)}"${templates.current(item.id)}>${ui.escape(item.label)}</a></li>`
        )
        .join("");

      return `
        <div class="container header__inner">
          ${templates.brand()}
          <nav class="nav" aria-label="Navegação principal">
            <ul class="nav__list" role="list">${items}</ul>
          </nav>
          <div class="header__actions">
            <a class="btn btn--primary btn--sm header__cta" href="${ui.url(headerCta.href)}">${ui.escape(headerCta.label)}</a>
            <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="mobile-menu" aria-label="Abrir menu">
              <span class="menu-toggle__line"></span>
              <span class="menu-toggle__line"></span>
            </button>
          </div>
        </div>`;
    },

    mobileMenu(contact) {
      const { navigation, headerCta } = App.config;
      const items = navigation
        .map(
          (item, i) => `
          <li class="mobile-menu__item">
            <a class="mobile-menu__link" href="${ui.url(item.href)}"${templates.current(item.id)}>
              <span class="mobile-menu__index">${String(i + 1).padStart(2, "0")}</span>
              ${ui.escape(item.label)}
              ${ui.icon("arrow")}
            </a>
          </li>`
        )
        .join("");

      return `
        <nav class="mobile-menu" id="mobile-menu" aria-label="Menu principal (mobile)">
          <ul class="mobile-menu__list" role="list">${items}</ul>
          <div class="mobile-menu__footer">
            <a class="btn btn--primary btn--lg btn--block" href="${ui.url(headerCta.href)}">
              ${ui.escape(headerCta.label)} ${ui.icon("arrow")}
            </a>
            <div class="mobile-menu__contact">
              <span>${ui.icon("whatsapp")} ${ui.contactLink("whatsapp", contact.whatsapp)}</span>
              <span>${ui.icon("instagram")} ${ui.contactLink("instagram", contact.instagram)}</span>
            </div>
          </div>
        </nav>`;
    },

    socialLinks(contact) {
      const networks = [
        { name: "Instagram", icon: "instagram", url: contact.instagram.url },
        {
          name: "WhatsApp",
          icon: "whatsapp",
          url: contact.whatsapp.number ? `https://wa.me/${contact.whatsapp.number}` : null,
        },
      ];
      return `
        <ul class="social" role="list">
          ${networks
            .map((n) =>
              n.url
                ? `<li><a class="social__link" href="${ui.escape(n.url)}" ${ui.externalAttrs} aria-label="${n.name}">${ui.icon(n.icon)}</a></li>`
                : `<li><span class="social__link is-disabled" role="img" aria-label="${n.name} (link a definir)" title="${n.name} — link a definir">${ui.icon(n.icon)}</span></li>`
            )
            .join("")}
        </ul>`;
    },

    hoursList(hours) {
      return `
        <ul class="hours" role="list">
          ${hours
            .map(
              (h) => `
            <li class="hours__row">
              <span class="hours__days">${ui.text(h.days)}</span>
              <span class="hours__time">${ui.text(h.time)}</span>
            </li>`
            )
            .join("")}
        </ul>`;
    },

    footer(contact, hours) {
      const { brand, navigation } = App.config;
      const year = new Date().getFullYear();
      const links = navigation
        .map(
          (item) =>
            `<li><a href="${ui.url(item.href)}"${templates.current(item.id)}>${ui.escape(item.label)}</a></li>`
        )
        .join("");

      return `
        <div class="container">
          <div class="footer__top">
            <div class="footer__about">
              ${templates.brand()}
              <p>${ui.escape(brand.description)}</p>
              ${templates.socialLinks(contact)}
            </div>

            <nav aria-label="Links do rodapé">
              <h2 class="footer__title">Navegação</h2>
              <ul class="footer__links" role="list">${links}</ul>
            </nav>

            <div>
              <h2 class="footer__title">Horários</h2>
              ${templates.hoursList(hours)}
            </div>

            <div>
              <h2 class="footer__title">Contato</h2>
              <ul class="footer__contact" role="list">
                <li>${ui.icon("pin")}<span>${ui.text(contact.address.line1)}<br>${ui.text(contact.address.line2)}</span></li>
                <li>${ui.icon("phone")}<span>${ui.contactLink("phone", contact.phone)}</span></li>
                <li>${ui.icon("whatsapp")}<span>${ui.contactLink("whatsapp", contact.whatsapp)}</span></li>
                <li>${ui.icon("mail")}<span>${ui.contactLink("email", contact.email)}</span></li>
              </ul>
            </div>
          </div>

          <div class="footer__bottom">
            <p>© ${year} ${ui.escape(brand.name)}. Todos os direitos reservados.</p>
            <button class="back-to-top" type="button" data-action="back-to-top">
              Voltar ao topo ${ui.icon("arrow")}
            </button>
          </div>
        </div>`;
    },

    featureCard(item, index) {
      return `
        <article class="card card--hover feature-card" data-reveal>
          <span class="card__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <span class="icon-circle">${ui.icon(item.icon)}</span>
          <h3 class="card__title">${ui.escape(item.title)}</h3>
          <p class="card__text">${ui.text(item.text)}</p>
        </article>`;
    },

    serviceTeaser(service, index) {
      return `
        <article class="card card--hover" data-reveal>
          <span class="card__index" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span>
          <span class="icon-circle icon-circle--lg">${ui.icon(service.icon)}</span>
          <h3 class="card__title">${ui.escape(service.title)}</h3>
          <p class="card__text">${ui.text(service.summary)}</p>
          <div class="card__footer">
            <a class="link-arrow" href="${ui.url(`pages/servicos.html#${service.id}`)}">
              Saiba mais<span class="visually-hidden"> sobre ${ui.escape(service.title)}</span> ${ui.icon("arrow")}
            </a>
          </div>
        </article>`;
    },

    serviceCard(service) {
      const placeholder = Boolean(service.placeholder);
      const benefits = service.benefits.length
        ? `
          <div class="service-card__benefits">
            <h4 class="visually-hidden">Benefícios principais</h4>
            <ul class="check-list" role="list">
              ${service.benefits.map((b) => `<li>${ui.icon("check")}<span>${ui.text(b)}</span></li>`).join("")}
            </ul>
          </div>`
        : "";

      const actions = placeholder
        ? '<p class="service-card__actions"><span class="badge">Em breve</span></p>'
        : `
          <div class="btn-group service-card__actions">
            <a class="btn btn--primary" href="${ui.url(`pages/contato.html?assunto=servicos&servico=${service.id}`)}">
              Fale conosco ${ui.icon("arrow")}
            </a>
            <a class="btn btn--ghost" href="${ui.url("pages/planos.html")}">Ver planos</a>
          </div>`;

      return `
        <article class="card service-card${placeholder ? " service-card--placeholder" : " card--hover"}" id="${ui.escape(service.id)}" data-reveal>
          <span class="icon-circle icon-circle--lg">${ui.icon(service.icon)}</span>
          <div class="service-card__body">
            <h3 class="card__title">${ui.escape(service.title)}</h3>
            <p>${ui.text(service.description)}</p>
            ${benefits}
            ${actions}
          </div>
        </article>`;
    },

    planCard(plan) {
      const hasPrice = typeof plan.price === "number";
      const price = hasPrice
        ? `<span class="price__value">${ui.formatPrice(plan.price)}</span>`
        : '<span class="price__value price__value--placeholder" aria-label="Valor a definir">--,--</span>';

      return `
        <article class="card plan-card${plan.recommended ? " is-recommended" : ""}" aria-labelledby="plano-${plan.id}" data-reveal>
          ${plan.recommended && plan.badge ? `<span class="badge badge--accent plan-card__badge">${ui.escape(plan.badge)}</span>` : ""}
          <header class="plan-card__header">
            <p class="plan-card__modality">${ui.escape(plan.modality)}</p>
            <h3 class="plan-card__name" id="plano-${plan.id}">${ui.escape(plan.name)}</h3>
            <p class="plan-card__desc">${ui.text(plan.description)}</p>
          </header>
          <div class="plan-card__price">
            <p class="price">
              <span class="price__currency">R$</span>
              ${price}
              <span class="price__period">/${ui.escape(plan.period)}</span>
            </p>
            ${plan.priceNote ? `<span class="price__note">${ui.text(plan.priceNote)}</span>` : ""}
          </div>
          <ul class="check-list" role="list" aria-label="Benefícios do plano ${ui.escape(plan.name)}">
            ${plan.features.map((f) => `<li>${ui.icon("check")}<span>${ui.text(f)}</span></li>`).join("")}
          </ul>
          <a class="btn ${plan.recommended ? "btn--primary" : "btn--ghost"} btn--block plan-card__cta"
             href="${ui.url(`pages/contato.html?assunto=planos&plano=${plan.id}`)}">
            Tenho interesse<span class="visually-hidden"> no plano ${ui.escape(plan.name)}</span>
          </a>
        </article>`;
    },

    faqItem(item, index) {
      return `
        <details class="faq__item" data-reveal${index === 0 ? " open" : ""}>
          <summary class="faq__question">
            <span>${ui.escape(item.question)}</span>
            <span class="faq__toggle" aria-hidden="true"></span>
          </summary>
          <div class="faq__answer"><p>${ui.text(item.answer)}</p></div>
        </details>`;
    },

    spaceCard(space) {
      return `
        <article class="space-card" data-reveal>
          <div class="media media--landscape" data-image="${ui.escape(space.image)}"></div>
          <div class="space-card__body">
            <h3>${ui.escape(space.title)}</h3>
            <p>${ui.text(space.text)}</p>
          </div>
        </article>`;
    },

    featureRow(item, index) {
      return `
        <div class="feature-row" data-reveal>
          <span class="feature-row__index">${String(index + 1).padStart(2, "0")}</span>
          <h3>${ui.escape(item.title)}</h3>
          <p>${ui.text(item.text)}</p>
        </div>`;
    },

    infoCard({ icon, label, value, meta = "" }) {
      return `
        <div class="info-card" data-reveal>
          <span class="icon-circle">${ui.icon(icon)}</span>
          <div>
            <span class="info-card__label">${ui.escape(label)}</span>
            <span class="info-card__value">${value}</span>
            ${meta ? `<span class="info-card__meta">${meta}</span>` : ""}
          </div>
        </div>`;
    },
  };

  /* 4. RENDERIZADORES ======================================================
     Cada elemento <... data-render="nome"> recebe o HTML gerado abaixo.
     ======================================================================== */
  const renderers = {
    async differentials(el) {
      const items = await App.DataService.getDifferentials();
      el.innerHTML = items.map(templates.featureCard).join("");
    },

    async "services-featured"(el) {
      const items = await App.DataService.getServices({ featuredOnly: true });
      el.innerHTML = items.map(templates.serviceTeaser).join("");
    },

    async services(el) {
      const items = await App.DataService.getServices();
      el.innerHTML = items.map(templates.serviceCard).join("");
    },

    async plans(el) {
      const items = await App.DataService.getPlans();
      el.innerHTML = items.map(templates.planCard).join("");
    },

    async faq(el) {
      const items = await App.DataService.getFaq();
      el.innerHTML = items.map(templates.faqItem).join("");
    },

    async equipment(el) {
      const { equipment } = await App.DataService.getStructure();
      el.innerHTML = equipment.map(templates.featureCard).join("");
    },

    async spaces(el) {
      const { spaces } = await App.DataService.getStructure();
      el.innerHTML = spaces.map(templates.spaceCard).join("");
    },

    async facilities(el) {
      const { facilities } = await App.DataService.getStructure();
      el.innerHTML = facilities.map(templates.spaceCard).join("");
    },

    async "structure-highlights"(el) {
      const { highlights } = await App.DataService.getStructure();
      el.innerHTML = highlights.map(templates.featureRow).join("");
    },

    async "contact-info"(el) {
      const c = await App.DataService.getContact();
      const directions = c.address.mapsUrl
        ? `<a class="link-arrow" href="${ui.escape(c.address.mapsUrl)}" ${ui.externalAttrs}>Como chegar ${ui.icon("arrow")}</a>`
        : "";
      el.innerHTML = [
        templates.infoCard({
          icon: "pin",
          label: "Endereço",
          value: `${ui.text(c.address.line1)}<br>${ui.text(c.address.line2)}`,
          meta: directions,
        }),
        templates.infoCard({ icon: "phone", label: "Telefone", value: ui.contactLink("phone", c.phone) }),
        templates.infoCard({ icon: "whatsapp", label: "WhatsApp", value: ui.contactLink("whatsapp", c.whatsapp) }),
        templates.infoCard({ icon: "mail", label: "E-mail", value: ui.contactLink("email", c.email) }),
        templates.infoCard({ icon: "instagram", label: "Instagram", value: ui.contactLink("instagram", c.instagram) }),
      ].join("");
    },

    async hours(el) {
      const hours = await App.DataService.getHours();
      el.innerHTML = templates.hoursList(hours);
    },

    async map(el) {
      const { embedUrl } = App.config.map;
      const { address } = await App.DataService.getContact();
      el.innerHTML = embedUrl
        ? `<iframe src="${ui.escape(embedUrl)}" title="Mapa com a localização da academia" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`
        : `
          <div class="map__placeholder">
            <span class="map__pin">${ui.icon("pin")}</span>
            <h3>Mapa da localização</h3>
            <p>${ui.text(address.line1)} · ${ui.text(address.line2)}</p>
            <p>O mapa interativo será incorporado assim que o endereço oficial for definido.</p>
          </div>`;
    },

    async "contact-subjects"(el) {
      const options = App.config.contactForm.subjects
        .map((s) => `<option value="${ui.escape(s.value)}">${ui.escape(s.label)}</option>`)
        .join("");
      el.insertAdjacentHTML("beforeend", options);
    },
  };

  /* 5. PLACEHOLDERS DE IMAGEM ============================================== */
  function hydrateMedia(scope = document) {
    scope.querySelectorAll(".media[data-image]").forEach((el) => {
      if (el.dataset.hydrated) return;
      const entry = App.config.images[el.dataset.image] || {};
      const eager = el.hasAttribute("data-eager");

      if (entry.src) {
        el.innerHTML = `<img src="${ui.url(entry.src)}" alt="${ui.escape(entry.alt || "")}" loading="${eager ? "eager" : "lazy"}" decoding="async">`;
      } else {
        const label = entry.label || "Imagem";
        el.innerHTML = `
          <span class="media__tag" aria-hidden="true">Imagem</span>
          <span class="media__placeholder" role="img" aria-label="Espaço reservado para imagem: ${ui.escape(label)}">
            ${ui.icon("image")}
            <span class="media__label">${ui.escape(label)}</span>
          </span>`;
      }
      el.dataset.hydrated = "true";
    });
  }

  /* Ícones declarados no HTML: <span data-icon="arrow"></span> */
  function hydrateIcons(scope = document) {
    scope.querySelectorAll("span[data-icon]").forEach((slot) => {
      slot.outerHTML = ui.icon(slot.dataset.icon);
    });
  }

  /* 6. ANIMAÇÕES DE ENTRADA ================================================ */
  function initReveal() {
    const elements = document.querySelectorAll("[data-reveal]:not(.is-visible)");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    /* Escalona cards que estão dentro do mesmo grid */
    document.querySelectorAll("[data-render]").forEach((group) => {
      ui.stagger(Array.from(group.querySelectorAll(":scope > [data-reveal]")));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: App.config.ui.revealThreshold, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));
  }

  /* 7. VALIDADOR DE FORMULÁRIOS ============================================
     Uso:
       new App.FormValidator(form, {
         nome: { required: true, minLength: 3, messages: {...} },
         ...
       }, { onSubmit: async (data) => {...} });
     Cada campo precisa de: <div class="field"> … <input name="x"
     aria-describedby="x-erro"> … <p class="field__error" id="x-erro"></p>
     ======================================================================== */
  const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phone: /^\d{10,11}$/,
  };

  const DEFAULT_MESSAGES = {
    required: "Este campo é obrigatório.",
    minLength: (n) => `Digite pelo menos ${n} caracteres.`,
    maxLength: (n) => `Use no máximo ${n} caracteres.`,
    email: "Informe um e-mail válido (ex.: nome@dominio.com).",
    phone: "Informe um telefone válido com DDD.",
  };

  class FormValidator {
    constructor(form, rules, { onSubmit } = {}) {
      this.form = form;
      this.rules = rules;
      this.onSubmit = onSubmit;
      this.touched = new Set();
      this.form.setAttribute("novalidate", "");
      this.bind();
    }

    bind() {
      Object.keys(this.rules).forEach((name) => {
        const field = this.form.elements[name];
        if (!field) return;
        field.addEventListener("blur", () => {
          this.touched.add(name);
          this.validateField(name);
        });
        field.addEventListener("input", () => {
          if (this.touched.has(name)) this.validateField(name);
        });
        field.addEventListener("change", () => {
          if (this.touched.has(name)) this.validateField(name);
        });
      });

      this.form.addEventListener("submit", (event) => {
        event.preventDefault();
        this.handleSubmit();
      });
    }

    getValue(name) {
      const field = this.form.elements[name];
      const value = (field.value || "").trim();
      return this.rules[name].type === "phone" ? value.replace(/\D/g, "") : value;
    }

    check(name) {
      const rule = this.rules[name];
      const value = this.getValue(name);
      const msg = { ...DEFAULT_MESSAGES, ...(rule.messages || {}) };

      if (rule.required && !value) return msg.required;
      if (!value) return "";
      if (rule.type && PATTERNS[rule.type] && !PATTERNS[rule.type].test(value)) return msg[rule.type];
      if (rule.minLength && value.length < rule.minLength)
        return typeof msg.minLength === "function" ? msg.minLength(rule.minLength) : msg.minLength;
      if (rule.maxLength && value.length > rule.maxLength)
        return typeof msg.maxLength === "function" ? msg.maxLength(rule.maxLength) : msg.maxLength;
      return "";
    }

    validateField(name) {
      const field = this.form.elements[name];
      const wrapper = field.closest(".field");
      const errorEl = wrapper && wrapper.querySelector(".field__error");
      const error = this.check(name);
      const hasValue = Boolean(this.getValue(name));

      field.setAttribute("aria-invalid", error ? "true" : "false");
      if (wrapper) {
        wrapper.classList.toggle("is-invalid", Boolean(error));
        wrapper.classList.toggle("is-valid", !error && hasValue);
      }
      if (errorEl) errorEl.innerHTML = error ? `${ui.icon("alert")}<span>${ui.escape(error)}</span>` : "";
      return !error;
    }

    validateAll() {
      const invalid = Object.keys(this.rules).filter((name) => {
        this.touched.add(name);
        return !this.validateField(name);
      });
      return invalid;
    }

    data() {
      return Object.fromEntries(Object.keys(this.rules).map((name) => [name, this.getValue(name)]));
    }

    reset() {
      this.form.reset();
      this.touched.clear();
      this.form.querySelectorAll(".field").forEach((f) => f.classList.remove("is-invalid", "is-valid"));
      this.form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
      this.form.querySelectorAll(".field__error").forEach((e) => (e.innerHTML = ""));
    }

    async handleSubmit() {
      const invalid = this.validateAll();
      if (invalid.length) {
        this.form.elements[invalid[0]].focus();
        if (this.onInvalid) this.onInvalid(invalid);
        return;
      }
      if (this.onSubmit) await this.onSubmit(this.data(), this);
    }
  }

  /* Máscara de telefone brasileiro: (00) 00000-0000 */
  ui.maskPhone = function (input) {
    input.addEventListener("input", () => {
      const d = input.value.replace(/\D/g, "").slice(0, 11);
      let out = d;
      if (d.length > 0) out = `(${d.slice(0, 2)}`;
      if (d.length >= 3) out += `) ${d.length === 11 ? d.slice(2, 7) : d.slice(2, 6)}`;
      if (d.length >= 7) out += `-${d.length === 11 ? d.slice(7) : d.slice(6)}`;
      input.value = out;
    });
  };

  /* API PÚBLICA ============================================================ */
  async function renderLayout() {
    const [contact, hours] = await Promise.all([App.DataService.getContact(), App.DataService.getHours()]);

    const header = document.querySelector('[data-component="header"]');
    if (header) {
      header.innerHTML = templates.header();
      header.insertAdjacentHTML("beforebegin", '<a class="skip-link" href="#conteudo">Pular para o conteúdo</a>');
      /* O menu mobile fica fora do <header> para não ser afetado pelo
         backdrop-filter (que cria um novo contexto para position: fixed). */
      header.insertAdjacentHTML("afterend", templates.mobileMenu(contact));
    }

    const footer = document.querySelector('[data-component="footer"]');
    if (footer) footer.innerHTML = templates.footer(contact, hours);
  }

  async function renderBlocks(scope = document) {
    const blocks = Array.from(scope.querySelectorAll("[data-render]"));
    await Promise.all(
      blocks.map(async (el) => {
        const renderer = renderers[el.dataset.render];
        if (!renderer) return console.warn(`[App] Renderizador não encontrado: ${el.dataset.render}`);
        try {
          await renderer(el);
        } catch (error) {
          console.error(`[App] Falha ao renderizar "${el.dataset.render}"`, error);
        }
      })
    );
  }

  App.ui = ui;
  App.templates = templates;
  App.FormValidator = FormValidator;
  App.components = { renderLayout, renderBlocks, hydrateMedia, hydrateIcons, initReveal };
})(window.App);
