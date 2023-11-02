import React from 'react';
import { Link } from 'react-router-dom';
import backgroundpom from '../images/bglogopom.jpg';
import logo from '../images/logoshebar.png';

function LandingPage() {
  const handleButtonClick = (role) => {
    // You can implement logic based on which button was clicked
    if (role === 'employee') {
      // Handle the employee button click
    } else if (role === 'customer') {
      // Handle the customer button click
    }
  };

  return (
    <div className="flex relative min-h-screen flex-col items-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundpom})` }}>
      <div className="absolute inset-0 bg-lime-600 opacity-10 z-10"></div>

      <div className="mt-20 flex h-[200px] w-screen items-center justify-center bg-lime-800 z-30 shadow-2xl">
        <div className="h-[200px] w-[200px] border-white border rounded-full overflow-hidden">
          <img
            src={logo}
            alt="Shegels Logo"
            className="object-cover h-full w-full pl-2 pt-1"
          />
        </div>
        <div className="p-11 text-6xl text-white">She-gels Sweet <br />Pummelo Trading</div>
      </div>

      <div className="m-16 mt-32 h-96 w-[750px] items-center rounded-lg bg-white pt-9 justify-center font-bold text-black opacity-90 shadow-lg z-40">
        <div className="mt-10 text-5xl">Type of Login</div>
        <div className="flex flex-row justify-center mt-28 text-3xl">
          <Link to="/loginemp">
            <button
              className="bg-blue-500 w-60 text-white font-semibold py-2 px-4 rounded float-right shadow-md mr-4"
              onClick={() => handleButtonClick('employee')}
            >
              Employee
            </button>
          </Link>
          <Link to="/logincus">
            <button
              className="bg-green-500 hover:bg-green-600 w-60 text-3xl text-white font-semibold py-2 px-4 rounded"
              onClick={() => handleButtonClick('customer')}
            >
              Customer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;

{/* <div className="min-h-screen flex flex-col bg-lime-500 bg-[images/pomelobg.jpg] bg-cover bg-no-repeat bg-center">
       <div className='flex flex-row items-center bg-lime-900 w-screen z-50 h-24 mb-40 mt-36'>
        hi
      </div>
      
      <div className="text-center h-100px w-150px bg-white width rounded-lg p-10 border ">
        <h1 className="text-3xl font-semibold mb-6">Welcome to Shegels Pummelo</h1>
       <p className="text-gray-600 mb-6">Please select your role:</p>
         <div className="flex justify-center">
         <Link to="/loginemployee"><button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded mr-4"
            onClick={() => handleButtonClick('employee')}
          >
            Employee
          </button></Link>
          <Link to="/logincustomer"><button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
            onClick={() => handleButtonClick('customer')}
          >
            Customer
          </button></Link>
        </div>
      </div>
     </div>  */}