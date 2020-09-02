var botaoBusca = document.querySelector("#buscar-jogadores");

botaoBusca.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");

  listaJogadores.forEach((jogador) => {
    if (jogador.querySelector(".info-mmr").textContent.length === 0) {
      addSpinner();
      return;
    };
  });

  listaJogadores.forEach((jogador, i) => {
    if (jogador.querySelector(".info-mmr").textContent.length === 0) {
      apiSearchRequest(jogador, i, listaJogadores.length);
    };
  });

  // fcn em gerenciador_erros.js
  limpaErros(); // Limpa lista de erros
  limpaAlertasErro(); // Limpa o highlight de erros
  limpaResultadoTimes(); // Limpa o resultado da separacao em times
});

//=============================================================
function apiSearchRequest(jogador, i, quantJog) {
  const apiSearchURL = "https://r6.apitab.com/search/uplay/" + jogador.querySelector(".info-nick").textContent;

  const mySearchRequest = new Request(apiSearchURL, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default",
  });

  fetch(mySearchRequest)
    .then((res) => res.json())
    .then((res) => {
      // Grab the first result
      let playerObject = res.players[Object.keys(res.players)[0]];
      jogador.querySelector(".info-nick").textContent =
        playerObject.profile.p_name;
      // jogador.querySelector(".info-mmr").textContent = results[0].p_currentmmr;
      apiPlayerRequest(jogador, i, quantJog, playerObject.profile.p_id);
    })
    .catch((err) => {
      erroBuscaJogador(jogador);
      console.log(`Error with message: ${err}`);
    });
};

//=============================================================
function apiPlayerRequest(jogador, i, quantJog,  p_id) {
  const apiPlayerURL = "https://r6.apitab.com/player/" + p_id;
  const myPlayerRequest = new Request(apiPlayerURL, {
    method: "GET",
    headers: new Headers(),
    mode: "cors",
    cache: "default",
  });
  fetch(myPlayerRequest)
    .then((res) => res.json())
    .then((res) => {
      jogador.querySelector(".info-mmr").textContent =
        res.ranked.NA_mmr === 0 ? 2500 : res.ranked.NA_mmr;
    })
    .catch((err) => {
      erroBuscaJogador(jogador);
      console.log(`Error with message: ${err}`);
    })
    .then(() => {
      if (i === quantJog - 1) return removeSpinner();
      else return;
    });
};

//=============================================================
