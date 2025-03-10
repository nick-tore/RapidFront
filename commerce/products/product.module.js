export class ProductManager {
    constructor(apiClient) {
      this.api = apiClient;
    }
  
    async createProduct(productData) {
      const response = await this.api.post('/products', productData);
      return response.data;
    }
  
    async updateProduct(sku, updates) {
      return this.api.patch(`/products/${sku}`, updates);
    }
  
    async deleteProduct(sku) {
      return this.api.delete(`/products/${sku}`);
    }
  
    async getProducts(filters = {}) {
      const params = new URLSearchParams(filters);
      const response = await this.api.get(`/products?${params}`);
      return response.data;
    }
  }