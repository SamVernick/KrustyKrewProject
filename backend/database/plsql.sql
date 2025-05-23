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


-- Drops the delete_product procedure
DROP PROCEDURE IF EXISTS delete_product;
DELIMITER //

-- Makes the delete_product procedure
CREATE PROCEDURE delete_product(
    IN product_id INT
)
COMMENT 'Deletes a product from the Product table'
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
