var botaoLimpa = document.querySelector("#limpar-jogadores");

botaoLimpa.addEventListener("click", function(event) {
  var jogadores = document.querySelectorAll(".jogador");
  jogadores.forEach(function (jogador) {
    jogador.classList.add("fadeOut");
    setTimeout(function(){
      jogador.remove();
    }, 400);
  });
  
  var mensagensErro = document.querySelector("#erros-gerais")
  mensagensErro.innerHTML = "";
});
