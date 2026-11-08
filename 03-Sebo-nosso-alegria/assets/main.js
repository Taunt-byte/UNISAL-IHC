/* ==================================================
   SEBO NOSSA ALEGRIA
   Arquivo principal de funcionalidades
================================================== */


/* ==================================================
   1. BASE DE DADOS DOS PRODUTOS
================================================== */

// Catálogo completo de livros e revistas disponíveis.
const produtos = [
    {
        descricao: "Harry Potter e a Pedra Filosofal",
        preco: 39.90,
        imagem: "https://m.media-amazon.com/images/I/51lRMYwP-4L.jpg"
    },
    {
        descricao: "O Senhor dos Anéis: A Sociedade do Anel",
        preco: 49.90,
        imagem: "https://m.media-amazon.com/images/I/81MZ8OjmQrL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        descricao: "Cem Anos de Solidão",
        preco: 29.90,
        imagem: "https://m.media-amazon.com/images/I/817esPahlrL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        descricao: "Dom Quixote",
        preco: 34.90,
        imagem: "https://m.media-amazon.com/images/I/71LzWaIbBoL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        descricao: "As Crônicas de Nárnia: O Leão, a Feiticeira e o Guarda-Roupa",
        preco: 24.90,
        imagem: "https://m.media-amazon.com/images/I/7158aW38zxL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        descricao: "O Pequeno Príncipe",
        preco: 19.90,
        imagem: "https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg"
    },
    {
        descricao: "Revista Veja - Edição Especial",
        preco: 9.90,
        imagem: "https://veja.abril.com.br/wp-content/uploads/2018/09/capa-25611.jpg?quality=90&strip=info&w=570&h=750&crop=1"
    },
    {
        descricao: "Revista National Geographic - Edição de Janeiro",
        preco: 12.90,
        imagem: "https://m.media-amazon.com/images/I/71BBlSghI2L._AC_UF894,1000_QL80_.jpg"
    },
    {
        descricao: "Revista Super Interessante - Edição Limitada",
        preco: 7.90,
        imagem: "https://super.abril.com.br/wp-content/uploads/2023/02/SI_448_CAPA.png?w=1024"
    }
];


/* ==================================================
   2. BASE DE DADOS DAS PROMOÇÕES
================================================== */

// Livros selecionados para aparecer no carrossel.
const promocao = [
    {
        descricao: "Harry Potter e a Pedra Filosofal",
        preco: 39.90,
        precoPromocional: 23.50,
        imagem: "https://m.media-amazon.com/images/I/51lRMYwP-4L.jpg"
    },
    {
        descricao: "O Pequeno Príncipe",
        preco: 19.90,
        precoPromocional: 14.50,
        imagem: "https://m.media-amazon.com/images/I/71LJ4k-k9hL._AC_UF1000,1000_QL80_.jpg"
    }
];


/* ==================================================
   3. FORMATAÇÃO DE PREÇOS
================================================== */

// Formata os valores no padrão monetário brasileiro.
function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


/* ==================================================
   4. CRIAÇÃO DOS CARTÕES DE PRODUTOS
================================================== */

// Cria um cartão HTML para cada livro ou revista.
function criarCardProduto(produto, destaque = false) {

    // Cria o elemento principal do cartão.
    const card = document.createElement("article");

    card.classList.add("produto");

    // Cria a imagem da capa.
    const imagem = document.createElement("img");

    imagem.classList.add("imagem-produto");
    imagem.src = produto.imagem;
    imagem.alt = `Capa de ${produto.descricao}`;
    imagem.loading = "lazy";
    imagem.decoding = "async";

    // Cria o título do produto.
    const titulo = document.createElement("h3");

    titulo.textContent = produto.descricao;

    // Insere os elementos básicos no cartão.
    card.appendChild(imagem);
    card.appendChild(titulo);

    // Verifica se o produto pertence às promoções.
    if (destaque) {

        // Selo visual para identificar a oferta.
        const selo = document.createElement("span");

        selo.classList.add("selo-oferta");
        selo.textContent = "Oferta especial";

        // Preço original.
        const precoOriginal = document.createElement("p");

        precoOriginal.classList.add("preco-antigo");
        precoOriginal.textContent = formatarPreco(produto.preco);

        // Preço promocional.
        const precoNovo = document.createElement("p");

        precoNovo.classList.add("preco-promocional");
        precoNovo.textContent = formatarPreco(
            produto.precoPromocional
        );

        // Adiciona os elementos de preço ao cartão.
        card.appendChild(selo);
        card.appendChild(precoOriginal);
        card.appendChild(precoNovo);

    } else {

        // Preço normal dos produtos do catálogo.
        const preco = document.createElement("p");

        preco.classList.add("preco");
        preco.textContent = formatarPreco(produto.preco);

        card.appendChild(preco);

    }

    return card;

}


