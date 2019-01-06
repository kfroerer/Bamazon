var mysql = require('mysql');
var inquirer = require("inquirer");
const cTable = require('console.table');
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
                  "View Product Sales by Department",
                  "Create New Department",
                 ]
      }])
      .then(function(answer){
          switch (answer.action){
              case "View Product Sales by Department":
                viewSales();
                break;
            
             case "Create New Department":
                newDepartment();
                break;
          }
         });
};    

function viewSales() {
        var salesQuery = 'SELECT departments.dept_id, departments.department_name, departments.overhead_costs, SUM(products.product_sales) as "Product Sales", (SUM(products.product_sales)-overhead_costs) as "Profit" FROM products LEFT JOIN departments ON products.department_name = departments.department_name GROUP BY department_name ORDER BY dept_id ASC'
        connection.query(salesQuery, function(err, response){
            if (err) throw err;
            console.table(response);
            return pickOptions()
        })

}



function newDepartment(){
    inquirer
    .prompt([
        {
            name: 'department',
            type: 'input',
            message: "Which department will you be adding?"
        },
        {
            name: 'id',
            type: 'input',
            message: 'What is the department id number'
        },
        {
            name: 'overhead',
            type: 'input',
            message: 'What are the overhead costs of the department?'
        }
    ]).then(function(answer){
        connection.query('INSERT INTO departments SET ?',
                {dept_id: answer.id,
                 dept_name: answer.department,
                 overhead_costs: answer.overhead   
                }, 
            function(){
           console.log("Department added successfully");   
        })
    })

}