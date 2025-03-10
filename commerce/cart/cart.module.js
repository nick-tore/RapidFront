export class CartManager {
    constructor(apiClient) {
      this.api = apiClient;
      this.items = JSON.parse(localStorage.getItem('cart')) || [];
    }
  
    async syncWithServer() {
      const response = await this.api.post('/cart/sync', { items: this.items });
      this.items = response.data;
      this._saveToStorage();
    }
  
    addItem(product, quantity = 1) {
      const existingItem = this.items.find(i => i.sku === product.sku);
      
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          ...product,
          quantity,
          addedAt: new Date().toISOString()
        });
      }
      
      this._saveToStorage();
    }
  
    removeItem(sku) {
      this.items = this.items.filter(i => i.sku !== sku);
      this._saveToStorage();
    }
  
    _saveToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    }
  
    get total() {
      return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }
  }