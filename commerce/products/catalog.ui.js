export class ProductCatalog extends HTMLElement {
    constructor(productManager) {
      super();
      this.manager = productManager;
      this.attachShadow({ mode: 'open' });
      this._loadProducts();
    }
  
    async _loadProducts() {
      this.products = await this.manager.getProducts();
      this.render();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <div class="catalog-grid">
          ${this.products.map(product => `
            <article class="product-card" data-sku="${product.sku}">
              <img src="${product.images[0]}" alt="${product.name}">
              <h3>${product.name}</h3>
              <p class="price">${product.price} ₽</p>
              <button class="add-to-cart">В корзину</button>
            </article>
          `).join('')}
        </div>
      `;
  
      this._setupAddToCartHandlers();
    }
  
    _setupAddToCartHandlers() {
      this.shadowRoot.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', () => {
          const sku = btn.closest('.product-card').dataset.sku;
          const product = this.products.find(p => p.sku === sku);
          window.dispatchEvent(new CustomEvent('cart-add', { detail: product }));
        });
      });
    }
  }