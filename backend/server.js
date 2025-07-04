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

//Route to get all OrderDetails
app.get('/api/orderdetails', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                od.id, 
                od.productID,
                p.productName,
                od.orderID, 
                od.orderQuantity, 
                od.priceTotal
            FROM OrderDetails od
            JOIN Products p ON od.productID = p.id
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching order details:", error);
        res.status(500).json({ error: "Failed to fetch order details" });
    }
})

//Route to get all Orders
app.get('/api/orders', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                o.id,
                c.firstName,
                c.lastName,
                o.orderTotal
            FROM Orders o
            JOIN Customers c ON o.customerID = c.id
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching orders:", error);
        res.status(500).json({ error: "Failed to fetch orders" });
    }
});

//Route to get all Customers
app.get('/api/customers', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM Customers');
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching customers:", error);
        res.status(500).json({ error: "Failed to fetch customers" });
    }
});

//Route to get all Invoices
app.get('/api/invoices', async (req, res) => {
    try {
        const [rows] = await db.query(`
            SELECT
                i.id,
                i.orderID,
                c.firstName,
                c.lastName,
                o.orderTotal,
                i.saleDate,
                i.paid
            FROM Invoices i
            JOIN Customers c ON i.customerID = c.id
            LEFT JOIN Orders o ON i.orderID = o.id
        `);
        res.status(200).json(rows);
    } catch (error) {
        console.error("Error fetching invoices:", error);
        res.status(500).json({ error: "Failed to fetch invoices" });
    }
});

// Route to pay an invoice
app.put('/api/invoices', async (req, res) => {
    try {
        const invoiceId = req.body.id;
        await db.query('CALL pay_invoice(?)', [invoiceId]);
        res.status(200).json({ message: 'Invoice paid successfully' });
    } catch (error) {
        console.error("Error paying invoice:", error);
        res.status(500).json({ error: "Failed to pay invoice" });
    }
});

//Route to create a order detail
app.post('/api/orderdetails', async (req, res) => {
    try {
        const productId = req.body.pid;
        const orderId = req.body.oid;
        const order_quantity = req.body.amount;
        if(isNaN(parseInt(order_quantity))) {
            throw Error ("Quantity is not a number.");
        }
        // Use the stored procedure to update the product
        await db.query('CALL create_order_details(?, ?, ?, @new_orderDetailsID)', [productId, orderId, order_quantity]);
        res.status(200).json({ message: 'Order Detail created successfully' });
    } catch (error) {
        console.error("Error creating order detail:", error);
        res.status(500).json({ error: "Failed to create order detail" });
    }
});

// Route to delete a order detail
app.delete('/api/orderdetails/:id', async (req, res) => {
    const orderDetailId = req.params.id;
    try {
        // Use the stored procedure to delete tyhe product
        await db.query('CALL delete_order_details(?)', [orderDetailId]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
});


//Route to create a product
app.post('/api/products', async (req, res) => {
    try {
        const productName = req.body.name;
        const productPrice = req.body.price;
        if(isNaN(parseInt(productPrice))) {
            throw Error ("Product price is not a number.");
        }
        // Use the stored procedure to update the product
        await db.query('CALL create_product(?, ?, @new_productID)', [productName, productPrice]);
        res.status(200).json({ message: 'Product created successfully' });
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ error: "Failed to create product" });
    }
});

// Route to update a product
app.put('/api/products/:id', async (req, res) => {
    try {
        const productId = req.params.id;
        const productName = req.body.name;
        const productPrice = req.body.price;
        if(isNaN(parseInt(productPrice))) {
            throw Error ("Product price is not a number.");
        }
        // Use the stored procedure to update the product
        await db.query('CALL update_product(?, ?, ?)', [productId, productName, productPrice]);
        res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ error: "Failed to update product" });
    }
});

// Route to delete a product
app.delete('/api/products/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        await db.query('CALL delete_product(?)', [productId]);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ error: "Failed to delete product" });
    }
});

// Route to create a customer
app.post('/api/customers', async (req, res) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        await db.query('CALL create_customer(?, ?, @new_customerID)', [firstName, lastName]);
        res.status(200).json({ message: 'Customer created successfully' });
    } catch (error) {
        console.error("Error creating customer:", error);
        res.status(500).json({ error: "Failed to create customer" });
    }
});

