export class NewsManager {
    constructor(apiClient) {
      this.api = apiClient;
    }
  
    
      Получение списка новостей
      @param {Object} filters - Параметры фильтрации
     
    async getNews(filters = {}) {
      const params = new URLSearchParams(filters);
      const response = await this.api.get(`news${params}`);
      return response.data;
    }
  
    
      Создание новости
      @param {Object} newsData - Данные новости
     
    async createNews(newsData) {
      return this.api.post('news', {
        ...newsData,
        date new Date().toISOString(),
        views 0
      });
    }
  
    
      Обновление счетчика просмотров
      @param {string} newsId - ID новости
     
    async incrementViews(newsId) {
      return this.api.patch(`news${newsId}views`);
    }
  }