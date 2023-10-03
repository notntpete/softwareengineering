import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";

function Inventory(){

    const [Class, setClass] = useState([]);
    const [measure, setMeasure] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const [productID, setProductID] = useState([]);

    const resetArrayToZero = () => {
        // Create a new array with all elements set to 0
        const newArray = new Array(inputValues.length).fill('');
    
        // Update the state with the new array
        setInputValues(newArray);
      };

    const handleSubmit = (event) =>{
        let tester = window.confirm("Try to press")
        //create confirmation modal of sales order
        if(tester == true){
          event.preventDefault();
          console.log("submitted");
          const url = 'http://localhost:4000/inventory';
          fetch(url, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({inputValues:inputValues})
          })
          .then(response => response.json())
          .catch(error => console.error(error))
          }
      }

      useEffect(() => {
        fetch('http://localhost:4000/inventory')
        .then(res => {return res.json()})
        .then(data => {
          setClass(data[0].classData);
          setMeasure(data[1].measurementData);
          setProductID(data[2].productID);
          setInputValues(data[0].classData);
        


        })  
      }, []);

      const handleInputChange = (index, newValue) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = newValue;
        setInputValues(updatedValues);
      };


      

    return(
        <div class="bg-gray-500 flex">
            <div class="bg-white h-screen p-5 pt-10 bl-none rounded-r-lg">
                <div class="rounded-full border-2 bg-emerald-500 h-20 w-20 mb-20 ml-5 mt-10 border-white"></div> 
                <button class="rounded-lg pr-10 pt-2 pb-2 pl-10 delay-150 bg-white border-emerald-500 border-2 duration-50"> <b>Sales</b></button><br/>
                <button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2  duration-50"> <b>Employees</b> </button> <br/>
                <button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2 duration-50"><b>Inventory</b> </button><br/>
                <button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2 duration-50"><b>Customer</b> </button>
            </div>
            
            <div class="ml-[350px] bg-white m-[50px] h-[620px] w-[600px] rounded-lg mt-[90px] place-content-center">
                
                <div class="text-center bg-white flex flex-row gap-16 ml-12 mt-7">
                    <h1><b>Sacks </b></h1>
                    <h1><b>Class Type </b></h1>
                    <h1><b>Measurement Unit</b></h1>
                    <h1><b>Quantity </b></h1>
                </div>
                {//<div class="mt-[20px] ml-[20px] w-[550px] rounded-lg bg-emerald-400 h-[1px]"></div>
}
        <form>
                <div class = "flex gap-4 mt-2">

                
                    <div class="flex flex-col ml-[0px] gap-10 p-5">
                        <input class = "bg-lime-600 w-24"></input>
                    </div>

                    <div class="flex flex-col self-center ml-[0px] gap-10 p-5">
                    {Class.map((value, index) => (
                    <div key={index}>{value}</div>
                    ))}
                    </div>

                    <div class = "flex flex-col self-center  gap-10 p-5">
                        {measure.map((value, index) => (
                        <div key={index}>{value}</div>
                        ))}
                    </div>

                    <div class = "flex flex-col self-center  gap-10 p-5">
                    {resetArrayToZero}
                    {inputValues.map((value, index) => (
                    <input
                    class = "rounded-md text-center bg-lime-700 w-32"
                    key={index}
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                        />
                    ))}

                    </div>

                    
                    

                </div>

                <button onClick ={handleSubmit} class="delay-150 bg-white border-emerald-500 ml-[400px] border-2 place-content-center p-1 h-9 w-[160px] mt-[100px] rounded-lg">Add Inventory</button>
                </form>
            </div>
            

        </div>
        
    )
};
export default Inventory;