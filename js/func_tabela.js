//=============================================================
function montaTd(dado, classe, tdEditavel = false) {
  var td = document.createElement("td");
  td.classList.add(classe);
  td.textContent = dado;
  if (tdEditavel) {
    td.setAttribute("contenteditable", "true");
  }
  return td;
}

//=============================================================
function montaTdLixeira() {
  var td = document.createElement("td");
  td.classList.add("info-remover");

  var img = document.createElement("img");
  img.classList.add("info-remover-lixeira");
  img.src = "img/garbageIcon.svg";

  // Clique na imagem da lixeira faz apagar (remover) a respectiva linha da tabela
  img.addEventListener("click", function (event) {
    // fcn em gerenciador_erros.js
    limpaErros(); // Limpa lista de erros
    limpaAlertasErro(); // Limpa o highlight de erros
    limpaResultadoTimes(); // Limpa o resultado da separacao em times

    event.preventDefault();
    // this --> dono do evento
    // event.target --> alvo do evento
    // event.target.parentNode --> pai do alvo do evento

    // efeito de transição
    event.target.parentNode.parentNode.classList.add("fadeOut");
    // timeout para o efeito aplicado
    setTimeout(function () {
      event.target.parentNode.parentNode.remove();
    }, 300);
  });

  td.appendChild(img);
  return td;
}

//=============================================================
function montaTr(objJogador) {
  var tr = document.createElement("tr");
  tr.classList.add("jogador");

  tr.appendChild(montaTd(objJogador.nick, "info-nick", true));
  tr.appendChild(montaTd(objJogador.mmr, "info-mmr", true));
  tr.appendChild(montaTd(objJogador.time, "info-time"));
  tr.appendChild(montaTdLixeira());
  return tr;
}

//=============================================================
function adicionaJogadorTabela(objJogador) {
  // Verifica se a key="time" existe no objeto
  if (!("time" in objJogador)) {
    objJogador.time = "?";
  }
  // Monta nova linha da tabela
  var tr = montaTr(objJogador);
  // Adiciona a nova linha criada
  var tabela = document.querySelector("#tabela-jogadores");
  tabela.appendChild(tr);
}
