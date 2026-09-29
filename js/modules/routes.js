import { initProjetosPage } from './projetos.js';
import { initCadastroPage } from './cadastro.js';

export const routes = {
  '#inicio':   { file: 'html/inicio.html',   title: 'Início' },
  '#projetos': { file: 'html/projetos.html', title: 'Projetos', init: initProjetosPage },
  '#cadastro': { file: 'html/cadastro.html', title: 'Cadastro', init: initCadastroPage },
};
