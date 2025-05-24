// controllers/studentController.js
const Student = require('..models/Student');  // Проверьте путь

// Функция для получения всех студентов
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении студентов', error: error.message });
  }
};

// Функция для создания студента
exports.createStudent = async (req, res) => {
  try {
    const { fullName, iin, email, phone } = req.body;
    const student = await Student.create({ fullName, iin, email, phone });
    res.status(201).json(student);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при создании студента', error: error.message });
  }
};
