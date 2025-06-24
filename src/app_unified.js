// Dados simulados dos produtos com estoque e validade
// Dados simulados dos produtos com estoque e validade
/*window.productsData = [
    // Ofertas do Dia
    {
        id: 'aveia',
        name: 'Aveia em Flocos',
        price: 1.99,
        originalprice: 4.99,
        image: 'https://phygital-files.mercafacil.com/catalogo/uploads/produto/aveia_flocos_finos_nestle_170g_bedb351d-a636-4689-a3b3-94a5e5fd9863.png',
        stock: 15,
        expirydate: '2025-08-15',
        section: 'menu'
    },
    {
        id: 'ovos',
        name: 'Ovos Vermelhos',
        price: 13.99,
        originalprice: 22.99,
        image: 'https://png.pngtree.com/png-clipart/20230131/ourmid/pngtree-red-egg-ingredients-png-image_6197722.png',
        stock: 5,
        expirydate: '2025-06-30',
        section: 'menu'
    },
    {
        id: 'heineken',
        name: 'Heineken Long',
        price: 20.99,  
        originalprice: 35.99,
        image: 'https://ibassets.com.br/ib.item.image.big/b-695efec747ec4183b4205ace876fbd7f.png',
        stock: 8,
        expirydate: '2025-10-07',
        section: 'menu'
    },
    {
        id: 'tomates',
        name: 'Tomates',
        price: 0.99,
        originalprice: 4.99,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/041/491/389/small/ai-generated-tomato-and-water-drop-isolated-background-png.png',
        stock: 25,
        expirydate: '2025-05-20',
        section: 'menu'
    },
    {
        id: 'arroz',
        name: 'Arroz Camil',
        price: 13.99,
        originalprice: 27.99,
        image: 'https://www.davo.com.br/ccstore/v1/images/?source=/file/v4884597705441539712/products/prod_7896006762027.imagem1.jpg&height=940&width=940',
        stock: 30,
        expirydate: '2025-06-30',
        section: 'menu'
    },
    {
        id: 'danone',
        name: 'Danone 1lt',
        price: 5.99,
        originalprice: 10.99,
        image: 'https://s3-sa-east-1.amazonaws.com/superimg/img.produtos/7891025320555/img_1200_1.png',
        stock: 12,
        expirydate: '2025-07-10',
        section: 'menu'
    },
    {
        id: 'banana',
        name: 'Banana Prata',
        price: 2.49,
        originalprice: 4.99,
        image: 'https://superprix.vteximg.com.br/arquivos/ids/178630/Banana-Prata.png?v=636861955826400000',
        stock: 40,
        expirydate: '2025-05-15',
        section: 'menu'
    },
    {
        id: 'cafe',
        name: 'Café Melitta',
        price: 10.99,
        originalprice: 15.99,
        image: 'https://docesvaz.vtexassets.com/arquivos/ids/162046-800-auto?v=638297934265430000&width=800&height=auto&aspect=true',
        stock: 22,
        expirydate: '2025-06-25',
        section: 'menu'
    },
    {
        id: 'sabao',
        name: 'Sabão em Pó Omo',
        price: 8.99,
        originalprice: 12.99,
        image: 'https://protelimp.com.br/wp-content/uploads/2017/08/sabao-em-po-omo-800g.png',
        stock: 18,
        expirydate: '2025-12-31',
        section: 'menu'
    },
    // Nossos Produtos
    {
        id: 'oleo',
        name: 'Óleo de Soja',
        price: 3.99,
        originalprice: 7.99,
        image: 'https://superprix.vteximg.com.br/arquivos/ids/176449/Oleo-de-Soja-Soya-900ml.png?v=636470371263970000',
        stock: 50,
        expirydate: '2025-09-30',
        section: 'products'
    },
    {
        id: 'leite',
        name: 'Leite Integral',
        price: 2.99,
        originalprice: 4.99,
        image: 'https://www.itambe.com.br/portal/Images/Produto/integraluht_full.png',
        stock: 35,
        expirydate: '2025-06-10',
        section: 'products'
    },
    {
        id: 'pao',
        name: 'Pão de forma',
        price: 0.99,
        originalprice: 3.99,
        image: 'https://s3-sa-east-1.amazonaws.com/superimg/img.produtos/7896002360326/img_1200_1.png',
        stock: 20,
        expirydate: '2025-05-18',
        section: 'products'
    }
];*/
window.productsData = []
fetch('https://prazocerto-backend.onrender.com/produtos')
    .then(response => response.json())
    .then(data => {
      // Atribuindo os dados recebidos à variável global
      window.productsData = data;
      console.log('Dados carregados:', window.productsData);
      loadProducts()
    })
    .catch(error => {
      console.error('Erro ao carregar os produtos:', error);
    });
