/* ==========================================================================
   DATA.JS — Camada de dados (conteúdo temporário + serviços de acesso)
   --------------------------------------------------------------------------
   Arquivo adicional à estrutura proposta. Finalidade: separar o CONTEÚDO
   (serviços, planos, contato, horários, FAQ, estrutura) da APRESENTAÇÃO.

   • As páginas nunca leem "content" diretamente: usam App.DataService, que
     devolve Promises. Ao integrar o Supabase, basta reescrever as funções do
     DataService/FormService — os componentes continuam iguais.
   • Textos entre colchetes, como "[Ano]", são PLACEHOLDERS: aparecem no site
     com destaque visual discreto até serem substituídos pelos dados oficiais.
   • Preços são null de propósito: nenhum valor comercial foi inventado.
   ========================================================================== */

(function (App) {
  "use strict";

  const content = {
    /* CONTATO -------------------------------------------------------------- */
    contact: {
      address: {
        line1: "R. 7 de Setembro, 510",
        line2: "Parque Ortolândia — Hortolândia/SP · CEP 13184-000",
        mapsUrl: "https://maps.app.goo.gl/DuijBAA34ESSAoxH8",
      },
      phone: {
        display: "(19) 97110-3730",
        number: "+5519971103730",
      },
      whatsapp: {
        display: "(19) 97110-3730",
        number: "5519971103730",
      },
      email: {
        display: "[e-mail da academia]",
        address: null,
      },
  instagram: {
      display: "@p4academia",
      url: "https://www.instagram.com/p4academia/",
  },
},

    /* HORÁRIOS ------------------------------------------------------------- */
    hours: [
    { days: "Segunda a sexta", time: "06h às 21h" },
    { days: "Sábado e domingo", time: "Fechado" },
    { days: "Feriados", time: "Fechado" },
    ],

    /* DIFERENCIAIS (Home) -------------------------------------------------- */
    differentials: [
      {
        id: "acompanhamento",
        icon: "users",
        title: "Acompanhamento próximo",
        text: "Profissionais presentes no salão para orientar execução, carga e progressão do seu treino.",
      },
      {
        id: "metodo",
        icon: "target",
        title: "Treino com método",
        text: "Planejamento estruturado a partir do seu objetivo, com ajustes ao longo da sua evolução.",
      },
      {
        id: "estrutura",
        icon: "dumbbell",
        title: "Estrutura completa",
        text: "Equipamentos selecionados e ambientes organizados para um treino fluido e seguro.",
      },
      {
        id: "exclusividade",
        icon: "award",
        title: "Ambiente exclusivo",
        text: "Um espaço reservado, com atmosfera focada e atenção individual a cada aluno.",
      },
    ],

    /* SERVIÇOS ------------------------------------------------------------- */
    services: [
      {
        id: "musculacao",
        icon: "dumbbell",
        title: "Musculação",
        summary: "Treinos de força estruturados para ganho de massa, condicionamento e saúde.",
        description:
          "Acesso à área completa de musculação, com treinos organizados por objetivo e orientação da equipe durante a sua rotina.",
        benefits: [
          "Programas de treino organizados por objetivo",
          "Orientação de execução e carga",
          "Evolução acompanhada ao longo do tempo",
        ],
        featured: true,
      },
      {
        id: "personal-trainer",
        icon: "user",
        title: "Personal Trainer",
        summary: "Atendimento exclusivo, com um profissional dedicado em todas as sessões.",
        description:
          "Sessões individuais conduzidas por um personal trainer, com atenção total à técnica, à intensidade e ao seu ritmo.",
        benefits: [
          "Profissional dedicado durante todo o treino",
          "Correção técnica em tempo real",
          "Agenda de sessões combinada com você",
        ],
        featured: true,
      },
      {
        id: "treinamento-personalizado",
        icon: "clipboard",
        title: "Treinamento personalizado",
        summary: "Planilha construída sob medida para o seu corpo, rotina e meta.",
        description:
          "Um plano de treino exclusivo, elaborado a partir da sua avaliação, histórico e disponibilidade — e revisado periodicamente.",
        benefits: [
          "Plano exclusivo a partir da sua avaliação",
          "Periodização de acordo com a meta",
          "Revisões periódicas do programa",
        ],
        featured: true,
      },
      {
        id: "acompanhamento-individualizado",
        icon: "activity",
        title: "Acompanhamento individualizado",
        summary: "Monitoramento contínuo da sua evolução, com metas claras e reavaliações.",
        description:
          "Registro de resultados, reavaliações e conversas de alinhamento para garantir que cada fase do treino faça sentido para você.",
        benefits: [
          "Metas definidas em conjunto",
          "Reavaliações e registro de progresso",
          "Ajustes contínuos no planejamento",
        ],
        featured: false,
      },
      {
        id: "novos-servicos",
        icon: "plus",
        title: "Novos serviços",
        summary: "Espaço reservado para serviços que serão adicionados futuramente.",
        description: "[Descrição do novo serviço a ser definido pela academia.]",
        benefits: [],
        featured: false,
        placeholder: true,
      },
    ],

    /* PLANOS --------------------------------------------------------------
       price: null → exibe "Valor a definir". Ao receber os valores oficiais,
       preencha price (número) e, se necessário, priceNote.
       recommended: true destaca visualmente o plano (opcional).
       ---------------------------------------------------------------------- */
    plans: [
      {
        id: "essencial",
        name: "Essencial",
        modality: "Musculação",
        description: "Para quem quer treinar com autonomia em uma estrutura completa.",
        price: null,
        period: "mês",
        priceNote: "Valor a definir",
        features: [
          "Acesso à área de musculação",
          "Orientação da equipe no salão",
          "Treino inicial estruturado",
          "[Condições comerciais a definir]",
        ],
        recommended: false,
      },
      {
        id: "performance",
        name: "Performance",
        modality: "Musculação + acompanhamento",
        description: "Para quem busca evolução constante, com metas e reavaliações.",
        price: null,
        period: "mês",
        priceNote: "Valor a definir",
        features: [
          "Tudo do plano Essencial",
          "Treinamento personalizado",
          "Acompanhamento individualizado",
          "Reavaliações periódicas",
          "[Condições comerciais a definir]",
        ],
        recommended: true,
        badge: "Recomendado",
      },
      {
        id: "personal",
        name: "Personal",
        modality: "Personal trainer",
        description: "Para quem quer atenção exclusiva em todas as sessões.",
        price: null,
        period: "mês",
        priceNote: "Valor a definir",
        features: [
          "Sessões com personal trainer",
          "Planejamento 100% individual",
          "Correção técnica em tempo real",
          "[Frequência semanal a definir]",
        ],
        recommended: false,
      },
    ],

    /* FAQ ------------------------------------------------------------------ */
    faq: [
      {
        question: "Preciso ter experiência com musculação para começar?",
        answer:
          "Não. O treino é ajustado ao seu nível atual, e a equipe orienta a execução dos exercícios desde o primeiro dia.",
      },
      {
        question: "Como funciona o acompanhamento individualizado?",
        answer:
          "Definimos metas em conjunto, registramos a sua evolução e fazemos reavaliações para ajustar o treino sempre que necessário.",
      },
      {
        question: "Qual a diferença entre personal trainer e treinamento personalizado?",
        answer:
          "No personal trainer, um profissional acompanha todas as suas sessões. No treinamento personalizado, você recebe um plano feito sob medida e treina com a orientação da equipe no salão.",
      },
      {
        question: "Existe taxa de matrícula ou fidelidade?",
        answer: "[Resposta a ser definida pela academia — taxa de matrícula, fidelidade e condições contratuais.]",
      },
      {
        question: "Posso trocar de plano depois?",
        answer: "[Resposta a ser definida pela academia — regras para troca de plano.]",
      },
      {
        question: "Quais são as formas de pagamento?",
        answer: "[Resposta a ser definida pela academia — formas de pagamento aceitas.]",
      },
    ],

    /* ESTRUTURA ------------------------------------------------------------ */
    structure: {
      equipment: [
        {
          icon: "settings",
          title: "Máquinas guiadas",
          text: "Equipamentos de trajetória guiada para isolar grupos musculares com segurança.",
        },
        {
          icon: "dumbbell",
          title: "Pesos livres",
          text: "Halteres, barras e anilhas para treinos de força e movimentos compostos.",
        },
        {
          icon: "link",
          title: "Cabos e polias",
          text: "Estações de cabos para variações de exercícios em diferentes ângulos.",
        },
        {
          icon: "heart",
          title: "Cardio",
          text: "Equipamentos aeróbicos para aquecimento e condicionamento.",
        },
      ],
      spaces: [
        {
          image: "estrutura-pesos-livres",
          title: "Área de pesos livres",
          text: "Espaço amplo para treinos com barras, halteres e bancos.",
        },
        {
          image: "estrutura-funcional",
          title: "Espaço funcional",
          text: "Área livre para treinos funcionais, de mobilidade e condicionamento.",
        },
        {
          image: "estrutura-mobilidade",
          title: "Alongamento e mobilidade",
          text: "Ambiente reservado para aquecimento, alongamento e desaquecimento.",
        },
        {
          image: "estrutura-avaliacao",
          title: "Sala de avaliação",
          text: "Espaço reservado para avaliações e conversas de acompanhamento.",
        },
        {
          image: "estrutura-personal",
          title: "Espaço personal",
          text: "Área pensada para sessões individuais com personal trainer.",
        },
      ],
      facilities: [
        {
          image: "estrutura-recepcao",
          title: "Recepção",
          text: "Atendimento e acolhimento desde a sua chegada.",
        },
        {
          image: "estrutura-vestiarios",
          title: "Vestiários",
          text: "Ambientes organizados para o antes e o depois do treino.",
        },
        {
          image: "estrutura-convivencia",
          title: "Área de convivência",
          text: "Um espaço para hidratação e pausa entre as atividades.",
        },
      ],
      highlights: [
        {
          title: "Layout pensado para o treino",
          text: "Equipamentos distribuídos para um fluxo contínuo, sem filas e sem improvisos.",
        },
        {
          title: "Ambiente organizado",
          text: "Cada área tem a sua função, com espaço adequado para treinar com conforto.",
        },
        {
          title: "Cuidado constante",
          text: "Manutenção e higienização frequentes dos equipamentos e ambientes.",
        },
        {
          title: "Atmosfera focada",
          text: "Iluminação, som e ambientação pensados para manter você no treino.",
        },
      ],
    },
  };

  /* Cópia simples para evitar que componentes alterem o conteúdo original */
  const clone = (value) => JSON.parse(JSON.stringify(value));
  const resolve = (value) => Promise.resolve(clone(value));

  /* ------------------------------------------------------------------------
     DataService — leitura de dados.
     Futuro: substituir cada "resolve(...)" por uma consulta ao Supabase,
     ex.: supabase.from("services").select("*").order("position")
     ------------------------------------------------------------------------ */
  App.DataService = {
    getContact: () => resolve(content.contact),
    getHours: () => resolve(content.hours),
    getDifferentials: () => resolve(content.differentials),
    getServices: ({ featuredOnly = false } = {}) =>
      resolve(featuredOnly ? content.services.filter((s) => s.featured) : content.services),
    getPlans: () => resolve(content.plans),
    getPlanById: (id) => resolve(content.plans.find((p) => p.id === id) || null),
    getFaq: () => resolve(content.faq),
    getStructure: () => resolve(content.structure),
  };

  /* ------------------------------------------------------------------------
     FormService — envio de formulários.
     Nesta etapa NÃO há envio real: a função apenas simula uma resposta.
     Futuro: supabase.from("contact_messages").insert(payload)
     ------------------------------------------------------------------------ */
  App.FormService = {
    submitContact(payload) {
      return new Promise((done) => {
        window.setTimeout(() => done({ ok: true, simulated: true, payload }), 600);
      });
    },
  };
})(window.App);
