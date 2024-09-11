const express = require('express');
const app = express();
const port = 3000;
const todoRoutes = require('./routes/todoRoutes');

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/todos', todoRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
