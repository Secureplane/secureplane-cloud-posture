const express = require('express');
const { Pool } = require('pg'); // Import the pg module

const app = express();
const port = 3000;

app.use(express.json()); // Middleware to parse JSON requests

// Set up a PostgreSQL connection pool
const pool = new Pool({
    user: 'stephenako', // Replace with your PostgreSQL username
    host: 'localhost',
    database: 'agenda_db', // The database you created
    password: '', // Replace with your PostgreSQL password, if any
    port: 5432, // Default PostgreSQL port
});

// Route to get all agendas
app.get('/agendas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM agendas');
        res.json(result.rows); // Send all agendas as JSON
    } catch (err) {
        console.error(err);
        res.status(500).send('Error retrieving agendas');
    }
});

// Route to add a new agenda
app.post('/agendas', async (req, res) => {
    const { title, time } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO agendas (title, time) VALUES ($1, $2) RETURNING *',
            [title, time]
        );
        res.json({ message: 'Agenda added successfully!', agenda: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error adding agenda');
    }
});

app.listen(port, () => {
    console.log(`Agenda Service is running on port ${port}`);
});
app.get('/', (req, res) => {
    res.send('Welcome to Agenda Service');
});
app.get('/agendas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM agendas');
        res.json(result.rows);
    } catch (err) {
        console.error('Database query error:', err);
        res.status(500).send('Error retrieving agendas');
    }
});