/* ==================================================
   5. GERAÇÃO DO CATÁLOGO
================================================== */

// Insere todos os produtos na seção correspondente.
function gerarProdutos() {

    const container = document.getElementById("produtos");

    // Verifica se o elemento existe.
    if (!container) return;

    // Limpa o conteúdo antes de renderizar.
    container.replaceChildren();

    // Percorre o catálogo e cria os cartões.
    produtos.forEach(function (produto) {

        const card = criarCardProduto(produto);

        container.appendChild(card);

    });

}


/* ==================================================
   6. GERAÇÃO DAS PROMOÇÕES
================================================== */

// Insere os livros promocionais no carrossel.
function gerarPromo() {

    const container = document.getElementById("promocao");

    // Verifica se o carrossel existe.
    if (!container) return;

    // Remove conteúdos anteriores.
    container.replaceChildren();

    // Percorre as promoções.
    promocao.forEach(function (produto) {

        const card = criarCardProduto(produto, true);

        container.appendChild(card);

    });

    // Atualiza os controles após inserir os produtos.
    atualizarBotoesCarrossel();

}


/* ==================================================
   7. CARROSSEL DE DESTAQUES
================================================== */

// Recupera os elementos de navegação.
const carousel = document.getElementById("promocao");

const previousButton = document.getElementById("carousel-prev");

const nextButton = document.getElementById("carousel-next");


// Calcula a distância necessária para avançar um cartão.
function getScrollDistance() {

    const firstCard = carousel?.querySelector(".produto");

    if (!firstCard) {
        return carousel.clientWidth * 0.8;
    }

    const cardWidth = firstCard.getBoundingClientRect().width;

    const gap = parseFloat(
        getComputedStyle(carousel).columnGap
    ) || 0;

    return cardWidth + gap;

}


// Atualiza os estados dos botões de navegação.
function atualizarBotoesCarrossel() {

    if (!carousel || !previousButton || !nextButton) return;

    const maxScroll = carousel.scrollWidth - carousel.clientWidth;

    previousButton.disabled = carousel.scrollLeft <= 2;

    nextButton.disabled = carousel.scrollLeft >= maxScroll - 2;

}


// Navegação para os livros anteriores.
if (previousButton && carousel) {

    previousButton.addEventListener("click", function () {

        carousel.scrollBy({
            left: -getScrollDistance(),
            behavior: "smooth"
        });

    });

}


// Navegação para os próximos livros.
if (nextButton && carousel) {

    nextButton.addEventListener("click", function () {

        carousel.scrollBy({
            left: getScrollDistance(),
            behavior: "smooth"
        });

    });

}


// Atualiza os botões durante a rolagem.
if (carousel) {

    carousel.addEventListener(
        "scroll",
        atualizarBotoesCarrossel
    );

    window.addEventListener(
        "resize",
        atualizarBotoesCarrossel
    );

}


/* ==================================================
   8. MODO ESCURO
================================================== */

// Recupera o botão de alternância de tema.
const themeToggle = document.getElementById("theme-toggle");


// Atualiza o texto e o estado acessível do botão.
function atualizarBotaoTema() {

    if (!themeToggle) return;

    const darkMode = document.body.classList.contains("dark-mode");

    themeToggle.setAttribute("aria-pressed", darkMode);

    themeToggle.setAttribute(
        "aria-label",
        darkMode ? "Ativar modo claro" : "Ativar modo escuro"
    );

    themeToggle.innerHTML = darkMode
        ? '<span aria-hidden="true">☀️</span><span class="theme-label">Modo claro</span>'
        : '<span aria-hidden="true">🌙</span><span class="theme-label">Modo escuro</span>';

}


// Recupera a preferência de tema salva pelo usuário.
const temaSalvo = localStorage.getItem("tema");

// Aplica o tema salvo, caso exista.
if (temaSalvo === "escuro") {

    document.body.classList.add("dark-mode");

}

// Atualiza a aparência inicial do botão.
atualizarBotaoTema();


// Alterna o tema quando o botão é acionado.
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-mode");

        const darkMode = document.body.classList.contains("dark-mode");

        // Salva a preferência para a próxima visita.
        localStorage.setItem(
            "tema",
            darkMode ? "escuro" : "claro"
        );

        // Atualiza o botão.
        atualizarBotaoTema();

    });

}


/* ==================================================
   9. INICIALIZAÇÃO DA APLICAÇÃO
================================================== */

// Executa as funções quando o HTML estiver disponível.
function inicializarLoja() {

    gerarProdutos();

    gerarPromo();

}

// Inicializa a loja.
inicializarLoja();
