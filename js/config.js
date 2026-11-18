/* ==========================================================================
   CONFIG.JS — Configurações gerais do frontend
   --------------------------------------------------------------------------
   Tudo o que é "configuração" do site (marca, navegação, imagens, textos do
   formulário e parâmetros de integração futura) fica centralizado aqui.
   Conteúdo comercial (serviços, planos, contato, FAQ...) fica em js/data.js.

   Os scripts são carregados como scripts clássicos (com "defer"), e não como
   módulos ES, para que o site funcione também ao abrir o arquivo localmente
   (file://), além do GitHub Pages.
   ========================================================================== */

window.App = window.App || {};

App.config = {
  /* ------------------------------------------------------------------------
     MARCA — substitua pelos dados oficiais quando forem fornecidos.
     Para usar a logo em imagem, defina logo.enabled = true.
     ------------------------------------------------------------------------ */
  brand: {
    name: "Sua Academia", // PLACEHOLDER — nome oficial da academia
    tagline: "Musculação & Personal",
    description:
      "Musculação e treinamento personalizado com acompanhamento próximo, método e estrutura pensada para a sua evolução.",
    logo: {
      enabled: false, // true = usa a imagem abaixo no lugar do símbolo em CSS
      src: "images/logo.png",
      alt: "Logo da academia",
    },
  },

  /* ------------------------------------------------------------------------
     NAVEGAÇÃO — caminhos relativos à raiz do projeto.
     O prefixo correto ("./" ou "../") é aplicado automaticamente a partir do
     atributo data-root do <body> de cada página.
     ------------------------------------------------------------------------ */
  navigation: [
    { id: "home", label: "Home", href: "index.html" },
    { id: "sobre", label: "Sobre nós", href: "pages/sobre.html" },
    { id: "servicos", label: "Serviços", href: "pages/servicos.html" },
    { id: "estrutura", label: "Estrutura", href: "pages/estrutura.html" },
    { id: "planos", label: "Planos", href: "pages/planos.html" },
    { id: "contato", label: "Contato", href: "pages/contato.html" },
  ],

  headerCta: {
    label: "Agendar visita",
    href: "pages/contato.html?assunto=visita",
  },

  /* ------------------------------------------------------------------------
     REGISTRO DE IMAGENS
     Cada elemento <div class="media" data-image="CHAVE"> usa uma entrada
     abaixo. Enquanto "src" for null, é exibido um placeholder com o "label".
     Para inserir a foto real: salve o arquivo em images/ (sugestão de pasta
     indicada no comentário) e preencha "src" com o caminho relativo à raiz.
     ------------------------------------------------------------------------ */
  images: {
    // Home — sugestão: images/home/
    "home-hero": { src: null, alt: "Ambiente principal da academia", label: "Foto de destaque — Hero" },
    "home-about": { src: null, alt: "Área de treino da academia", label: "Foto institucional" },
    "home-about-detail": { src: null, alt: "Detalhe de treino", label: "Foto de detalhe" },

    // Sobre nós — sugestão: images/sobre/
    "sobre-intro": { src: null, alt: "Equipe da academia", label: "Foto da equipe" },
    "sobre-historia": { src: null, alt: "Fachada ou registro histórico da academia", label: "Foto histórica / fachada" },
    "sobre-filosofia": { src: null, alt: "Aluno treinando com acompanhamento", label: "Foto de treino acompanhado" },
    "sobre-metodologia": { src: null, alt: "Avaliação e planejamento de treino", label: "Foto de avaliação" },

    // Serviços — sugestão: images/servicos/
    "servicos-destaque": { src: null, alt: "Atendimento de personal trainer", label: "Foto de atendimento" },

    // Estrutura — sugestão: images/estrutura/
    "estrutura-musculacao": { src: null, alt: "Área de musculação", label: "Área de musculação" },
    "estrutura-musculacao-detalhe": { src: null, alt: "Equipamentos de musculação", label: "Detalhe de equipamentos" },
    "estrutura-pesos-livres": { src: null, alt: "Área de pesos livres", label: "Pesos livres" },
    "estrutura-funcional": { src: null, alt: "Espaço de treino funcional", label: "Espaço funcional" },
    "estrutura-mobilidade": { src: null, alt: "Área de alongamento e mobilidade", label: "Alongamento e mobilidade" },
    "estrutura-avaliacao": { src: null, alt: "Sala de avaliação física", label: "Sala de avaliação" },
    "estrutura-personal": { src: null, alt: "Espaço para treinos com personal", label: "Espaço personal" },
    "estrutura-recepcao": { src: null, alt: "Recepção da academia", label: "Recepção" },
    "estrutura-vestiarios": { src: null, alt: "Vestiários", label: "Vestiários" },
    "estrutura-convivencia": { src: null, alt: "Área de convivência", label: "Área de convivência" },
  },

  /* ------------------------------------------------------------------------
     MAPA — cole aqui a URL de incorporação (embed) do Google Maps quando o
     endereço oficial estiver disponível. Enquanto for null, exibe placeholder.
     ------------------------------------------------------------------------ */
  map: {
    embedUrl: null,
  },

  /* ------------------------------------------------------------------------
     FORMULÁRIO DE CONTATO
     ------------------------------------------------------------------------ */
  contactForm: {
    subjects: [
      { value: "visita", label: "Agendar uma visita" },
      { value: "planos", label: "Informações sobre planos" },
      { value: "servicos", label: "Informações sobre serviços" },
      { value: "personal", label: "Personal trainer" },
      { value: "outros", label: "Outros assuntos" },
    ],
    messages: {
      success: {
        title: "Formulário validado",
        text: "Seus dados estão corretos e o formulário está preparado. O envio real das mensagens será implementado na próxima etapa do projeto.",
      },
      error: {
        title: "Revise os campos destacados",
        text: "Alguns campos precisam de atenção antes do envio.",
      },
    },
  },

  /* ------------------------------------------------------------------------
     INTEGRAÇÃO FUTURA (Supabase)
     Nesta etapa nenhum serviço externo é chamado. Ao implementar o backend,
     preencha estes valores e troque as funções de js/data.js.
     ------------------------------------------------------------------------ */
  api: {
    provider: null, // ex.: "supabase"
    url: null,
    anonKey: null,
  },

  /* ------------------------------------------------------------------------
     INTERFACE
     ------------------------------------------------------------------------ */
  ui: {
    revealThreshold: 0.15,
    headerScrollOffset: 12,
  },
};
