## R6-Times

Entrando com Nickname e MMR dos jogadores, o app separa os jogadores em dois times de forma que a diferença da média de MMR entre os dois times seja mínima. Algumas regras devem ser respeitadas na criação dos times: pelo menos 4 jogadores devem existir na tabela e a máxima diferença de MMR entre dois jogadores deve ser 750 pontos.

(Defasado - Api do R6tab deixou de ser pública) Se apenas o nick do jogador for informado, a api do R6tab é acessada e os dados necessários são recuperados.

## GitHub Pages
Acesse em: [https://fabbrito.github.io/r6_times/](https://fabbrito.github.io/r6_times/)

## Todo
- Botão "limpar" deve também limpar os campos do formulário;
- Dois cliques para editar retira um jogador da tabela e o coloca nos campos do formulário para edição. Implemetar retorno dos dados do formulário para a tabela caso o comando de edição seja executado uma segunda vez para outro jogador na tabela;
- Converter a tabela para uma interativa (editável) e trocar a funcionalidade do formulário por um simples botão de adicionar linha na tabela;