function badgeVagas(vagasAbertas) {
  return vagasAbertas ? '<span class="badge badge-success">Vagas abertas</span>' : '';
}

export function templateFrente(frente) {
  return `
    <article class="frente col-4">
      <h3>${frente.titulo}</h3>
      ${badgeVagas(frente.vagasAbertas)}
      <p>${frente.descricao}</p>
      <dl>
        <dt>Carga horária</dt>
        <dd>${frente.cargaHoraria}</dd>
        <dt>Requisito</dt>
        <dd>${frente.requisito}</dd>
      </dl>
    </article>
  `;
}

export function templateCampanha(campanha) {
  return `
    <article class="campanha col-4">
      <h3>${campanha.titulo}</h3>
      ${badgeVagas(campanha.vagasAbertas)}
      <p>${campanha.descricao}</p>
      <p><strong>Meta mensal:</strong> ${campanha.metaMensal}</p>
    </article>
  `;
}

export function renderFrentes(frentes) {
  return frentes.map(templateFrente).join('');
}

export function renderCampanhas(campanhas) {
  return campanhas.map(templateCampanha).join('');
}

const LABELS_INTERESSE = {
  educacao: 'Educação infantil',
  capacitacao: 'Capacitação profissional',
  cultura: 'Resgate cultural',
  doacao: 'Somente doação',
};

export function templateCadastroSalvo(cadastro) {
  const interesse = LABELS_INTERESSE[cadastro.interesse] || cadastro.interesse;
  const momento = window.dayjs ? dayjs(cadastro.dataCadastro) : null;
  const dataFormatada = momento ? momento.format('DD/MM/YYYY [às] HH:mm') : cadastro.dataCadastro;
  const tempoRelativo = momento ? momento.fromNow() : '';

  return `
    <li class="cadastro-salvo">
      <strong>${cadastro.nome}</strong>
      <span>${interesse}</span>
      <time datetime="${cadastro.dataCadastro}" title="${dataFormatada}">${tempoRelativo}</time>
    </li>
  `;
}

export function renderCadastrosSalvos(cadastros) {
  if (cadastros.length === 0) {
    return '<li class="cadastro-vazio">Nenhum cadastro salvo neste navegador ainda.</li>';
  }
  return cadastros.map(templateCadastroSalvo).join('');
}
