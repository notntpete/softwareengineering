import React, { useEffect, useState } from 'react';

function Orders() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [totalAmount, setTotal] = useState([]);
  const [status, setStatus] = useState([]);

  useEffect(() => {
    // Replace 'http://localhost:3001' with the URL of your Node.js server
    fetch('http://localhost:4000/orders')
      .then((response) => response.json())
      .then((data) => {

        setData(data)
        setDate(data.map((row) => row.order_date));
        setTotal(data.map((row) => row.total_amount))
        setStatus(data.map((row) => row.order_status))

      })
      
      
  }, []);

  return (
    <div>
      <h1>MySQL Table Data</h1>
      <div class = "flex gap-12">
      <div>
      Order Date
      {date.map((value, index) => (
                      <div key={index}> {value}</div>
                      ))}
      
      </div>
      <div>
      Total Amount
      {totalAmount.map((value, index) => (
                      <div key={index}> {value}</div>
                      ))}

      </div>

      <div>
      Order Status
      {status.map((value, index) => (
                      <div key={index}> {value}</div>
                      ))}

      </div>

      <div>
         .
      {status.map((value, index) => (
       
                      <div key={index}> <button class = "bg-lime-600"> VIEW DETAILS</button></div>
                      ))}

      </div>
      

      </div>
    </div>

  );
}

export default Orders;