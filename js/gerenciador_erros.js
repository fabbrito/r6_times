function exibeMensagensDeErro(erros, classe, tipoErro="erro") {
  var ul = document.querySelector(classe)
  ul.innerHTML = "";

  if (erros.length > 0) {
    erros.forEach(erro => {
      var spanErro = document.createElement("span");
      if (tipoErro === "erro") {
        spanErro.textContent = "[ERRO]"
        spanErro.classList.add("erro");
      } else if (tipoErro === "alerta") {
        spanErro.textContent = "[ALERTA]";
        spanErro.classList.add("alerta");
      };
      var spanTexto = document.createElement("span");
      spanTexto.textContent = " " + erro;
      var li = document.createElement("li");
      li.appendChild(spanErro);
      li.appendChild(spanTexto);
      ul.appendChild(li);
    });
  };
};

//=============================================================
function erroBuscaJogador(jogador) {
  jogador.classList.add("erro-jogador");
  setTimeout(function () {
    var msgErro = "Um dos jogadores não foi localizado na base de dados do R6 Tab!";
    exibeMensagensDeErro([msgErro], "#erros-busca", "erro"); // fcn definida em form.js
  }, 300);
};

//=============================================================
function erroGerarTimes(listaJogadoresComErro) {
  var erros = [];
  erros.push("A diferença de MMR é maior que 1000!");
  listaJogadoresComErro.forEach(jogadorComErro => {
    jogadorComErro.classList.add("erro-jogador");
  });
  // fcn definida em form.js
  exibeMensagensDeErro(erros, "#erros-gerador", "alerta");
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
function limpaResultadoTimes() {
  var idsAlertas0 = document.querySelectorAll('*[class*="time0"]');
  var idsAlertas1 = document.querySelectorAll('*[class*="time1"]');
  idsAlertas0.forEach(id => {
    id.classList.remove("time0");
    id.querySelector(".info-time").textContent = "----";
  });
  idsAlertas1.forEach(id => {
    id.classList.remove("time1");
    id.querySelector(".info-time").textContent = "----";
  });
};

//=============================================================
function realceTabela(alvo) {
  alvo.classList.add("normal-alerta");
  setTimeout(function () {
    alvo.classList.remove("normal-alerta");
    alvo.classList.add("alerta-normal");
    setTimeout(function () {
      alvo.classList.remove("alerta-normal");
    }, 300);
  }, 300);
};

//=============================================================