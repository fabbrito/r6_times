const formSelector = document.querySelector("#form-adiciona");
formSelector.addEventListener("submit", (event) => {
  // Desabilita o comportamento padrao do formulario (reset e f5)
  event.preventDefault();
  // Extrai dados do jogador a partir do form
  const objJogador = extrairDadosDoJogador(form);
  // Validacao dos dados
  const erros = validaJogador(objJogador);
  // Exibe possiveis erros e retorna caso necessario

  if (erros.length > 0) {
    exibeMensagensDeErro(erros, "#erros-form");
    return;
  }
  // Adiciona o jogador na tabela (func_tabela.js)
  adicionaJogadorTabela(objJogador);

  // Reset do formulario e dos erros
  form.reset();
  // fcn em gerenciador_erros.js
  limpaErros(); // Limpa lista de erros
  limpaAlertasErro(); // Limpa o highlight de erros
  limpaResultadoTimes(); // Limpa o resultado da separacao em times
  // Retorna o foco para o input de nickname
  form.nick.focus();
});

//=============================================================
function validaJogador(objJogador) {
  var erros = [];
  var listaJogadores = document.querySelectorAll('.jogador');
  listaJogadores.forEach(jogador => {
    if (jogador.querySelector(".info-nick").textContent.toLowerCase() === objJogador.nick.toLowerCase()) {
      erros.push("Um jogador com o mesmo nickname já existe na tabela!");
      realceTabela(jogador);
    };
  });
  if (listaJogadores.length >= 10) {
    erros.push("A quantidade de jogadores deve ser menor ou igual a 10!");
  };
  return erros
};

//=============================================================
function extrairDadosDoJogador(form) {
  var jogador = {
    nick: form.nick.value,
    mmr: form.mmr.value,
    // time: "----"
  };
  return jogador
};