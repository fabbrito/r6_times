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

  var iMinMMR = dados.map(j => j.mmr).indexOf(minMMR);
  var iMaxMMR = dados.map(j => j.mmr).indexOf(maxMMR);

  if ((maxMMR - minMMR) > 1000) {
    erroGerarTimes([dados[iMinMMR].domObj, dados[iMaxMMR].domObj]);
    return;
  }
  var time0 = dados.slice(0, 5);
  var time1 = dados.slice(5, );

  var media0 = time0.reduce((soma, p) => soma + p.mmr, 0) / time0.length;
  var media1 = time1.reduce((soma, p) => soma + p.mmr, 0) / time1.length;

  var count = 0;
  var time0Mod = time0;
  var time1Mod = time1;
  var media0Mod = 0;
  var media1Mod = 0;
  var difMedia = [];

  while (Math.abs(media0 - media1) > 10 && (count < 20)) {
    difMedia = [];
    time0Mod = time0;
    time1Mod = time1;
    time0.forEach((jog0, i) => {
      time1.forEach((jog1, j) => {
        media0Mod = media0 + (jog1.mmr - jog0.mmr) / time0.length;
        media1Mod = media1 + (jog0.mmr - jog1.mmr) / time1.length;
        difMedia.push({
          dif: Math.abs(Math.round(media0Mod - media1Mod)),
          i: i,
          j: j,
          jog0: jog0,
          jog1: jog1
        });
      });
    });
    var minDifMedia = Math.min(...difMedia.map(dM => dM.dif));
    var iMinDifMedia = difMedia.map(dM => dM.dif).indexOf(minDifMedia);

    time0Mod.splice(difMedia[iMinDifMedia].i, 1, (difMedia[iMinDifMedia].jog1));
    time1Mod.splice(difMedia[iMinDifMedia].j, 1, (difMedia[iMinDifMedia].jog0));
    media0 = time0Mod.reduce((soma, p) => soma + p.mmr, 0) / time0.length;
    media1 = time1Mod.reduce((soma, p) => soma + p.mmr, 0) / time1.length;
    count += 1;
  };

  limpaAlertasTime();
  time0Mod.forEach(jog => {
    jog.domObj.classList.add("time0");
    jog.domObj.querySelector(".info-time").textContent = `Time 0\t(${media0.toFixed(0)})`;
    jog.domObj.querySelector(".info-mmr").textContent += `\t(${(jog.mmr - media0) > 0 ? '+' : ''}${(jog.mmr - media0).toFixed(0)})`
  });
  time1Mod.forEach(jog => {
    jog.domObj.classList.add("time1");
    jog.domObj.querySelector(".info-time").textContent = `Time 1\t(${media1.toFixed(0)})`;
    jog.domObj.querySelector(".info-mmr").textContent += `\t(${(jog.mmr - media1) > 0 ? '+' : ''}${(jog.mmr - media1).toFixed(0)})`
  });

  // console.log(time0Mod)
  // console.log(time1Mod)
  console.log(`${media0} ${media1} ${media0-media1} ${count}`)

  limpaErros(); // fcn em gerenciador_erros.js
  limpaAlertasErro(); // fcn em gerenciador_erros.js
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
