const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

const userRoutes = require('./routes/user');
const recipeRoutes = require('./routes/recipe');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Frontend address
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true,
}));
app.use(express.json());
app.use(express.static(path.join(__dirname, './frontend/public'))); // Serve static files

// Routes
app.use('/api/users', userRoutes);
app.use('/api/recipes', authMiddleware.protect, recipeRoutes);

// Frontend Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/public/login.html'));
});

app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, './frontend/public/index.html'));
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('DB Connection Error:', err));

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
