export class SettingsManager {
    constructor(apiClient) {
      this.api = apiClient;
    }
  
    /**
     * Получение текущих настроек
     */
    async getSettings() {
      return this.api.get('/settings');
    }
  
    /**
     * Обновление настроек
     * @param {Object} settings - Новые настройки
     */
    async updateSettings(settings) {
      return this.api.put('/settings', settings);
    }
  
    /**
     * Экспорт резервной копии
     */
    async createBackup() {
      return this.api.post('/backup');
    }
  
    /**
     * Импорт резервной копии
     * @param {File} backupFile - Файл бэкапа
     */
    async restoreBackup(backupFile) {
      const formData = new FormData();
      formData.append('backup', backupFile);
      return this.api.post('/restore', formData);
    }
  }