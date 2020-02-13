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
  setTimeout(function() {
    var msgErro = "Um dos jogadores não foi localizado na base de dados do R6 Tab!";
    exibeMensagensDeErro([msgErro], "#erros-busca"); // fcn definida em form.js
  }, 300);
};

//=============================================================
function erroGerarTimes(listaJogadoresComErro){
  var erros = [];
  erros.push("A diferença de MMR é maior que 1000!");
  listaJogadoresComErro.forEach(jogadorComErro => {
    jogadorComErro.classList.add("erro-jogador");
  });
  // fcn definida em form.js
  exibeMensagensDeErro(erros, "#erros-gerador");
};

//=============================================================
function erroRevalidaJogador(listaJogadoresComErro) {
  var erros = [];
  erros.push("O valor de MMR não pode estar em branco para essa operação!");
  listaJogadoresComErro.forEach(jogadorComErro => {
    jogadorComErro.classList.add("erro-jogador");
  });
  // fcn definida em form.js
  exibeMensagensDeErro(erros, "#erros-gerador");
};

//=============================================================
function limpaErros() {
  var idsErro = document.querySelectorAll('*[id^="erros-"]');
  idsErro.forEach(id => {
    id.innerHTML = "";
  });
};

//=============================================================
function limpaAlertasErro() {
  var idsAlertas = document.querySelectorAll('*[class*="erro-jogador"]');
  idsAlertas.forEach(id => {
    id.classList.remove("erro-jogador");
  });
};

//=============================================================
function limpaAlertasTime() {
  var idsAlertas0 = document.querySelectorAll('*[class*="time0"]');
  var idsAlertas1 = document.querySelectorAll('*[class*="time1"]');
  idsAlertas0.forEach(id => {
    id.classList.remove("time0");
  });
  idsAlertas1.forEach(id => {
    id.classList.remove("time1");
  });
};

//=============================================================
function realceTabela(alvo) {
  alvo.classList.add("normal-alerta");
  setTimeout(function() {
    alvo.classList.remove("normal-alerta");
    alvo.classList.add("alerta-normal");
    setTimeout(function() {
      alvo.classList.remove("alerta-normal");
    }, 300);
  }, 300);
};

//=============================================================
