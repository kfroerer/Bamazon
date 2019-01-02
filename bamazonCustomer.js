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
    displayItems()
});


function displayItems() {
    connection.query("SELECT * FROM products", function(error,response) {
        if (error) throw error;
        for (var i = 0; i < response.length; i++){
            console.log("Id Number: " + response[i].item_id + " || " + response[i].product_name + " " + response[i].price + "\n")
            }
        askItem();
    })
};

function askItem () {
    inquirer
      .prompt([
          {
        name: "id_name",
        type: "input",
        message: "What is the id number of the item you'd like to purchase?"
      },
      {
        name: "quantity",
        type: "input",
        message: "How many would you like?"
      }])
      .then(function(answer){
        var query = "SELECT * FROM products WHERE?"
        connection.query(query, {item_id: answer.id_name}, function(error, response){
            var quantityDB = response[0].stock_quantity;
            var numSold = answer.quantity;
            var totalPrice = round(numSold * response[0].price, 2);
            
            console.log("Great choice! Let me check our stock");
            //check stock listed in MYSQL and give total or error
            if (quantityDB > numSold){
                console.log(
                    "Not a problem. We have what you need. Your total is " +
                     totalPrice);
                updateQuantity(quantityDB, numSold, answer.id_name);
                addProductSales(response[0].product_sales, totalPrice, answer.id_name);     
            }
            
            else if (quantityDB < numSold && quantityDB > 0){
                console.log("Sorry. We only have " + quantityDB + " available.");
            }
            else {
                console.log("Sorry. We no longer have that item available.")
            }
            
        });
});
};
//rounds values to 2 decimal places
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}
//updates SQL database based on users' input
function updateQuantity (dbQuantity, ansQuantity, id) {
    var newQuantity = dbQuantity - ansQuantity;
    var queryTwo = 'UPDATE products SET stock_quantity = ? WHERE item_id = ?'
    connection.query(queryTwo, [newQuantity, id], function(){
           console.log("Stock updated");   
                             
    });
}

function addProductSales(currentTotal, newTotal, id) {
    var newSalesTotal = round(currentTotal + newTotal, 2);
    console.log(newSalesTotal);
    var salesQuery = 'UPDATE products SET product_sales = ? WHERE item_id = ?'
    connection.query(salesQuery, [newSalesTotal, id], function(error){
        console.log("product sales updated")
    })
    
}