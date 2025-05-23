const db = require('./db-connector');
// Express library used to create a web server that will listen and respond to API calls from the frontend
const express = require('express');
// Load environment variables
require('dotenv').config({ path: '../.env' });
const MY_ONID = process.env.DB_ONID;

// Instantiate an express object to interact with the server
const app = express();

// Middleware to allow cross-origin requests
const cors = require('cors');

// Get port from environment variables with fallback
const PORT = process.env.BACKEND_PORT;

// If on FLIP or classwork, use cors() middleware to allow cross-origin requests from the frontend with your port number:
// EX (local): http://localhost:5173
// EX (FLIP/classwork) http://classwork.engr.oregonstate.edu:5173
app.use(cors({ credentials: true, origin: "*" }));
app.use(express.json()); // this is needed for post requests, good thing to know
            
// Route handler 
app.get('/', async (req, res) => {
    try {
        // Define queries
        const query1 = 'DROP TABLE IF EXISTS diagnostic;';
        const query2 = 'CREATE TABLE diagnostic(id INT PRIMARY KEY AUTO_INCREMENT, text VARCHAR(255) NOT NULL);';
        const query3 = `INSERT INTO diagnostic (text) VALUES ("MySQL and React is working for ${MY_ONID}!")`;
        const query4 = 'SELECT * FROM diagnostic;';

        // Execute the queries
        await db.query(query1);
        await db.query(query2);
        await db.query(query3);

        // Get the results
        const [rows] = await db.query(query4);

        // Send back the results in JSON
        res.status(200).json(rows)

    } catch (error) {
        console.error("Error executing queries:", error);
        // Send a generic error message to the browser
        res.status(500).send("An error occurred while executing the database queries.");
    }
});

// Route to get all products
app.get('/api/products', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Products');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Route to delete a product
app.delete('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        // Use the stored procedure to delete the product
        await db.query('CALL delete_product(?)', [productId]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
});

// Route to reset the database schema and sample data
app.post('/api/reset', async (req, res) => {
    try {
        // Read and execute the DDL SQL file
        const fs = require('fs');
        const path = require('path');
        
        const ddlPath = path.join(__dirname, 'database', 'DDL.sql');
        const plsqlPath = path.join(__dirname, 'database', 'plsql.sql');
        console.log('Reading DDL script...');
        const ddlScript = fs.readFileSync(ddlPath, 'utf8');
        
        console.log('Reading PL/SQL script...');
        const plsqlScript = fs.readFileSync(plsqlPath, 'utf8');
        
        console.log('Executing DDL script...');
        await db.query(ddlScript);

        console.log('Processing PL/SQL script...');
        // Process the stored procedure differently
        // Remove DELIMITER statements and combine the procedure
        const processedProcedure = plsqlScript
            .replace(/DELIMITER \/\/|DELIMITER ;/g, '')
            .replace(/END \/\//g, 'END;');
            
        
        console.log('Executing PL/SQL script...');
        await db.query(processedProcedure);
        
        console.log('Database reset complete!');
        
        res.status(200).json({ message: 'Database reset successfully' });
    } catch (error) {
        console.error("Error resetting database:", error);
        res.status(500).json({ error: "Failed to reset database: " + error.message });
    }
});

// Tell express what port to listen on 
app.listen(PORT, function () {
    console.log('Express started on http://classwork.engr.oregonstate.edu:' + PORT + '; press Ctrl-C to terminate.');
});