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
    connection.query('SELECT * FROM products', (err, result) =>{
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
    console.log(req.body);
    let APrice = 0, BPrice = 0, CPrice = 0;
    /*
    connection.query(
        ` SELECT PRICE FROM products`, (err, result) =>{
        if(err){
            console.error('Error executing query:', err);
            res.status(500).send('Error executing query');
            return;
        }
        APrice = parseFloat(result[0].PRICE) * parseFloat(quantity.AQuantity);
        console.log(APrice);
        

        const insertQuery = `INSERT INTO order_item(product_id, quantity, total_price) VALUES (?, ?, ?)`
        const values = [1, quantity.AQuantity, APrice];

    connection.execute(insertQuery, values);
    
    })  */       
});

function InsertOrderItem(number, quantity, price){
    
};

app.get('/inventory', (req, res) => {


})

app.post('/inventory', (req, res) => {


})
