var botaoTimes = document.querySelector("#gerar-times");

botaoTimes.addEventListener("click", function(event) {
  var listaJogadores = document.querySelectorAll(".jogador");
  // Exibe possiveis erros e retorna caso necessario
  if (listaJogadores.length === 0) {
    erroGerarTimesQuantJogadores();
    return;
  };

  // Verifica se os jogadores possuem MMR (o campo nao pode estar vazio)
  var listaJogadoresComErro = revalidaJogadores(listaJogadores);

  // Exibe possiveis erros e retorna caso necessario
  if (listaJogadoresComErro.length > 0) {
    erroRevalidaJogador(listaJogadoresComErro)
    return;
  };

  // Array com os dados de cada jogador + objeto DOM
  var dados = extrairObjJogador(listaJogadores);

  // Reordena os dados de forma crescente segundo o MMR
  dados.sort((a, b) => (a.mmr - b.mmr));

  // Testa se eh possivel um jogo com os jogadores listados (quant > 2 e difMMR < 750)
  if (!jogoPossivel(dados)) {
    return;
  };

  // Funcao de separacao dos jogadores em 2 times segundo um criterio de MMR
  var res = separaTimes(dados);

  // fcn em gerenciador_erros.js
  limpaResultadoTimes(); // Limpa o resultado da separacao em times

  res.time0.forEach(jog => {
    jog.domObj.classList.add("time0");
    jog.domObj.querySelector(".info-time").textContent = `Time 0\t(${res.media0.toFixed(0)})`;
  });
  res.time1.forEach(jog => {
    jog.domObj.classList.add("time1");
    jog.domObj.querySelector(".info-time").textContent = `Time 1\t(${res.media1.toFixed(0)})`;
  });

  console.log(`quant jog: ${dados.length}\nmedia0: ${res.media0}\nmedia1: ${res.media1}\ndifMedia: ${(res.media0-res.media1).toFixed(2)}\nepocas: ${res.eph}`)

  // fcn em gerenciador_erros.js
  limpaErros(); // Limpa lista de erros
  limpaAlertasErro(); // Limpa o highlight de erros
});

//=============================================================
function separaTimes(dados) {
  // Separacao inicial e calc da media dos times
  var metadeQuantJog = Math.floor(dados.length/2);
  var time0 = dados.slice(0, metadeQuantJog);
  var time1 = dados.slice(metadeQuantJog, );
  var media0 = time0.reduce((soma, p) => soma + p.mmr, 0) / time0.length;
  var media1 = time1.reduce((soma, p) => soma + p.mmr, 0) / time1.length;

  var eph = 0;
  var time0Mod = time0;
  var time1Mod = time1;
  var media0Mod = 0;
  var media1Mod = 0;
  var difMedia = [];
  var histResultados = [];

  while (eph < 40) {
    difMedia = [];
    time0Mod = time0;
    time1Mod = time1;
    time0.forEach((jog0, i) => {
      time1.forEach((jog1, j) => {
        // Substitui um jogador de cada time e calc media dos times
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
    // Enconta a menor diferenca da media de mmr apos uma substituicao
    var minDifMedia = Math.min(...difMedia.map(dM => dM.dif));
    var iMinDifMedia = difMedia.map(dM => dM.dif).indexOf(minDifMedia);

    // Melhores resultados salvos no array. Quando a derivada desses dados
    // aproxima-se de zero => resultado alcancado. Outro criterio de parada eh
    // quando a diferenca de mmr entre times eh menor q 10
    histResultados.push(difMedia[iMinDifMedia].dif);
    if ((eph > 0) && (histResultados[eph - 1] < histResultados[eph])) {
      if ((histResultados[eph] < 10) || (Math.abs(histResultados[eph - 1] - histResultados[eph]) < 5)) {
        break;
      };
    };

    // Substituicao binaria de jogadores (um de cada time) preparando para a
    // proxima iteracao da funcao de separacao em times
    time0Mod.splice(difMedia[iMinDifMedia].i, 1, (difMedia[iMinDifMedia].jog1));
    time1Mod.splice(difMedia[iMinDifMedia].j, 1, (difMedia[iMinDifMedia].jog0));
    media0 = time0Mod.reduce((soma, p) => soma + p.mmr, 0) / time0.length;
    media1 = time1Mod.reduce((soma, p) => soma + p.mmr, 0) / time1.length;

    // contador de epocas
    eph += 1;
  };
  var resultado = {
    time0: time0Mod,
    time1: time1Mod,
    media0: media0,
    media1: media1,
    eph: eph
  };
  return resultado;
}

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
function jogoPossivel(dados) {
  // Define max e min da lista
  var minMMR = Math.min(...dados.map(j => j.mmr));
  var maxMMR = Math.max(...dados.map(j => j.mmr));

  // indices para os valores max e min da lista
  var iMinMMR = dados.map(j => j.mmr).indexOf(minMMR);
  var iMaxMMR = dados.map(j => j.mmr).indexOf(maxMMR);

  // Diferenca de MMR nao deve passar de 750
  if ((maxMMR - minMMR) > 750) {
    erroGerarTimesMmr([dados[iMinMMR].domObj, dados[iMaxMMR].domObj]);
    return false;
  } else if (dados.length <= 2) {
    erroGerarTimesQuantJogadores();
    return false;
  } else {
    return true;
  }
};

//=============================================================
