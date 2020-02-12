var jogadores = document.querySelectorAll('.jogador');
var tabela = document.querySelector('#tabela-jogadores');
var form = document.querySelector("#form-adiciona");

//=============================================================
// Remove o jogador alvo do right click (contextmenu)
tabela.addEventListener("contextmenu", function(event){
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
});

//=============================================================
// remove todos os jogadores da tabela
var botaoLimpa = document.querySelector("#limpar-jogadores");

botaoLimpa.addEventListener("click", function(event) {
  var jogadores = document.querySelectorAll(".jogador");
  // Para cada jogador
  jogadores.forEach(jogador => {
    jogador.classList.add("fadeOut");
    setTimeout(function(){
      jogador.remove();
    }, 300);
  });
});
//=============================================================
