const express = require('express');
const router = express.Router();
const db = require('../config/db');

// CREATE - Add new todo
router.post('/', (req, res) => {
  const { todo_text } = req.body;
  const sql = 'INSERT INTO todos (todo_text) VALUES (?)';
  db.query(sql, [todo_text], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Todo added', id: result.insertId });
  });
});

// READ - Get all todos
router.get('/', (req, res) => {
  const sql = 'SELECT * FROM todos';
  db.query(sql, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// UPDATE - Update a specific todo
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { todo_text } = req.body;
  const sql = 'UPDATE todos SET todo_text = ? WHERE id = ?';
  db.query(sql, [todo_text, id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Todo updated' });
  });
});

// DELETE - Delete a specific todo
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM todos WHERE id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) throw err;
    res.json({ message: 'Todo deleted' });
    
  });
});

module.exports = router;
