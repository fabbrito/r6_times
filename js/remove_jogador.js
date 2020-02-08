var jogadores = document.querySelectorAll('.jogador');

var tabela = document.querySelector('#tabela-jogadores');

tabela.addEventListener("dblclick", function(event){
  // this --> dono do evento
  // event.target --> alvo do evento
  // event.target.parentNode --> pai do alvo do evento

  // efeito de transição
  event.target.parentNode.classList.add("fadeOut");
  // timeout esperando o termino do efeito aplicado
  setTimeout(function(){
    event.target.parentNode.remove();
  }, 300);
});
