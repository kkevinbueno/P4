# Site institucional — Academia

Frontend do site institucional de uma academia de musculação e treinamento personalizado.
Identidade **dark mode premium**, minimalista e esportiva, com destaques em laranja.

> **Etapa atual:** somente frontend (HTML5, CSS3 e JavaScript puro).
> Não há backend, banco de dados, autenticação, pagamentos nem envio real de formulários.
> A estrutura já está preparada para a integração futura com **Supabase**.

---

## Páginas

| Página     | Arquivo                 | Conteúdo principal |
|------------|-------------------------|--------------------|
| Home       | `index.html`            | Hero, apresentação, diferenciais, serviços em destaque, CTA |
| Sobre nós  | `pages/sobre.html`      | Apresentação, história (linha do tempo), missão/visão/valores, filosofia, metodologia, diferenciais |
| Serviços   | `pages/servicos.html`   | Cards de serviços com benefícios e botões, guia "como escolher" |
| Estrutura  | `pages/estrutura.html`  | Navegação por âncoras, musculação, equipamentos, espaços (grid), instalações, diferenciais |
| Planos     | `pages/planos.html`     | Cards de planos (recomendado em destaque), aviso de valores provisórios, FAQ |
| Contato    | `pages/contato.html`    | Canais de contato, horários, formulário com validação, mapa (placeholder) |

## Como rodar localmente

Não há dependências nem build. Basta abrir `index.html` no navegador.
Para simular o GitHub Pages, sirva a pasta com qualquer servidor estático, por exemplo:

```bash
cd academia
python3 -m http.server 8000
# acesse http://localhost:8000
```

## Publicação no GitHub Pages

1. Envie o conteúdo da pasta `academia/` para o repositório.
2. Em **Settings → Pages**, selecione a branch e a pasta onde está o `index.html`.
3. O arquivo `.nojekyll` garante que o GitHub Pages sirva os arquivos sem processamento Jekyll.

Todos os caminhos são relativos, então o site funciona tanto na raiz do domínio quanto em subpastas
(`usuario.github.io/repositorio/`).

## Estrutura do projeto

```
academia/
├── index.html            Página inicial
├── pages/                Cinco páginas internas
├── css/
│   ├── style.css         Variáveis (design tokens), reset, tipografia, layout, utilitários
│   ├── components.css    Componentes reutilizáveis (botões, cards, header, footer, form...)
│   └── responsive.css    Media queries (notebook, tablet, smartphone)
├── js/
│   ├── config.js         Configurações: marca, navegação, registro de imagens, formulário
│   ├── data.js           Conteúdo temporário + DataService/FormService (camada de dados)
│   ├── components.js     Ícones, templates, renderizadores, placeholders, validador
│   ├── navigation.js     Cabeçalho, menu mobile, voltar ao topo
│   └── script.js         Inicialização e comportamentos por página
├── images/               Logo, favicon, placeholders/ e icons/
└── docs/
    └── estrutura-projeto.md   Documentação técnica detalhada
```

Detalhes técnicos em [`docs/estrutura-projeto.md`](docs/estrutura-projeto.md).

## Onde editar cada coisa

| Quero alterar...                         | Arquivo |
|------------------------------------------|---------|
| Nome da academia, slogan, logo           | `js/config.js` → `brand` |
| Links do menu / botão do cabeçalho       | `js/config.js` → `navigation`, `headerCta` |
| Fotos (substituir placeholders)          | `js/config.js` → `images` |
| Mapa (Google Maps embed)                 | `js/config.js` → `map.embedUrl` |
| Endereço, telefone, WhatsApp, Instagram  | `js/data.js` → `content.contact` |
| Horários de funcionamento                | `js/data.js` → `content.hours` |
| Serviços, planos, preços, FAQ, estrutura | `js/data.js` |
| Cores, fontes, espaçamentos              | `css/style.css` → `:root` |

## Conteúdo provisório (placeholders)

Nenhuma informação institucional ou comercial foi inventada como oficial:

- Textos entre colchetes em `js/data.js` e nas páginas (ex.: `[Ano]`, `[(00) 0000-0000]`) aparecem no site
  com estilo discreto (cinza com sublinhado tracejado) e devem ser substituídos pelos dados reais.
- **Preços** estão como `null` → o card mostra `R$ --,--` e "Valor a definir".
- **Fotos** são placeholders em CSS com a identificação do conteúdo esperado.
- **Logo** usa um símbolo circular em CSS; `images/logo.png` e `images/favicon.png` são provisórios.
- Textos institucionais (missão, visão, valores, filosofia, descrições de serviços e da estrutura) são
  propostas de redação e devem ser validados pela academia.

### Substituindo uma foto

1. Salve a imagem, por exemplo, em `images/home/hero.jpg`.
2. Em `js/config.js`, na chave correspondente, preencha `src`:
   ```js
   "home-hero": { src: "images/home/hero.jpg", alt: "Ambiente principal da academia", label: "..." },
   ```

### Ativando links de contato

Os links só são criados quando o dado oficial existe. Exemplo em `js/data.js`:

```js
whatsapp: { display: "(11) 99999-9999", number: "5511999999999" },
instagram: { display: "@academia", url: "https://instagram.com/academia" },
```

## Formulário de contato

- Validação visual e em JavaScript (nome, e-mail, telefone com máscara, assunto e mensagem).
- Mensagens de erro acessíveis (`aria-invalid`, `aria-describedby`, `aria-live`).
- Pré-preenchimento pela URL: `contato.html?assunto=planos&plano=performance`.
- Após validar, exibe a mensagem de que o envio será implementado depois.
- O envio passa por `App.FormService.submitContact()` em `js/data.js`, que hoje apenas simula a resposta.

## Integração futura com Supabase

1. Preencher `App.config.api` em `js/config.js`.
2. Reescrever as funções de `App.DataService` (leitura) e `App.FormService` (envio) em `js/data.js`.
3. Nenhum componente precisa mudar: todos já consomem os dados por Promises.

Sugestão de tabelas: `services`, `plans`, `faq`, `structure_areas`, `site_settings`, `contact_messages`.

## Acessibilidade e boas práticas

- HTML5 semântico, hierarquia de títulos, `lang="pt-BR"`, link "Pular para o conteúdo".
- Página atual destacada com `aria-current="page"`.
- Menu mobile com `aria-expanded`, tecla Esc, foco preso no menu e conteúdo de fundo `inert`.
- Alvos de toque com no mínimo 44px.
- Animações discretas e desativadas com `prefers-reduced-motion`.

## Colaboração (Git)

- Commits pequenos e descritivos, por exemplo: `feat(planos): adiciona destaque ao plano recomendado`.
- Trabalhar em branches por tarefa e abrir Pull Request para revisão.
- Evitar alterar arquivos fora do escopo da tarefa.
- Registrar mudanças importantes na seção abaixo.

## Histórico de mudanças

### v0.1.0 — Frontend inicial
- Estrutura de pastas, design tokens e identidade visual dark.
- Componentes compartilhados: cabeçalho, menu mobile, rodapé, botões, cards, ícones e placeholders.
- Seis páginas completas, responsivas e com animações discretas.
- Camada de dados separada (`js/data.js`) preparada para Supabase.
- Formulário de contato com validação e envio simulado.
