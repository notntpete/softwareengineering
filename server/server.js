const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

app.use(cors());
app.use(express.json());

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


const port = 4000;
app.listen(port);

app.get('/', (req, res) => {
    console.log("get request made");
    connection.query('SELECT PRICE FROM products', (err, result) =>{
        if(err){
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.send(result);
    });

});

app.post('/', (req, res) => {
    quantity = req.body;
    console.log(quantity);
    
    connection.query(
        ` SELECT PRICE FROM products`, (err, result) =>{
        if(err){
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        APrice = parseFloat(result[0].PRICE) * parseFloat(quantity.AQuantity);
        console.log(APrice);
        

        let insertQuery = `INSERT INTO orders(order_date, total_amount, order_status) VALUES (?, ?, ?)`
        const values = [new Date(), quantity.totalPrice, "Unpaid"];
        
        connection.execute(insertQuery, values);

        
        InsertOrderItem(2, 1, parseFloat(quantity.AQuantity), parseFloat(quantity.APrice), parseFloat(quantity.ATotalPrice));

    })    
});

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
    //console.log(req.body);
    let orderQuery = `INSERT INTO orders(order_date, total_amount, order_status) VALUES (?, ?, ?)`;
    let orderValues = [new Date(), req.body.totalPrice, "Pending Approval"];
    connection.execute(orderQuery, orderValues);

    
    
    let query = 'SELECT MAX(order_id) FROM orders;'
    connection.query(query, (err,results) => {
        if(err){
            console.log("Error");
            return;
        }
        
        for(let i = 0; i < 3; i++){
            currentProduct = req.body.products[i];
            let query = 'INSERT INTO order_item (order_id, product_id, quantity, item_price, total_price) values (?, ?, ?, ?, ?)' //lacks order_id, total_price, stockout_repack_id
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
    query = 'SELECT * FROM orders'
    itemQuery = `SELECT * FROM order_item`
    connection.query(query, (err, results) => {
        if (err) {
          console.error('Error executing MySQL query:', err);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        connection.query()
        res.json(results);
        
      });
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
    //console.log(reqValues.products[0].product_id);

    let repackQuery = `INSERT INTO stockin_repack(stockin_date, total_quantity) VALUES (?, ?)`
    repackValues = [new Date(), req.body.sum]
    connection.execute(repackQuery, repackValues); //creates new value for repack_stockin_id

    for(let i = 0; i <= 2; i++){
        let query = `INSERT INTO repack_inventory(product_id, stock_in_date, stock_quantity, product_price, measurement_type) VALUES(?, ?, ?, ?, ?)`
        values = [reqValues.products[i].product_id, new Date(), parseFloat(reqValues.inputValues[i]), reqValues.products[i].price, reqValues.products[i].measurement_type]
        connection.execute(query, values);

        let productQuery = `UPDATE products SET total_quantity = total_quantity + ${parseFloat(reqValues.inputValues[i])} WHERE product_id = ${reqValues.products[i].product_id}`
        connection.execute(productQuery);
    }

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


function InsertOrderItem(order_id, product_id, quantity, price, totalPrice){
    let insertQuery = `INSERT INTO order_item(order_id, product_id, quantity, item_price, total_price) VALUES (?, ?, ?, ?, ?)`
    values = [order_id, product_id, quantity, price, totalPrice]
    connection.execute(insertQuery, values);
};

app.get('/inventory', (req, res) => {


})


