import React, { useState, useEffect} from 'react';
import Sidebar from './sidebar';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

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

const SalesOrdering1 = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editedSalesId, setEditedSalesId] = useState('');
  const [editedCustomerName, setEditedCustomerName] = useState('');

  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [totalAmount, setTotal] = useState([]);
  const [status, setStatus] = useState([]);
  const [orderItem, setOrderItem] = useState([]);
  const [visibility, setVisibility] = useState([]);

  const [id, setID] = useState([]);

  const[selectedIndex, setSelectedIndex] = useState(0);


  const [itemClass, setItemClass] = useState([]);
  const [itemPrice, setItemPrice] = useState([]);
  const [itemQuantity, setItemQuantity] = useState([]);
  const [itemTotal, setItemTotal] = useState([]);


  const openModal = (index) => {
        const url = 'http://localhost:4000/details';
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:index})
        })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          setItemClass(data.map((row) => row.class));
          setItemQuantity(data.map((row) => row.quantity))
          setItemPrice(data.map((row) => row.total_price))
          setModalOpen(true);})
        .catch(error => console.error(error))
        }  
  
        useEffect(() => {
          // Replace 'http://localhost:3001' with the URL of your Node.js server
          fetch('http://localhost:4000/orders')
            .then((response) => response.json())
            .then((data) => {
      
              setData(data)
              setDate(data.map((row) => row.order_date));
              setTotal(data.map((row) => row.total_amount))
              setStatus(data.map((row) => row.order_status))
              setID(data.map((row)=> row.order_id)); 
              console.log(data);
      
            })
        }, []);
  

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    // Handle the logic for editing here
    console.log('Editing sales:', editedSalesId, editedCustomerName);
    // Close the modal after a delay (e.g., 2 seconds)
    setTimeout(() => {
      closeModal();
    }, 2000); // 2000 milliseconds (2 seconds)
  };

  

  return (
    <div className=" w-screen min-h-screen flex">
      <Sidebar></Sidebar>
      <div className=' w-screen min-h-screen flex flex-col ml-[375px] items-start'>
        <div className='flex flex-row mt-[100px]'>
          <input
            className=" bg-[#D9D9D9] h-[30px] w-[225px] rounded-tl-sm rounded-bl-sm min-w-[50px] border-[1.5px] border-black placeholder:text-black"
            placeholder=" Search"
          />
          <button className='h-[30px] w-[40px] border-l-0 bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black justify-center items-center px-2 hover:bg-[#F3F3F3]'>
            <Icon icon="carbon:search" className='h-5 w-5' />
          </button>
        </div>
        <div className='font-bold text-2xl mt-5'>Sales Ordering</div>
        <div className='flex flex-col w-10/12'>
          <div className='flex justify-end'>
            <Link to="/salestransaction">
              <button className='h-[30px] w-[200px] bg-[#D9D9D9] rounded-sm border-[1.5px] border-black hover:bg-[#F3F3F3]'>
                + Create Transaction
              </button>
            </Link>
          </div>
        </div>
        <div className='flex flex-col w-10/12 shadow-lg'>
          <div className='flex flex-row bg-[#D9D9D9] border-[1.4px] rounded-t-sm mt-5 h-16 justify-center items-center font-bold border-black shadow-md '>
            <div className='flex-[0.15]'></div>
            
            <div className='flex-1'>Customer Name</div>
            <div className='flex-1'>Order Date</div>
            <div className='flex-1'>Order Cost</div>
            <div className='flex-1'>Order Status</div>
          </div>
          <div className='flex flex-col bg-white border-[1.5px] rounded-b-sm border-t-0 h-[500px] items-center border-black max-h-3/4 gap-[30px] overflow-y-auto'>
            {date.map((value, index) => {
            return(
            <div className='flex flex-row w-full mt-5'>
            <div className=''>
              <button
                className='ml-4 mt-1 bg-[#F3F3F3] text-black  hover:bg-[#3BC4AF] hover:text-white'
                onClick={() => { ; openModal(id[index]) }}
              >
                <Icon icon="bxs:edit" className='h-6 w-6' />
              </button>
            </div>
            
            <div className='flex-1'>Customer</div>
            <div className='flex-1'>{date[index]}</div>
            <div className='flex-1'>P{totalAmount[index]}</div>
            <div className='flex-1'>{status[index]}</div>
          </div>)
            })}


            
            {/* Add similar rows for other sales entries */}
          </div>
        </div>
      </div>


      {isModalOpen && (
        <div style={modalStyles.modalContainer}>
          <div style={modalStyles.modal}>
            <div style={modalStyles.modalContent}>
              <div className="text-center text-xl font-bold mb-9">Order Details</div>
              <div className="flex flex-col gap-6" style={{ justifyContent: 'flex-end' }}>
                {/* Add input fields for editing */}

                <div className="flex flex-row bg-[#D9D9D9] w-[460px] border-[1.4px] rounded-t-sm h-16 justify-center items-center font-bold border-black shadow-md">
            <div className="flex"></div>

            
       
            <div className="flex-1 ml-2">Class</div>
            <div className="flex-1">Quantity Order</div>
            <div className="flex-1">Total Price</div>
          </div>
                {itemClass.map((value, index) => {
                  return(
                  <div className='flex ml-2 flex-row w-full mt-2'>
                  <div className='flex-1'>{itemClass[index]}</div>
                  <div className='flex-1'>{itemQuantity[index]}</div>
                  <div className='flex-1'>P{itemPrice[index]}</div>
                  
                  </div>
                )})}
                
                
                {/* Add more input fields for editing */}
                <div className='flex flex-col items-center gap-6 mt-[20px]'>
                  
                  <button
                    onClick={closeModal}
                    className="delay-150 bg-[#D9D9D9] w-[75px] rounded-tr-sm rounded-br-sm border-[1.5px] border-black hover:bg-[#F3F3F3] place-content-end"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalesOrdering1;