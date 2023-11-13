import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";



function Sacks(){

    const [sacks, setSacks] = useState();
    const [date, setDate] = useState();

    const handleInputChangeSack = (event) =>{
        setSacks(event.target.value);
    }

    const handleInputChangeDate = (event) =>{
        setDate(event.target.value);
    }


    const handleSubmit = (event) =>{
        let tester = window.confirm("Try to press")
        //create confirmation modal of sales order
        if(tester == true){
          event.preventDefault();
          console.log("submitted");
          const url = 'http://localhost:4000/sacks';
          fetch(url, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({sacks: sacks, date: date})
          })
          .then(response => response.json())
          .catch(error => console.error(error))
          }
      }
      
    return(
        <div>


            <form onSubmit = {handleSubmit}>
            <div> Input Sacks  <input value = {sacks} onChange = {handleInputChangeSack} class="rounded-lg bg-teal-500 h-6 m-2 w-[80px] ml-8"></input></div>
            <div> Date </div> <input value = {date} onChange = {handleInputChangeDate}type = "date"></input>
            <button> Submit </button>
            </form>

        </div>

    )


}
export default Sacks;