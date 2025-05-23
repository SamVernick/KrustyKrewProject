-- These are the Database Manipulation queries for our project "The Krusty Krew" 
-- Below are all the required queries for the full functionality as listed in our Project Specs

-- Get a list of all Customer Invoices
SELECT customerID, total, saleDate, paid FROM Invoices

-- Get a list of all the Customers
SELECT firstName, lastName, moneySpent FROM Customers 

-- Get a list of all current Orders
SELECT id, orderTotal FROM Orders

-- For a user selected Order, get all the Order Details
SELECT prod.productName, orDetail.orderQuantity, prod.price AS pricePerItem, orDetail.priceTotal
FROM OrderDetails orDetail
INNER JOIN Products prod ON orDetail.productID = prod.id
WHERE orDetail.orderID = :order_id_selected_by_user

-- Get a list of all the Products
SELECT productName, price FROM Products

-- Add a new Customer
INSERT INTO Customers(firstName, lastName)
VALUES(:first_name_selected_by_user, :last_name_selected_by_user)

-- Delete a Customer
DELETE FROM Customers
WHERE id = :customer_id_selected_by_user

-- Update a Customer
UPDATE Customers
SET firstName = :first_name_selected_by_user, lastName = :last_name_selected_by_user
WHERE id = :customer_id_selected_by_user

-- Add a new Product
INSERT INTO Products(productName, price)
VALUES(:product_name_selected_by_user, :price_selected_by_user)

-- Delete a Product
DELETE FROM Products
WHERE id = :product_id_selected_by_user

-- Update a Product
UPDATE Products
SET productName = :product_name_selected_by_user, price = :price_selected_by_user
WHERE id = :product_id_selected_by_user

-- Add a new Order Sequence: 
-- Step 1: Create an order with initial total of 0
INSERT INTO Orders(customerID, orderTotal)
VALUES(:customer_id_selected_by_user, 0);

-- Get the ID of the newly created order
SET @new_order_id = LAST_INSERT_ID();

-- Step 2: Create OrderDetails for this order (can be called multiple times for multiple products)
INSERT INTO OrderDetails(productID, orderID, orderQuantity, priceTotal)
VALUES( :product_id_selected_by_user, @new_order_id, :order_quantity_selected_by_user, 
    (SELECT price * :order_quantity_selected_by_user FROM Products WHERE id = :product_id_selected_by_user)
);

-- Step 3: Update the order's total to be the sum of all OrderDetails priceTotals
UPDATE Orders
SET orderTotal = (
    SELECT SUM(priceTotal) 
    FROM OrderDetails 
    WHERE orderID = @new_order_id
)
WHERE id = @new_order_id;

-- Step 4: Create an invoice with the calculated total
INSERT INTO Invoices(orderID, customerID, total, saleDate, paid)
SELECT 
    id,                        
    customerID,
    orderTotal,
    CURDATE(),                   
    0                         
FROM Orders
WHERE id = @new_order_id;

-- Update invoice to mark it as paid
UPDATE Invoices
SET paid = 1
WHERE id = :user_selected_invoice_id;

-- Delete order and its details when Invoice is paid
DELETE FROM Orders
WHERE id = :user_selected_order_id;
-- Cascade deletes OrderDetails and sets Invoices.orderID to NULL

-- Delete Specific OrderDetails in an Order
-- Step 1: Delete the OrderDetails
SET @order_id_selected_by_user = :order_id_selected_by_user;
DELETE OrderDetails
WHERE orderID = :order_id_selected_by_user
AND productID = :product_id_selected_by_user;

-- Step 2: Update the Orders Table with new priceTotal
UPDATE Orders
SET orderTotal = (
    SELECT SUM(priceTotal) 
    FROM OrderDetails 
    WHERE orderID = @order_id_selected_by_user
)
WHERE id = @order_id_selected_by_user;

-- Step 3: Update the Invoices Table with new priceTotal
UPDATE Invoices
SET total = (
    SELECT orderTotal 
    FROM Orders 
    WHERE id = @order_id_selected_by_user
)
WHERE orderID = @order_id_selected_by_user;

-- Update Specific OrderDetail in an Order
-- Step 1: Update the OrderDetails
SET @order_id_selected_by_user = :order_id_selected_by_user;
UPDATE OrderDetails
SET orderQuantity = :new_order_quantity_selected_by_user, 
    priceTotal = (SELECT price * :new_order_quantity_selected_by_user FROM Products WHERE id = :product_id_selected_by_user)
WHERE orderID = @order_id_selected_by_user

-- Step 2: Update the Orders Table with new priceTotal
UPDATE Orders
SET orderTotal = (
    SELECT SUM(priceTotal) 
    FROM OrderDetails 
    WHERE orderID = @order_id_selected_by_user
)
WHERE id = @order_id_selected_by_user;

-- Step 3: Update the Invoices Table with new priceTotal
UPDATE Invoices
SET total = (
    SELECT orderTotal 
    FROM Orders 
    WHERE id = @order_id_selected_by_user
)
WHERE orderID = @order_id_selected_by_user;

-- DEVELOPER NOTE:
-- Considering the use of this Database we will not be updating orders often
-- This functionality is for the sake of completeness but in a real world scenario
-- this would be a rare occurance
-- EX: If a customer orders 2 Krabby Patties
-- and then decides to change it to 3 Krabby Patties
-- this would be a rare occurance and would be handled by the cashier


-- Create a new OrderDetail in an Order
-- Step 1: Create OrderDetails for this order (can be called multiple times for multiple products)
SET @order_id_selected_by_user = :order_id_selected_by_user;
INSERT INTO OrderDetails(productID, orderID, orderQuantity, priceTotal)
VALUES( :product_id_selected_by_user, @order_id_selected_by_user, :order_quantity_selected_by_user, 
    (SELECT price * :order_quantity_selected_by_user FROM Products WHERE id = :product_id_selected_by_user)
);

-- Step 2: Update the Orders Table with new priceTotal
UPDATE Orders
SET orderTotal = (
    SELECT SUM(priceTotal) 
    FROM OrderDetails 
    WHERE orderID = @order_id_selected_by_user
)
WHERE id = @order_id_selected_by_user;

-- Step 3: Update the Invoices Table with new priceTotal
UPDATE Invoices
SET total = (
    SELECT orderTotal 
    FROM Orders 
    WHERE id = @order_id_selected_by_user
)
WHERE orderID = @order_id_selected_by_user;


