function exibeMensagensDeErro(erros, classe) {
  var ul = document.querySelector(classe)
  ul.innerHTML = "";

  if (erros.length > 0) {
    erros.forEach(erro => {
      var li = document.createElement("li");
      li.textContent = erro;
      ul.appendChild(li);
    });
  };
};

//=============================================================
function erroBuscaJogador(jogador) {
  jogador.classList.add("erro-jogador");
  var msgErro = "Um dos jogadores não foi localizado na base de dados do R6 Tab!";
  // fcn definida em form.js
  exibeMensagensDeErro([msgErro], "#erros-busca");
};

//=============================================================
function errosGerador(listaJogadoresComErro) {
  var erros = [];
  erros.push("O valor de MMR não pode estar em branco para essa operação!");
  listaJogadoresComErro.forEach(jogadorComErro => {
    jogadorComErro.classList.add("erro-jogador");
  });
  // fcn definida em form.js
  exibeMensagensDeErro(erros, "#erros-gerador");
};

//=============================================================
function limpaTodosErros() {
  var idsErro = document.querySelectorAll('*[id^="erros-"]');
  idsErro.forEach(id => {
    id.innerHTML = "";
  });
};
//=============================================================
