// Dados simulados dos produtos com estoque e validade
window.productsData = [
    // Ofertas do Dia
    {
        id: 'aveia',
        name: 'Aveia em Flocos',
        price: 1.99,
        originalPrice: 4.99,
        image: 'https://phygital-files.mercafacil.com/catalogo/uploads/produto/aveia_flocos_finos_nestle_170g_bedb351d-a636-4689-a3b3-94a5e5fd9863.png',
        stock: 15,
        expiryDate: '2025-08-15',
        section: 'menu'
    },
    {
        id: 'ovos',
        name: 'Ovos Vermelhos',
        price: 13.99,
        originalPrice: 22.99,
        image: 'https://png.pngtree.com/png-clipart/20230131/ourmid/pngtree-red-egg-ingredients-png-image_6197722.png',
        stock: 5,
        expiryDate: '2025-06-30',
        section: 'menu'
    },
    {
        id: 'heineken',
        name: 'Heineken Long',
        price: 20.99,
        originalPrice: 35.99,
        image: 'https://ibassets.com.br/ib.item.image.big/b-695efec747ec4183b4205ace876fbd7f.png',
        stock: 8,
        expiryDate: '2025-10-07',
        section: 'menu'
    },
    {
        id: 'tomates',
        name: 'Tomates',
        price: 0.99,
        originalPrice: 4.99,
        image: 'https://static.vecteezy.com/system/resources/thumbnails/041/491/389/small/ai-generated-tomato-and-water-drop-isolated-background-png.png',
        stock: 25,
        expiryDate: '2025-05-20',
        section: 'menu'
    },
    {
        id: 'arroz',
        name: 'Arroz Camil',
        price: 13.99,
        originalPrice: 27.99,
        image: 'https://www.davo.com.br/ccstore/v1/images/?source=/file/v4884597705441539712/products/prod_7896006762027.imagem1.jpg&height=940&width=940',
        stock: 30,
        expiryDate: '2025-06-30',
        section: 'menu'
    },
    {
        id: 'danone',
        name: 'Danone 1lt',
        price: 5.99,
        originalPrice: 10.99,
        image: 'https://s3-sa-east-1.amazonaws.com/superimg/img.produtos/7891025320555/img_1200_1.png',
        stock: 12,
        expiryDate: '2025-07-10',
        section: 'menu'
    },
    {
        id: 'banana',
        name: 'Banana Prata',
        price: 2.49,
        originalPrice: 4.99,
        image: 'https://superprix.vteximg.com.br/arquivos/ids/178630/Banana-Prata.png?v=636861955826400000',
        stock: 40,
        expiryDate: '2025-05-15',
        section: 'menu'
    },
    {
        id: 'cafe',
        name: 'Café Melitta',
        price: 10.99,
        originalPrice: 15.99,
        image: 'https://docesvaz.vtexassets.com/arquivos/ids/162046-800-auto?v=638297934265430000&width=800&height=auto&aspect=true',
        stock: 22,
        expiryDate: '2025-06-25',
        section: 'menu'
    },
    {
        id: 'sabao',
        name: 'Sabão em Pó Omo',
        price: 8.99,
        originalPrice: 12.99,
        image: 'https://protelimp.com.br/wp-content/uploads/2017/08/sabao-em-po-omo-800g.png',
        stock: 18,
        expiryDate: '2025-12-31',
        section: 'menu'
    },
    // Nossos Produtos
    {
        id: 'oleo',
        name: 'Óleo de Soja',
        price: 3.99,
        originalPrice: 7.99,
        image: 'https://superprix.vteximg.com.br/arquivos/ids/176449/Oleo-de-Soja-Soya-900ml.png?v=636470371263970000',
        stock: 50,
        expiryDate: '2025-09-30',
        section: 'products'
    },
    {
        id: 'leite',
        name: 'Leite Integral',
        price: 2.99,
        originalPrice: 4.99,
        image: 'https://www.itambe.com.br/portal/Images/Produto/integraluht_full.png',
        stock: 35,
        expiryDate: '2025-06-10',
        section: 'products'
    },
    {
        id: 'pao',
        name: 'Pão de forma',
        price: 0.99,
        originalPrice: 3.99,
        image: 'https://s3-sa-east-1.amazonaws.com/superimg/img.produtos/7896002360326/img_1200_1.png',
        stock: 20,
        expiryDate: '2025-05-18',
        section: 'products'
    }
];
console.log("script.js: window.productsData definido:", JSON.stringify(window.productsData));

