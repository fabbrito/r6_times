const dadosExemplo = [
  { nick: "Kaeiel" },
  { nick: "LusouGamer.DS" },
  { nick: "Kaeiel-." },
  { nick: "KznsK." },
  { nick: "Kvack." },
  { nick: "Lanzaaaaa" },
  { nick: "DeusNooB.." },
  { nick: "Snow_._" },
  { nick: "Fumacinha-." },
  { nick: "porc0-." },
];

//=============================================================
function randomMmrGenerator() {
  return Math.floor(2250 + Math.random() * 500);
}

//=============================================================
function criaTabelaComDados(dados) {
  dados.forEach((objJogador, i) => {
    objJogador.mmr = randomMmrGenerator();
    adicionaJogadorTabela(objJogador);
  });
}

//=============================================================
function criaTabelaAleatoria() {
  for (let i = 0; i < 10; i++) {
    var objJogador = {};
    objJogador.nick = "Jogador_" + String.fromCharCode(65 + i);
    objJogador.mmr = randomMmrGenerator();
    adicionaJogadorTabela(objJogador);
  }
}
