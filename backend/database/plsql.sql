-- INVOICES PROCEDURES START BELOW:

-- Helpful function calls:
Select * from Invoices;
Select * from Customers;
Select * from Orders;
Select * from OrderDetails;
call pay_invoice(2);
call create_invoice(8, 3, @new_i_id);
call update_invoice_totals(1, 1);


DROP PROCEDURE IF EXISTS create_invoice;
DELIMITER //

CREATE PROCEDURE create_invoice(
    IN o_id INT,
    IN c_id INT,
    OUT new_invoiceID INT
)
COMMENT "Adds a new invoice to Invoices table"
BEGIN
    DECLARE i_id int;
    DECLARE i_total decimal(6,2);
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SET new_invoiceID = -99;
    END;

    START TRANSACTION;

    SELECT orderTotal INTO i_total FROM Orders WHERE id = o_id; 
    INSERT INTO `Invoices` (orderID, customerID, total, saleDate)
    VALUES (o_id, c_id, i_total, CURDATE());

    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Creation error' AS message;
    ELSE 
        -- If the creation was a success it commits the changes and sets the message as being successful
        SET i_id = LAST_INSERT_ID();
        SET new_invoiceID = i_id;
        COMMIT;
        SELECT 'Invoice added to Invoices table!' AS message;
    END IF;

END //
DELIMITER ;


DROP PROCEDURE IF EXISTS update_invoice_totals;
DELIMITER //

-- Makes the update_customer_totals procedure
CREATE PROCEDURE update_invoice_totals(
    IN i_id INT,
    IN o_id INT
)
COMMENT 'Updates the total for the invoice from the Invoices table'
proc_end: BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 

    -- Creates the error handler message
    BEGIN 
        ROLLBACK;
        SELECT 'Update error' AS message;
    END;

    START TRANSACTION;

    -- Checks if the id passed in exists
    IF EXISTS (SELECT 1 FROM Invoices WHERE id = i_id) THEN 
        UPDATE Invoices SET total = (SELECT orderTotal FROM Orders WHERE id = o_id ) WHERE id = i_id;
        SELECT 'Updated Invoices successfully!' AS message;
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Invoice id does not exist for that Invoice Number try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;

END //
DELIMITER ; 


DROP PROCEDURE IF EXISTS pay_invoice;
DELIMITER //

-- Creates pay_invoice procedure
CREATE PROCEDURE pay_invoice(
    IN i_id INT
)
COMMENT 'Updates the invoice setting it to be paid'
proc_end: BEGIN
    DECLARE c_id INT;
    DECLARE o_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    -- Makes the error handler message
    BEGIN
        ROLLBACK;
        SELECT 'Error: Could not update Invoices!' AS message;
    END;

    START TRANSACTION;

    -- Checks if the id passed in exists
    IF EXISTS (SELECT 1 FROM Invoices WHERE id = i_id) THEN 
        UPDATE Invoices SET paid = 1 WHERE id = i_id;
        SELECT 'Updated Invoices successfully!' AS message;
        SELECT customerID INTO c_id FROM Invoices WHERE id = i_id;
        SELECT orderID INTO o_id FROM Invoices WHERE id = i_id;
        IF (c_id IS NOT NULL AND o_id IS NOT NULL) THEN 
            CALL update_customer_totals(c_id);
            CALL delete_order(o_id);
        ELSE 
            ROLLBACK;
            SELECT 'Error: Customer/Order id does not exist for that Invoice Number try again.' AS message;
            LEAVE proc_end;
        END IF;
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Invoices id does not exist for that Invoice Number try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;
END //
DELIMITER ;

-- INVOICES HAVE ENDED



-- CUSTOMER PROCEDURES START BELOW:

-- Helpful function calls:
select * from Customers;
call create_customer("Squidward", "Tentacles", @new_id);
call update_customers(6, "Squilliam", "Fancyton");
call delete_customers(6);

DROP PROCEDURE IF EXISTS create_customer;
DELIMITER //

CREATE PROCEDURE create_customer(
    IN c_fname varchar(45),
    IN c_lname varchar(45),
    OUT new_customerID int
)
COMMENT "Adds a new customer to Customers table"
BEGIN
    DECLARE c_id int;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SET new_customerID = -99;
    END;

    START TRANSACTION;

    INSERT INTO `Customers` (firstName, lastName)
    VALUES (c_fname, c_lname);

    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Creation error' AS message;
    ELSE 
        -- If the creation was a success it commits the changes and sets the message as being successful
        SET c_id = LAST_INSERT_ID();
        SET new_customerID = c_id;
        COMMIT;
        SELECT 'Customer added to Customers table!' AS message;
    END IF;

