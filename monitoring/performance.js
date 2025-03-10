export class PerformanceMonitor {
    constructor(zabbixReporter) {
      this.reporter = zabbixReporter;
      this.initMonitoring();
    }
  
    /**
     * Инициализация сбора метрик
     */
    initMonitoring() {
      if ('performance' in window) {
        this.trackMemory();
        this.trackNetwork();
        this.trackFPS();
      }
    }
  
    trackMemory() {
      setInterval(() => {
        const memory = performance.memory;
        this.reporter.pushMetric('memory.used', memory.usedJSHeapSize);
        this.reporter.pushMetric('memory.total', memory.totalJSHeapSize);
      }, 5000);
    }
  
    trackFPS() {
      let lastTime = Date.now();
      let frameCount = 0;
      
      setInterval(() => {
        frameCount++;
        const now = Date.now();
        if (now - lastTime >= 1000) {
          this.reporter.pushMetric('performance.fps', frameCount);
          frameCount = 0;
          lastTime = now;
        }
      }, 100);
    }
  }