import React from 'react'
import backgroundpom from '../images/bglogopom.jpg';

const RegisterEmployee = () => {
  return (
//     <div class="relative">
//   <img
//     src={backgroundpom}
//     alt="Your Image"
//     class="min-h-screen w-screen"
//   />
//   <div class="absolute inset-0 bg-green-500 opacity-50z"></div>

// </div>
    <div className="flex relative min-h-screen flex-col items-center justify-center bg-cover bg-no-repeat" style={{ backgroundImage: `url(${backgroundpom})` }}>
      <div className="absolute inset-0 bg-green-800 opacity-50 z-0"></div>
        <div className='flex flex-col bg-slate-100 z-10 w-[900px] h-[800px] rounded-lg'>

        <div className="mt-8 flex h-[50px]  bg-lime-800 z-30 shadow-2xl items-center justify-center">
            <div className=" text-2xl text-white">Employee Registration</div>
        </div>

            <div className='flex flex-row h-[900px]'>
                <div className='flex flex-col  w-1/3 ml-10 items-start gap-4 mt-10'>
                  <div className='h-6 text-lg font-semibold'>Name: </div>
                  <div className='h-6 text-lg font-semibold'>Department: </div>
                  <div className='h-6 text-lg font-semibold'>Position: </div>
                  <div className='h-6 text-lg font-semibold'>Contact Number:</div>
                  <div className='h-6 text-lg font-semibold'>Address: </div>
                  <div className='h-6 text-lg font-semibold'>Gender: </div>
                  <div className='h-6 text-lg font-semibold'>Email: </div>
                  <div className='h-6 text-lg font-semibold'>Birthday: </div>
                  <div className='h-6 text-lg font-semibold'>Hiring Date: </div>
                  <div className='h-6 text-lg font-semibold'>Marital Status: </div>
                  <div className='h-6 text-lg font-semibold'>Required Time in: </div>
                  <div className='h-6 text-lg font-semibold'>Picture: </div>

                  </div>
                <div className='flex flex-col  w-2/3 items-start gap-4 mt-10'>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='number' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
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
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <div class="flex flex-row gap-4">
                    <div class="bg-[#CCDA7D] rounded-md w-20 justify-start">
                      <input class="rounded-md bg-[#CCDA7D] mr-1" type='radio' name='Marital Status' id='Single'></input>
                      <label for='Single'>Single</label>
                    </div>
                    <div class="bg-[#CCDA7D] rounded-md w-20 justify-start">
                      <input class="rounded-md bg-[#CCDA7D] mr-1" type='radio' name='Marital Status' id='Married'></input>
                      <label for='Married'>Married</label>
                    </div>
                  </div>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                  <input class=" rounded-md bg-[#CCDA7D] h-6 w-[375px] " type='text' placeholder='' ></input>
                </div>
            </div>

          <div className='flex flex-row justify-end'><button class="delay-150 bg-[#CCDA7D] w-20 mr-52 mb-11 rounded-lg">Submit</button></div>
        
        </div>
    </div>
  )
}

export default RegisterEmployee