// Função para formatar data (DD/MM/YYYY)
function formatDate(dateString) {
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
}

// Função para carregar produtos dinamicamente
function loadProducts() {
    console.log("script.js: loadProducts chamada");
    const menuContainer = document.querySelector('#menu .box-container');
    const productsContainer = document.querySelector('#products .box-container');

    if (!menuContainer || !productsContainer) {
        console.error('Containers de produtos não encontrados!');
        return;
    }

    menuContainer.innerHTML = '';
    productsContainer.innerHTML = '';

    if (!window.productsData || window.productsData.length === 0) {
        console.error('window.productsData está vazio ou não definido em loadProducts');
        return;
    }

    window.productsData.forEach(product => {
        const productBox = document.createElement('div');
        productBox.classList.add('box');
        productBox.setAttribute('data-product-id', product.id);

        let productHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <div class="price">R$${product.price.toFixed(2)} <span>R$${product.originalPrice.toFixed(2)}</span></div>
            <div class="stock-info">Estoque: <span class="stock-count">${product.stock}</span></div>
            <div class="expiry-info">Validade: ${formatDate(product.expiryDate)}</div>
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
                    <div class="price">R$${product.price.toFixed(2)} <span>R$${product.originalPrice.toFixed(2)}</span></div>
                    <div class="stock-info">Estoque: <span class="stock-count">${product.stock}</span></div>
                    <div class="expiry-info">Validade: ${formatDate(product.expiryDate)}</div>
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
}

function addEventListenersToCartButtons() {
    console.log("script.js: addEventListenersToCartButtons chamada");
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        const newButton = button.cloneNode(true);
        button.parentNode.replaceChild(newButton, button);
        
        newButton.addEventListener('click', (event) => {
            event.preventDefault();
            const productId = newButton.getAttribute('data-product-id');
            console.log("script.js: Botão Adicionar Clicado, productId:", productId);
            if (!window.productsData) {
                console.error('script.js: window.productsData não definido ao tentar encontrar produto para adicionar ao carrinho.');
                alert("Erro crítico: Dados de produtos não disponíveis em script.js.");
                return;
            }
            const product = window.productsData.find(p => p.id === productId);
            if (product) {
                if (window.addToCart) {
                    window.addToCart(product);
                } else {
                    console.error("script.js: window.addToCart não está definido.");
                    alert("Erro: Função do carrinho não encontrada.");
                }
            } else {
                console.error('script.js: Produto não encontrado em window.productsData:', productId);
            }
        });
    });
}

let navbar = document.querySelector(".navbar");
if(document.querySelector("#menu-btn")) {
    document.querySelector("#menu-btn").onclick = () => {
        if(navbar) navbar.classList.toggle("active");
        if(searchForm) searchForm.classList.remove("active");
        if (cartItem) cartItem.classList.remove("active");
    };
}

let searchForm = document.querySelector(".search-form");
let searchBox = document.querySelector("#search-box");
if(document.querySelector("#search-btn")) {
    document.querySelector("#search-btn").onclick = () => {
        if(searchForm) searchForm.classList.toggle("active");
        if(navbar) navbar.classList.remove("active");
        if (cartItem) cartItem.classList.remove("active");
        if (searchForm && searchForm.classList.contains("active")) {
            if(searchBox) searchBox.focus(); 
        }
    };
}

let cartItem = document.querySelector(".cart-items-container");
if (document.querySelector("#cart-btn")) {
    document.querySelector("#cart-btn").onclick = () => {
      if (cartItem) cartItem.classList.toggle("active");
      if(navbar) navbar.classList.remove("active");
      if(searchForm) searchForm.classList.remove("active");
    };
}

window.onscroll = () => {
  if(navbar) navbar.classList.remove("active");
  if(searchForm) searchForm.classList.remove("active");
  if (cartItem) cartItem.classList.remove("active");
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

document.addEventListener('DOMContentLoaded', () => {
    console.log("script.js: DOMContentLoaded, chamando loadProducts");
    loadProducts();
    if (typeof loadComments === 'function') {
        loadComments();
    }
});

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

