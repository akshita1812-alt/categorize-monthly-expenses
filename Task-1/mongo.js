const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Enable CORS for frontend
  
app.post("/post", (req, res) => {
    console.log("Connected to React");
    res.redirect("/");
  });

const dbUrl = 'mongodb+srv://asharma15be19:Akshita_123@cluster0.3agfsff.mongodb.net/'; 

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
db.once('open', () => {
    console.log('Connected to MongoDB');
});
  
  // Define Expense schema
  const expenseSchema = new mongoose.Schema({
    name: String,
    amount: Number,
    category: String,
  });
  
  const Expense = mongoose.model('Expense', expenseSchema);
  
  app.use(cors()); // Enable CORS for frontend
  app.use(bodyParser.json());
  
  // Create an expense
  app.post('/api/expenses', async (req, res) => {
    try {
      const { name, amount, category } = req.body;
      const expense = new Expense({ name, amount, category });
      await expense.save();
      res.status(201).json(expense);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  // Get all expenses
  app.get('/api/expenses', async (req, res) => {
    console.log("Received GET request for /api/expenses");
    try {
      const expenses = await Expense.find();
      res.status(200).json(expenses);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  

  
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));