// Route to update a customer
app.put('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;

        await db.query('CALL update_customer(?, ?, ?)', [customerId, firstName, lastName]);
        res.status(200).json({ message: 'Customer updated successfully' });
    } catch (error) {
        console.error("Error updating customer:", error);
        res.status(500).json({ error: "Failed to update customer" });
    }
});

// Route to delete a customer
app.delete('/api/customers/:id', async (req, res) => {
    try {
        const customerId = req.params.id;
        await db.query('CALL delete_customer(?)', [customerId]);
        res.status(200).json({ message: 'Customer deleted successfully' });
    } catch (error) {
        console.error("Error deleting customer:", error);
        res.status(500).json({ error: "Failed to delete customer" });
    }
});

// Route to create an order
app.post('/api/orders', async (req, res) => {
    try {
        const cid = req.body.cid;
        const pid = req.body.pid;
        const amount = req.body.amount;
        await db.query('CALL create_order(?, ?, ?, @new_orderID)', [cid, pid, amount]);
        res.status(200).json({ message: 'Order created successfully' });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: "Failed to create order" });
    }
});

// Route to delete an order
app.delete('/api/orders/:id', async (req, res) => {
    try {
        const orderId = req.params.id;
        await db.query('CALL delete_order(?)', [orderId]);
        res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error("Error deleting order:", error);
        res.status(500).json({ error: "Failed to delete order" });
    }
});

// Route to add an order detail
app.post('/api/orders/:id/orderdetails', async (req, res) => {
    try {
        const oid = req.params.oid;
        const pid = req.body.pid;
        const amount = req.body.amount;

        await db.query('CALL add_order_details(?, ?, ?)', [oid, pid, amount]);
        res.status(200).json({ message: 'Order detail added successfully' });
    } catch (error) {
        console.error("Error adding order detail:", error);
        res.status(500).json({ error: "Failed to add order detail" });
    }
});

// Route to update an order detail
app.put('/api/orderdetails/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const amount = req.body.amount;

        const [orderDetail] = await db.query('SELECT * FROM OrderDetails WHERE id = ?', [id]);

        if(!orderDetail.length){
            throw new Error("Order detail not found");
        }
        const pid = orderDetail[0].productID;

        await db.query('CALL update_order_details(?, ?, ?)', [id, pid, amount]);
        res.status(200).json({ message: 'Order detail updated successfully' });
    } catch (error) {
        console.error("Error updating order detail:", error);
        res.status(500).json({ error: "Failed to update order detail" });
    }
});

// Route to delete an order detail
app.delete('/api/orderdetails/:id', async (req, res) => {
    try {
        const id = req.params.id;
        await db.query('CALL delete_order_details(?)', [id]);
        res.status(200).json({ message: 'Order detail deleted successfully' });
    } catch (error) {
        console.error("Error deleting order detail:", error);
        res.status(500).json({ error: "Failed to delete order detail" });
    }
});

// Route to reset the database schema and sample data
app.post('/api/reset', async (req, res) => {
    try {
        // Read and execute the DDL SQL file
        const fs = require('fs');
        const path = require('path');
        
        const ddlPath = path.join(__dirname, 'database', 'DDL.sql');
        console.log('Reading DDL script...');
        const ddlScript = fs.readFileSync(ddlPath, 'utf8');
        
        console.log('Executing DDL script...');
        await db.query(ddlScript);

        const [customersResult] = await db.query('SELECT COUNT(*) as count FROM Customers');
        const [productsResult] = await db.query('SELECT COUNT(*) as count FROM Products');
        const [ordersResult] = await db.query('SELECT COUNT(*) as count FROM Orders');
        const [invoicesResult] = await db.query('SELECT COUNT(*) as count FROM Invoices');
        const [orderDetailsResult] = await db.query('SELECT COUNT(*) as count FROM OrderDetails');

        const results = {
            customers: customersResult[0].count,
            products: productsResult[0].count,
            orders: ordersResult[0].count,
            invoices: invoicesResult[0].count,
            orderDetails: orderDetailsResult[0].count
        };

        console.log('Database reset complete with the following counts:', results);
        
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