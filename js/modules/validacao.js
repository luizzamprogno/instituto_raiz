const validadores = {
  nome: (valor) => (valor.trim().length >= 5 ? null : 'Informe seu nome completo (mínimo 5 caracteres).'),

  nascimento: (valor) => {
    if (!valor) return 'Informe sua data de nascimento.';
    if (new Date(valor) > new Date()) return 'A data de nascimento não pode ser no futuro.';
    return null;
  },

  cpf: (valor) => (/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(valor) ? null : 'Formato inválido. Use 000.000.000-00.'),

  email: (valor) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor) ? null : 'Informe um e-mail válido.'),

  telefone: (valor) => (/^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(valor) ? null : 'Formato inválido. Use (xx) xxxxx-xxxx.'),

  cep: (valor) => (/^\d{5}-\d{3}$/.test(valor) ? null : 'Formato inválido. Use 00000-000.'),

  endereco: (valor) => (valor.trim().length > 0 ? null : 'Informe o endereço.'),

  cidade: (valor) => (valor.trim().length > 0 ? null : 'Informe a cidade.'),

  estado: (valor) => (valor !== '' ? null : 'Selecione um estado.'),

  interesse: (valor) => (valor !== '' ? null : 'Selecione uma área de interesse.'),

  termos: (valor) => (valor ? null : 'É necessário aceitar os termos para continuar.'),
};

function obterValor(campo) {
  return campo.type === 'checkbox' ? campo.checked : campo.value;
}

function obterOuCriarMensagemElemento(campo) {
  const container = campo.closest('.campo, .campo-checkbox') || campo.parentElement;
  let mensagemEl = container.querySelector('.erro-campo');

  if (!mensagemEl) {
    mensagemEl = document.createElement('span');
    mensagemEl.className = 'erro-campo';
    container.appendChild(mensagemEl);
  }

  return mensagemEl;
}

export function validarCampo(campo) {
  const validador = validadores[campo.name];
  if (!validador) return true;

  const erro = validador(obterValor(campo));
  const mensagemEl = obterOuCriarMensagemElemento(campo);

  if (erro) {
    campo.classList.add('campo-invalido');
    campo.classList.remove('campo-valido');
    mensagemEl.textContent = erro;
    mensagemEl.classList.add('visivel');
  } else {
    campo.classList.remove('campo-invalido');
    campo.classList.add('campo-valido');
    mensagemEl.textContent = '';
    mensagemEl.classList.remove('visivel');
  }

  return !erro;
}

export function limparValidacao(form) {
  Array.from(form.elements)
    .filter((campo) => validadores[campo.name])
    .forEach((campo) => {
      campo.classList.remove('campo-invalido', 'campo-valido');
      const mensagemEl = campo.closest('.campo, .campo-checkbox')?.querySelector('.erro-campo');
      if (mensagemEl) {
        mensagemEl.textContent = '';
        mensagemEl.classList.remove('visivel');
      }
    });
}

export function validarFormulario(form) {
  const campos = Array.from(form.elements).filter((campo) => validadores[campo.name]);
  let primeiroInvalido = null;

  campos.forEach((campo) => {
    const valido = validarCampo(campo);
    if (!valido && !primeiroInvalido) primeiroInvalido = campo;
  });

  if (primeiroInvalido) primeiroInvalido.focus();

  return !primeiroInvalido;
}
