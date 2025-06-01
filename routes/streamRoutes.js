const express = require('express');
const router = express.Router();
const multer = require('multer');
const XLSX = require('xlsx');
const Student = require('../models/student_model'); 

const storage = multer.memoryStorage();
const upload = multer({ storage });


router.post('/upload-excel', upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet);

    await Student.insertMany(data);

    res.json({ message: '✅ Excel данные успешно загружены!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '❌ Ошибка при загрузке Excel файла' });
  }
});

module.exports = router;
