import PDFDocument from 'pdfkit';
import fs from 'fs';

export class InvoiceService {
  /**
   * Генерация PDF-счета
   * @param {Object} order - Данные заказа
   * @param {string} filePath - Путь для сохранения
   */
  generateInvoice(order, filePath) {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(filePath);
    
    doc.pipe(stream);
    
    // Заголовок
    doc.fontSize(20).text('Счет', { align: 'center' });
    doc.moveDown();

    // Информация о заказе
    doc.fontSize(12)
      .text(`Номер заказа: ${order.id}`)
      .text(`Дата: ${new Date().toLocaleDateString()}`)
      .moveDown();

    // Таблица товаров
    doc.font('Helvetica-Bold');
    this._createTableRow(doc, 'Товар', 'Кол-во', 'Цена', 'Сумма');
    doc.font('Helvetica');
    
    order.items.forEach(item => {
      this._createTableRow(
        doc,
        item.name,
        item.quantity,
        `${item.price} ₽`,
        `${item.price * item.quantity} ₽`
      );
    });

    // Итого
    doc.moveDown().font('Helvetica-Bold')
      .text(`Итого: ${order.total} ₽`, { align: 'right' });

    doc.end();
    return filePath;
  }

  _createTableRow(doc, ...columns) {
    const colWidth = 120;
    columns.forEach((text, i) => {
      doc.text(text, i * colWidth, doc.y, { width: colWidth });
    });
    doc.moveDown();
  }
}