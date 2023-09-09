function carregarCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];
    let total = 0;

    const carrinhoList = document.getElementById("carrinho");
    carrinhoList.innerHTML = "";

    carrinho.forEach((item) => {
        total += parseFloat(item.preco);

        var li = document.createElement("div");
        li.innerHTML = `<div class="bg-yellow-500 p-2 text-white mb-2 rounded-lg flex justify-between"><a>${item.nome}</a> <a>R$ ${item.preco.toFixed(2)}</a></div>`;
        carrinhoList.appendChild(li);
    });

    const totalFormatado = total.toFixed(2);
    document.getElementById("total").textContent = `R$ ${totalFormatado}`;
}
function limparCarrinho() {
    localStorage.removeItem("carrinho");
    carregarCarrinho();
}

carregarCarrinho();