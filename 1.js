document.addEventListener('DOMContentLoaded', function() {
    const cartItems = document.querySelector('.cart-items');
    const totalPriceElement = document.querySelector('.total-price');
    const checkoutButton = document.querySelector('.checkout');
    
    let cart = [];
    let totalPrice = 0;
    
    // Добавление товара в корзину
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productElement = this.closest('.product');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseInt(productElement.getAttribute('data-price'));
            
            // Проверяем, есть ли товар уже в корзине
            const existingItem = cart.find(item => item.id === productId);
            
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                cart.push({
                    id: productId,
                    name: productName,
                    price: productPrice,
                    quantity: 1
                });
            }
            
            updateCart();
        });
    });
    
    // Обновление корзины
    function updateCart() {
        cartItems.innerHTML = '';
        totalPrice = 0;
        
        if (cart.length === 0) {
            cartItems.innerHTML = '<p>Корзина пуста</p>';
            totalPriceElement.textContent = '0';
            return;
        }
        
        cart.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;
            
            const cartItemElement = document.createElement('div');
            cartItemElement.className = 'cart-item';
            cartItemElement.innerHTML = `
                <span>${item.name} (${item.quantity} шт.)</span>
                <span>${itemTotal} руб.</span>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            
            cartItems.appendChild(cartItemElement);
        });
        
        totalPriceElement.textContent = totalPrice;
        
        // Добавляем обработчики для кнопок удаления
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', function() {
                const itemId = this.getAttribute('data-id');
                removeFromCart(itemId);
            });
        });
    }
    
    // Удаление товара из корзины
    function removeFromCart(itemId) {
        cart = cart.filter(item => item.id !== itemId);
        updateCart();
    }
    
    // Оформление заказа
    checkoutButton.addEventListener('click', function() {
        if (cart.length === 0) {
            alert('Корзина пуста!');
            return;
        }
        
        alert(`Заказ оформлен! Сумма: ${totalPrice} руб.`);
        cart = [];
        updateCart();
    });
});