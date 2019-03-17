// Intialize
const mysql     = require("mysql");
const inquirer  = require("inquirer");
const colors = require("colors");

let items;

const connection = mysql.createConnection({
    "host"            : "localhost",
    "port"            : 3306,
    "user"            : "root",
    "password"        : "bamazon_db",
    "multipleStaments": true
});

connection.connect(error => {
    try {
        if (error) throw "Error: Connection to bamazon_db failed.\n";
    } catch(error) {
        displayError(error);
    }

    connection.query("SELECT item_id FROM products", (error, results) => {
        try {
            if (error) {
                throw "Error: Creating a local copy failed.\n";

            } else if (results.length === 0) {
                throw "Error: products table is empty.\n";

            }

            items = results.map(r => r.item_id);
        }catch(error) {
            displayError(error);
        }
    });
});

function displayError(error) {
    console.log(error.red.bold);

    connection.end();
}