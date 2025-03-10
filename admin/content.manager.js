export class ContentManager {
    constructor(apiClient) {
      this.api = apiClient;
    }
  
    /**
     * Получение контента по ID
     * @param {string} contentId - ID контента
     */
    async getContent(contentId) {
      return this.api.get(`/content/${contentId}`);
    }
  
    /**
     * Сохранение изменений контента
     * @param {string} contentId - ID контента
     * @param {Object} contentData - Новые данные
     */
    async saveContent(contentId, contentData) {
      return this.api.put(`/content/${contentId}`, contentData);
    }
  
    /**
     * Управление версиями контента
     * @param {string} contentId - ID контента
     */
    async getContentHistory(contentId) {
      return this.api.get(`/content/${contentId}/history`);
    }
  }