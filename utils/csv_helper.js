const csv = require('csvtojson');
const Student = require('./models/Student');

csv()
  .fromFile('students.csv')
  .then(async (rows) => {
    const mappedData = rows.map((row) => ({
      fullName: row['ФИО'],
      iin: row['ИИН'],
      email: row['Email'],
      phone: row['Телефон'],
      whatsapp: row['WhatsApp'],
      telegram: row['Telegram'],
      status: row['Статус'],
      topStudent: row['Top Student'],
      fundingSource: row['Источник финансирования'],
      paid: Number(row['Оплачено']),
      remaining: Number(row['Осталось оплатить']),
      stream: row['Поток'],
    }));

    try {
      await Student.insertMany(mappedData);
      console.log('✅ Импорт студентов из CSV завершён');
    } catch (err) {
      console.error('❌ Ошибка при импорте CSV:', err);
    }
  });
