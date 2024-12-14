const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan'); // Import Morgan
const app = express();
const cors = require('cors');
app.use(cors());

const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Morgan Middleware for logging
app.use(morgan('dev')); // Logs HTTP requests in a concise format

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Define a Schema and Model
const userSchema = new mongoose.Schema({
    name: String,
    age: Number,
    email: String
});

const User = mongoose.model('User', userSchema);

// Create a New User (POST route)
app.post('/users', async (req, res) => {
    try {
        const user = new User(req.body); // Create user from request body
        const savedUser = await user.save(); // Save to the database
        res.status(201).send(savedUser);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Users (GET route)
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        res.status(200).send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
