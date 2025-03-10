export class HeaderEditor {
    constructor(apiClient) {
      this.api = apiClient;
      this.header = document.querySelector('header');
    }
  
    /**
     * Загрузка текущей шапки
     */
    async loadHeader() {
      const response = await this.api.get('/header');
      this.header.innerHTML = response.data.html;
      this._initEditMode();
    }
  
    /**
     * Включение режима редактирования
     */
    _initEditMode() {
      if (this.isAdmin()) {
        this.header.setAttribute('contenteditable', 'true');
        this.header.addEventListener('blur', this.saveHeader.bind(this));
      }
    }
  
    async saveHeader() {
      await this.api.put('/header', {
        html: this.header.innerHTML
      });
    }
  
    isAdmin() {
      return localStorage.getItem('userRole') === 'admin';
    }
  }