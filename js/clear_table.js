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
