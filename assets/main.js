// Array de produtos com descrição e preço
var produtos = [
  { descricao: "Livro 1", preco: 20.5 },
  { descricao: "Livro 2", preco: 15.75 },
  { descricao: "Livro 3", preco: 20.5 },
  { descricao: "Livro 4", preco: 15.5 },
  { descricao: "Livro 5", preco: 20.0 },
  { descricao: "Livro 6", preco: 20.75 },
  { descricao: "Revista 1", preco: 5.0 },
  { descricao: "Revista 2", preco: 5.0 },
  { descricao: "Revista 3", preco: 5.0 },
];

// Função para gerar os produtos no HTML
function gerarProdutos() {
  var container = document.getElementById("produtos");

  produtos.forEach(function (produto) {
    var produtoHTML = `
                    <div class="produto">
                        <h2>${produto.descricao}</h2>
                        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
                    </div>
                `;
    container.innerHTML += produtoHTML;
  });
}

// Chama a função para gerar os produtos ao carregar a página
window.onload = gerarProdutos;
// Função para alternar entre os modos claro e escuro
function alternarModoEscuro() {
    document.body.classList.toggle('modo-escuro');
}

// Adiciona um evento de clique ao botão para chamar a função
document.getElementById('modo-escuro').addEventListener('click', alternarModoEscuro);
