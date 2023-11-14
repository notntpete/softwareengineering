import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import CustomerSidebar from '../sidebarcust';
import { Icon } from '@iconify/react';



function Customer() {

    const [id, setID] = useState(localStorage.getItem("customerID"));

    const [profile, setProfile] = useState("")
    const [date, setDate] = useState([]);
    const [totalAmount, setTotal] = useState([]);
    const [status, setStatus] = useState([]);

    useEffect(() => {
        const url = 'http://localhost:4000/customer';
          fetch(url, {
              method: 'POST',
              headers: {
              'Content-Type': 'application/json'
              },
              body: JSON.stringify({userID: id})
          })
          .then(response => response.json())
          .then((data) => {
            setProfile(data.profile[0]);
            console.log(data);
            setDate(data.orders.map((row) => row.order_date));
            setTotal(data.orders.map((row) => row.total_amount))
            setStatus(data.orders.map((row) => row.order_status))
            
          })
          .catch(error => console.error(error))
          }, []
      
    )

  return (
    <div className="w-screen min-h-screen flex">
      <CustomerSidebar />

      <div className="w-screen min-h-screen flex flex-col ml-[375px] items-start">
        <div className="flex flex-row mt-[50px]">
          <input
            className="bg-[#D9D9D9] h-[30px] w-[225px] rounded-tl-sm rounded-bl-sm min-w-[50px] border-[1.5px] border-black placeholder:text-black"
            placeholder=" Search"
          ></input>
          <button className="h-[30px] w-[40px] border-l-0 bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black justify-center items-center px-2 hover:bg-[#F3F3F3]">
            <Icon icon="carbon:search" className="h-5 w-5" />
          </button>
        </div>

        <div className="font-bold text-2xl mt-5">Customer</div>

        <div className="bg-[#D9D9D9] h-[150px] w-10/12 border-[1.5px] border-black mt-[20px] font-bold shadow-md rounded-sm">
          <div className="flex">
            <div className="rounded-full border-2 bg-white h-[100px] w-[100px] ml-8 mt-5 border-white "></div>
            
            <div className="flex-col ml-[100px] w-[150px] text-left mt-4 whitespace-nowrap">
            <div class="">{profile.last_name}, {profile.first_name}</div>
              
              <div class="">Fax: {profile.fax_number}</div>
              <div class=" ">Phone No: {profile.contact_number}</div>
            </div>
            <div className="flex-col ml-[120px] w-[150px] text-left mt-4 whitespace-nowrap">
              <div>Gender: Male</div>
              <div class="">Bill Address: {profile.bill_address}</div>
              <div class="">Ship Address: {profile.ship_address}</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-10/12 shadow-lg mt-5">
          <div className="flex flex-row bg-[#D9D9D9] border-[1.4px] rounded-t-sm h-16 justify-center items-center font-bold border-black shadow-md">
            <div className="flex-[0.1]"></div>
            <div className="flex-1">Date Ordered</div>
            <div className="flex-1">Quantity</div>
            <div className="flex-1">Total</div>
            <div className = "flex-1">Status</div>
          </div>

          <div className='flex flex-col bg-white border-[1.5px] rounded-b-sm border-t-0 h-[450px] items-center border-black max-h-3/4 gap-[30px] overflow-y-auto'>
          {date.map((value, index) => {
            return(
                <div className="flex flex-row w-full mt-5">
              <div className="flex-[0.1]">
                <Link to="/customer"><button className="ml-4 mt-1 bg-[#F3F3F3] text-black hover:bg-[#3BC4AF] hover:text-white">
                  <Icon icon="bxs:edit" className="h-5 w-5" />
                </button></Link>
              </div>
              <div className="flex-1">{date[index]}</div>
              <div className="flex-1">50 boxes</div>
              <div className="flex-1">P{totalAmount[index]}</div>
              <div className="flex-1">{status[index]}</div>
            </div>
            )
          })}
            
          
            

            
          </div>
        </div>
        
      </div>
    </div>
  );
}

export default Customer;