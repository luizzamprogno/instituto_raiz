import { showToast } from './toast.js';
import { validarCampo, validarFormulario, limparValidacao } from './validacao.js';
import { obterCadastros, salvarCadastro } from './storage.js';
import { renderCadastrosSalvos } from './templates.js';
import { formatarCPF, formatarTelefone, formatarCEP } from './mascaras.js';

// Reaplica a mascara sem deixar o cursor "pular" para o fim do campo:
// conta quantos digitos existiam antes do cursor, reformata o valor e
// reposiciona o cursor logo apos essa mesma quantidade de digitos.
function aplicarMascaraPreservandoCursor(campo, mascara) {
  const posicaoAntes = campo.selectionStart;
  const digitosAntesDoCursor = campo.value.slice(0, posicaoAntes).replace(/\D/g, '').length;

  campo.value = mascara(campo.value);

  if (digitosAntesDoCursor === 0) {
    campo.setSelectionRange(0, 0);
    return;
  }

  let digitosContados = 0;
  let novaPosicao = campo.value.length;

  for (let i = 0; i < campo.value.length; i += 1) {
    if (/\d/.test(campo.value[i])) digitosContados += 1;
    if (digitosContados === digitosAntesDoCursor) {
      novaPosicao = i + 1;
      break;
    }
  }

  campo.setSelectionRange(novaPosicao, novaPosicao);
}

function renderizarHistorico() {
  const lista = document.getElementById('lista-cadastros');
  if (!lista) return;
  lista.innerHTML = renderCadastrosSalvos(obterCadastros());
}

export function initCadastroPage() {
  const form = document.getElementById('form-cadastro');
  if (!form) return;

  renderizarHistorico();

  const mascaras = {
    cpf: formatarCPF,
    telefone: formatarTelefone,
    cep: formatarCEP,
  };

  const camposComInput = ['nome', 'nascimento', 'cpf', 'email', 'telefone', 'cep', 'endereco', 'cidade'];
  const camposComChange = ['estado', 'interesse', 'termos'];

  camposComInput.forEach((id) => {
    const campo = document.getElementById(id);
    campo.addEventListener('input', () => {
      if (mascaras[id]) aplicarMascaraPreservandoCursor(campo, mascaras[id]);
      validarCampo(campo);
    });
  });

  camposComChange.forEach((id) => {
    const campo = document.getElementById(id);
    campo.addEventListener('change', () => validarCampo(campo));
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validarFormulario(form)) return;

    const botaoEnviar = form.querySelector('button[type="submit"]');
    const textoOriginal = botaoEnviar.textContent;

    botaoEnviar.disabled = true;
    botaoEnviar.textContent = 'Enviando...';

    setTimeout(() => {
      try {
        const salvo = salvarCadastro({
          nome: form.nome.value.trim(),
          email: form.email.value.trim(),
          interesse: form.interesse.value,
          dataCadastro: new Date().toISOString(),
        });
        renderizarHistorico();

        if (salvo) {
          showToast('Cadastro enviado com sucesso! Em breve entraremos em contato.');
          form.reset();
          limparValidacao(form);
        } else {
          showToast('Não foi possível salvar seu cadastro neste navegador. Tente novamente.');
        }
      } finally {
        botaoEnviar.disabled = false;
        botaoEnviar.textContent = textoOriginal;
      }
    }, 800);
  });
}
