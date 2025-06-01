const express = require('express');
const router = express.Router();
const pool = require('../config/db');

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
    query += ' ORDER BY id ASC';
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении студентов:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});

router.get('/update-student', async (req, res) => {
  const id = parseInt(req.query.id, 10);

  if (isNaN(id)) {
    return res.status(400).send('Неверный формат ID');
  }

  try {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).send('Студент не найден');
    }

    const student = result.rows[0];
    res.render('update_student', { student });
  } catch (error) {
    console.error('Ошибка загрузки студента:', error);
    res.status(500).send('Ошибка загрузки студента');
  }
});


router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Неверный формат ID' });
  }

  try {
    const result = await pool.query('SELECT * FROM students WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Студент не найден' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при получении студента:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});






router.put('/:id', async (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: 'Неверный формат ID' });
  }

  const {
    full_name,
    iin,  
    email,
    phone,
    whatsapp,
    telegram,
    status,
    top_student,
    funding_source,
    amount_paid,
    amount_remaining,
    stream_id
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE students SET
          full_name = $1,
          iin = $2,            -- update this field too
          email = $3,
          phone = $4,
          whatsapp = $5,
          telegram = $6,
          status = $7,
          top_student = $8,
          funding_source = $9,
          amount_paid = $10,
          amount_remaining = $11,
          stream_id = $12
       WHERE id = $13 RETURNING *`,
      [
        full_name,
        iin,           
        email,
        phone,
        whatsapp,
        telegram,
        status,
        top_student,
        funding_source,
        amount_paid,
        amount_remaining,
        stream_id,
        id
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Студент не найден' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении студента:', error);
    res.status(500).json({ error: 'Ошибка сервера при обновлении студента' });
  }
});



router.post('/add', async (req, res) => {
  const {
    fullName,
    iin,
    email,
    phone,
    whatsapp,
    telegram,
    status,
    topStudent,
    fundingSource,
    amountPaid,
    amountRemaining,
    streamId
  } = req.body;

  if (!fullName || !iin || !email || !phone || !status || !fundingSource) {
    return res.status(400).json({ error: "Please provide all required fields." });
  }

  try {
    const result = await pool.query(
      `INSERT INTO students (full_name, iin, email, phone, whatsapp, telegram, status, top_student, funding_source, amount_paid, amount_remaining, stream_id)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        fullName,
        iin,
        email,
        phone,
        whatsapp,
        telegram,
        status,
        topStudent,
        fundingSource,
        amountPaid,
        amountRemaining,
        streamId
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding student:", error);
    res.status(500).json({ error: 'An error occurred while adding the student.' });
  }
});





module.exports = router;
