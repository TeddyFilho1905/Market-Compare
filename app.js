let markets = [];


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

function handleSearchKey(event) {
    if (event.key === "Enter") {
        alert("Buscando por: " + document.getElementById("heroSearch").value);
    }
}

function findProduct(input) {
    // mais tarde podemos implementar autocomplete real
    console.log("Digitando: " + input.value);
}

// auto complete
// Lista real de produtos (podemos expandir depois)
const productList = [
    "Arroz",
    "Feijão",
    "Leite",
    "Açúcar",
    "Café",
    "Macarrão",
    "Óleo de Soja",
    "Farinha",
    "Detergente",
    "Sabonete",
    "Biscoito",
    "Carnes",
    "Ovos",
    "Queijo",
    "Manteiga"
];

let currentSuggestionIndex = -1;

function showSuggestions(text) {
    const box = document.getElementById("autocomplete-list");
    box.innerHTML = "";
    box.style.display = "none";
    currentSuggestionIndex = -1;

    const inputValue = text.toLowerCase().trim();
    if (inputValue.length === 0) return;

    const suggestions = productList.filter(item =>
        item.toLowerCase().startsWith(inputValue)
    );

    if (suggestions.length === 0) return;

    box.style.display = "block";

    suggestions.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;

        li.onclick = () => {
            document.getElementById("heroSearch").value = item;
            box.style.display = "none";
        };

        box.appendChild(li);
    });
}


function navigateSuggestions(event) {
    const box = document.getElementById("autocomplete-list");
    const items = box.getElementsByTagName("li");

    if (items.length === 0) return;

    if (event.key === "ArrowDown") {
        currentSuggestionIndex = (currentSuggestionIndex + 1) % items.length;
    } 
    else if (event.key === "ArrowUp") {
        currentSuggestionIndex = (currentSuggestionIndex - 1 + items.length) % items.length;
    }
    else if (event.key === "Enter") {
        event.preventDefault();
        if (currentSuggestionIndex >= 0) {
            items[currentSuggestionIndex].click();
        }
        return;
    } else {
        return;
    }

    for (let i = 0; i < items.length; i++) {
        items[i].classList.remove("active");
    }

    items[currentSuggestionIndex].classList.add("active");
}

function selectCurrentSuggestion() {
    const box = document.getElementById("autocomplete-list");
    const items = box.getElementsByTagName("li");

    if (currentSuggestionIndex >= 0) {
        items[currentSuggestionIndex].click();
    }
}

// Caminho local do arquivo JSON
const PRODUCTS_URL = "./products.json";

// Lista principal carregada do JSON
let products = [];

// Carrega os dados ao iniciar o app
fetch(PRODUCTS_URL)
  .then(response => response.json())
  .then(data => {
    products = data;          // salva os produtos na memória
    renderProducts(products); // exibe todos assim que carregar
  })
  .catch(error => console.error("Erro ao carregar products.json:", error));


// Renderiza lista completa ou filtrada
function renderProducts(list) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  list.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <h3>${product.name}</h3>
      <p>Preço: R$ ${product.price}</p>
      <p>Categoria: ${product.category}</p>
      <p>Mercado: ${product.market}</p>
    `;

    container.appendChild(card);
  });
}


// Filtro por categoria
document.getElementById("filter-category").addEventListener("change", function () {
  const selected = this.value;

  if (selected === "") {
    renderProducts(products); // sem filtro
  } else {
    const filtered = products.filter(p => p.category === selected);
    renderProducts(filtered);
  }
});
