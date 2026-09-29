# Instituto Raiz Comunitária

Site institucional de uma ONG fictícia. É uma SPA (Single Page Application) feita em HTML, CSS e JavaScript puro, sem frameworks.

## Como executar

O site usa fetch para carregar as páginas, então precisa rodar em um servidor local (não funciona abrindo o arquivo direto). Exemplo:

```bash
python -m http.server 8080
```

Depois acesse http://localhost:8080

## Estrutura de pastas

```
index.html          - base da SPA (header, footer, #app)
html/                - fragmentos de cada pagina
css/style.css        - estilos
js/main.js           - ponto de entrada
js/modules/          - cada arquivo cuida de uma parte:
  router.js          - motor de rotas
  routes.js          - lista de rotas
  menu.js            - menu mobile
  data.js            - dados fixos (frentes, campanhas)
  templates.js       - gera HTML a partir dos dados
  projetos.js        - controla a pagina Projetos
  cadastro.js        - controla a pagina Cadastro
  mascaras.js         - formata CPF, telefone e CEP
  validacao.js        - valida o formulario
  storage.js           - salva cadastros no localStorage
  toast.js             - mensagem de sucesso na tela
```

## Funcionalidades

- Navegação sem reload de página, por hash (#inicio, #projetos, #cadastro)
- Cards de Projetos gerados por JavaScript a partir de uma lista de dados
- Formulário com máscara, validação em tempo real e ao enviar
- Cadastros salvos no navegador (localStorage), aparecem de novo se a página for recarregada
- Uso da biblioteca Day.js para formatar datas

## Organização das branches (GitFlow)

- main: versão estável do projeto
- develop: onde as novidades são juntadas antes de ir para o main
- feature/nome-da-funcionalidade: uma branch para cada funcionalidade nova

Fluxo: crio uma branch feature a partir da develop, termino o que precisa, junto de volta na develop, e depois junto a develop no main.
