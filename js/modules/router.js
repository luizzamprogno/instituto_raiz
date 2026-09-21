const routes = {
  '#inicio':   { file: 'html/inicio.html',   title: 'Início' },
  '#projetos': { file: 'html/projetos.html', title: 'Projetos' },
  '#cadastro': { file: 'html/cadastro.html', title: 'Cadastro' },
};

const appContainer = document.getElementById('app');

async function renderRoute() {
  const hash = window.location.hash || '#inicio';
  const route = routes[hash] || routes['#inicio'];

  try {
    const response = await fetch(route.file);
    if (!response.ok) throw new Error(`Não foi possível carregar ${route.file}`);
    const html = await response.text();

    appContainer.innerHTML = html;
    document.title = `Instituto Raiz Comunitária | ${route.title}`;
    updateActiveLink(hash);
    window.scrollTo(0, 0);
  } catch (error) {
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