console.log("script.js: window.productsData definido:", JSON.stringify(window.productsData));
function formatDate(dateString) {
    const [year, month, day] = dateString.split('T')[0].split('-');
    return `${day}/${month}/${year}`;
  }

function loadProducts() {
    console.log("app_unified.js: loadProducts chamada");
    const menuContainer = document.querySelector('#menu .box-container');
    const productsContainer = document.querySelector('#products .box-container');
    if (menuContainer && productsContainer) {
        menuContainer.innerHTML = '';
        productsContainer.innerHTML = '';
        if (!window.productsData || window.productsData.length === 0) {
            console.error('app_unified.js: window.productsData está vazio ou não definido em loadProducts');
            return;
        }
        window.productsData.forEach(product => {
            console.dir(product,{depth: null})
            console.dir(typeof product.expirydate,{depth: null})
            
            const productBox = document.createElement('div');
            productBox.classList.add('box');
            productBox.setAttribute('data-product-id', product.id);
            let productHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <div class="price">R$${Number(product.price).toFixed(2)} <span>R$${Number(product.originalprice).toFixed(2)}</span></div>
                <div class="stock-info">Estoque: <span class="stock-count">${product.stock}</span></div>
                <div class="expiry-info">Validade: ${formatDate(product.expirydate)}</div>
            `;
            if (product.section === 'menu') {
                productHTML += `<a href="#" class="btn add-to-cart-btn" data-product-id="${product.id}">Adicionar no carrinho</a>`;
            } else if (product.section === 'products') {
                productHTML = `
                    <div class="icons">
                        <a href="#" class="fas fa-shopping-cart add-to-cart-btn" data-product-id="${product.id}"></a>
                        <a href="#" class="fas fa-heart"></a>
                        <a href="#" class="fas fa-eye"></a>
                    </div>
                    <div class="image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="content">
                        <h3>${product.name}</h3>
                        <div class="stars">
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star-half-alt"></i>
                        </div>
                        <div class="price">R$${Number(product.price).toFixed(2)} <span>R$${Number(product.originalprice).toFixed(2)}</span></div>
                        <div class="stock-info">Estoque: <span class="stock-count">${product.stock}</span></div>
                        <div class="expiry-info">Validade: ${formatDate(product.expirydate)}</div>
                    </div>
                `;
            }
            productBox.innerHTML = productHTML;
            if (product.section === 'menu') {
                menuContainer.appendChild(productBox);
            } else if (product.section === 'products') {
                productsContainer.appendChild(productBox);
            }
        });
        addEventListenersToCartButtons();
    } else if (window.location.pathname.includes("index.html")) {
        console.error('app_unified.js: Containers de produtos (menu ou products) não encontrados em index.html!');
    }
}

function addEventListenersToCartButtons() {
    console.log("app_unified.js: addEventListenersToCartButtons chamada");
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        newButton.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = newButton.getAttribute('data-product-id');
            console.log("app_unified.js: Botão Adicionar Clicado, productId:", productId);
            if (!window.productsData) {
                console.error('app_unified.js: window.productsData não definido.');
                alert("Erro crítico: Dados de produtos não disponíveis.");
                return;
            }
            const product = window.productsData.find(p => p.id === productId);
            if (product) {
                if (window.addToCart) {
                    window.addToCart(product);
                } else {
                    console.error("app_unified.js: window.addToCart não está definido.");
                    alert("Erro: Função do carrinho não encontrada.");
                }
            } else {
                console.error('app_unified.js: Produto não encontrado em window.productsData:', productId);
            }
        });
    });
}

let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];

function saveCart() {
    try {
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
    } catch (e) {
        console.error("app_unified.js: Erro ao salvar carrinho no localStorage:", e);
    }
}

function updateStockDisplay(productId, newStock) {
    if (!window.productsData) {
        console.warn("app_unified.js: updateStockDisplay - window.productsData não disponível.");
        return;
    }
    const productData = window.productsData.find(p => p.id === productId);
    if (productData) {
        productData.stock = newStock;
    }
    const productBoxes = document.querySelectorAll(`.box[data-product-id="${productId}"]`);
    productBoxes.forEach(productBox => {
        const stockElement = productBox.querySelector(".stock-count");
        if (stockElement) {
            stockElement.textContent = newStock;
        }
        const addButton = productBox.querySelector(".add-to-cart-btn");
        if (addButton) {
            if (newStock <= 0) {
                addButton.disabled = true;
                if (productData && productData.section === 'menu') {
                    addButton.textContent = "Esgotado";
                }
                addButton.style.cursor = "not-allowed";
                addButton.style.opacity = "0.6";
            } else {
                addButton.disabled = false;
                if (productData && productData.section === 'menu') {
                    addButton.textContent = "Adicionar no carrinho";
                }
                addButton.style.cursor = "pointer";
                addButton.style.opacity = "1";
            }
        }
    });
}

window.addToCart = function(productFromButton) {
    console.log("app_unified.js: addToCart INICIADO. Produto:", productFromButton);
    if (!productFromButton || !productFromButton.id) {
        console.error("app_unified.js: Dados do produto inválidos em addToCart.");
        alert("Erro ao adicionar produto (dados inválidos).");
        return;
    }
    if (!window.productsData || !Array.isArray(window.productsData) || window.productsData.length === 0) {
        console.error("app_unified.js: ERRO - window.productsData não disponível ou inválido.");
        alert("Erro interno: dados de produtos não carregados.");
        return;
    }
    const productInGlobalData = window.productsData.find(p => p.id === productFromButton.id);
    if (!productInGlobalData) {
        console.error("app_unified.js: Produto não encontrado em window.productsData:", productFromButton.id);
        alert("Erro ao verificar estoque (produto não encontrado).");
        return;
    }
    if (productInGlobalData.stock <= 0) {
        alert(`Desculpe, ${productInGlobalData.name} está esgotado.`);
        return;
    }
    const existingItemIndex = cart.findIndex(item => item.id === productInGlobalData.id);
    if (existingItemIndex > -1) {
        if (cart[existingItemIndex].quantity < productInGlobalData.stock) { 
            cart[existingItemIndex].quantity += 1;
        } else {
            alert(`Estoque máximo de ${productInGlobalData.name} atingido no carrinho.`);
            return;
        }
    } else {
        cart.push({ ...productInGlobalData, quantity: 1 });
    }
    productInGlobalData.stock -=1; 
    saveCart();
    updateCartDisplay();
    updateStockDisplay(productInGlobalData.id, productInGlobalData.stock);
    console.log("app_unified.js: addToCart FINALIZADO. Carrinho:", cart);
};

window.decrementItemInCart = function(productId) {
    console.log("app_unified.js: decrementItemInCart, ID:", productId);
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const productInGlobalData = window.productsData.find(p => p.id === productId);
        if (cart[itemIndex].quantity > 1) {
            cart[itemIndex].quantity -= 1;
            if (productInGlobalData) productInGlobalData.stock += 1;
        } else {
            if (productInGlobalData) productInGlobalData.stock += cart[itemIndex].quantity; 
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartDisplay();
        if (productInGlobalData) updateStockDisplay(productId, productInGlobalData.stock);
    }
};

window.incrementItemInCart = function(productId) {
    console.log("app_unified.js: incrementItemInCart, ID:", productId);
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const productInGlobalData = window.productsData.find(p => p.id === productId);
        if (productInGlobalData && productInGlobalData.stock > 0) {
            cart[itemIndex].quantity += 1;
            productInGlobalData.stock -= 1;
            saveCart();
            updateCartDisplay();
            updateStockDisplay(productId, productInGlobalData.stock);
        } else {
            alert("Estoque esgotado para este item.");
        }
    }
};

window.removeItemCompletely = function(productId) {
    console.log("app_unified.js: removeItemCompletely, ID:", productId);
    const itemIndex = cart.findIndex(item => item.id === productId);
    if (itemIndex > -1) {
        const removedItem = cart[itemIndex];
        const productInGlobalData = window.productsData.find(p => p.id === productId);
        if (productInGlobalData) {
            productInGlobalData.stock += removedItem.quantity;
            updateStockDisplay(productId, productInGlobalData.stock);
        }
        cart.splice(itemIndex, 1);
        saveCart();
        updateCartDisplay();
    }
};

function updateCartDisplay() {
    console.log("app_unified.js: updateCartDisplay INICIADO. Path:", window.location.pathname, "Carrinho:", JSON.stringify(cart));
    let itemCount = 0;
    cart.forEach(item => itemCount += item.quantity);

    const cartQuantityPopup = document.getElementById("cart-quantity-popup");
    if (cartQuantityPopup) {
        cartQuantityPopup.textContent = itemCount;
        cartQuantityPopup.style.display = itemCount > 0 ? "flex" : "none";
    }

    if (window.location.pathname.includes("cart.html")) {
        console.log("app_unified.js: Atualizando página cart.html. Itens no carrinho:", cart.length);
        const currentPageCartItemsDisplay = document.getElementById("cart-items-display");
        const currentPageCartTotalDisplay = document.getElementById("cart-total-display");

        if (!currentPageCartItemsDisplay) console.error("app_unified.js: Elemento cart-items-display NÃO encontrado em cart.html!");
        if (!currentPageCartTotalDisplay) console.error("app_unified.js: Elemento cart-total-display NÃO encontrado em cart.html!");

        if (currentPageCartItemsDisplay && currentPageCartTotalDisplay) {
            console.log("app_unified.js: Elementos de display do carrinho encontrados em cart.html.");
            currentPageCartItemsDisplay.innerHTML = '';
            let pageTotal = 0;
            if (cart.length === 0) {
                console.log("app_unified.js: Carrinho vazio, mostrando mensagem.");
                currentPageCartItemsDisplay.innerHTML = "<p class='empty-cart-message'>Seu carrinho está vazio. <a href='index.html'>Continue comprando!</a></p>";
                currentPageCartTotalDisplay.innerHTML = '';
            } else {
                console.log("app_unified.js: Carrinho com itens, construindo tabela.");
                const table = document.createElement("table");
                table.classList.add("cart-table");
                table.innerHTML = `
                    <thead>
                        <tr>
                            <th>Produto</th>
                            <th>Nome</th>
                            <th>Preço Unit.</th>
                            <th>Quantidade</th>
                            <th>Subtotal</th>
                            <th>Remover</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                `;
                const tbody = table.querySelector("tbody");
                cart.forEach(item => {
                    const itemSubtotal = item.price * item.quantity;
                    pageTotal += itemSubtotal;
                    const row = tbody.insertRow();
                    row.innerHTML = `
                        <td><img src="${item.image}" alt="${item.name}" class="cart-page-item-image"></td>
                        <td>${item.name}</td>
                        <td>R$ ${Number(item.price).toFixed(2)}</td>
                        <td>
                            <button class="quantity-btn" onclick="window.decrementItemInCart('${item.id}')">-</button>
                            <span class="item-quantity">${item.quantity}</span>
                            <button class="quantity-btn" onclick="window.incrementItemInCart('${item.id}')">+</button>
                        </td>
                        <td>R$ ${Number(itemSubtotal).toFixed(2)}</td>
                        <td><button class="remove-item-btn fas fa-times" onclick="window.removeItemCompletely('${item.id}')"></button></td>
                    `;
                });
                currentPageCartItemsDisplay.appendChild(table);
                currentPageCartTotalDisplay.innerHTML = `<h3>Total do Pedido: R$ ${Number(pageTotal).toFixed(2)}</h3>`;
            }
            const checkoutButtonOnCartPage = document.getElementById("checkout-button");
            if(checkoutButtonOnCartPage) {
                checkoutButtonOnCartPage.disabled = cart.length === 0;
                checkoutButtonOnCartPage.style.cursor = cart.length === 0 ? "not-allowed" : "pointer";
                checkoutButtonOnCartPage.style.opacity = cart.length === 0 ? 0.6 : 1;
            }
        } else {
            console.error("app_unified.js: Elementos da página do carrinho (cart-items-display ou cart-total-display) NÃO encontrados em cart.html! A renderização não ocorrerá.");
        }
    }
    console.log("app_unified.js: updateCartDisplay FINALIZADO.");
}

let navbar = document.querySelector(".navbar");
let searchForm = document.querySelector(".search-form");
let searchBox = document.querySelector("#search-box");

if(document.querySelector("#menu-btn")) {
    document.querySelector("#menu-btn").onclick = () => {
        if(navbar) navbar.classList.toggle("active");
        if(searchForm) searchForm.classList.remove("active");
    };
}

if(document.querySelector("#search-btn")) {
    document.querySelector("#search-btn").onclick = () => {
        if(searchForm) searchForm.classList.toggle("active");
        if(navbar) navbar.classList.remove("active");
        if (searchForm && searchForm.classList.contains("active")) {
            if(searchBox) searchBox.focus(); 
        }
    };
}

if (document.querySelector("#cart-btn")) {
    document.querySelector("#cart-btn").onclick = (e) => {
      e.preventDefault(); 
      window.location.href = 'cart.html';
    };
}

window.onscroll = () => {
  if(navbar) navbar.classList.remove("active");
  if(searchForm) searchForm.classList.remove("active");
};

const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    if (!name || !email || !phone) {
        alert("Por favor, preencha todos os campos de contato.");
        return;
    }
    let message = `Olá, tudo bem? Me chamo ${name}, meu e-mail é ${email} e meu número é ${phone}.`;
    let url = `https://wa.me/5561999882479?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  });
}

if (searchBox) {
    searchBox.addEventListener("input", function () {
      const searchTerm = searchBox.value.toLowerCase().trim();
      const productBoxes = document.querySelectorAll("#menu .box, #products .box");
      productBoxes.forEach((box) => {
        const productNameElement = box.querySelector("h3");
        if (productNameElement) {
            const productName = productNameElement.textContent.toLowerCase();
            if (productName.includes(searchTerm)) {
                box.style.display = ""; 
            } else {
                box.style.display = "none"; 
            }
        }
      });
    });
}

const commentForm = document.getElementById('comment-form');
const commentsList = document.getElementById('comments-list');

function loadComments() {
    if (!commentsList) return; 
    const savedComments = JSON.parse(localStorage.getItem('userComments')) || [];
    commentsList.innerHTML = ''; 
    if (savedComments.length === 0) {
        commentsList.innerHTML = '<p>Ainda não há comentários. Seja o primeiro!</p>';
    } else {
        savedComments.forEach(comment => {
            const commentElement = document.createElement('div');
            commentElement.classList.add('comment-item'); 
            commentElement.innerHTML = `
                <p><strong>${comment.name}:</strong> ${comment.text}</p>
                <small>${new Date(comment.timestamp).toLocaleString('pt-BR')}</small>
            `;
            commentsList.appendChild(commentElement);
        });
    }
}

if (commentForm) {
    commentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('comment-name');
        const textInput = document.getElementById('comment-text');
        const newComment = {
            name: nameInput.value,
            text: textInput.value,
            timestamp: new Date()
        };
        const savedComments = JSON.parse(localStorage.getItem('userComments')) || [];
        savedComments.push(newComment);
        localStorage.setItem('userComments', JSON.stringify(savedComments));
        nameInput.value = '';
        textInput.value = '';
        loadComments();
    });
}

const dynamicStyle = document.createElement('style');
dynamicStyle.textContent = `
.stock-info, .expiry-info {
    font-size: 1.2rem; 
    color: #666; 
    margin-top: 0.5rem;
}
.stock-count {
    font-weight: bold;
}
`;
document.head.appendChild(dynamicStyle);

document.addEventListener('DOMContentLoaded', () => {
    console.log("app_unified.js: DOMContentLoaded. Path:", window.location.pathname);
    if (window.location.pathname.includes("index.html") || window.location.pathname === "/") {
        loadProducts(); 
    }
    if (typeof loadComments === 'function') {
        loadComments();
    }
    updateCartDisplay();

    function initializeStockDisplayOnLoad() {
        if (window.productsData && Array.isArray(window.productsData) && window.productsData.length > 0) {
            console.log("app_unified.js: Atualizando display inicial do estoque (DOMContentLoaded)...");
            window.productsData.forEach(p => updateStockDisplay(p.id, p.stock));
        } else {
            console.warn("app_unified.js: window.productsData não disponível ou vazio no DOMContentLoaded. Tentando novamente em 500ms.");
            setTimeout(() => {
                 if (window.productsData && Array.isArray(window.productsData) && window.productsData.length > 0) {
                    console.log("app_unified.js: Atualizando display inicial do estoque (atrasado)...");
                    window.productsData.forEach(p => updateStockDisplay(p.id, p.stock));
                } else {
                     console.error("app_unified.js: Falha ao carregar window.productsData para inicializar estoque, mesmo após atraso.");
                }
            }, 500);
        }
    }
    if (!window.location.pathname.includes("cart.html")) {
        initializeStockDisplayOnLoad();
    }
});

