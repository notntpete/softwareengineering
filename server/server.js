const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const port = 4000;
app.listen(port);

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Aaronisreal4',
    database: 'softeng'
  });

  connection.connect(err => {
    if (err) {
      console.error('Error connecting to MySQL:', err);
      return;
    }
    console.log('Connected to MySQL');
  });


app.get('/customer', (req, res) => {
    query = `SELECT * FROM customers`
    connection.query(query, (err, results) => {
        res.send(results);
    })
})

app.post('/customer', (req, res) => {
    profileQuery = `SELECT * FROM customers WHERE customer_id = ${req.body.userID}`
    orderQuery = `SELECT * FROM orders WHERE customer_id = ${req.body.userID}`;
    connection.query(profileQuery, (err, result1) => {
        connection.query(orderQuery, (err, result2) => {
            res.json({profile: result1, orders: result2})
        })
    })
})

app.get('/products', (req, res) => {
    let query = `SELECT * FROM products`;
    connection.query(query, (err, results) => {
        if(err){
            console.log("Error");
            return;
        }
        res.json(results);

    })
})

app.post('/products', (req, res) => {
    updatedPrices = req.body.prices;

    const query = `SELECT product_id, price from products`
    connection.query(query, (err, results) => {
        for(let i = 0; i < req.body.prices.length; i++){
            if(updatedPrices[i] != results[i].price){
                let updateQuery = `UPDATE products SET price = ${updatedPrices[i]} WHERE product_id = ${results[i].product_id}`;
                connection.execute(updateQuery);
            }
        }
    })


})

app.delete('/products', (req, res) => {
    deleteQuery = `UPDATE products SET visibility = 0 WHERE product_id = ${req.body.id}`
    connection.execute(deleteQuery);
})

app.post('/addProduct', (req, res) => { //needs checking of class name whether it already exists or not
    insertQuery = `INSERT INTO products(class, price, total_quantity, measurement_type) VALUES (?, ?, ?, ?)`
    values = [req.body.newName, req.body.newPrice, 0, req.body.newMeasurement]
    console.log(req.body);
    connection.execute(insertQuery, values);

})

app.get('/sales' , (req, res) => {
    const query = 'SELECT * from products'
    connection.query(query, (err,results) => {
        if(err){
            console.log("Error");
            return;
        }

        const product = results.map((row) => row)
        res.json([{product}]);   
          
    })
})

app.post('/sales', (req, res) => {
    console.log(req.body);
    let orderQuery = `INSERT INTO orders(order_date, total_amount, order_status, customer_id) VALUES (?, ?, ?, ?)`;
    let orderValues = [new Date(), req.body.totalPrice, "Pending Approval", req.body.user];
    connection.execute(orderQuery, orderValues);

    
    
    let query = 'SELECT MAX(order_id) FROM orders;'
    connection.query(query, (err,results) => {
        if(err){
            console.log("Error");
            return;
        }
        
        for(let i = 0; i < req.body.products.length; i++){
            currentProduct = req.body.products[i];
            let query = 'INSERT INTO order_item (order_id, product_id, quantity, item_price, total_price) values (?, ?, ?, ?, ?)' //lacks order_id, total_price, stockout_repack_id
            if(req.body.quantity[i]!= 0){
                let values = [results[0]['MAX(order_id)'], currentProduct.product_id, req.body.quantity[i], currentProduct.price, parseFloat(req.body.quantity[i])* currentProduct.price];
                connection.execute(query, values); 
            

            let productQuery = `UPDATE products SET total_quantity = total_quantity - ${req.body.quantity[i]} WHERE product_id = ${currentProduct.product_id} `;
            connection.execute(productQuery); 
            
            //while (req.body.quantity[i] > 0){ //decreasing from repack inventory
            let newQuery = `SELECT repack_inventory_id, stock_quantity FROM repack_inventory WHERE product_id = ${currentProduct.product_id}`
            connection.query(newQuery, (err, result) => {
                console.log(result);
                for(let j = 0; req.body.quantity[i] > 0; j++){
                    if (result[j].stock_quantity > req.body.quantity[i]){
                        let updateQuery = `UPDATE repack_inventory SET stock_quantity = stock_quantity - ${req.body.quantity[i]} WHERE repack_inventory_id = ${result[j].repack_inventory_id}`
                        connection.execute(updateQuery);
                        console.log("update query is " + updateQuery);
                        req.body.quantity[i] = 0; 
                    }
                    else{
                        req.body.quantity[i] -= result[j].stock_quantity;
                        let deleteQuery = `DELETE FROM repack_inventory WHERE repack_inventory_id = ${result[j].repack_inventory_id}`
                        console.log("delete query " + deleteQuery)
                        connection.execute(deleteQuery);
                    }
                }
            })
            }
        //}
          
        let stockoutQuery = `INSERT INTO stockout_repack (stockout_repack_date, stockout_type) VALUES (?, ?)` //needs repack_inventory_id
        stockoutValues = [new Date, 'Sales Order'];
        connection.execute(stockoutQuery, stockoutValues);
    }
    })

    
})

app.get('/inventory', (req,res) => {
    const query = 'SELECT * from products'
    connection.query(query, (err,results) => {
        if(err){
            console.log("Error");
            return;
        }

        const product = results.map((row) => row)
        res.json([{product}]);   
          
    })
    
})

