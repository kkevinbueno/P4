/* ==========================================================================
   SCRIPT.JS — Inicialização e funcionalidades gerais
   --------------------------------------------------------------------------
   Ordem de carregamento (todas as páginas, com "defer"):
   config.js → data.js → components.js → navigation.js → script.js
   ========================================================================== */

(function (App) {
  "use strict";

  /* Comportamentos específicos de cada página (chave = data-page do <body>) */
  const pages = {
    contato: {
      init() {
        const form = document.getElementById("form-contato");
        if (!form) return;

        const status = document.getElementById("form-status");
        const submit = form.querySelector('[type="submit"]');
        const { messages } = App.config.contactForm;

        App.ui.maskPhone(form.elements.telefone);
        prefillFromQuery(form);

        const showStatus = (type, { title, text }) => {
          const icon = type === "success" ? "checkCircle" : "alert";
          status.className = `alert alert--${type}`;
          status.innerHTML = `${App.ui.icon(icon)}<div><strong>${App.ui.escape(title)}</strong>${App.ui.escape(text)}</div>`;
          status.hidden = false;
        };

        const validator = new App.FormValidator(
          form,
          {
            nome: {
              required: true,
              minLength: 3,
              messages: { required: "Informe o seu nome.", minLength: "Digite o seu nome completo." },
            },
            email: { required: true, type: "email", messages: { required: "Informe o seu e-mail." } },
            telefone: {
              required: true,
              type: "phone",
              messages: { required: "Informe um telefone ou WhatsApp para retorno." },
            },
            assunto: { required: true, messages: { required: "Selecione o assunto da mensagem." } },
            mensagem: {
              required: true,
              minLength: 10,
              maxLength: 1000,
              messages: { required: "Escreva a sua mensagem.", minLength: "Escreva pelo menos 10 caracteres." },
            },
          },
          {
            onSubmit: async (data, instance) => {
              submit.disabled = true;
              submit.classList.add("is-loading");
              submit.dataset.label = submit.dataset.label || submit.innerHTML;
              submit.textContent = "Validando…";

              /* Nesta etapa o FormService apenas simula o envio (sem servidor) */
              const result = await App.FormService.submitContact(data);

              submit.disabled = false;
              submit.classList.remove("is-loading");
              submit.innerHTML = submit.dataset.label;

              if (result.ok) {
                showStatus("success", messages.success);
                instance.reset();
              }
              status.focus();
            },
          }
        );

        validator.onInvalid = () => {
          showStatus("error", messages.error);
        };

        updateCounter(form);
      },
    },
  };

  /* Pré-seleciona o assunto a partir da URL (?assunto=planos&plano=performance) */
  async function prefillFromQuery(form) {
    const params = new URLSearchParams(window.location.search);
    const subject = params.get("assunto");
    const planId = params.get("plano");
    const serviceId = params.get("servico");

    if (subject && form.elements.assunto.querySelector(`option[value="${CSS.escape(subject)}"]`)) {
      form.elements.assunto.value = subject;
    }

    let message = "";
    if (planId) {
      const plan = await App.DataService.getPlanById(planId);
      if (plan) message = `Olá! Tenho interesse no plano ${plan.name} (${plan.modality}) e gostaria de mais informações.`;
    } else if (serviceId) {
      const services = await App.DataService.getServices();
      const service = services.find((s) => s.id === serviceId);
      if (service) message = `Olá! Gostaria de saber mais sobre o serviço de ${service.title}.`;
    } else if (subject === "visita") {
      message = "Olá! Gostaria de agendar uma visita para conhecer a academia.";
    }

    if (message && !form.elements.mensagem.value) {
      form.elements.mensagem.value = message;
      form.elements.mensagem.dispatchEvent(new Event("input"));
    }
  }

  /* Contador de caracteres da mensagem */
  function updateCounter(form) {
    const textarea = form.elements.mensagem;
    const counter = document.getElementById("mensagem-contador");
    if (!textarea || !counter) return;
    const max = 1000;
    const render = () => (counter.textContent = `${textarea.value.length}/${max} caracteres`);
    textarea.addEventListener("input", render);
    form.addEventListener("reset", () => window.setTimeout(render));
    render();
  }

  /* Inicialização geral */
  async function init() {
    App.root = document.body.dataset.root || "./";
    App.page = document.body.dataset.page || "";

    try {
      await App.components.renderLayout();
      App.Navigation.init();
      await App.components.renderBlocks();
      App.components.hydrateMedia();
      App.components.hydrateIcons();
      App.components.initReveal();

      const page = pages[App.page];
      if (page && typeof page.init === "function") page.init();
    } catch (error) {
      console.error("[App] Erro na inicialização", error);
    }
  }

  App.pages = pages;
  document.addEventListener("DOMContentLoaded", init);
})(window.App);
