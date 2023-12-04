import React, { useState, useEffect} from 'react';
import Sidebar from '../sidebar';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const VerifyCustomer = () => {

  const [lastName, setLastName] = useState([]);
  const [firstName, setFirstName] = useState([]);
  const [contactNumber, setContactNumber] = useState([])
  const [id, setID] = useState([]);

  const[status, setStatus]= useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/customer')
    .then(res => {return res.json()})
    .then(data => {
        console.log(data);
        setLastName(data.map((row) => row.last_name))
        setFirstName(data.map((row) => row.first_name));
        setContactNumber(data.map((row) => row.contact_number))
        setStatus(data.map((row) => row.verified != 0 ? 'VERIFIED' : 'UNVERIFIED'))
        setID(data.map((row) => row.customer_id));
    })
}, [])

    const handleVerify = ((idParameter) => {
    let tester = window.confirm("Are you sure you want to verify?")
    if(tester == true){
        const url = 'http://localhost:4000/verifycustomer';
      fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: idParameter})
      })
      .then(response => response.json())
      .then((data) => {{
      }})
      .catch(error => console.error(error))
      }
    })

    
    

    

  return (
    <div className="w-screen min-h-screen flex">
      <Sidebar />
      <div className="w-screen min-h-screen flex flex-col ml-[375px] items-start">
        <div className="flex flex-row mt-[100px]">
          <input
            className="bg-[#D9D9D9] h-[30px] w-[225px] rounded-tl-sm rounded-bl-sm min-w-[50px] border-[1.5px] border-black placeholder:text-black p-2"
            placeholder=" Search"
          ></input>
          <button className="h-[30px] w-[40px] border-l-0 bg-[#D9D9D9] p-2 rounded-tr-sm rounded-br-sm border-[1.5px] border-black justify-center items-center px-2 hover:bg-[#F3F3F3]">
            <Icon icon="carbon:search" className="h-5 w-5" />
          </button>
        </div>
        <div className="font-bold text-2xl mt-5">Verify Customers</div>
        <Link to="/customerlist"><button className="mt-2 ml-[985px]  h-[30px] w-[200px] bg-[#D9D9D9] rounded-sm border-[1.5px] border-black hover:bg-[#F3F3F3]">
              + Customer List
            </button></Link>
        <div className="flex flex-col w-10/12 ">
          <div className="flex justify-end">
          </div>
        </div>
        <div className="flex flex-col w-10/12 shadow-lg mt-2">
          <div className="flex flex-row bg-[#D9D9D9] border-[1.4px] rounded-t-sm h-16 justify-center items-center font-bold border-black shadow-md">
            <div className="flex-1">Name</div>
            <div className="flex-1">Contact Number</div>
            <div className = "flex-1"> Status</div>

          </div>

          <div className='flex flex-col bg-white border-[1.5px] rounded-b-sm border-t-0 h-[500px] items-center border-black max-h-3/4 gap-[30px] overflow-y-auto'>
          
          {id.map((value, index) => {
              return(
                <div className="flex flex-row w-full mt-5">
            <div className="flex-1">{lastName[index]}, {firstName[index]}</div>
            <div className="flex-1">{contactNumber[index]}</div>
            <div className="flex-1"> <b>{status[index]} </b> <button onClick = {() => handleVerify(value)}className=" ml-1 pl-1.5 pr-1.5 rounded-lg delay-30 bg-white border-emerald-500 border-2 duration-50 hover:bg-emerald-500 hover:text-white"> verify</button></div>
  
            </div>

              )   
            })}

          </div>
          {/* Additional employee entries can be added as needed */}
        </div>
      </div>
    </div>
  );
};

export default VerifyCustomer;