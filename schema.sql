 use bamazon;
 
 select departments.dept_id, departments.department_name, departments.overhead_costs, sum(products.product_sales)
 from products 
 inner join departments
 on products.department_name = departments.department_name
 group by department_name
 order by dept_id ASC
 

USE bamazon;
drop table if exists departments; 
 
CREATE table departments(
dept_id VARCHAR(250) NOT NULL,
department_name VARCHAR(250) NOT NULL,
overhead_costs DECIMAL(12, 2)
);

INSERT INTO departments (dept_id, department_name, overhead_costs) 
VALUES (01, 'food', 1200), (02, 'outdoor gear', 5000), (03, 'fitness', 3000) 

 use bamazon;
 
 select departments.dept_id as ID, departments.department_name as Departments, departments.overhead_costs as Costs, sum(products.product_sales) as Sales
 from departments 
 inner join products 
 on products.department_name = departments.department_name
group by dept_id 