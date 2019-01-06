var mysql = require("mysql");
var inquirer = require("inquirer");
const cTable = require('console.table');

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});


connection.connect(function(err) {
    if (err) throw err;
    printDatabase();
});

function startPrompts() {
    inquirer.prompt({
        type: "list",
        name: "selection",
        message: "Select an action",
        choices: ["View Product Sales by Department", "Create New Department"]
    }).then(function(answer) {
        if (answer.selection === "View Product Sales by Department") {
            process.stdout.write('\033c');
            return viewSales();
        } else if (answer.selection === "Create New Department") {
            return addDepartment();
        } else return printDatabase();
    });
}

function printDatabase() {
    connection.query("SELECT * FROM departments ", function(err, res) {
        if (err) throw err;
        //  console.log(res);
        // res.forEach(element => {
        //     console.log("id: " + element.item_id +
        //         ", name: " + element.product_name +
        //         ", dept: " + element.department_name +
        //         ", price: $" + Number(element.price).toFixed(2) +
        //         ", qty: " + element.stock_quantity
        //     );
        // });
        console.table(res);
        startPrompts();
    });
}


function addDepartment() {
    inquirer
    inquirer.prompt([{
        name: "id",
        type: "input",
        message: "Department: "
    }, {
        name: "overhead",
        type: "input",
        message: "Over Head: "
    }]).then(function(answer) {
        console.log("You want to add to " + answer.id);
        if (answer.id.length === 0) return printDatabase();
        if (answer.overhead.length === 0) return printDatabase();
        if (isNaN(answer.overhead)) return printDatabase();
        var sql = `INSERT INTO departments (department_name, over_head_costs) VALUES ("${answer.id}",${answer.overhead})`;
        console.log(sql)
        connection.query(sql, function(err, result) {
            if (err) throw err;
            return printDatabase();
        });
    });
}

function viewSales() {
    var sql = 'SELECT department_id, departments.department_name, over_head_costs, SUM(products.product_sales) as "Product Sales", (SUM(products.product_sales) - over_head_costs) as "Profit" FROM departments RIGHT join products ON departments.department_name = products.department_name GROUP BY departments.department_name;'
    connection.query(sql, function(err, res) {
        if (err) throw err;
        console.table(res);
        return startPrompts();
    });

}