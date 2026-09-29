const CHAVE_CADASTROS = 'raizComunitaria.cadastros';

export function obterCadastros() {
  try {
    const dados = localStorage.getItem(CHAVE_CADASTROS);
    return dados ? JSON.parse(dados) : [];
  } catch (erro) {
    console.error('Não foi possível ler os cadastros salvos no localStorage.', erro);
    return [];
  }
}

export function salvarCadastro(cadastro) {
  try {
    const cadastros = obterCadastros();
    cadastros.push(cadastro);
    localStorage.setItem(CHAVE_CADASTROS, JSON.stringify(cadastros));
    return true;
  } catch (erro) {
    console.error('Não foi possível salvar o cadastro no localStorage.', erro);
    return false;
  }
}
