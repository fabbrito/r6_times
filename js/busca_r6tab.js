var botaoBusca = document.querySelector("#buscar-jogadores");

botaoBusca.addEventListener("click", function(event) {
  var jogadores = document.querySelectorAll(".jogador");
  jogadores.forEach(function(jogador) {

    var tdNick = jogador.querySelector(".info-nick");
    var tdMMR = jogador.querySelector(".info-mmr");

    var nick = tdNick.textContent;
    var mmr = tdMMR.textContent;

    if (mmr.length == 0) {
      var xhr = new XMLHttpRequest();
      var apiURL = "https://r6tab.com/api/search.php?platform=uplay&search=" + nick;
      xhr.open("GET", apiURL);
      xhr.addEventListener("load", function() {
        if (xhr.status == 200) {
          var r6TabResp = JSON.parse(this.responseText);
          if (Object.entries(r6TabResp).length > 1) {
            var results = r6TabResp.results;
            tdNick.textContent = results[0].p_name;
            tdMMR.textContent = parseInt(results[0].p_currentmmr);
          };
          if (Object.entries(r6TabResp).length === 1) {
            var msgErro = "Um dos jogadores não foi localizado na base de dados do R6 Tab!";
            exibeMensagensDeErro([msgErro], "#erros-busca");
          };
        };
      });
      xhr.send();
    }
  });
  var mensagensErro = document.querySelector("#erros-busca")
  mensagensErro.innerHTML = "";
});
