export class ZabbixReporter {
    constructor(zabbixConfig) {
      this.config = zabbixConfig;
      this.metricsQueue = [];
      this.initTimer();
    }
  
    /**
     * Инициализация периодической отправки
     */
    initTimer() {
      setInterval(() => this.flushMetrics(), this.config.interval || 60000);
    }
  
    /**
     * Добавление метрики в очередь
     * @param {string} key - Ключ метрики
     * @param {any} value - Значение
     */
    pushMetric(key, value) {
      this.metricsQueue.push({
        host: this.config.hostName,
        key,
        value: JSON.stringify(value)
      });
    }
  
    /**
     * Отправка всех метрик
     */
    async flushMetrics() {
      if (this.metricsQueue.length === 0) return;
      
      const payload = {
        request: 'agent data',
        data: this.metricsQueue
      };
  
      try {
        await fetch(this.config.serverUrl, {
          method: 'POST',
          body: JSON.stringify(payload)
        });
        this.metricsQueue = [];
      } catch (error) {
        console.error('Zabbix send error:', error);
      }
    }
  }