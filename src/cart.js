// Este arquivo é um script dedicado para a página cart.html
// Ele garante que a renderização do carrinho ocorra corretamente (v1.3)

document.addEventListener("DOMContentLoaded", function() {
    console.log("cart.js (v1.3): DOMContentLoaded em cart.html");
    
    try {
        // Recupera o carrinho do localStorage
        const cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        console.log("cart.js (v1.3): Carrinho recuperado do localStorage:", JSON.stringify(cart));
        
        // Verifica se estamos na página cart.html
        if (window.location.pathname.includes("cart.html")) {
            console.log("cart.js (v1.3): Confirmado que estamos na página cart.html");
            
            // Localiza os elementos de destino
            const cartItemsDisplay = document.getElementById("cart-items-display");
            const cartTotalDisplay = document.getElementById("cart-total-display");
            const checkoutButton = document.getElementById("checkout-button"); 
            const emptyCartButton = document.getElementById("empty-cart-button"); // Novo botão
            
            if (!cartItemsDisplay) {
                console.error("cart.js (v1.3): ERRO CRÍTICO - Elemento cart-items-display não encontrado!");
                alert("Erro crítico: Não foi possível encontrar a área de exibição dos itens do carrinho.");
                return;
            }
            console.log("cart.js (v1.3): Elemento cart-items-display ENCONTRADO.");
            
            if (!cartTotalDisplay) {
                console.error("cart.js (v1.3): ERRO CRÍTICO - Elemento cart-total-display não encontrado!");
                alert("Erro crítico: Não foi possível encontrar a área de exibição do total do carrinho.");
                return;
            }
            console.log("cart.js (v1.3): Elemento cart-total-display ENCONTRADO.");

             if (!checkoutButton) {
                console.warn("cart.js (v1.3): AVISO - Elemento checkout-button não encontrado! O botão de finalizar compra não funcionará.");
            } else {
                console.log("cart.js (v1.3): Elemento checkout-button ENCONTRADO.");
                checkoutButton.addEventListener("click", function() {
                    console.log("cart.js (v1.3): Botão Finalizar Compra clicado. Itens no carrinho:", cart.length);
                    if (cart && cart.length > 0) {
                        window.location.href = "payment.html";
                    } else {
                        alert("Seu carrinho está vazio. Adicione itens antes de finalizar a compra.");
                    }
                });
            }

            // Adiciona listener para o botão Esvaziar Carrinho
            if (!emptyCartButton) {
                 console.warn("cart.js (v1.3): AVISO - Elemento empty-cart-button não encontrado! O botão de esvaziar carrinho não funcionará.");
            } else {
                console.log("cart.js (v1.3): Elemento empty-cart-button ENCONTRADO.");
                emptyCartButton.addEventListener("click", function() {
                    console.log("cart.js (v1.3): Botão Esvaziar Carrinho clicado.");
                    if (confirm("Tem certeza que deseja esvaziar o carrinho?")) {
                        emptyCart();
                    }
                });
            }
            
            console.log("cart.js (v1.3): Chamando renderCart...");
            // Passa o botão de esvaziar para a função renderCart
            renderCart(cart, cartItemsDisplay, cartTotalDisplay, checkoutButton, emptyCartButton);
        }
    } catch (error) {
        console.error("cart.js (v1.3): Erro GERAL ao inicializar o carrinho em cart.html:", error);
        alert("Ocorreu um erro inesperado ao carregar seu carrinho. Por favor, tente recarregar a página.");
    }
});

