# Estrutura técnica do projeto

Documento de referência para os desenvolvedores. Explica como o frontend está organizado,
como os arquivos se relacionam e como estender o projeto sem duplicar código.

## 1. Visão geral da arquitetura

```
HTML da página  ──►  css/style.css  (tokens + base)
(conteúdo fixo,      css/components.css (componentes)
 marcações de        css/responsive.css (media queries)
 componentes)
       │
       └──► js/config.js      configuração (marca, navegação, imagens, formulário)
            js/data.js        conteúdo + DataService / FormService
            js/components.js  ícones, templates, renderizadores, validador
            js/navigation.js  header, menu mobile, voltar ao topo
            js/script.js      inicialização (ordem abaixo)
```

### Ordem de inicialização (`script.js`)

1. Lê `data-root` e `data-page` do `<body>`.
2. `renderLayout()` — injeta cabeçalho, menu mobile e rodapé (uma única fonte para as 6 páginas).
3. `Navigation.init()` — estado do header, menu mobile, voltar ao topo.
4. `renderBlocks()` — preenche todos os elementos `[data-render]` com dados do `DataService`.
5. `hydrateMedia()` — troca `[data-image]` por foto (se houver `src`) ou placeholder.
6. `hydrateIcons()` — troca `<span data-icon="nome">` pelo SVG correspondente.
7. `initReveal()` — animações de entrada com `IntersectionObserver`.
8. Inicialização específica da página (ex.: formulário em `pages.contato`).

### Por que scripts clássicos e não módulos ES?

Módulos ES são bloqueados pelo navegador quando o HTML é aberto via `file://`.
Com scripts clássicos + `defer` e o namespace global `window.App`, o site funciona
localmente sem servidor e também no GitHub Pages.

## 2. Convenções de marcação

| Atributo / classe                 | Função |
|-----------------------------------|--------|
| `<body data-page="sobre">`        | Identifica a página (destaque no menu e init específico) |
| `<body data-root="../">`          | Prefixo dos caminhos (`./` na raiz, `../` em `pages/`) |
| `data-component="header/footer"`  | Ponto de montagem dos componentes compartilhados |
| `data-render="nome"`              | Bloco preenchido por um renderizador de `components.js` |
| `data-image="chave"`              | Imagem registrada em `config.images` |
| `data-icon="nome"`                | Ícone SVG da biblioteca em `components.js` |
| `data-reveal`                     | Elemento com animação de entrada |
| `.ph-token`                       | Destaque visual de conteúdo provisório |

### Renderizadores disponíveis

`differentials`, `services-featured`, `services`, `plans`, `faq`, `equipment`, `spaces`,
`facilities`, `structure-highlights`, `contact-info`, `hours`, `map`, `contact-subjects`.

Para criar um novo: adicione a função em `renderers` (components.js), o template em `templates`
e, se necessário, o método no `DataService`.

### Ícones disponíveis

`dumbbell, user, users, target, award, clipboard, activity, plus, settings, link, heart, check,
arrow, pin, phone, whatsapp, instagram, mail, clock, image, shield, calendar, alert, checkCircle,
layers, eye`.

## 3. CSS

- **Tokens** (`:root` em `style.css`): cores, tipografia fluida (`clamp`), espaçamentos, raios, sombras,
  durações. Nenhum valor de cor deve ser escrito fora dos tokens.
- **Nomenclatura**: inspirada em BEM (`bloco__elemento--modificador`).
- **Layout**: `.container`, `.section`, `.section--surface`, `.split`, `.grid--2/3/4`, `.bento`.
- **Breakpoints** (`responsive.css`): 1200px (notebook), 1080px (menu hamburger), 860px (tablet retrato),
  600px (smartphone), 360px (telas estreitas).
- **Adaptações mobile**: botões principais em largura total, diferenciais compactos, etapas da metodologia
  em linha do tempo vertical, plano recomendado em primeiro, rodapé reorganizado.

## 4. Imagens

```
images/
├── logo.png          Logo provisória (substituir pela oficial)
├── favicon.png       Favicon provisório
├── placeholders/     Reservada para imagens temporárias, se necessárias
└── icons/            Reservada para ícones em arquivo (os atuais são SVG inline)
```

Fotos definitivas: sugerimos subpastas por página (`images/home/`, `images/sobre/`, `images/estrutura/`...)
e o registro do caminho em `config.images`. Os arquivos `.gitkeep` existem apenas para o Git versionar
as pastas vazias e podem ser removidos quando houver arquivos nelas.

## 5. Dados e integração futura

`js/data.js` concentra todo o conteúdo comercial. Os componentes **nunca** leem os dados diretamente:
usam `App.DataService.*()`, que retorna Promises. Exemplo de migração para o Supabase:

```js
// Hoje
getPlans: () => resolve(content.plans),

// Futuro
getPlans: async () => {
  const { data, error } = await supabase.from("plans").select("*").order("position");
  if (error) throw error;
  return data;
},
```

O mesmo vale para `App.FormService.submitContact(payload)`, que deve passar a inserir em
`contact_messages`. O payload enviado pelo formulário é:

```json
{ "nome": "", "email": "", "telefone": "11987654321", "assunto": "planos", "mensagem": "" }
```

## 6. Checklist ao criar uma nova página

1. Copiar o `<head>` de uma página interna (caminhos com `../`).
2. Definir `data-page` e `data-root="../"` no `<body>`.
3. Manter `<header data-component="header">`, `<main id="conteudo" tabindex="-1">` e `<footer data-component="footer">`.
4. Adicionar o item em `config.navigation`.
5. Reaproveitar componentes existentes antes de criar novos estilos.
