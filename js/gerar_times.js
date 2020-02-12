var botaoTimes = document.querySelector("#gerar-times");

botaoTimes.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");

  var listaJogadoresComErro = revalidaJogadores(listaJogadores);
  // Exibe possiveis erros e retorna caso necessario
  if (listaJogadoresComErro.length > 0) {
    erroRevalidaJogador(listaJogadoresComErro)
    return;
  };

  var dados = extrairObjJogador(listaJogadores);

  dados.sort((a, b) => (a.mmr - b.mmr));

  var minMMR = Math.min(...dados.map(j => j.mmr));
  var maxMMR = Math.max(...dados.map(j => j.mmr));

  var iMin = dados.map(j => j.mmr).indexOf(minMMR);
  var iMax = dados.map(j => j.mmr).indexOf(maxMMR);

  if ((maxMMR - minMMR) > 1000) {
    erroGerarTimes([dados[iMin].domObj, dados[iMax].domObj]);
    return;
  }
  var time0 = dados.slice(0, 5);
  var time1 = dados.slice(5, );

  var media0 = time0.reduce((soma, p) => soma + p.mmr, 0) / time0.length;
  var media1 = time1.reduce((soma, p) => soma + p.mmr, 0) / time1.length;

  var count = 0;
  while (Math.abs(media0 - media1) && (count < 100)) {
    var time0Mod = [time0[0]], time1Mod = [time1[0]];
    time0Mod.forEach((jog0, i) => {
      time1Mod.forEach((jog1, j) => {
        time0Mod.splice(i, 1, (jog1));
        time1Mod.splice(j, 1, (jog0));
        console.log(time0Mod)
        console.log(time1Mod)
      });
    });
    count += 1;
  };
  // console.log(dados);
  // console.log(dados[iMin])
  // console.log(dados[iMax])

  limpaErros(); // fcn em gerenciador_erros.js
  limpaAlertas(); // fcn em gerenciador_erros.js
});



//=============================================================
function extrairObjJogador(listaJogadores) {
  var dados = [];
  listaJogadores.forEach(jogador => {
    dados.push({
      nick: jogador.querySelector(".info-nick").textContent,
      mmr: parseInt(jogador.querySelector(".info-mmr").textContent),
      domObj: jogador
    });
  });
  return dados
};

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

//=============================================================
