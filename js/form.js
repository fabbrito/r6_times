var botaoAdicionar = document.querySelector("#adicionar-jogador");
botaoAdicionar.addEventListener("click", function(event){
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
  adicionaJogadorTabela(jogador)

  // Reset do formulario e dos erros
  form.reset();
  var mensagensErro = document.querySelector("#erros-form")
  mensagensErro.innerHTML = "";
});

//=============================================================
function montarTd(dado, classe) {
  var td = document.createElement("td");
  td.classList.add(classe);
  td.textContent = dado;
  return td
}

//=============================================================
function montarTr(jogador) {
  var trJogador = document.createElement("tr");
  trJogador.classList.add("jogador");

  trJogador.appendChild(montarTd(jogador.nick, "info-nick"));
  trJogador.appendChild(montarTd(jogador.mmr, "info-mmr"));

  return trJogador
}

//=============================================================
function adicionaJogadorTabela(jogador) {
  // Montar nova linha da tabela
  var trJogador = montarTr(jogador)
  // Adiciona a nova linha criada
  var tabela = document.querySelector("#tabela-jogadores");
  tabela.appendChild(trJogador);
}

//=============================================================
function exibeMensagensDeErro(erros, classe) {
  var ul = document.querySelector(classe)
  ul.innerHTML = "";

  erros.forEach(function(erro) {
    var li = document.createElement("li");
    li.textContent = erro;
    ul.appendChild(li);
  });
};

//=============================================================
function validaJogador(jogador) {
  var erros = [];

  if (jogador.nick.length == 0) {
    erros.push("O nickname do jogador não pode ser em branco!");
  }

  return erros
};

//=============================================================
function extrairDadosDoJogador(form){
  var jogador = {
    nick: form.nick.value,
    mmr: form.mmr.value
  };
  return jogador
};

//=============================================================
