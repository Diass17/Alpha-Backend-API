const express = require('express');
const router = express.Router();
const pool = require('../config/db');  // Assuming db.js is where the PostgreSQL connection is initialized

// GET request to fetch all students (с возможностью фильтрации)
router.get('/', async (req, res) => {
  const { name, status, stream_id } = req.query;

  let query = 'SELECT * FROM students WHERE 1=1';
  let params = [];
  let i = 1;

  if (name) {
    query += ` AND full_name ILIKE $${i++}`;
    params.push(`%${name}%`);
  }

  if (status) {
    query += ` AND status = $${i++}`;
    params.push(status);
  }

  if (stream_id) {
    const parsedStreamId = parseInt(stream_id, 10);
    if (!isNaN(parsedStreamId)) {
      query += ` AND stream_id = $${i++}`;
      params.push(parsedStreamId);
    }
  }


  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении студентов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});




// POST request to add a new student
router.post('/add', async (req, res) => {
  const { fullName, iin, email, phone, whatsapp, telegram, status, topStudent, fundingSource, amountPaid, amountRemaining, streamId } = req.body;

  // Validate the input fields (you can improve the validation based on your needs)
  if (!fullName || !iin || !email || !phone || !status || !fundingSource) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO students (full_name, iin, email, phone, whatsapp, telegram, status, top_student, funding_source, amount_paid, amount_remaining, stream_id)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [fullName, iin, email, phone, whatsapp, telegram, status, topStudent, fundingSource, amountPaid, amountRemaining, streamId]
    );
    return res.status(201).json(result.rows[0]); // Send back the newly added student
  } catch (error) {
    console.error("Error adding student:", error);
    return res.status(500).json({ error: 'An error occurred while adding the student.' });
  }
});

module.exports = router;
