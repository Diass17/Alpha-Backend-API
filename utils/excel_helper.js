// importStudentsExcel.js
const xlsx = require('xlsx');
const Student = require('./models/Student');

// Чтение Excel
const workbook = xlsx.readFile('students.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const jsonData = xlsx.utils.sheet_to_json(sheet);

// Преобразование ключей
const mappedData = jsonData.map((row) => ({
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

// Сохранение в MongoDB
Student.insertMany(mappedData)
  .then(() => console.log('✅ Импорт студентов завершён'))
  .catch((err) => console.error('❌ Ошибка при импорте:', err));