END //
DELIMITER ;


-- Drops the update_customer procedure
DROP PROCEDURE IF EXISTS update_customer;
DELIMITER //

-- Creates update_customer procedure
CREATE PROCEDURE update_customer(
    IN c_id INT,
    IN c_fname varchar(45),
    IN c_lname varchar(45)
)
COMMENT 'Updates the first and lastname of the customer id passed in'
proc_end: BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    -- Makes the error handler message
    BEGIN
        ROLLBACK;
        SELECT 'Error: Could not update Customers!' AS message;
    END;

    START TRANSACTION;

    -- Checks if the id passed in exists
    IF EXISTS (SELECT 1 FROM Customers WHERE id = c_id) THEN 
        UPDATE Customers SET firstName = c_fname, lastName = c_lname WHERE id = c_id;
        SELECT 'Updated Customers successfully!' AS message;
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Customer id does not exist for that Customer Number try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;
END //
DELIMITER ;


-- Deletes the delete_customer procedure
DROP PROCEDURE IF EXISTS delete_customer;
DELIMITER //

-- Makes the delete_customer procedure
CREATE PROCEDURE delete_customer(
    IN c_id INT
)
COMMENT 'Deletes a customer from the Customers table'
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 

    -- Creates the error handler message
    BEGIN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    END;

    START TRANSACTION;

    -- Deletes the customer from the customers table
   DELETE FROM Customers WHERE Customers.id = c_id;
    -- If the deletion fails then it prints out the error message
    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    ELSE 
        -- If the deletion was a success it commits the changes and sets the message as being successful
        COMMIT;
        SELECT 'Customer deleted from Customers table' AS message;
    END IF;

END //
DELIMITER ; 


DROP PROCEDURE IF EXISTS update_customer_totals;
DELIMITER //

-- Makes the update_customer_totals procedure
CREATE PROCEDURE update_customer_totals(
    IN c_id INT
)
COMMENT 'Updates the total spent for the customer from the Customers table'
proc_end: BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 

    -- Creates the error handler message
    BEGIN 
        ROLLBACK;
        SELECT 'Update error' AS message;
    END;

    START TRANSACTION;

    -- Checks if the id passed in exists
    IF EXISTS (SELECT 1 FROM Customers WHERE id = c_id) THEN 
        UPDATE Customers SET moneySpent = (SELECT SUM(total) FROM Invoices WHERE customerID = c_id AND paid =  1) WHERE id = c_id;
        SELECT 'Updated Customers total successfully!' AS message;
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Customer id does not exist for that Customer Number try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;

END //
DELIMITER ; 


-- CUSTOMER PROCEDURES HAVE ENDED



-- ORDER PROCEDURES START BELOW:

-- Helpful function calls:
select * from Orders;
select * from OrderDetails;
select * from Products;
select * from Invoices;
call create_order(5, 4, 2, @new_id);
call update_order_total(1);

-- Drops the create_order procedure
DROP PROCEDURE IF EXISTS create_order;
DELIMITER //

-- Creates create_order procedure
CREATE PROCEDURE create_order(
    IN c_id INT,
    IN p_id INT,
    IN quantity INT,
    OUT new_order_id INT
)
COMMENT "Adds a new order to Orders table"
BEGIN
    DECLARE o_id int;
    -- Creates the error handler
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SET new_order_id = -99;
    END;

    START TRANSACTION;
    IF EXISTS (SELECT 1 FROM Customers WHERE id = c_id) THEN
        IF EXISTS (SELECT 1 FROM Products WHERE id = p_id) THEN
            INSERT INTO `Orders` (customerID, orderTotal)
            VALUES (c_id, ((SELECT Products.price FROM Products WHERE Products.id = p_id)*quantity));

            IF ROW_COUNT() = 0 THEN 
                ROLLBACK;
                SELECT 'Creation error: Insertion failed' AS message;
            ELSE 
                -- If the creation was a success it commits the changes and sets the message as being successful
                SET o_id = LAST_INSERT_ID();
                SET new_order_id = o_id;
                COMMIT;
                SELECT 'Order added to Orders table!' AS message;
                CALL create_invoice(o_id, c_id, @new_i_id);
                CALL create_order_details(p_id, o_id, quantity, @new_od_id);
            END IF;
        ELSE
            ROLLBACK;
            SELECT 'Creation error: Product id is incorrect' AS message;
        END IF;
    ELSE
        ROLLBACK;
        SELECT 'Creation error: Order id is incorrect' AS message;
    END IF;

