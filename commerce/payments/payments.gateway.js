import { YooCheckout } from '@a2seven/yoo-checkout';

export class PaymentGateway {
  constructor(shopId, secretKey) {
    this.checkout = new YooCheckout({ shopId, secretKey });
  }

  /**
   * Создание платежа
   * @param {Object} order - Данные заказа
   * @returns {Promise<Object>} Ответ ЮKassa
   */
  async createPayment(order) {
    try {
      return await this.checkout.createPayment({
        amount: {
          value: order.total.toFixed(2),
          currency: 'RUB'
        },
        payment_method_data: { type: 'bank_card' },
        confirmation: {
          type: 'redirect',
          return_url: `${window.location.origin}/order-success`
        },
        description: `Заказ #${order.id}`
      });
    } catch (error) {
      console.error('Payment error:', error);
      throw new Error('PAYMENT_FAILED');
    }
  }

  /**
   * Валидация уведомлений от ЮKassa
   * @param {Object} notification - Тело вебхука
   */
  validateWebhook(notification) {
    return this.checkout.verifyNotification(notification);
  }
}