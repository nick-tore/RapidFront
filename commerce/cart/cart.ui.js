export class CartWidget extends HTMLElement {
    constructor(cartManager) {
      super();
      this.cart = cartManager;
      this.attachShadow({ mode: 'open' });
      this.render();
      this.cart.items.forEach(() => this._setupEvents());
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <div class="cart-widget">
          <span class="counter">${this.cart.items.length}</span>
          <div class="items-list">
            ${this.cart.items.map(item => `
              <div class="cart-item" data-sku="${item.sku}">
                <img src="${item.thumbnail}" alt="${item.name}">
                <div class="details">
                  <h4>${item.name}</h4>
                  <p>${item.quantity} × ${item.price} ₽</p>
                  <button class="remove-btn">🗑️</button>
                </div>
              </div>
            `).join('')}
          </div>
          <div class="total">Итого: ${this.cart.total} ₽</div>
          <button class="checkout-btn">Оформить заказ</button>
        </div>
      `;
    }
  
    _setupEvents() {
      this.shadowRoot.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sku = btn.closest('.cart-item').dataset.sku;
          this.cart.removeItem(sku);
          this.render();
        });
      });
    }
  }