END //
DELIMITER ;


-- Drops the update_order_total procedure
DROP PROCEDURE IF EXISTS update_order_total;
DELIMITER //

-- Creates update_order_total procedure
CREATE PROCEDURE update_order_total(
    IN o_id INT
)
COMMENT 'Updates the total of a order that is already in the Orders table'
proc_end: BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    -- Makes the error handler message
    BEGIN
        ROLLBACK;
        SELECT 'Error: Could not update Order total!' AS message;
    END;

    START TRANSACTION;

    -- Checks if the all the ids exists currently in the OrderDetails table for that specific order
    IF EXISTS (SELECT 1 FROM Orders WHERE id = o_id) THEN 
        UPDATE Orders SET orderTotal = (SELECT SUM(priceTotal) FROM OrderDetails WHERE orderID = o_id) WHERE id = o_id;
        SELECT 'Updated Order total successfully!' AS message;
        CALL update_invoice_totals( (SELECT id FROM Invoices WHERE orderID = o_id), o_id);
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Order id does not exist for that Order try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;
END //
DELIMITER ;


-- Deletes the delete_order procedure
DROP PROCEDURE IF EXISTS delete_order;
DELIMITER //

-- Makes the delete_order procedure
CREATE PROCEDURE delete_order(
    IN o_id INT   -- order ID
)
COMMENT 'Deletes a order from the Orders table, after customer has paid'
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 

    -- Creates the error handler message
    BEGIN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    END;

    START TRANSACTION;

    -- Deletes the order from the orders table matching the order id passed in
   DELETE FROM Orders WHERE Orders.id = o_id;
    -- If the deletion fails then it prints out the error message
    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    ELSE 
        -- If the deletion was a success it commits the changes and sets the message as being successful
        COMMIT;
        SELECT 'Order deleted from Orders table' AS message;
    END IF;

END //
DELIMITER ; 


-- ORDER PROCEDURES HAVE ENDED



-- ORDER DETAILS PROCEDURES START BELOW:

select * from Orders;
select * from OrderDetails;
select * from Products;
call create_order_details(4, 1, 2, @new_od_id);
call update_order_details(12, 2, 4, @new_price);

DROP PROCEDURE IF EXISTS create_order_details;
DELIMITER //

-- Creates create_order_details procedure
CREATE PROCEDURE create_order_details(
    IN p_id INT,
    IN o_id INT,
    IN quantity INT,
    OUT new_order_detail_id INT
)
COMMENT "Adds a new order detail to an existing order in Order Details table"
BEGIN
    DECLARE od_id int;
    DECLARE t_price decimal(6,2);
    -- Creates the error handler
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SET new_order_detail_id = -99;
    END;

    START TRANSACTION;
    IF EXISTS(SELECT 1 FROM Products JOIN Orders WHERE Products.id = p_id AND Orders.id = o_id) THEN
        SELECT price INTO t_price FROM Products WHERE id = p_id;
        INSERT INTO `OrderDetails` (productID, orderID, orderQuantity, priceTotal)
        VALUES (p_id, o_id, quantity, (t_price * quantity));

        IF ROW_COUNT() = 0 THEN 
            ROLLBACK;
            SELECT 'Creation error: Insertion failed' AS message;
        ELSE 
            -- If the creation was a success it commits the changes and sets the message as being successful
            SET od_id = LAST_INSERT_ID();
            SET new_order_detail_id = od_id;
            COMMIT;
            SELECT 'Order Detail added to OrderDetails table!' AS message;
            CALL update_order_total(o_id);
        END IF;
    ELSE
        ROLLBACK;
        SELECT 'Creation error: Product/Order id is incorrect' AS message;
    END IF;

END //
DELIMITER ;


-- Drops the update_order_details procedure
DROP PROCEDURE IF EXISTS update_order_details;
DELIMITER //

-- Creates update_order_details procedure
CREATE PROCEDURE update_order_details(
    IN od_id INT, -- order details ID
    IN p_id INT,
    IN new_quantity INT,
    OUT new_price decimal(6,2)
)
COMMENT 'Updates the quantity of a product that is already in the Order Details table'
proc_end: BEGIN
    DECLARE product_id INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    -- Makes the error handler message
    BEGIN
        ROLLBACK;
        SELECT 'Error: Could not update OrderDetails!' AS message;
    END;

    START TRANSACTION;

    -- Checks if the all the ids exists currently in the OrderDetails table for that specific order
    IF EXISTS (SELECT OrderDetails.id, Products.id FROM OrderDetails INNER JOIN Products ON OrderDetails.productID = Products.id WHERE OrderDetails.id = od_id AND Products.id = p_id) THEN 
        UPDATE OrderDetails SET orderQuantity = new_quantity, priceTotal = ((SELECT Products.price FROM Products WHERE Products.id = p_id)*new_quantity) WHERE id = od_id AND productID = p_id;
        SELECT 'Updated OrderDetails successfully!' AS message;
        CALL update_order_total(o_id);
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Products/Orders/OrderDetails id does not exist for that Order Number try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;
END //
DELIMITER ;


