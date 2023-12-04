import React, { useEffect, useState } from 'react';

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


function Orders() {
  const [data, setData] = useState([]);
  const [date, setDate] = useState([]);
  const [totalAmount, setTotal] = useState([]);
  const [status, setStatus] = useState([]);
  const [orderItem, setOrderItem] = useState([]);

  const [id, setID] = useState([]);


  const [itemClass, setItemClass] = useState([]);
  const [itemPrice, setItemPrice] = useState([]);
  const [itemTotal, setItemTotal] = useState([]);
  const [itemQuantity, setItemQuantity] = useState([]);


  const [isModalOpen, setModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setModalOpen(true);
    console.log(itemClass);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
  };

 

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
        
      
      })
      
      
  }, []);


 
  const handleDetails = (parameter) =>{
    let tester = window.confirm("Try to press")
    //create confirmation modal of sales order
    if(tester == true){
      
      console.log(parameter);
      const url = 'http://localhost:4000/details';
      fetch(url, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({id: parameter})
      })
      .then(response => response.json())
      .then((data) => {
        setItemClass(data.map((row) => row.class));
        setItemPrice(data.map((row) => row.item_price));
        setItemQuantity(data.map((row) => row.quantity));
        setItemPrice(data.map((row) => row.total_price));

      })
      .catch(error => console.error(error))
      }
  }

  return (
    <div>
      <h1>MySQL Table Data</h1>
      <div class = "flex gap-12">
      <div> 
      Order Date
      {date.map((value, index) => (
                      <div class = "mb-2"key={index}> {value}</div>
                      ))}
      
      </div>
      <div>
      Total Amount
      {totalAmount.map((value, index) => (
                      <div class = "mb-2" key={index}> {value}</div>
                      ))}

      </div>

      <div>
      Order Status
      {status.map((value, index) => (
                      <div class = "mb-2" key={index}> {value}</div>
                      ))}

      </div>

      <div>
         .
      {id.map((value, index) => (
       
       <div key={index}>
       <button className="bg-lime-600 mb-2 w-32 rounded-md" onClick={() => {
       
          handleDetails(value);
          openModal();
        }}>
         VIEW DETAILS
       </button>
     </div>
                      ))}

      </div>

      {isModalOpen && (
                        <div style={modalStyles.modalContainer}>
                        <div style={modalStyles.modal}>
                            <div style={modalStyles.modalContent}>
                            <div className='text-center text-xl font-bold mb-9'>Item Orders</div>
                            <div className='flex flex-col gap-6'>
                                <h2 className='flex-1 flex mx-10'>
                                  
                                </h2>
                                {itemClass.map((value, index) => (
                                    <div key = {index}> {value} </div>
                                    

                                  ))}
                                  {console.log(itemClass)}
                                <h2 className='flex-1 flex ml-10'>
                                    <b>Type of Measurement: </b>
                                    <div class="bg-teal-500 rounded-md ml-[45px] w-14 justify-start">
                                    <label>
        <input type="radio" value="kg"  /> kg </label><br></br>
        <label>
        <input type="radio" value="box"/>box </label>
        </div>
        </h2>
         <h2 className='flex-1 flex mx-10'> <b className='flex-1'>Price: </b> <div className='flex-1'><input className="ml-6 rounded-lg bg-teal-500 h-6 w-[105px] p-2"></input> </div>
        </h2>
        <button  className="delay-150 bg-white border-emerald-500 border-2 place-content-center ml-[250px] p-1 h-9 w-[80px] rounded-lg">Submit</button>
        <button onClick={closeModal} className="delay-150 bg-white border-emerald-500 border-2 place-content-center ml-[250px] p-1 h-9 w-[80px] rounded-lg">Close</button>
        </div>
            </div>
                </div>
                </div>
                    )}  
      

      </div>
    </div>

  );
}

export default Orders;