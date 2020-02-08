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
          var resp = JSON.parse(this.responseText);
          var results = resp.results;
          if (results.length > 0){
            tdNick.textContent = results[0].p_name;
            tdMMR.textContent = parseInt(results[0].p_currentmmr);
          };
        };
      });
      xhr.send();
    }
  });
});
