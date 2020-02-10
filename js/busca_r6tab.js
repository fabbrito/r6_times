var botaoBusca = document.querySelector("#buscar-jogadores");

botaoBusca.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");
  listaJogadores.forEach(jogador => {
    if (jogador.querySelector(".info-mmr").textContent.length == 0) {
      apiSearchRequest(jogador);
    };
  });

  var ul = document.querySelector("#erros-busca")
  ul.innerHTML = "";
});

//=============================================================
function apiSearchRequest(jogador) {
  var xhr = new XMLHttpRequest();
  var apiSearchURL = "https://r6tab.com/api/search.php?platform=uplay&search=" + jogador.querySelector(".info-nick").textContent;
  xhr.open("GET", apiSearchURL);

  xhr.onload = function() {
    if (xhr.status == 200) {
      var r6TabResp = JSON.parse(this.responseText);
      if (Object.entries(r6TabResp).length > 1) {
        var results = r6TabResp.results;
        jogador.querySelector(".info-nick").textContent = results[0].p_name;
        // jogador.querySelector(".info-mmr").textContent = results[0].p_currentmmr;
        apiPlayerRequest(jogador, results[0].p_id);
      };
      if (Object.entries(r6TabResp).length === 1) {
        jogador.classList.add("erro-jogador");
        var msgErro = "Um dos jogadores não foi localizado na base de dados do R6 Tab!";
        exibeMensagensDeErro([msgErro], "#erros-busca");
      };
    };
  };
  xhr.send();
};

//=============================================================
function apiPlayerRequest(jogador, p_id) {
  var xhr = new XMLHttpRequest();
  var apiSearchURL = "https://r6tab.com/api/player.php?p_id=" + p_id;
  xhr.open("GET", apiSearchURL);
  xhr.onload = function() {
    if (xhr.status == 200) {
      var r6TabResp = JSON.parse(this.responseText);
      if (r6TabResp.playerfound) {
        jogador.querySelector(".info-mmr").textContent = r6TabResp.seasonal.current_NA_mmr;
      } else {
        jogador.classList.add("erro-jogador");
        var msgErro = "Um dos jogadores não foi localizado na base de dados do R6 Tab!";
        exibeMensagensDeErro([msgErro], "#erros-busca");
      };
    };
  };
  xhr.send();
};

//=============================================================
