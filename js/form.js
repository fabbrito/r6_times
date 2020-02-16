var botaoAdicionar = document.querySelector("#adicionar-jogador");
botaoAdicionar.addEventListener("click", function(event) {
  // Desabilita o comportamento padrao do formulario (reset e f5)
  event.preventDefault();

  var form = document.querySelector("#form-adiciona");
  // Extrai dados do jogador a partir do form
  var jogador = extrairDadosDoJogador(form);
  // Validacao dos dados
  var erros = validaJogador(jogador);
  // Exibe possiveis erros e retorna caso necessario
  
  if (erros.length > 0) {
    exibeMensagensDeErro(erros, "#erros-form");
    return;
  }
  // Adiciona o jogador na tabela
  adicionaJogadorTabela(jogador);

  // Reset do formulario e dos erros
  form.reset();
  // fcn em gerenciador_erros.js
  limpaErros(); // Limpa lista de erros
  limpaAlertasErro(); // Limpa o highlight de erros
  limpaResultadoTimes(); // Limpa o resultado da separacao em times
  // Retorna o foco para o input de nickname
  document.querySelector("#nick").focus();
});

//=============================================================
function montaTd(dado, classe) {
  var td = document.createElement("td");
  td.classList.add(classe);
  td.textContent = dado;
  return td
};

//=============================================================
function montaTr(objJogador) {
  var tr = document.createElement("tr");
  tr.classList.add("jogador");

  tr.appendChild(montaTd(objJogador.nick, "info-nick"));
  tr.appendChild(montaTd(objJogador.mmr, "info-mmr"));
  tr.appendChild(montaTd(objJogador.time, "info-time"));

  return tr
};

//=============================================================
function adicionaJogadorTabela(objJogador) {
  // Monta nova linha da tabela
  var tr = montaTr(objJogador)
  // Adiciona a nova linha criada
  var tabela = document.querySelector("#tabela-jogadores");
  tabela.appendChild(tr);
};

//=============================================================
function validaJogador(objJogador) {
  var erros = [];
  var listaJogadores = document.querySelectorAll('.jogador');
  if (objJogador.nick.length === 0) {
    erros.push("O nickname do jogador não pode ser em branco!");
  } else {
    listaJogadores.forEach(jogador => {
      if (jogador.querySelector(".info-nick").textContent.toLowerCase() === objJogador.nick.toLowerCase()){
        erros.push("Um jogador com o mesmo nickname já existe na tabela!");
        realceTabela(jogador);
      };
    });
    if (listaJogadores.length >= 10) {
      erros.push("A quantidade de jogadores deve ser igual a 10!");
    };
    if (isNaN(objJogador.mmr)) {
      erros.push("MMR deve ser um número!");
    } else if (objJogador.mmr < -5000 || objJogador.mmr > 10000) {
      erros.push("Valor de MMR inválido! (-5000 < MMR < 10000)!");
    };
  };
  return erros
};

//=============================================================
function extrairDadosDoJogador(form) {
  var jogador = {
    nick: form.nick.value,
    mmr: form.mmr.value,
    time: "----"
  };
  return jogador
};

//=============================================================
