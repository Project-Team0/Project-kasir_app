const form = document.getElementById('item-form');
const itemName = document.getElementById('item-name');
const itemPrice = document.getElementById('item-price');
const itemQty = document.getElementById('item-qty');
const itemsList = document.getElementById('items-list');
const totalPrice = document.getElementById('total-price');
const clearAllBtn = document.getElementById('clear-all');

let items = JSON.parse(localStorage.getItem('cashier-items')) || [];

function saveItems() {
  localStorage.setItem('cashier-items', JSON.stringify(items));
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = itemName.value;
  const price = parseFloat(itemPrice.value);
  const qty = parseInt(itemQty.value);

  if (name && price > 0 && qty > 0) {
    items.push({ name, price, qty });
    saveItems();
    renderItems();
    form.reset();
  }
});

function renderItems() {
  itemsList.innerHTML = '';
  let total = 0;

  items.forEach((item, index) => {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'item';

    const itemText = document.createElement('span');
    itemText.textContent = `${item.name} - Rp ${item.price} x ${item.qty}`;

    const removeBtn = document.createElement('button');
    removeBtn.className = 'remove-btn';
    removeBtn.textContent = 'Remove';
    removeBtn.onclick = () => {
      items.splice(index, 1);
      saveItems();
      renderItems();
    };

    total += item.price * item.qty;

    itemDiv.appendChild(itemText);
    itemDiv.appendChild(removeBtn);
    itemsList.appendChild(itemDiv);
  });

  totalPrice.textContent = total.toLocaleString();
}

clearAllBtn.addEventListener('click', () => {
  if (confirm("Are you sure you want to remove all items?")) {
    items = [];
    saveItems();
    renderItems();
  }
});

// Load on startup
renderItems();
