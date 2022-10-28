CREATE DATABASE recipe_db;

DROP DATABASE recipe_db;

USE recipe_db;

CREATE TABLE Registered_User
(
    Username     VARCHAR(50) PRIMARY KEY NOT NULL,
    Password     VARCHAR(16)             NOT NULL,
    Firstname    VARCHAR(20)             NOT NULL,
    Lastname     VARCHAR(20)             NOT NULL,
    Address      VARCHAR(50)             NOT NULL,
    Bio          VARCHAR(255),
    Phone_Number VARCHAR(15)             NOT NULL,
    Join_Date    DATETIME DEFAULT NOW()
);

CREATE TABLE Recipe
(
    RecipeID     INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Username     VARCHAR(20)     NOT NULL,
    FOREIGN KEY (Username) REFERENCES Registered_User (Username) ON DELETE CASCADE,
    Title        VARCHAR(50)     NOT NULL,
    Description  VARCHAR(300)    NOT NULL,
    Cook_Time    INT             NOT NULL,
    Ingredients  JSON            NOT NULL,
    Step_By_Step JSON            NOT NULL,
    Added_Date   DATETIME DEFAULT NOW()
);

SELECT *
FROM Registered_User;