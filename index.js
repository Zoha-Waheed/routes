const express = require('express'); // Import Express
const app = express(); // Initialize Express

// Root Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Port Definition
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Basic Route
app.get('/', (req, res) => {
    res.send('Welcome to my Express app!');
});

// Route with Params
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User ID is: ${userId}`);
});

// Route with Multiple Params
app.get('/product/:category/:id', (req, res) => {
    const { category, id } = req.params;
    res.send(`Category: ${category}, Product ID: ${id}`);
});

// Route with Query
app.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    res.send(`You searched for: ${searchQuery}`);
});

// Route with Params and Query
app.get('/user/:id', (req, res) => {
    const userId = req.params.id;
    const showDetails = req.query.details;
    res.send(`User ID: ${userId}, Show Details: ${showDetails}`);
});
