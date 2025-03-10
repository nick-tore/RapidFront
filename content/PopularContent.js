export class PopularContentManager {
    constructor(apiClient) {
      this.api = apiClient;
    }
  
    /**
     * Получение популярных материалов
     * @param {'day'|'week'|'month'} period - Период
     */
    async getPopular(period = 'week') {
      const algorithm = {
        score: {
          $avg: [
            { $multiply: ['$views', 0.7] },
            { $multiply: ['$commentsCount', 0.3] }
          ]
        }
      };
  
      const response = await this.api.post('/content/popular', {
        period,
        algorithm
      });
  
      return response.data;
    }
  }