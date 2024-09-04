const products = document.querySelectorAll('.product-item');
const summaryItems = document.querySelector('.summary-items');
const totalQuantityElement = document.querySelector('.total-quantity');
const totalPriceElement = document.querySelector('.total-price');
const checkoutButton = document.querySelector('.checkout-button');

let totalQuantity = 0;
let totalPrice = 0;

products.forEach(product => {
    const increaseButton = product.querySelector('.increase');
    const decreaseButton = product.querySelector('.decrease');
    const quantityInput = product.querySelector('.quantity-input');
    const price = parseFloat(product.dataset.price);
    const name = product.dataset.name;

    increaseButton.addEventListener('click', () => {
        if (totalQuantity < 8) {
            updateQuantity(product, 1, price);
        }
    });

    decreaseButton.addEventListener('click', () => {
        if (parseInt(quantityInput.value) > 0) {
            updateQuantity(product, -1, price);
        }
    });
});

function updateQuantity(product, change, price) {
    const quantityInput = product.querySelector('.quantity-input');
    const name = product.dataset.name;
    let quantity = parseInt(quantityInput.value) + change;

    quantityInput.value = quantity;
    totalQuantity += change;
    totalPrice += change * price;

    updateSummary();
    updateCheckoutButton();
}

function updateSummary() {
    summaryItems.innerHTML = '';
    totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    totalQuantityElement.textContent = `Total Items: ${totalQuantity}/8`;

    products.forEach(product => {
        const quantity = parseInt(product.querySelector('.quantity-input').value);
        const name = product.dataset.name;
        const price = parseFloat(product.dataset.price);

        if (quantity > 0) {
            const summaryItem = document.createElement('p');
            summaryItem.textContent = `${quantity} x ${name} - $${(price * quantity).toFixed(2)}`;
            summaryItems.appendChild(summaryItem);
        }
    });
}

function updateCheckoutButton() {
    checkoutButton.disabled = totalQuantity === 0;
}

updateSummary();
