CREATE DATABASE recipe_db;

DROP DATABASE recipe_db;

USE recipe_db;

CREATE TABLE Users
(
    Username     VARCHAR(50) PRIMARY KEY NOT NULL,
    Email        VARCHAR(125)            NOT NULL,
    Password     VARCHAR(16)             NOT NULL,
    Firstname    VARCHAR(20)             NOT NULL,
    Lastname     VARCHAR(20)             NOT NULL,
    Address      VARCHAR(50)             NOT NULL,
    Bio          VARCHAR(255),
    Phone_Number VARCHAR(15)             NOT NULL,
    CreatedAt    TIMESTAMP               NOT NULL DEFAULT NOW()
);

CREATE TABLE Recipes
(
    RecipeID     INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    Username     VARCHAR(20)     NOT NULL,
    FOREIGN KEY (Username) REFERENCES Users (Username) ON DELETE CASCADE,
    Title        VARCHAR(50)     NOT NULL,
    Description  VARCHAR(300)    NOT NULL,
    Cook_Time    INT             NOT NULL,
    Ingredients  JSON            NOT NULL,
    Step_By_Step JSON            NOT NULL,
    CreatedAt    TIMESTAMP       NOT NULL DEFAULT NOW()
);

SELECT *
FROM Users;

SELECT *
FROM Recipes;

DELETE
FROM Users
WHERE Username = 'raihanromzi';

DELETE
FROM Recipes
WHERE RecipeID = 4;

UPDATE Users
SET Firstname='Raihan',
    Lastname='Romzi',
    Address='Jl. Palem Raya No.21, Bandung',
    Bio='eweuh',
    Phone_Number='12345'
WHERE Username = 'raihanromzi';

UPDATE Recipes
SET Title= 'Udang Saos Teriyaki',
    Description= 'Makanan khas rumah makan',
    Cook_Time= 5,
    Ingredients= '{
      "1": "Masak udang",
      "2": "Masak air"
    }',
    Step_By_Step= '{
      "1": "Masak udang",
      "2": "Masak air"
    }'
WHERE Username = 'raihanromzi'
  AND RecipeID = '10';