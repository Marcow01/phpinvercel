var carrinho = [];
var totalCarrinho = 0;

function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome: nome, preco: preco });
    totalCarrinho += preco;
    atualizarCarrinho();
    atualizarBotoesRemover();
    salvarCarrinhoNoLocalStorage();
}

function removerDoCarrinho(nome, preco) {
    for (var i = 0; i < carrinho.length; i++) {
        if (carrinho[i].nome === nome && carrinho[i].preco === preco) {
            totalCarrinho -= carrinho[i].preco;
            carrinho.splice(i, 1);
            atualizarCarrinho();
            atualizarBotoesRemover();
            salvarCarrinhoNoLocalStorage();
            break;
        }
    }
}

function limparCarrinho() {
    carrinho = [];
    totalCarrinho = 0;
    atualizarCarrinho();
    atualizarBotoesRemover();
    salvarCarrinhoNoLocalStorage();
}

function atualizarCarrinho() {
    var carrinhoElement = document.getElementById("carrinho");
    var totalCarrinhoElement = document.getElementById("total-carrinho");
    var totalCarrinhoModal = document.getElementById("total-modal");
    var numeroItensCarrinhoElement = document.getElementById("numero-itens-carrinho"); // Novo elemento

    carrinhoElement.innerHTML = "";
    carrinho.forEach(function (item) {
        var li = document.createElement("div");
        li.innerHTML = `<div class="bg-yellow-500 p-2 text-white mb-2 rounded-lg flex justify-between"><a>${item.nome}</a> <a>R$ ${item.preco.toFixed(2)}</a></div>`;
        carrinhoElement.appendChild(li);
    });

    totalCarrinhoModal.innerText = totalCarrinho.toFixed(2);
    totalCarrinhoElement.innerText = totalCarrinho.toFixed(2);
    numeroItensCarrinhoElement.innerText = carrinho.length; // Atualiza o número de itens no carrinho
}

function atualizarBotoesRemover() {
    var nomesEPrecosDePizza = [
        { nome: 'Peperoni', preco: 16.00 },
        { nome: 'Quatro queijos', preco: 21.15 },
        { nome: 'Marguerita', preco: 12.00 },
        { nome: 'Moda da casa', preco: 18.40 }
    ];

    nomesEPrecosDePizza.forEach(function (pizza) {
        var botaoRemover = document.getElementById(`remover${pizza.nome.replace(/\s+/g, '')}`);
        if (botaoRemover) {
            botaoRemover.style.display = carrinho.some(function (item) {
                return item.nome === pizza.nome && item.preco === pizza.preco;
            }) ? "flex" : "none";
        }
    });
}

function salvarCarrinhoNoLocalStorage() {
    if (isLocalStorageSupported()) {
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
        localStorage.setItem("totalCarrinho", totalCarrinho.toFixed(2));
    }
}

window.onload = function () {
    if (isLocalStorageSupported()) {
        localStorage.removeItem("carrinho");
        localStorage.removeItem("totalCarrinho");

        var carrinhoJSON = localStorage.getItem("carrinho");
        var totalCarrinhoJSON = localStorage.getItem("totalCarrinho");

        if (carrinhoJSON && totalCarrinhoJSON) {
            carrinho = JSON.parse(carrinhoJSON);
            totalCarrinho = parseFloat(totalCarrinhoJSON);
            atualizarCarrinho();
            atualizarBotoesRemover();
        }
    }
};
