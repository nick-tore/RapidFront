export class UserManager {
  constructor(apiClient) {
    this.api = apiClient;
  }

  /**
   * Получение списка пользователей
   * @param {number} page - Номер страницы
   * @param {number} limit - Количество на странице
   */
  async getUsers(page = 1, limit = 20) {
    const response = await this.api.get(`/users?page=${page}&limit=${limit}`);
    return response.data;
  }

  /**
   * Обновление роли пользователя
   * @param {string} userId - ID пользователя
   * @param {string} newRole - Новая роль (admin|editor|user)
   */
  async updateUserRole(userId, newRole) {
    return this.api.patch(`/users/${userId}/role`, { role: newRole });
  }

  /**
   * Блокировка пользователя
   * @param {string} userId - ID пользователя
   */
  async blockUser(userId) {
    return this.api.post(`/users/${userId}/block`);
  }
}