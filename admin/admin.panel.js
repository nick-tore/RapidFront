import { APIClient } from '../utils/api.client.js';
import { UserManager } from './user.manager.js';
import { ContentManager } from './content.manager.js';

export class AdminPanel {
  constructor() {
    this.api = new APIClient('/admin-api');
    this.userManager = new UserManager(this.api);
    this.contentManager = new ContentManager(this.api);
    this.initUI();
  }

  /**
   * Инициализация интерфейса админки
   */
  initUI() {
    this.container = document.createElement('div');
    this.container.className = 'admin-container';
    
    this.renderNavigation();
    this.renderContentArea();
    
    document.body.appendChild(this.container);
    this.loadDefaultSection();
  }

  renderNavigation() {
    const nav = document.createElement('nav');
    nav.innerHTML = `
      <ul class="admin-menu">
        <li data-section="users">Пользователи</li>
        <li data-section="content">Контент</li>
        <li data-section="settings">Настройки</li>
      </ul>
    `;
    
    nav.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => this.loadSection(item.dataset.section));
    });
    
    this.container.appendChild(nav);
  }

  async loadSection(section) {
    this.contentArea.innerHTML = await this[`load${section.charAt(0).toUpperCase() + section.slice(1)}Section`]();
  }

  async loadUsersSection() {
    const users = await this.userManager.getUsers();
    return `
      <div class="users-section">
        <h2>Управление пользователями</h2>
        ${users.map(user => this.renderUserRow(user)).join('')}
      </div>
    `;
  }
}