// Importing required modules
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Initialize the Express app
const app = express();
const PORT = 3000;

// Middleware setup
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(morgan('dev')); // Log incoming requests

// Sample data for CRUD operations
let items = [
    { id: 1, name: 'Item 1', description: 'This is item 1' },
    { id: 2, name: 'Item 2', description: 'This is item 2' },
];

// Routes

// Home route
app.get('/', (req, res) => {
    res.send('Welcome to Express.js Basics!');
});

// GET all items
app.get('/items', (req, res) => {
    res.json(items);
});

// GET an item by ID
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    const item = items.find(i => i.id === parseInt(id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// POST - Create a new item
app.post('/items', (req, res) => {
    const { name, description } = req.body;
    const newItem = {
        id: items.length + 1,
        name,
        description,
    };
    items.push(newItem);
    res.status(201).json(newItem);
});

// PUT - Update an existing item
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;
    const item = items.find(i => i.id === parseInt(id));
    if (item) {
        item.name = name || item.name;
        item.description = description || item.description;
        res.json(item);
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// DELETE - Remove an item
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;
    const index = items.findIndex(i => i.id === parseInt(id));
    if (index !== -1) {
        items.splice(index, 1);
        res.json({ message: 'Item deleted successfully' });
    } else {
        res.status(404).json({ message: 'Item not found' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
