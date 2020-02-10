var botaoTimes = document.querySelector("#gerar-times");

botaoTimes.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");
  var dados = [];
  listaJogadores.forEach(jogador => {
    dados.push({nick:jogador.querySelector(".info-nick").textContent, mmr:jogador.querySelector(".info-mmr").textContent});
  });
  console.log(dados);
});
