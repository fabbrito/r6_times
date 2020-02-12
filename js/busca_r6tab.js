var botaoBusca = document.querySelector("#buscar-jogadores");

botaoBusca.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");
  listaJogadores.forEach(jogador => {
    if (jogador.querySelector(".info-mmr").textContent.length === 0) {
      apiSearchRequest(jogador);
    };
  });

  limpaErros(); // fcn em gerenciador_erros.js
  limpaAlertas(); // fcn em gerenciador_erros.js
});

//=============================================================
function apiSearchRequest(jogador) {
  const apiSearchURL = "https://r6tab.com/api/search.php?platform=uplay&search=" + jogador.querySelector(".info-nick").textContent;
  fetch(apiSearchURL)
    .then(res => res.json())
    .then(res => {
      jogador.querySelector(".info-nick").textContent = res.results[0].p_name;
      // jogador.querySelector(".info-mmr").textContent = results[0].p_currentmmr;
      apiPlayerRequest(jogador, res.results[0].p_id);
    })
    .catch(err => {
      erroBuscaJogador(jogador);
      console.log(`Error with message: ${err}`)
    });
};

//=============================================================
function apiPlayerRequest(jogador, p_id) {
  const apiPlayerURL = "https://r6tab.com/api/player.php?p_id=" + p_id;
  fetch(apiPlayerURL)
    .then(res => res.json())
    .then(res => {
      jogador.querySelector(".info-mmr").textContent = res.seasonal.current_NA_mmr
    })
    .catch(err => {
      erroBuscaJogador(jogador);
      console.log(`Error with message: ${err}`)
    });
};

//=============================================================
