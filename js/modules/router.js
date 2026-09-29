import { routes } from './routes.js';

const appContainer = document.getElementById('app');

// Identifica a navegação mais recente: se o usuário trocar de rota antes de uma
// fetch anterior terminar, a resposta desatualizada é descartada ao chegar
// (evita que uma rota antiga sobrescreva a rota atual por chegar fora de ordem).
let ultimaNavegacaoId = 0;

async function renderRoute() {
  const hash = window.location.hash || '#inicio';
  const route = routes[hash] || routes['#inicio'];
  const navegacaoAtualId = ++ultimaNavegacaoId;

  try {
    const response = await fetch(route.file);
    if (navegacaoAtualId !== ultimaNavegacaoId) return;
    if (!response.ok) throw new Error(`Não foi possível carregar ${route.file}`);
    const html = await response.text();
    if (navegacaoAtualId !== ultimaNavegacaoId) return;

    appContainer.innerHTML = html;
    document.title = `Instituto Raiz Comunitária | ${route.title}`;
    updateActiveLink(hash);
    if (route.init) route.init();
    window.scrollTo(0, 0);
  } catch (error) {
    if (navegacaoAtualId !== ultimaNavegacaoId) return;
    appContainer.innerHTML = '<p>Não foi possível carregar esta página. Tente novamente.</p>';
    console.error(error);
  }
}

function updateActiveLink(hash) {
  document.querySelectorAll('.nav-list a').forEach((link) => {
    if (link.getAttribute('href') === hash) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

export function initRouter() {
  window.addEventListener('hashchange', renderRoute);
  window.addEventListener('DOMContentLoaded', renderRoute);
}