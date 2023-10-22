import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";

function Repack(){

    useEffect(() => {
        fetch('http://localhost:4000/repack')
        .then(res => {return res.json()})
        .then(data => {
          console.log(data);

        })  
      }, []);


return(
    <div>





    </div>
)

}

export default Repack