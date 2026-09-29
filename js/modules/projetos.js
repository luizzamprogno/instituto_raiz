import { frentes, campanhas } from './data.js';
import { renderFrentes, renderCampanhas } from './templates.js';

export function initProjetosPage() {
  const frentesGrid = document.getElementById('frentes-grid');
  const campanhasGrid = document.getElementById('campanhas-grid');

  if (frentesGrid) frentesGrid.innerHTML = renderFrentes(frentes);
  if (campanhasGrid) campanhasGrid.innerHTML = renderCampanhas(campanhas);
}
