/* ==========================================================================
   NAVIGATION.JS — Cabeçalho, menu responsivo e navegação
   --------------------------------------------------------------------------
   • Estado do cabeçalho ao rolar a página
   • Menu mobile: abrir/fechar, Esc, clique em link, foco e conteúdo inerte
   • Botão "voltar ao topo"
   O destaque da página atual (aria-current) é aplicado na renderização.
   ========================================================================== */

(function (App) {
  "use strict";

  const DESKTOP_QUERY = window.matchMedia("(min-width: 1081px)");
  const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const Navigation = {
    init() {
      this.header = document.querySelector(".site-header");
      this.toggle = document.querySelector(".menu-toggle");
      this.menu = document.getElementById("mobile-menu");
      this.background = document.querySelectorAll("main, .site-footer");

      this.initHeaderState();
      this.initMobileMenu();
      this.initBackToTop();
    },

    /* Cabeçalho ganha fundo/borda após rolar alguns pixels */
    initHeaderState() {
      if (!this.header) return;
      const offset = App.config.ui.headerScrollOffset;
      let ticking = false;

      const update = () => {
        this.header.classList.toggle("is-scrolled", window.scrollY > offset);
        ticking = false;
      };

      window.addEventListener(
        "scroll",
        () => {
          if (!ticking) {
            window.requestAnimationFrame(update);
            ticking = true;
          }
        },
        { passive: true }
      );
      update();
    },

    initMobileMenu() {
      if (!this.toggle || !this.menu) return;

      this.toggle.addEventListener("click", () => (this.isOpen() ? this.close() : this.open()));

      /* Fecha ao escolher um link */
      this.menu.addEventListener("click", (event) => {
        if (event.target.closest("a")) this.close({ restoreFocus: false });
      });

      /* Esc fecha; Tab fica preso entre o botão e o menu */
      document.addEventListener("keydown", (event) => {
        if (!this.isOpen()) return;
        if (event.key === "Escape") this.close();
        if (event.key === "Tab") this.trapFocus(event);
      });

      /* Ao voltar para o layout desktop, garante o menu fechado */
      DESKTOP_QUERY.addEventListener("change", (event) => {
        if (event.matches && this.isOpen()) this.close({ restoreFocus: false });
      });
    },

    isOpen() {
      return this.toggle.getAttribute("aria-expanded") === "true";
    },

    open() {
      this.toggle.setAttribute("aria-expanded", "true");
      this.toggle.setAttribute("aria-label", "Fechar menu");
      this.menu.classList.add("is-open");
      document.body.classList.add("menu-open");
      this.header.classList.add("is-scrolled");
      this.background.forEach((el) => el.setAttribute("inert", ""));

      const firstLink = this.menu.querySelector("a");
      if (firstLink) window.setTimeout(() => firstLink.focus({ preventScroll: true }), 50);
    },

    close({ restoreFocus = true } = {}) {
      this.toggle.setAttribute("aria-expanded", "false");
      this.toggle.setAttribute("aria-label", "Abrir menu");
      this.menu.classList.remove("is-open");
      document.body.classList.remove("menu-open");
      this.header.classList.toggle("is-scrolled", window.scrollY > App.config.ui.headerScrollOffset);
      this.background.forEach((el) => el.removeAttribute("inert"));
      if (restoreFocus) this.toggle.focus();
    },

    trapFocus(event) {
      const focusables = [this.toggle, ...this.menu.querySelectorAll("a[href], button")];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },

    initBackToTop() {
      document.querySelectorAll('[data-action="back-to-top"]').forEach((button) => {
        button.addEventListener("click", () => {
          window.scrollTo({ top: 0, behavior: reduceMotion() ? "auto" : "smooth" });
          const target = document.getElementById("conteudo");
          if (target) target.focus({ preventScroll: true });
        });
      });
    },
  };

  App.Navigation = Navigation;
})(window.App);
