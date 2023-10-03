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

app.post('/sales', (req, res) => {
    console.log("post request made");



})

app.post('/sacks', (req, res) => {
    let insertStockQuery = 'INSERT INTO stockin_sack(stockin_sack_date, sack_quantity) VALUES (?, ?)';
    values = [req.body.date, req.body.sacks];
    connection.execute(insertStockQuery, values);
    connection.query(
        ` SELECT MAX(stockin_sack_id) FROM stockin_sack;`, (err, result) =>{
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

app.get('/inventory', (req,res) => {
    const query = 'SELECT * from products'

    connection.query(query, (err,results) => {
        if(err){
            console.log("Error");
            return;
        }

        const classData = results.map((row) => row.class);
        const measurementData = results.map((row) => row.measurement_type)
        const productID = results.map((row) => row.product_id)

        res.json([{classData}, {measurementData}, {productID}]);
    })
    
})

app.post('/inventory', (req, res) => {
    console.log(req.body);


})


function InsertOrderItem(order_id, product_id, quantity, price, totalPrice){
    let insertQuery = `INSERT INTO order_item(order_id, product_id, quantity, item_price, total_price) VALUES (?, ?, ?, ?, ?)`
    values = [order_id, product_id, quantity, price, totalPrice]
    connection.execute(insertQuery, values);
};

app.get('/inventory', (req, res) => {


})

app.post('/inventory', (req, res) => {


})
