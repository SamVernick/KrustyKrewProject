SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;

/*Creates Customers table*/
CREATE OR REPLACE TABLE Customers (
    id int AUTO_INCREMENT UNIQUE NOT NULL,
    firstName varchar(45) NOT NULL,
    lastName varchar(45),
    moneySpent decimal(9,2) NOT NULL,
    PRIMARY KEY (id)
);

/*Creates Products table*/
CREATE OR REPLACE TABLE Products (
    id int AUTO_INCREMENT UNIQUE NOT NULL,
    productName varchar(45) UNIQUE NOT NULL,
    price decimal(6,2) NOT NULL,
    PRIMARY KEY (id)
);

/*Creates Orders table*/
CREATE OR REPLACE TABLE Orders (
    id int AUTO_INCREMENT UNIQUE NOT NULL,
    customerID int NOT NULL,
    orderTotal decimal(6,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (customerID) REFERENCES Customers(id)
    ON DELETE CASCADE /*Will delete the Orders data for the customerID inputted if that customerID is deleted*/
);

/*Creates OrderDetails table*/
CREATE OR REPLACE TABLE OrderDetails (
    id int AUTO_INCREMENT UNIQUE NOT NULL,
    productID int NOT NULL,
    orderID int NOT NULL,
    orderQuantity int NOT NULL,
    priceTotal decimal(6,2) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (productID) REFERENCES Products(id)
    ON DELETE CASCADE, /*Will delete the OrderDetails data for the productID inputted if that productID is deleted*/
    FOREIGN KEY (orderID) REFERENCES Orders(id)
    ON DELETE CASCADE /*Will delete the OrderDetails data for the orderID inputted if that orderID is deleted*/
);

/*Creates Invoices table*/
CREATE OR REPLACE TABLE Invoices (
    id int AUTO_INCREMENT UNIQUE NOT NULL,
    orderID int NULL,
    customerID int NULL,
    total decimal(6,2) NOT NULL,
    saleDate date NOT NULL,
    paid tinyint(1) DEFAULT 0 NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (orderID) REFERENCES Orders(id)
    ON DELETE SET NULL, /*Will set the orderID field in Invoices to NULL*/
    FOREIGN KEY (customerID) REFERENCES Customers(id)
    ON DELETE SET NULL /*Will set the customerID field in Invoices to NULL*/
);


/*Inserts data into Customers table*/
INSERT INTO Customers (firstName, lastName, moneySpent) VALUES
    ("Mermaid", "Man", 0.00), 
    ("Barnacle", "Boy", 0.00), 
    ("Patrick", "Star", 0.00), 
    ("Bubble", "Bass", 0.00);

/*Inserts data into Products table*/
INSERT INTO Products (productName, price) VALUES 
    ("Krabby Patty", 1.25), 
    ("Krabby Meal", 3.50), 
    ("Salty Sea Dog", 1.25), 
    ("Kelp Shake", 2.00);

/*Inserts data into Orders table*/
INSERT INTO Orders (customerID, orderTotal) VALUES 
    ((SELECT id FROM Customers WHERE firstName = "Bubble" AND lastName = "Bass"), 10.00),
    ((SELECT id FROM Customers WHERE firstName = "Mermaid" AND lastName = "Man"), 20.00),
    ((SELECT id FROM Customers WHERE firstName = "Patrick" AND lastName = "Star"), 14.00);

/*Inserts data into OrderDetails table*/
INSERT INTO OrderDetails (productID, orderID, orderQuantity, priceTotal) VALUES 
    ((SELECT id FROM Products WHERE productName = "Krabby Patty"), (SELECT id FROM Orders WHERE id = 1), 4, (SELECT price * 4 FROM Products WHERE productName = "Krabby Patty")),
    ((SELECT id FROM Products WHERE productName = "Salty Sea Dog"), (SELECT id FROM Orders WHERE id = 1), 4, (SELECT price * 4 FROM Products WHERE productName = "Salty Sea Dog")),
    ((SELECT id FROM Products WHERE productName = "Kelp Shake"), (SELECT id FROM Orders WHERE id = 2), 10, (SELECT price * 4 FROM Products WHERE productName = "Kelp Shake")),
    ((SELECT id FROM Products WHERE productName = "Krabby Meal"), (SELECT id FROM Orders WHERE id = 3), 4, (SELECT price * 4 FROM Products WHERE productName = "Krabby Meal"));

/*Inserts data into Invoices table*/
INSERT INTO Invoices (orderID, customerID, total, saleDate) VALUES 
    ((SELECT id FROM Orders WHERE id = 1), (SELECT id FROM Customers WHERE firstName = "Bubble" AND lastName = "Bass"), (SELECT orderTotal FROM Orders WHERE id = 1), '2025-05-01'),
    ((SELECT id FROM Orders WHERE id = 3), (SELECT id FROM Customers WHERE firstName = "Patrick" AND lastName = "Star"), (SELECT orderTotal FROM Orders WHERE id = 3), '2024-06-27'),
    ((SELECT id FROM Orders WHERE id = 2), (SELECT id FROM Customers WHERE firstName = "Mermaid" AND lastName = "Man"), (SELECT orderTotal FROM Orders WHERE id = 2), '2023-12-19');

SET FOREIGN_KEY_CHECKS=1;
COMMIT;