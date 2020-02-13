var tabela = document.querySelector('#tabela-jogadores');
var form = document.querySelector("#form-adiciona");

//=============================================================
// Remove o jogador alvo do right click (contextmenu)
tabela.addEventListener("contextmenu", function(event){
  limpaErros(); // fcn em gerenciador_erros.js
  limpaAlertasErro(); // fcn em gerenciador_erros.js
  limpaAlertasTime(); // fcn em gerenciador_erros.js
  event.preventDefault();
  // this --> dono do evento
  // event.target --> alvo do evento
  // event.target.parentNode --> pai do alvo do evento

  // efeito de transição
  event.target.parentNode.classList.add("fadeOut");
  // timeout para o efeito aplicado
  setTimeout(function(){
    event.target.parentNode.remove();
  }, 300);
});

//=============================================================
// Edita o jogador alvo do click duplo (dblclick)
tabela.addEventListener("dblclick", function(event){
  limpaErros(); // fcn em gerenciador_erros.js
  limpaAlertasErro(); // fcn em gerenciador_erros.js
  limpaAlertasTime(); // fcn em gerenciador_erros.js
  // Reset do formulario
  form.reset();
  var jogador = event.target.parentNode;
  form.nick.value = jogador.querySelector(".info-nick").textContent;
  form.mmr.value = jogador.querySelector(".info-mmr").textContent;

  // efeito de transição
  event.target.parentNode.classList.add("fadeOut");
  // timeout para o efeito aplicado
  setTimeout(function(){
    event.target.parentNode.remove();
  }, 300);
  form.querySelector("#mmr").focus();
});

//=============================================================
// remove todos os jogadores da tabela
var botaoLimpa = document.querySelector("#limpar-jogadores");

botaoLimpa.addEventListener("click", function(event) {
  var jogadores = document.querySelectorAll(".jogador");
  limpaErros(); // fcn em gerenciador_erros.js
  limpaAlertasErro(); // fcn em gerenciador_erros.js
  limpaAlertasTime(); // fcn em gerenciador_erros.js
  // Para cada jogador
  jogadores.forEach(jogador => {
    jogador.classList.add("fadeOut");
    setTimeout(function(){
      jogador.remove();
    }, 300);
  });
});
//=============================================================
