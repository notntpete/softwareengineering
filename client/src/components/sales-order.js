import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";

function SalesOrdering(){

    
    useEffect(() => {
        fetch('http://localhost:4000/sales')
        .then(res => {return res.json()})
        .then(data => {
          data[0].reverse()
          setProduct(data[0].product)
          setClass(data[0].product.map((row) => row.class));
          setMeasure(data[0].product.map((row) => row.measurement_type)); //measurement types
          //setInputValues(data[0].product.map((row) => row.class));  //proxy
          const newArray = [...data[0].product.map((row) => row.price)];
          for(let i = 0; i < newArray.length; i++){
            newArray[i] = 0
          }
          setInputValues(newArray);
          setProductPrice(data[0].product.map((row) => row.price));
    
        })  
      }, []);
    
      const [product, setProduct] = useState([]);
      
      const [inputValues, setInputValues] = useState([]);
      const [Class, setClass] = useState([]);
      const [measure, setMeasure] = useState([]);
      const [productPrice, setProductPrice] = useState([]);
    

      const [weight, setWeight] = useState();
      const[totalPrice, setTotalPrice] = useState();
      
      let sum = 0
    

    const resetArrayToZero = () => {
      // Create a new array with all elements set to 0
      const newArray = new Array(inputValues.length).fill('');
  
      // Update the state with the new array
      setInputValues(newArray);
    };

    const handleInputChange = (index, newValue) => {
      const updatedValues = [...inputValues];
      updatedValues[index] = newValue;
      setInputValues(updatedValues);
      for(let i = 0; i < productPrice.length; i++){
        sum += productPrice[i] * inputValues[i]
      }
      setTotalPrice(sum);
    };
    
    const handleSubmit = (event) =>{
        let tester = window.confirm("Try to press")
        //create confirmation modal of sales order
        if(tester == true){
          event.preventDefault();
          console.log("submitted");
          const url = 'http://localhost:4000/sales';
          fetch(url, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({quantity:inputValues, products:product, totalPrice:totalPrice})
          })
          .then(response => response.json())
          .catch(error => console.error(error))
          }
      }

return(
<div className="SalesOrdering">

      <div class="bg-gray-500">
        <div class="flex">
            <div class="bg-white h-screen p-5 pt-10 bl-none rounded-r-lg">
                <div class="rounded-full border-2 bg-emerald-500 h-20 w-20 mb-20 ml-5 mt-10 border-white"></div> 
                <button class="rounded-lg pr-5 pt-2 pb-2 pl-5  delay-150 border-emerald-500 border-2 duration-50">
                    <b>Employees</b> </button>
                <br/> <Link to = "/inventory"> <button class="mt-6  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2  duration-50">
               <b>Inventory</b> </button> </Link>  <br/>

                <br/><button class="  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b>Customer</b> </button><br/>
                <br/> <Link to = "/"> <button class="rounded-lg pr-10 pt-2 pb-2 pl-10 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b> Sales</b> </button> </Link>  
                    <br/>     
            </div>
            <div class="ml-[350px] bg-white m-[50px] h-[600px] w-[600px] rounded-lg mt-[25px]">
                <h1 class="text-center  p-3 mt-5 bg-white"><b>SALES ORDER <div class="mt-[20px] rounded-lg bg-emerald-400 h-[1px]"></div></b></h1>
                <h1 class="">Customer Name:
                    <div class=""><input class="text-black rounded-lg bg-teal-500 h-[20px] w-[550px] p-2"></input></div>
                </h1>
            
                <div class="pl-5 rounded-lg bg-white m-5 h-[350px] p-6">
                     
                    <div class="m-1 text-left"> <b>Class Type:</b></div>
                    <form onSubmit = {handleSubmit}> 
                    <div class = "flex gap-4 mt-2">

                      <div class="flex flex-col self-center ml-[0px] gap-10 p-5">
                      {Class.map((value, index) => (
                      <div key={index}> Class {value}</div>
                      ))}
                      </div>

                      <div class = "flex flex-col self-center  gap-10 p-5">
                          {measure.map((value, index) => (
                          <div key={index}> {product[index].price}/{value}</div>
                          ))}
                      </div>

                      <div class = "flex flex-col self-center  gap-10 p-5">
                      {resetArrayToZero}
                      {inputValues.map((value, index) => (
                      <input
                      class = "rounded-md text-center bg-lime-700 w-32 p-2"
                      key={index}
                      type="text"
                      value={value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                          />
                      ))}
                      </div>
                    </div>                
                    <p class="mt-[40px]"><b>Weight:{weight} </b></p>
                      <p class="mt-[60px"><b>Price: {totalPrice} </b></p>
                <button class="delay-150 bg-white border-emerald-500 ml-[10px] border-2 place-content-center p-1 h-9 w-[80px] mt-[0px] mb-5 rounded-lg">Submit</button>
                </form>

                </div>
              </div>
              
          </div>
        </div>

    </div>
  
) 
}

export default SalesOrdering;