var mysql = require('mysql');
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
  
    port: 3306,
  
    user: "root",
  
    password: "root",
    database: "bamazon"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected");
    pickOptions()
});

function pickOptions () {
    inquirer
      .prompt([{
              name: "action",
              type: "list",
              message: "What would you like to do?",
              choices: [
                  "View Products For Sale",
                  "View Low Inventory",
                  "Add to Inventory",
                  "Add New Product"
                 ]
      }])
      .then(function(answer){
          switch (answer.action){
              case "View Products For Sale":
                viewProducts();
                break;
            
             case "View Low Inventory":
                viewLowInventory();
                break;
                
             case "Add to Inventory":  
                addInventory();
                break;
                
             case "Add New Product":
                addProduct();
                break;
          }
      }); 
}


function viewProducts() {
    connection.query("SELECT * FROM products", function(error, response) {
        if (error) throw error;
        for (var i = 0; i < response.length; i++){
            console.log("Id Number: " + response[i].item_id + " || " + response[i].product_name + " " + 
            response[i].price +  " " + "Quantity: " + response[i].stock_quantity + "\n")
            }
    })
};

function viewLowInventory() {
    connection.query('SELECT * FROM products WHERE stock_quantity < 30', 
    function (error, response){
        for (var i = 0; i < response.length; i++){
            console.log(
                    "Request processing" + 
                "Id Number: " + response[i].item_id + " || " + 
                "Product Name: " + response[i].product_name + " " +
                "Quantity: " + response[i].stock_quantity + "\n"
            )
        }
    });
};

function addInventory() {
    inquirer
    .prompt([
        {
            name: 'item',
            type: 'input',
            message: "To which item will you be adding stock?"
        },
        {
            name: 'quantity_to_add',
            type: 'input',
            message: 'How much inventory would you like to add?'
        }
    ]).then(function(answer){
        var queryTwo = 'UPDATE products SET stock_quantity = stock_quantity + ? WHERE item_id = ?'
        connection.query(queryTwo, [answer.quantity_to_add, answer.item], 
            function(){
           console.log("Stock updated");   
        })
    })
};

function addProduct() {
    inquirer
    .prompt([
        {
            name: 'item',
            type: 'input',
            message: "Which item will you be adding?"
        },
        {
            name: 'department',
            type: 'input',
            message: 'To which department does this item belong?'
        },
        {
            name: 'price',
            type: 'input',
            message: 'What is the price of this item?'
        },
        {
            name: 'quantity',
            type: 'input',
            message: 'How much inventory would you like to add?'
        },
    ]).then(function(answer){
        connection.query('INSERT INTO products SET ?',
                {product_name: answer.item,
                 department_name: answer.department,
                 price: answer.price,
                 stock_quantity: answer.quantity   
                }, 
            function(){
           console.log("Item added successfully");   
        })
    })
}
// 