# Instituto Raiz Comunitária

Site institucional de uma ONG fictícia, desenvolvido como Single Page
Application (SPA) em **HTML, CSS e JavaScript puro** (sem frameworks ou
bundlers), com foco em fundamentos de front-end: roteamento client-side,
componentização via templates, formulários validados, persistência local
e boas práticas de versionamento.

## Como executar localmente

Como a navegação faz `fetch` dos fragmentos HTML de cada rota, o projeto
precisa ser servido por um servidor HTTP (abrir o `index.html` direto
pelo `file://` não funciona). Qualquer servidor estático resolve, por
exemplo:

```bash
python -m http.server 8080
# ou
npx serve .
```

Depois, acesse `http://localhost:8080`.

## Estrutura do projeto

```
├── index.html              # casca da SPA (header, footer, #app)
├── html/                   # fragmentos de cada rota (carregados via fetch)
│   ├── inicio.html
│   ├── projetos.html
│   └── cadastro.html
├── css/style.css           # estilos da aplicação
└── js/
    ├── main.js             # ponto de entrada: inicializa menu e router
    └── modules/
        ├── router.js       # motor de rotas (hash + fetch), agnóstico de página
        ├── routes.js       # mapa hash → arquivo HTML + função de inicialização
        ├── menu.js         # comportamento do menu mobile
        ├── data.js         # dados estáticos (frentes de voluntariado, campanhas)
        ├── templates.js    # geração de HTML via Template Literals
        ├── projetos.js     # controller da página Projetos
        ├── cadastro.js     # controller da página Cadastro (form, eventos)
        ├── mascaras.js     # formatação de CPF/telefone/CEP
        ├── validacao.js    # regras de validação e feedback visual
        ├── storage.js      # persistência do histórico de cadastros (localStorage)
        └── toast.js        # notificação visual temporária
```

## Principais funcionalidades

- **Roteamento via hash**, sem reload de página, com fragmentos HTML
  carregados sob demanda.
- **Templates dinâmicos**: os cards de Projetos são gerados a partir de
  um array de dados, não escritos manualmente no HTML.
- **Formulário de cadastro** com máscaras de campo, validação em tempo
  real e no envio (com mensagens de erro injetadas via JS).
- **Persistência local**: os cadastros enviados ficam salvos no
  `localStorage` e são restaurados ao recarregar a página.
- **Day.js** (via CDN) para formatação e cálculo relativo de datas.

## Estratégia de versionamento (GitFlow)

O repositório segue o modelo **GitFlow**, simplificado para um projeto
individual:

- **`main`** — código estável, correspondente ao que está em produção.
- **`develop`** — branch de integração contínua das novas funcionalidades.
- **`feature/*`** — uma branch por funcionalidade, criada a partir de
  `develop` e mesclada de volta a ela ao concluir (ex.:
  `feature/documentacao-readme`).
- **`hotfix/*`** — reservado para correções urgentes aplicadas
  diretamente sobre `main`, quando necessário.

O fluxo de trabalho é: criar uma branch `feature/*` a partir de
`develop`, desenvolver e commitar ali, mesclar em `develop` ao concluir,
e periodicamente mesclar `develop` em `main` para gerar uma nova versão
estável.
