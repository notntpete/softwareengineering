import logo from './logo.svg';
import './App.css';
import React, {useState, useEffect} from 'react';

function App() {

  useEffect(() => {
    fetch('http://localhost:4000')
    .then(res => {return res.json()})
    .then(data => {
      newProduct(data)

    })  
  }, []);

  const [product, newProduct] = useState([]);
  const [classA, setClassA] = useState('');
  const [classB, setClassB] = useState('');
  const [classC, setClassC] = useState('');

  const [weight, setWeight] = useState();
  const [weightA, setWeightA] = useState(0);
  const [weightB, setWeightB] = useState(0);
  const [weightC, setWeightC] = useState(0);

function emptyChecker(param){
  if (param != ""){
    return parseFloat(param)
  }
  else{
    return 0;
  }
}

  function addAllA(newValue){
    setWeight(emptyChecker(newValue) + parseFloat(weightB) + parseFloat(weightC));
  }
  function addAllB(newValue){
    setWeight(parseFloat(weightA) + emptyChecker(newValue) + parseFloat(weightC));
  }
  function addAllC(newValue){
    setWeight(parseFloat(weightA) + parseFloat(weightB) + emptyChecker(newValue));
  }
  const handleInputChangeA = (event) =>{
    setWeightA(event.target.value);
    setClassA(event.target.value);
    addAllA(event.target.value);
    }
  const handleInputChangeB = (event) =>{
    setClassB(event.target.value);
    setWeightB(event.target.value)
    addAllB(event.target.value)
  }
  const handleInputChangeC = (event) =>{
    setClassC(event.target.value);
    setWeightC(event.target.value);
    addAllC(event.target.value);
    }



  const handleSubmit = (event) =>{
    let tester = window.confirm("Try to press")
    //create confirmation modal of sales order
    if(tester == true){
      event.preventDefault();
      console.log("submitted");
      const url = 'http://localhost:4000';
      fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({ AQuantity: classA, BQuantity: classB, CQuantity: classC})
      })
      .then(response => response.json())
      .catch(error => console.error(error))
      }
  }


  return (
    <div className="App">
    
      <form onSubmit = {handleSubmit}>
        <div> Class A: </div> <input class = "text-black" value = {classA} onChange ={handleInputChangeA}/> 
        <div> Class B:</div> <input class = "text-black" value = {classB} onChange ={handleInputChangeB}/>
        <div> Class C: </div> <input class = "text-black" value = {classC} onChange ={handleInputChangeC}/>

        <h3> Total Weight: {weight} </h3>
        <h3> Total Price </h3>
        <button> Submit Order</button>
      </form>
    
    {/* 
      <div class="flex">
            
            <div class="bg-stone-950 h-screen p-5   pt-10 bl-none rounded-r-lg">
                <div class="rounded-full border-2 border-gray-600 h-20 w-20 bg-gray-600 mb-20 ml-5 mt-10 "></div> 
                <button class=" rounded-lg pr-5 pt-2 pb-2 pl-5  delay-150 bg-emerald-500 duration-50">
                    <b>Employees</b> </button>
                <br/><button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6  delay-150 bg-emerald-500  duration-50">
                    <b>Inventory</b> </button>
                <br/><button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6  delay-150 bg-emerald-500  duration-50">
                    <b>Customer</b> </button>
                <br/><button class="mt-5  rounded-lg pr-10 pt-2 pb-2 pl-10  delay-150 bg-emerald-500  duration-50">
                    <b>Sales</b> </button>        
            </div>
            <div class="ml-[350px] bg-stone-950 m-[50px] h-[620px] w-[600px] rounded-lg">
                <h1 class="text-center p-3 mt-5 bg-emerald-500"><b>SALES ORDER</b></h1>
                <h1 class="text-gray-100 p-5"><b>Customer Name : </b>
                    <input type="text" class="text-[#000000] bg-white rounded-md h-[20px] w-[100]"></input>
                </h1>
                <form onSubmit = {handleSubmit}>
                  <div class="pl-5 rounded-lg bg-emerald-500 m-5 h-[350px] p-6">
                      <div class=""><b>Class Type:</b>
                          <p class="mt-2">Class A<div class="rounded-lg"></div></p> <input></input>
                          <p class="mt-2">Class B<div class="mt-1 rounded-lg"></div></p><input></input>
                          <p class="mt-2">Class C<div class="mt-2 rounded-lg"></div></p><input></input>
                      </div>
                      <button class="rounded-lg bg-teal-500 text-center w-[50px] h-7 border-2 border-black">add</button>
                      <div class="grid grid-cols-2 grid-rows-1 mt-[100px] rounded-lg bg-black h-1 gap-1">
                          <p class="mt-2 ml-[10px] "><b>Total Weight:</b><p class="mt-2 ml-[80px] ">0 kg</p></p>
                          <br/>
                          <p class="mt-2 ml-[10px] "><b>Total Price:</b><p class="mt-2 ml-[80px] ">0 PHP</p></p>
                      </div>
                    
                  </div>
                  <button class="  delay-15 ml-[260px] place-content-center p-1 h-8 w-[80px] text-center mt-[20px] rounded-lg bg-emerald-500">Submit</button>
                </form>
            </div>
        </div>

  */}
    </div>
    
    
    
  );
}

export default App;
