-- DROP PROCEDURE IF EXISTS sp_insert_customer;
-- DELIMITER //

-- CREATE PROCEDURE sp_insert_customer(
--     IN c_fname varchar(45),
--     IN c_lname varchar(45),
--     IN c_money decimal(9,2),
--     OUT new_customerID int
-- )
-- COMMENT "Adds a new customer to Customers table"
-- BEGIN
--     DECLARE c_id int;
--     DECLARE EXIT HANDLER FOR SQLEXCEPTION
--     BEGIN 
--         ROLLBACK;
--         SET new_customerID = -99;
--     END;

--     START TRANSACTION;

--     INSERT INTO `Customers` (firstName, lastName, moneySpent)
--     VALUES (c_fname, c_lname, c_money);

--     SET c_id = LAST_INSERT_ID();
--     SET new_customerID = c_id;
--     COMMIT;

-- END //
-- DELIMITER ;


-- ORDER DETAILS PROCEDURES START BELOW:
-- TODO!! Add a trigger for each time update_order_details is called, it updates the price column in orderdetails and in orders


-- Drops the update_order_details procedure
DROP PROCEDURE IF EXISTS update_order_details;
DELIMITER //

-- Creates update_order_details procedure
CREATE PROCEDURE update_order_details(
    IN od_id INT, -- order details ID
    IN p_id INT,
    IN o_id INT, -- order ID
    IN new_quantity INT
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
    IF EXISTS (SELECT OrderDetails.id, Orders.id, Products.id FROM OrderDetails INNER JOIN Products ON OrderDetails.productID = Products.id INNER JOIN Orders ON OrderDetails.orderID = Orders.id WHERE OrderDetails.id = od_id AND Products.id = p_id AND Orders.id = o_id) THEN 
        UPDATE OrderDetails SET orderQuantity = new_quantity WHERE id = od_id AND productID = p_id AND orderID = o_id;
        SELECT 'Updated OrderDetails successfully!' AS message;
    ELSE
        -- if the id couldn't be found rollsback
        ROLLBACK;
        SELECT 'Error: Products/Orders/OrderDetails id does not exist for that Order Number try again.' AS message;
        LEAVE proc_end;
    END IF;
    COMMIT;
END //
DELIMITER ;



-- ORDER DETAILS PROCEDURES HAVE ENDED



-- PRODUCTS SQL PROCEDURES START BELOW:
-- TODO add a trigger for each time product price is updated, it updates the orders dropdown since then but keeps the invoices items the same


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