// Modificada para receber e controlar o botão de esvaziar
function renderCart(cart, cartItemsDisplay, cartTotalDisplay, checkoutButton, emptyCartButton) {
    console.log("cart.js (v1.3): Função renderCart INICIADA. Itens recebidos:", cart.length);
    try {
        cartItemsDisplay.innerHTML = ""; // Limpa antes de renderizar
        console.log("cart.js (v1.3): cartItemsDisplay limpo.");
        
        if (!cart || cart.length === 0) {
            console.log("cart.js (v1.3): Carrinho vazio. Exibindo mensagem.");
            cartItemsDisplay.innerHTML = "<p class=\"empty-cart-message\">Seu carrinho está vazio. <a href=\"index.html\">Continue comprando!</a></p>";
            cartTotalDisplay.innerHTML = "";
            // Desabilita botões se o carrinho estiver vazio
            if (checkoutButton) {
                checkoutButton.disabled = true;
                checkoutButton.style.cursor = "not-allowed";
                checkoutButton.style.opacity = 0.6;
                console.log("cart.js (v1.3): Botão de checkout DESABILITADO (carrinho vazio).");
            }
            if (emptyCartButton) {
                emptyCartButton.disabled = true;
                emptyCartButton.style.cursor = "not-allowed";
                emptyCartButton.style.opacity = 0.6;
                 console.log("cart.js (v1.3): Botão de esvaziar carrinho DESABILITADO (carrinho vazio).");
            }
            return;
        }
        
        console.log("cart.js (v1.3): Construindo tabela para", cart.length, "itens.");
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
        let pageTotal = 0;
        
        cart.forEach((item, index) => {
            console.log(`cart.js (v1.3): Processando item ${index + 1}:`, JSON.stringify(item));
            if (!item || typeof item.price === "undefined" || typeof item.quantity === "undefined") {
                console.error("cart.js (v1.3): Item inválido no carrinho:", item);
                return; // Pula item inválido
            }
            const itemSubtotal = item.price * item.quantity;
            pageTotal += itemSubtotal;
            
            const row = tbody.insertRow();
            // Adiciona data attribute com descrição (se existir) para inspeção futura
            const description = item.description || 'Descrição não disponível'; // Placeholder
            row.dataset.description = description;
            row.classList.add('cart-item-row'); // Classe para identificar linhas de item

            row.innerHTML = `
                <td><img src="${item.image}" alt="${item.name}" class="cart-page-item-image"></td>
                <td class="product-name-cell">${item.name} <i class="fas fa-info-circle inspect-icon" title="Ver descrição"></i></td>
                <td>R$ ${item.price.toFixed(2)}</td>
                <td>
                    <button class="quantity-btn" onclick="decrementItemInCart(\'${item.id}\')">-</button>
                    <span class="item-quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="incrementItemInCart(\'${item.id}\')">+</button>
                </td>
                <td>R$ ${itemSubtotal.toFixed(2)}</td>
                <td><button class="remove-item-btn fas fa-times" onclick="removeItemCompletely(\'${item.id}\')"></button></td>
            `;
            console.log(`cart.js (v1.3): Linha para item ${item.id} adicionada à tabela.`);
        });
        
        cartItemsDisplay.appendChild(table);
        console.log("cart.js (v1.3): Tabela adicionada ao cartItemsDisplay.");
        
        cartTotalDisplay.innerHTML = `<h3>Total do Pedido: R$ ${pageTotal.toFixed(2)}</h3>`;
        console.log("cart.js (v1.3): Total do pedido atualizado.");
        
        // Habilita botões se o carrinho não estiver vazio
        if (checkoutButton) {
            checkoutButton.disabled = false;
            checkoutButton.style.cursor = "pointer";
            checkoutButton.style.opacity = 1;
            console.log("cart.js (v1.3): Botão de checkout HABILITADO.");
        }
         if (emptyCartButton) {
            emptyCartButton.disabled = false;
            emptyCartButton.style.cursor = "pointer";
            emptyCartButton.style.opacity = 1;
            console.log("cart.js (v1.3): Botão de esvaziar carrinho HABILITADO.");
        }
        
        // Adiciona listeners para os ícones de inspeção APÓS a tabela ser adicionada ao DOM
        addInspectListeners();

        console.log("cart.js (v1.3): Renderização do carrinho CONCLUÍDA.");
    } catch (error) {
        console.error("cart.js (v1.3): Erro GERAL dentro da função renderCart:", error);
        cartItemsDisplay.innerHTML = "<p class=\"error-cart-message\">Ocorreu um erro ao exibir seu carrinho. Tente recarregar a página.</p>";
    }
}

function decrementItemInCart(productId) {
    console.log("cart.js (v1.3): decrementItemInCart chamado para ID:", productId);
    try {
        let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                // Se a quantidade for 1, remove o item
                cart.splice(itemIndex, 1);
            }
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            location.reload(); // Recarrega a página para atualizar a exibição
        }
    } catch (error) {
        console.error("cart.js (v1.3): Erro ao decrementar item:", error);
    }
}

function incrementItemInCart(productId) {
    console.log("cart.js (v1.3): incrementItemInCart chamado para ID:", productId);
    try {
        let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex > -1) {
            cart[itemIndex].quantity += 1;
            localStorage.setItem("shoppingCart", JSON.stringify(cart));
            location.reload(); // Recarrega a página para atualizar a exibição
        }
    } catch (error) {
        console.error("cart.js (v1.3): Erro ao incrementar item:", error);
    }
}

function removeItemCompletely(productId) {
    console.log("cart.js (v1.3): removeItemCompletely chamado para ID:", productId);
    try {
        let cart = JSON.parse(localStorage.getItem("shoppingCart")) || [];
        // Filtra o carrinho para remover o item com o ID correspondente
        cart = cart.filter(item => item.id !== productId);
        localStorage.setItem("shoppingCart", JSON.stringify(cart));
        location.reload(); // Recarrega a página para atualizar a exibição
    } catch (error) {
        console.error("cart.js (v1.3): Erro ao remover item:", error);
    }
}

// Nova função para esvaziar o carrinho
function emptyCart() {
    console.log("cart.js (v1.3): emptyCart chamado.");
    try {
        localStorage.removeItem("shoppingCart"); // Remove o carrinho do localStorage
        console.log("cart.js (v1.3): shoppingCart removido do localStorage.");
        location.reload(); // Recarrega a página para refletir o carrinho vazio
    } catch (error) {
        console.error("cart.js (v1.3): Erro ao esvaziar o carrinho:", error);
        alert("Ocorreu um erro ao tentar esvaziar o carrinho.");
    }
}

// Função para adicionar listeners aos ícones de inspeção
function addInspectListeners() {
    const inspectIcons = document.querySelectorAll('.inspect-icon');
    inspectIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const row = this.closest('.cart-item-row');
            const description = row.dataset.description;
            alert(`Descrição do Produto:\n\n${description}`);
        });
    });
    console.log(`cart.js (v1.3): ${inspectIcons.length} listeners de inspeção adicionados.`);
}

// Expõe as funções necessárias globalmente para os botões inline (onclick)
// A função emptyCart não precisa ser exposta pois usamos addEventListener
window.decrementItemInCart = decrementItemInCart;
window.incrementItemInCart = incrementItemInCart;
window.removeItemCompletely = removeItemCompletely;

console.log("cart.js (v1.3): Script carregado e funções de manipulação do carrinho expostas globalmente.");

