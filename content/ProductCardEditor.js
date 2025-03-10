export class ProductCardEditor {
    constructor() {
      this.template = `
        <div class="product-card">
          <div class="image-container" data-droppable></div>
          <h3 class="title" data-editable></h3>
          <p class="price" data-editable></p>
        </div>
      `;
    }
  
    /**
     * Инициализация редактора
     * @param {HTMLElement} container - Контейнер для превью
     */
    init(container) {
      this.container = container;
      container.innerHTML = this.template;
      this._enableDragAndDrop();
      this._enableTextEditing();
    }
  
    _enableDragAndDrop() {
      interact('[data-droppable]').dropzone({
        accept: '.media-library-item',
        ondrop: (event) => {
          const imgSrc = event.relatedTarget.getAttribute('data-src');
          event.target.innerHTML = `<img src="${imgSrc}">`;
        }
      });
    }
  
    _enableTextEditing() {
      document.querySelectorAll('[data-editable]').forEach(element => {
        element.addEventListener('click', () => {
          const text = element.innerText;
          element.innerHTML = `<input type="text" value="${text}">`;
          element.querySelector('input').focus();
        });
      });
    }
  
    /**
     * Экспорт HTML-шаблона
     */
    exportTemplate() {
      return this.container.innerHTML;
    }
  }