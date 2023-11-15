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
    width: '800px',
    height: '530px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
  },
  modalContent: {
    textAlign: 'left',
  },
};

function Repack(){

  const [isModalOpen, setModalOpen] = useState(false);

    const [StockIn, setStockIn] = useState([]);
    const [Repack, setRepack] = useState([]);

    const [id, setID] = useState([]);
    const [date, setDate] = useState([]);

    const [className, setClassName] = useState([]);
    const [expiration, setExpiration] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [measure, setMeasure] = useState([])


    useEffect(() => {
        fetch('http://localhost:4000/repack')
        .then(res => {return res.json()})
        .then(data => {
          setStockIn(data[0]);
          setRepack(data[1]);

          setID(data[0].map((row) => row.stockin_repack_id));
          setDate(data[0].map((row) =>  row.stockin_date));

        })  
      }, []);

      

      const openModal = (index) => {
        const url = 'http://localhost:4000/repackdetails';
        fetch(url, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({id:index})
        })
        .then(response => response.json())
        .then((data) => {
          setClassName(data.map((row) => row.class));
          setMeasure(data.map((row) => row.measurement_type));
          setExpiration(data.map((row) => row.expiration_date));
          setQuantity(data.map((row) => row.stock_quantity))
          
          setModalOpen(true);})
        .catch(error => console.error(error))
        }  
      ;
    
      const closeModal = () => {
        setModalOpen(false);
      };

return(
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
    <div className='font-bold text-2xl mt-5'>Repacked Inventory</div>
    <div className='flex flex-col w-10/12'>
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
            <Link to = "/inventory">
            <button className="h-[30px] w-[200px] bg-[#D9D9D9] rounded-tr-sm rounded-br-sm border-[1.5px] border-black hover:bg-[#F3F3F3]" >
              + Add Repack
            </button>
            </Link>
          </div>
    </div>
    <div className='flex flex-col w-10/12 shadow-lg mt-[-12px]'>
      <div className='flex flex-row bg-[#D9D9D9] border-[1.4px] rounded-t-sm mt-5 h-16 justify-center items-center font-bold border-black shadow-md '>
        <div className='flex-1 ml-10'>Stockin Date</div>
        <div className='flex-1'>Stockin By</div>
      </div>
      <div className='flex flex-col bg-white border-[1.5px] rounded-b-sm border-t-0 h-[500px] items-center border-black max-h-3/4 gap-[30px] overflow-y-auto'>
       {id.map((value, index) => {
        return(
          <div className='flex flex-row w-full mt-5'>
          <div className=''>
            <button
              className='ml-4 mt-1 bg-[#F3F3F3] text-black  hover:bg-[#3BC4AF] hover:text-white'
              onClick={() => openModal(value)}
            >
              <Icon icon="bxs:edit" className='h-6 w-6' />
            </button>
          </div>
          <div className='flex-1 '>{new Date(date[index]).toLocaleDateString('en-US')}</div>
          <div className='flex-1'> Employee</div>
        </div>
        )
       })}
      </div>
    </div>
  </div>


  {isModalOpen && (
    <div style={modalStyles.modalContainer}>
      <div style={modalStyles.modal}>
        <div style={modalStyles.modalContent}>
          <div className="text-center text-xl font-bold mb-9">Repack Details</div>
          <div className="flex flex-col gap-6" style={{ justifyContent: 'flex-end' }}>
            {/* Add input fields for editing */}
            <div className='flex flex-col w-10/12 shadow-lg'>
      <div className='flex flex-row bg-[#D9D9D9] border-[1.4px] w-[750px] rounded-t-sm mt-5 h-16 justify-center items-center font-bold border-black shadow-md '>
        <div className='flex-1 ml-10'>Class Type</div>
        <div className='flex-1'>Stock In Quantity</div>
        <div className='flex-1'>Expiration Date</div>
      </div>
      <div className='flex flex-col bg-white border-[1.5px] rounded-b-sm border-t-0 h-[300px] w-[750px] items-center border-black max-h-3/4 gap-[30px] overflow-y-auto'>
       {className.map((value, index) => {
        return(
          <div className='flex flex-row w-full mt-5 ml-32'>

          <div className='flex-1 '> {className[index]}</div>
          <div className='flex-1'> {quantity[index]} {measure[index]}</div>
          <div className='flex-1'> {new Date(expiration[index]).toLocaleDateString('en-US')}</div>
        </div>
        )
       })}
  
  </div>
  </div> 
            {/* Add more input fields for editing */}
            <div className='flex flex-col items-center gap-6'>
            
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
)

}

export default Repack