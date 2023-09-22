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

function InsertOrderItem(order_id, product_id, quantity, price, totalPrice){
    let insertQuery = `INSERT INTO order_item(order_id, product_id, quantity, item_price, total_price) VALUES (?, ?, ?, ?, ?)`
    values = [order_id, product_id, quantity, price, totalPrice]
    connection.execute(insertQuery, values);
};

app.get('/inventory', (req, res) => {


})

app.post('/inventory', (req, res) => {


})
