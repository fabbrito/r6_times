var botaoTimes = document.querySelector("#gerar-times");

botaoTimes.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");
  var dados = [];

  var listaJogadoresComErro = revalidaJogadores(listaJogadores);
  // Exibe possiveis erros e retorna caso necessario
  if (listaJogadoresComErro.length > 0) {
    errosGerador(listaJogadoresComErro)
    return;
  }

  listaJogadores.forEach(jogador => {
    dados.push({
      nick: jogador.querySelector(".info-nick").textContent,
      mmr: parseInt(jogador.querySelector(".info-mmr").textContent)
    });
  });
  console.log(dados);
  limpaTodosErros(); // fcn em gerenciador_erros.js
});

//=============================================================
function revalidaJogadores(listaJogadores) {
  var listaJogadoresComErro = [];
  listaJogadores.forEach(jogador => {
    if (jogador.querySelector(".info-mmr").textContent.length === 0) {
      listaJogadoresComErro.push(jogador);
    };
  });
  return listaJogadoresComErro
};
