/* Replace with your SQL commands */
CREATE DATABASE recipe_db;

CREATE TABLE Users
(
    Username     VARCHAR(50) PRIMARY KEY NOT NULL,
    Email        VARCHAR(125)            NOT NULL,
    Password     VARCHAR(255)            NOT NULL,
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