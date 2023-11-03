  import backgroundpom from '../images/bglogopom.jpg';
import React, {useState, useEffect} from 'react';

const RegisterCustomer = () => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [fax, setFax] = useState('');
  const [billAddress, setBillAddress] = useState('');
  const [shipAddress, setShipAddress] = useState('');

  const handleSubmit = (event) =>{
    let tester = window.confirm("Try to press")
    //create confirmation modal of sales order
    if(tester == true){
      event.preventDefault();
    
      const url = 'http://localhost:4000/regcus';
      fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({lastName: lastName, firstName: firstName, phoneNumber: phoneNumber, fax: fax, billAddress: billAddress, shipAddress: shipAddress, username: username, password: password})
      })
      .then(response => response.json())
      .catch(error => console.error(error))
      }
  }

  const handleInputUsername = (event) =>{
    setUsername(event.target.value);
  }

  const handleInputPassword = (event) =>{
    setPassword(event.target.value);
  }



  const handleInputLast = (event) =>{
    setLastName(event.target.value);
  }
  const handleInputFirst = (event) =>{
    setFirstName(event.target.value);
  }
  const handleInputGender = (event) =>{
    setGender(event.target.value);
  }
  const handleInputPhoneNumber = (event) =>{
    setPhoneNumber(event.target.value);
  }
  const handleInputFax = (event) =>{
    setFax(event.target.value);
  }
  const handleInputBillAddress = (event) =>{
    setBillAddress(event.target.value);
  }
  const handleInputShipAddress = (event) =>{
    setShipAddress(event.target.value);
  }

  return (

    <div className="flex relative min-h-screen flex-col items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundpom})` }}>
      <div className="absolute inset-0 bg-green-800 opacity-50 z-0"></div>
        <div className='flex flex-col bg-slate-100 z-10 w-[900px] h-[800px] rounded-lg'>

        <div className="mt-8 flex h-[50px]  bg-lime-800 z-30 shadow-2xl items-center justify-center">
            <div className=" text-2xl text-white">Customer Registration</div>
        </div>

            <div className='flex flex-row h-[900px]'>
                <div className='flex flex-col  w-1/3 ml-10 items-start gap-4 mt-10'>
                <div className='h-6 text-lg font-semibold'>Username: </div>
                <div className='h-6 text-lg font-semibold'>Password: </div>
                <br></br>
                  <div className='h-6 text-lg font-semibold'>Last Name: </div>
                  <div className='h-6 text-lg font-semibold'>First Name: </div>
                  <div className='h-6 text-lg font-semibold'>Gender: </div>
                  <div className='h-6 text-lg font-semibold'>Phone Number: </div>
                  <div className='h-6 text-lg font-semibold'>Fax: </div>
                  <div className='h-6 text-lg font-semibold'>Bill Address: </div>
                  <div className='h-6 text-lg font-semibold'>Ship Address: </div>



                  </div>
                <div className='flex flex-col  w-2/3 items-start gap-4 mt-10'>

                  <input value = {username} onChange = {handleInputUsername}class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input value = {password} onChange = {handleInputPassword}class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <br></br>

                  <input value = {lastName} onChange = {handleInputLast}class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input value = {firstName} onChange = {handleInputFirst}class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>


                  <div class="flex flex-row gap-4">
                    <div class="bg-[#CCDA7D] rounded-md w-20 justify-start">
                      <input class="rounded-md bg-[#CCDA7D] mr-1" type='radio' name='gender' id='male'></input>
                      <label for='male'>Male</label>
                    </div>
                    <div class="bg-[#CCDA7D] rounded-md w-20 justify-start">
                      <input class="rounded-md bg-[#CCDA7D] mr-1" type='radio' name='gender' id='female'></input>
                      <label for='female'>Female</label>
                    </div>
                    <div class="bg-[#CCDA7D] rounded-md w-20 justify-start">
                      <input class="rounded-md bg-[#CCDA7D] mr-1" type='radio' name='gender' id='male'></input>
                      <label for='others'>Others</label>
                    </div>
                  </div>

                  <input value = {phoneNumber} onChange = {handleInputPhoneNumber} class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input value = {fax} onChange = {handleInputFax}class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input value = {billAddress} onChange = {handleInputBillAddress}class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input value = {shipAddress} onChange = {handleInputShipAddress} class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>

                  
        
                </div>
            </div>
            <div className='flex flex-row justify-end'><button onClick = {handleSubmit}class="delay-150 bg-[#CCDA7D] w-32 mr-[350px;] mb-64 rounded-lg">Submit</button></div>

        
        </div>
    </div>
  )
}

export default RegisterCustomer