app.post('/inventory', (req, res) => {
    reqValues = req.body;
    console.log(reqValues);

    let repackQuery = `INSERT INTO stockin_repack(stockin_date, total_quantity) VALUES (?, ?)`
    repackValues = [new Date(), req.body.sum]
    connection.execute(repackQuery, repackValues); //creates new value for repack_stockin_id

    let idQuery = `SELECT MAX(stockin_repack_id) FROM stockin_repack`
    connection.query(idQuery, (err, results) => {
        for(let i = 0; i < reqValues.inputValues.length; i++){
            if(reqValues.inputValues[i] != 0){
            let query = `INSERT INTO repack_inventory(product_id, stock_in_date, stock_quantity, product_price, measurement_type, stockin_repack_id, expiration_date) VALUES(?, ?, ?, ?, ?, ?, ?)`
            const today = new Date();
            today.setDate(today.getDate() + 14);

            values = [reqValues.products[i].product_id, new Date(), parseFloat(reqValues.inputValues[i]), reqValues.products[i].price, reqValues.products[i].measurement_type, results[0]['MAX(stockin_repack_id)'], today]
            connection.execute(query, values);
    
            let productQuery = `UPDATE products SET total_quantity = total_quantity + ${parseFloat(reqValues.inputValues[i])} WHERE product_id = ${reqValues.products[i].product_id}`
            connection.execute(productQuery);
        }
        }
    })
})


app.post('/sacks', (req, res) => {
    let insertStockQuery = 'INSERT INTO stockin_sack(stockin_sack_date, sack_quantity) VALUES (?, ?)';
    values = [req.body.date, req.body.sacks];
    connection.execute(insertStockQuery, values);
    connection.query(`SELECT MAX(stockin_sack_id) FROM stockin_sack;`, (err, result) =>{
        if(err){
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        let insertSackQuery = 'INSERT INTO sack_inventory(sack_quantity, stockin_sack_id) VALUES (?, ?)'
        newValues = [req.body.sacks, result[0]['MAX(stockin_sack_id)']];
        connection.execute(insertSackQuery, newValues);
    })
})

app.get('/orders', (req, res) =>{
    query = 'SELECT order_id, order_date, total_amount, order_status, orders.customer_id, last_name, first_name FROM orders INNER JOIN customers ON orders.customer_id = customers.customer_id';
    itemQuery = `SELECT * FROM order_item`
    connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        console.log(results);
        res.json(results);
        
      });
})

app.get('/repack', (req, res) => {
    repackQuery = `SELECT * FROM repack_inventory`;
    
    let stockin = [];
    
    connection.query(repackQuery, (err, results) =>{
        
        for(let i = 0 ; i < results.length; i++){
            
            if(stockin.includes(results[i].stockin_repack_id) == false){
                stockin.push(results[i].stockin_repack_id);
            }
        }
        let stockArray = [];
        let repackArray = [];
        let response = [];
        const promises = [];

        for (let j = 0; j < stockin.length; j++) {
            const stockinQuery = `SELECT * FROM stockin_repack WHERE stockin_repack_id = ${stockin[j]}`;
            const repackSubQuery = `SELECT * FROM repack_inventory WHERE stockin_repack_id = ${stockin[j]}`
        
            const promise = new Promise((resolve, reject) => {
                connection.query(stockinQuery, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        stockArray.push(results[0]);
                        resolve();
                    }
                });
            });

            const promise2 = new Promise((resolve, reject) => {
                connection.query(repackSubQuery, (err, results) => {
                    if (err) {
                        reject(err);
                    } else {
                        repackArray.push(results);
                        resolve();
                    }
                });
            });
        
            promises.push(promise);
            promises.push(promise2);
        }

        Promise.all(promises)
            .then(() => {
                response[0] = stockArray;
                response[1] = repackArray;
                console.log(repackArray);
                res.json(response);
            })
            .catch((error) => {
                console.error(error);
            });
    })
})

app.post('/details', (req, res) => {
    console.log(req.body);
    let query = `SELECT order_id, item_price, quantity, total_price, class FROM order_item INNER JOIN products ON order_item.product_id = products.product_id WHERE order_id = ${req.body.id}`;
    connection.query(query, (err, results) => {
        res.send(results);
    })
}) 


app.post('/regcus', (req, res) => {
    const query = `INSERT INTO customers(last_name, first_name, contact_number, fax_number, ship_address, bill_address, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    const selectQuery = `SELECT * FROM customers WHERE username = '${req.body.username}'`;
    values = [req.body.lastName, req.body.firstName, req.body.phoneNumber, req.body.fax, req.body.shipAddress, req.body.billAddress, req.body.username, req.body.password];
    connection.query(selectQuery, (err, results) => {
        if (results.length == 0){
            connection.execute(query, values);
        }
    })
})

app.post('/logincus', (req, res) => {
    const query = `SELECT * FROM customers WHERE username = '${req.body.username}'`;
    
    connection.query(query, (err, results) => {
        console.log(results);
        if(results.length != 0){
            if(results[0].password == req.body.password){
                res.json({customerID: results[0].customer_id});
            }
            else{
                console.log("password wrong");
            }
        }
    })
})

app.post('/loginemp' ,(req, res) => {
    console.log(req.body);
    const query = `SELECT * FROM admins WHERE username = '${req.body.username}'`;
    
    connection.query(query, (err, results) => {
        //console.log(results);
        if(results.length != 0){
            if(results[0].password == req.body.password){
                res.json({customerID: results[0].customer_id});
            }
            else{
                console.log("password wrong");
            }
        }
    })

})

app.post('/verifycustomer', (req, res) => {
    console.log(req.body);


})









