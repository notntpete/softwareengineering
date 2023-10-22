import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Link, Route, Routes} from "react-router-dom";




function Products(){

    const [product, setProduct] = useState([]);
    const [type, setType] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [price, setPrice] = useState([]);
    const [measure, setMeasure] = useState([])

    const [inputValues, setInputValues] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/products')
        .then(res => {return res.json()})
        .then(data => {
            setProduct(data)
            setType(data.map((row) => row.class));
            setPrice(data.map((row) => row.price));
            setQuantity(data.map((row) => row.total_quantity));
            setMeasure(data.map((row) => row.measurement_type))

            const newArray = [...data.map((row) => row.price)];
            
            setInputValues(newArray);
            
        })
    }, [])

    const handleSubmit = (event) =>{
        let tester = window.confirm("Try to press")
        //create confirmation modal of sales order
        if(tester == true){
          event.preventDefault();
          console.log("submitted");
          const url = 'http://localhost:4000/products';
          fetch(url, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({prices: inputValues})
          })
          .then(response => response.json())
          .catch(error => console.error(error))
          }
      }

    const handleInputChange = (index, newValue) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = newValue;
        setInputValues(updatedValues);
    }


    return (
        <div class="bg-gray-500">
        <div class="flex">
            <div class="bg-white h-screen p-5 pt-10 bl-none rounded-r-lg">
                <div class="rounded-full border-2 bg-emerald-500 h-20 w-20 mb-20 ml-5 mt-10 border-white"></div> 
                <button class="rounded-lg pr-5 pt-2 pb-2 pl-5  delay-150 border-emerald-500 border-2 duration-50">
                    <b>Employees</b> </button>
                <br/><button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2  duration-50">
                    <b>Inventory</b> </button>
                <br/><button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b>Customer</b> </button>
                <br/> <Link to="/sales"><button class="mt-5  rounded-lg pr-10 pt-2 pb-2 pl-10 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b>Sales</b> </button>   </Link>     
            </div>
            <div class="ml-[350px] bg-white m-[50px] h-[620px] w-[600px] rounded-lg mt-[90px] place-content-center">
                <div class = "ml-[75%] gap-4 w-18 flex"> <button class = "bg-slate-200 p-2"> Add Product</button> <button class = "bg-slate-200 p-2"> Edit Price</button> </div>
                <div class="ml-12 flex gap-12">
                    <h1 class="text-center mt-5 bg-white"><b>Class Type </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Quantity </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Measurement Type </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Price </b></h1>
                </div>

                <form onSubmit = {handleSubmit}> 
                <div class = "flex ml-12 gap-12">
                
                    <div class="flex flex-col self-center ml-[0px] gap-10 p-5">
                        {type.map((value, index) => (
                        <div key={index}> Class {value}</div>
                        ))}
                    </div>

                    <div class="flex flex-col self-center ml-[0px] gap-10 p-5">
                      {quantity.map((value, index) => (
                      <div key={index}>  {value}</div>
                      ))}
                      </div>

                      <div class="flex flex-col self-center ml-[0px] gap-10 p-5">
                      {measure.map((value, index) => (
                      <div key={index}>  {value}</div>
                      ))}
                      </div>


                    
                      <div class = "flex flex-col self-center  gap-10 p-5">
                      
                      {inputValues.map((realValue, index) => (
                      <input
                      class = "rounded-md text-center bg-lime-700 w-32"
                      key={index}
                      type="text"
                      value={realValue}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                          />
                      ))}

                      </div>

                      

                </div>

                
                


                <div class="mt-[20px] ml-[20px] w-[550px] rounded-lg bg-emerald-400 h-[1px]"></div>

                <button onSubmit = {handleSubmit}class = "delay-150 bg-white border-emerald-500  border-2 place-content-center p-1 h-14 w-36 mt-4  rounded-lg"> Save Changes</button> </form>
       

                

            </div>
        </div>
    </div>


    )
}
export default Products;