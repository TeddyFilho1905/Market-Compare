let markets = [];
let products = [];

function addMarket() {
    const input = document.getElementById("marketName");
    const name = input.value.trim();
    if (name === "") return;
    markets.push(name);
    input.value = "";
    renderMarkets();
}

function addProduct() {
    const input = document.getElementById("productName");
    const name = input.value.trim();
    if (name === "") return;
    products.push(name);
    input.value = "";
    renderProducts();
}

function renderMarkets() {
    const list = document.getElementById("marketList");
    if (!list) return;
    list.innerHTML = "";
    markets.forEach((m, idx) => {
        const li = document.createElement("li");
        li.textContent = m;
        list.appendChild(li);
    });
}

function renderProducts() {
    const list = document.getElementById("productList");
    if (!list) return;
    list.innerHTML = "";
    products.forEach((p, idx) => {
        const li = document.createElement("li");
        li.textContent = p;
        list.appendChild(li);
    });
}

function comparePrices() {
    const prodName = document.getElementById("searchProd").value.trim();
    const div = document.getElementById("compareResults");
    if (!prodName) {
        div.innerHTML = "<p>Digite o nome do produto para buscar.</p>";
        return;
    }

    // Mock: gera preços aleatórios para demonstração
    const mockData = [
        { market: "Mercado Azul", price: (Math.random() * 10 + 5).toFixed(2) },
        { market: "Mercado Verde", price: (Math.random() * 10 + 5).toFixed(2) },
        { market: "Mercado Central", price: (Math.random() * 10 + 5).toFixed(2) }
    ].sort((a,b) => parseFloat(a.price) - parseFloat(b.price));

    div.innerHTML = `<h3>Resultados para: ${escapeHtml(prodName)}</h3>` +
        mockData.map(m => `<div class="result"><strong>${m.market}</strong> — R$ ${m.price}</div>`).join("");
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}
