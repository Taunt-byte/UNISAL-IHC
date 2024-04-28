// Array de produtos com descrição e preço
var produtos = [
  {
    descricao: "Harry Potter e a Pedra Filosofal",
    preco: 39.9,
    imagem: "https://m.media-amazon.com/images/I/51lRMYwP-4L.jpg",
  },
  {
    descricao: "O Senhor dos Anéis: A Sociedade do Anel",
    preco: 49.9,
    imagem:
      "https://m.media-amazon.com/images/I/81MZ8OjmQrL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    descricao: "Cem Anos de Solidão",
    preco: 29.9,
    imagem:
      "https://m.media-amazon.com/images/I/817esPahlrL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    descricao: "Dom Quixote",
    preco: 34.9,
    imagem:
      "https://m.media-amazon.com/images/I/71LzWaIbBoL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    descricao: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa",
    preco: 24.9,
    imagem:
      "https://m.media-amazon.com/images/I/7158aW38zxL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    descricao: "O Pequeno Príncipe",
    preco: 19.9,
    imagem:
      "https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg",
  },
  {
    descricao: "Revista Veja - Edição Especial",
    preco: 9.9,
    imagem:
      "https://veja.abril.com.br/wp-content/uploads/2018/09/capa-25611.jpg?quality=90&strip=info&w=570&h=750&crop=1",
  },
  {
    descricao: "Revista National Geographic - Edição de Janeiro",
    preco: 12.9,
    imagem:
      "https://m.media-amazon.com/images/I/71BBlSghI2L._AC_UF894,1000_QL80_.jpg",
  },
  {
    descricao: "Revista Super Interessante - Edição Limitada",
    preco: 7.9,
    imagem:
      "https://super.abril.com.br/wp-content/uploads/2023/02/SI_448_CAPA.png?w=1024",
  },
];

var promocao = [
  {
    descricao: "Harry Potter e a Pedra Filosofal",
    preco: 39.9,
    new: 23.5,
    imagem: "https://m.media-amazon.com/images/I/51lRMYwP-4L.jpg",
  },
  {
    descricao: "O Pequeno Príncipe",
    preco: 19.9,
    new: 14.5,
    imagem:
      "https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg",
  },
];
// Função para gerar os produtos no HTML
function gerarProdutos() {
  var container = document.getElementById("produtos");
  produtos.forEach(function (produto) {
    var produtoHTML = `
          <div class="produto">
              <h2>${produto.descricao}</h2>
              <img class="imagem-produto" src="${produto.imagem}">
              <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
          </div>
      `;
    container.innerHTML += produtoHTML;
  });
}
function gerarPromo() {
  var container = document.getElementById("promocao");
  promocao.forEach(function (promocao) {
    var promocaoHTML = `
    <div class="promocao">
    <h2>${promocao.descricao}</h2>
    <img class="imagem-produto" src="${promocao.imagem}">
    <p>Preço: R$ ${promocao.preco.toFixed(2)}</p>
    <p>Novo Preço: R$ ${promocao.new.toFixed(2)}</p>
</div>
    
    `;
    container.innerHTML += promocaoHTML;
  });
}
// Chama a função para gerar os produtos ao carregar a página
window.onload = function() {
  gerarProdutos();
  gerarPromo();
};
