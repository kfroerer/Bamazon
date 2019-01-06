# Bamazon

This project has 3 different CLI files, one each designed to be used by a customer, manager, or supervisor.

The customer interface allows a customer to view products available with their prices. They are prompted to choose a product and quantity. The program checks the SQL database for stock available and returns either a total or an error.

<img src=screenshots/customer_view.png height=300>

<img src=screenshots/customer_total.png height=300>

<img src=screenshots/customer_too_little_inventory.png height=300>

Next is the manager file. There are four menu options: view products, view low inventory, add inventory, add new products. Each works as follows: 

<img src=screenshots/manager_view.png height=300>

<img src=screenshots/manager_view_products.png height=300>


Low inventory is defined as stock less than 5. The program runs a query to the database and returns those items with quantities less than 5.
<img src=screenshots/manager_low_inventory.png height=300>

<img src=screenshots/manager_add_inventory.png height=300>

<img src=screenshots/manager_add_product.png height=300>

In the supervisor file there are two options: view product sales and add a new department. The product sales options joins two tables (products and departments) and returns the total profit for each department.

<img src=screenshots/supervisor_view.png height=300>

Here both options can be viewed:

<img src=screenshots/supervisor-executed.png height=300>
