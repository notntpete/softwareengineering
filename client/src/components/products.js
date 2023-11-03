import React, {useState, useEffect} from 'react';
import { BrowserRouter } from 'react-router-dom';
import {Link, Route, Routes} from "react-router-dom";

const modalStyles = {
    modalContainer: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.6)', // Grey out the background
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 999,
    },
    modal: {
      background: 'white',
      border: '1px solid #ccc', // Add a border to the modal
      borderRadius: '5px',
      padding: '20px',
      width: '500px',
      height: '400px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
      textAlign: 'left',
    },
  };

 



function Products(){

    const [product, setProduct] = useState([]);
    const [type, setType] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [price, setPrice] = useState([]);
    const [measure, setMeasure] = useState([])
    const [id, setID] = useState([]);

    const [inputValues, setInputValues] = useState([]);

    const [isModalOpen, setModalOpen] = useState(false);

    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newMeasurement, setNewMeasurement] = useState('');

    const handleRadioChange = (event) => {
        setNewMeasurement(event.target.value);
      };

    // Function to open the modal
    const openModal = () => {
      setModalOpen(true);
    };
  
    // Function to close the modal
    const closeModal = () => {
      setModalOpen(false);
    };

    useEffect(() => {
        fetch('http://localhost:4000/products')
        .then(res => {return res.json()})
        .then(data => {
            setProduct(data)
            setType(data.map((row) => row.class));
            setPrice(data.map((row) => row.price));
            setQuantity(data.map((row) => row.total_quantity));
            setMeasure(data.map((row) => row.measurement_type))
            setID(data.map((row) => row.product_id));
            
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

      const handleAdd = (event) =>{
        let tester = window.confirm("try to press");
        if(tester == true){
            event.preventDefault();
            console.log("submitted");
            const url = 'http://localhost:4000/addProduct';
            fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({newName: newName, newPrice: newPrice, newMeasurement:newMeasurement})
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
                <div class = "ml-[50%] gap-4 w-18 flex"> <button class = "bg-slate-200 p-2" onClick={openModal}> Add Product</button> <button class = "bg-slate-200 p-2"> Edit Price</button> <button class = "bg-slate-200 p-2"> Delete Product</button> </div>
                <div class="ml-12 flex gap-12">
                    <h1 class="text-center mt-5 bg-white"><b>Class Type </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Quantity </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Measurement Type </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Price </b></h1>
                </div>

                <form onSubmit = {handleSubmit}> 
                <div class = "flex ml-12 gap-12">

                <div class="flex flex-col self-center mr-[-80px] gap-10 p-5">
                {id.map(() => (
                    <div>
                        <input type="radio"/> 
                    </div>
                    ))}
                </div>
                
                    <div class="flex flex-col self-center ml-[0px] gap-10 p-5">
                    
                    {type.map((value, index) => (
                        <div key={index}> {value}</div>
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
       
                        {isModalOpen && (
                        <div style={modalStyles.modalContainer}>
                        <div style={modalStyles.modal}>
                            <div style={modalStyles.modalContent}>
                            <div className='text-center text-xl font-bold mb-9'>Add products</div>
                            <div className='flex flex-col gap-6'>
                                <h2 className='flex-1 flex mx-10'>
                                    <b className='flex-1'>Class Name: </b>
                                    <div className='flex-1'><input value = {newName} onChange = {(event) => setNewName(event.target.value)}className="ml-6 rounded-lg bg-teal-500 h-6 w-[105px]"></input>
                                    </div>
                                </h2>
                                <h2 className='flex-1 flex ml-10'>
                                    <b>Type of Measurement: </b>
                                    <div class="bg-teal-500 rounded-md ml-[45px] w-14 justify-start">
                                    <label>
        <input
          type="radio"
          value="kg"
          checked={newMeasurement === 'kg'}
          onChange={handleRadioChange}
        />
        kg
      </label>
      <br></br>
      <label>
        <input
          type="radio"
          value="box"
          checked={newMeasurement === 'box'}
          onChange={handleRadioChange}
        />
        box
      </label>


                                    </div>
                                </h2>
                                <h2 className='flex-1 flex mx-10'>
                                    <b className='flex-1'>Price: </b>
                                    <div className='flex-1'><input value = {newPrice} onChange = {(event) => setNewPrice(event.target.value)}className="ml-6 rounded-lg bg-teal-500 h-6 w-[105px]"></input>
                                    </div>
                                </h2>
                                <button  onClick = {handleAdd} className="delay-150 bg-white border-emerald-500 border-2 place-content-center ml-[250px] p-1 h-9 w-[80px] rounded-lg">Submit</button>
                                <button onClick={closeModal} className="delay-150 bg-white border-emerald-500 border-2 place-content-center ml-[250px] p-1 h-9 w-[80px] rounded-lg">Close</button>
                            </div>
                            
                            </div>
                        </div>
                        </div>
                    )}        
                

            </div>
        </div>
    </div>


    )
}
export default Products;