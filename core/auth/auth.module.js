import { JWTService } from './jwt.service.js';
import { hashPassword, comparePasswords } from './crypto.util.js';
import { SocialAuth } from './social-auth.js';
import EventEmitter from 'events';

export class AuthCore extends EventEmitter {
  constructor(userRepository) {
    super();
    this.users = userRepository;
    this.social = new SocialAuth();
  }

  /**
   * Регистрация нового пользователя
   * @param {Object} userData - Данные пользователя
   * @emits AuthCore#registration
   */
  async register(userData) {
    if (await this.users.findByEmail(userData.email)) {
      throw new Error('USER_EXISTS');
    }
    
    const hashedPassword = await hashPassword(userData.password);
    const user = await this.users.create({
      ...userData,
      password: hashedPassword
    });

    this.emit('registration', user);
    return user;
  }

  /**
   * Авторизация пользователя
   * @param {String} email - Почта пользователя
   * @param {String} password - Пароль
   * @returns {String} JWT-токен
   */
  async login(email, password) {
    const user = await this.users.findByEmail(email);
    
    if (!user || !(await comparePasswords(password, user.password))) {
      throw new Error('INVALID_CREDENTIALS');
    }
    
    return JWTService.generateToken(user);
  }

  /**
   * Подключение OAuth-провайдера
   * @param {String} provider - Идентификатор провайдера
   * @param {Object} config - Конфигурация
   */
  addSocialProvider(provider, config) {
    this.social.registerProvider(provider, config);
  }
}