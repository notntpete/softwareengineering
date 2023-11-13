import React, {useState, useEffect} from 'react';
import {Link, Route, Routes} from "react-router-dom";
import { Icon } from '@iconify/react';
import Sidebar from './sidebar';

function Inventory(){

    const [Class, setClass] = useState([]);
    const [measure, setMeasure] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const [product, setProduct] = useState([]);
    const [sacks, setSacks] = useState(0);

    let sum = 0
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
        
        inputValues.forEach(num => {
            sum += parseFloat(num);
        })

          const url = 'http://localhost:4000/inventory';
          fetch(url, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({inputValues:inputValues, sacks: sacks, sum: sum, products: product})
          })
          .then(response => response.json())
          .catch(error => console.error(error))
          }
      }

      useEffect(() => {
        fetch('http://localhost:4000/inventory')
        .then(res => {return res.json()})
        .then(data => {
          setClass(data[0].product.map((row) => row.class)); //classes
          setMeasure(data[0].product.map((row) => row.measurement_type)); //measurement types
          setInputValues(data[0].product.map((row) => 0));  //proxy
          setProduct(data[0].product); //product values

        })  
      }, []);

      const handleInputChange = (index, newValue) => {
        const updatedValues = [...inputValues];
        updatedValues[index] = newValue;
        setInputValues(updatedValues);
      };

      const handleInputSacks = (event) =>{
        setSacks(event.target.value);
      }


      

    return(
        
    <div className="w-screen min-h-screen flex">
    <Sidebar />
    <div className="w-screen min-h-screen flex flex-col ml-[375px] items-start">
      <div className="flex flex-row mt-[100px]">
        <input
          className="bg-[#D9D9D9] h-[30px] w-[225px] rounded-tl-sm rounded-bl-sm min-w-[50px] border-[1.5px] border-black placeholder:text-black"
          placeholder=" Search"
        />
        <button className="h-[30px] w-[40px] border-l-0 bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black justify-center items-center px-2 hover:bg-[#F3F3F3]">
          <Icon icon="carbon:search" className="h-5 w-5" />
        </button>
      </div>
      <div className="font-bold text-2xl mt-5">Add Repack Page</div>
      <div className="flex flex-col w-10/12 mt-5">
        <div className="flex flex-row justify-end">
          <Link to="/Sacksinventory">
            <button className="h-[30px] w-[200px] mr-1 bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black hover:bg-[#F3F3F3]">
              Sacks Page
            </button>
          </Link>
          <Link to="/products">
            <button className="h-[30px] w-[200px] mr-6 bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black hover:bg-[#F3F3F3]">
              Products Page
            </button>
          </Link>
          <button className="h-[30px] w-[200px] bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black hover:bg-[#F3F3F3]">
            + Add Product
          </button>
        </div>
      </div>
      <div className="flex flex-col w-10/12 shadow-lg mt-5">
        <div className="flex flex-row bg-[#D9D9D9] border-[1.4px] rounded-t-sm h-16 justify-center items-center font-bold border-black shadow-md">
          <div className="flex-1">Sacks</div>
          <div className="flex-1">Class Type</div>
          <div className="flex-1">Measurement Type</div>
        
          <div className="flex-1"> Add Quantity</div>
        </div>
                {//<div class="mt-[20px] ml-[20px] w-[550px] rounded-lg bg-emerald-400 h-[1px]"></div>
}
        <form>
                
          <div className='flex flex-col bg-white border-[1.5px] rounded-b-sm border-t-0 h-[500px] items-center border-black max-h-3/4 gap-[30px] overflow-y-auto'>

{Class.map((value, index) => {
return(
<div key={index} className="flex flex-row w-full mt-5">
  
<input value = {sacks} onChange = {handleInputSacks} class = "bg-lime-600 w-16"></input>
  <div className="flex-1">{Class[index]}</div>
  <div className="flex-1">{measure[index]}</div>

  <input
                    class = "rounded-md text-center bg-lime-700 w-24"
                    key={index}
                    type="text"
                    value={inputValues[index]}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                        />
</div>
)})}

                </div>

                <button onClick ={handleSubmit} class="delay-150 bg-white border-emerald-500 ml-[400px] border-2 place-content-center p-1 h-9 w-[160px] mt-[24px] rounded-lg">Add Inventory</button>
                </form>
            </div>
            

        </div>
        </div>
    )
};
export default Inventory;