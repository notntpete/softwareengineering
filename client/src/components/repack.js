import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";

function Repack(){

    const [StockIn, setStockIn] = useState([]);
    const [Repack, setRepack] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/repack')
        .then(res => {return res.json()})
        .then(data => {
          setStockIn(data[0]);
          setRepack(data[1]);

          console.log(data[0]);

        })  
      }, []);

return(
    <div>





    </div>
)

}

export default Repack