-- Deletes the delete_order_details procedure
DROP PROCEDURE IF EXISTS delete_order_details;
DELIMITER //

-- Makes the delete_order_details procedure
CREATE PROCEDURE delete_order_details(
    IN od_id INT   -- order details ID
)
COMMENT 'Deletes a product from the OrderDetails table, which is part of a certain order number'
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 

    -- Creates the error handler message
    BEGIN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    END;

    START TRANSACTION;

    -- Deletes the product from the order number matching the order details id passed in
   DELETE FROM OrderDetails WHERE OrderDetails.id = od_id;
    -- If the deletion fails then it prints out the error message
    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    ELSE 
        -- If the deletion was a success it commits the changes and sets the message as being successful
        COMMIT;
        SELECT 'Order detail deleted from Order Details table' AS message;
    END IF;

END //
DELIMITER ; 



-- ORDER DETAILS PROCEDURES HAVE ENDED



-- PRODUCTS SQL PROCEDURES START BELOW:

-- Drops the create_product procedure
DROP PROCEDURE IF EXISTS create_product;
DELIMITER //

-- Makes the create_product procedure
CREATE PROCEDURE create_product(
    IN p_name varchar(45),
    IN p_price decimal(6,2),
    OUT new_productID int
)
COMMENT "Adds a new product to Products table"
BEGIN
    DECLARE p_id int;
    -- Creates the error handler
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN 
        ROLLBACK;
        SET new_productID = -99;
    END;

    START TRANSACTION;

    INSERT INTO `Products` (productName, price)
    VALUES (p_name, p_price);

    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Creation error' AS message;
    ELSE 
        -- If the creation was a success it commits the changes and sets the message as being successful
        SET p_id = LAST_INSERT_ID();
        SET new_productID = p_id;
        COMMIT;
        SELECT 'Product added to Product table!' AS message;
    END IF;

END //
DELIMITER ;


-- Drops the update_product procedure
DROP PROCEDURE IF EXISTS update_product;
DELIMITER //

-- Creates update_product procedure
CREATE PROCEDURE update_product(
    IN p_id INT,
    IN new_p_name varchar(255),
    IN new_p_price decimal(6,2)
)
COMMENT 'Updates a product that is currently in the Products table'
proc_end: BEGIN

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    -- Makes the error handler message
    BEGIN
        ROLLBACK;
        SELECT 'Update error!' AS message;
    END;

    START TRANSACTION;

    -- Checks if the id exists currently in the Products table
    IF EXISTS (SELECT 1 FROM Products WHERE id = p_id) THEN 
        -- Updates product name and price for whatever the user inserted, where the id matches
        UPDATE Products SET productName = new_p_name, price = new_p_price WHERE id = p_id;
        SELECT 'Updated product successfully!' AS result;
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Update error!' AS message;
        LEAVE proc_end;
    END IF;

    -- Return the new values of the product that was updated
    -- SELECT p.productName AS productName, p.price AS price FROM Products p WHERE p.id = p_id;
    COMMIT;
END //
DELIMITER ;


-- Drops the delete_product procedure
DROP PROCEDURE IF EXISTS delete_product;
DELIMITER //

-- Makes the delete_product procedure
CREATE PROCEDURE delete_product(
    IN product_id INT
)
COMMENT 'Deletes a product from the Products table'
BEGIN 
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 

    -- Creates the error handler message
    BEGIN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    END;

    START TRANSACTION;

    -- Deletes the product matching the product id passed in
    DELETE FROM Products WHERE id = product_id;

    -- If the deletion fails then it prints out the error message
    IF ROW_COUNT() = 0 THEN 
        ROLLBACK;
        SELECT 'Deletion error' AS message;
    ELSE 
        -- If the deletion was a success it commits the changes and sets the message as being successful
        COMMIT;
        SELECT 'Product deleted from Product table' AS message;
    END IF;

END //

DELIMITER ; 

-- PRODUCTS SQL PROCEDURES HAVE ENDED

Select * from Customers;
Select * from Invoices;
Select * from Orders;
Select * from OrderDetails;
Select * from Products;