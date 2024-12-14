/*const express = require('express');
const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// Custom middleware to log request details
const loggerMiddleware = (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route
};

// Use the middleware
app.use(loggerMiddleware);


const blockBotsMiddleware = (req, res, next) => {
    if (req.headers['user-agent'] && req.headers['user-agent'].includes('bot')) {
        return res.status(403).send('Access denied for bots.');
    }
    next(); // Allow other requests
};

app.use(blockBotsMiddleware);
*/
const express = require('express');
const app = express();

const PORT = 3000;

// Middleware 1: Logs the request method and URL
const middleware1 = (req, res, next) => {
    console.log('Middleware 1: Request received');
    console.log(`Method: ${req.method}, URL: ${req.url}`);
    next(); // Pass control to the next middleware
};

// Middleware 2: Adds a timestamp to the request and logs it
const middleware2 = (req, res, next) => {
    console.log('Middleware 2: Adding timestamp');
    req.requestTime = new Date().toISOString();
    console.log(`Timestamp: ${req.requestTime}`);
    next(); // Pass control to the next middleware or route
};

// Use both middlewares
app.use(middleware1);
app.use(middleware2);

// Define a route
app.get('/', (req, res) => {
    console.log('Route Handler: Sending response');
    res.send(`Hello, World! Request received at: ${req.requestTime}`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
