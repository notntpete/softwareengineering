import React from 'react';

function Inventory(){
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
                <br/><button class="mt-5  rounded-lg pr-10 pt-2 pb-2 pl-10 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b>Sales</b> </button>        
            </div>
            <div class="ml-[350px] bg-white m-[50px] h-[620px] w-[600px] rounded-lg mt-[90px] place-content-center">
                <div class="grid grid-cols-3">
                    <h1 class="text-center mt-5 bg-white"><b>Class Type </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Quantity </b></h1>
                    <h1 class="text-center mt-5 bg-white"><b>Price </b></h1>
                </div>
                <div class="mt-[20px] ml-[20px] w-[550px] rounded-lg bg-emerald-400 h-[1px]"></div>
                <div class="pl-5 rounded-lg bg-white h-[350px] p-5">
                    <div class="grid grid-cols-2 grid-rows-3">
                        <p class=" p-5">Class A</p><div class="h-6 pt-5 pb-5">0kg<input class="ml-[150px] rounded-lg bg-teal-500 h-6 w-[80px]"></input></div>
                        <p class=" ml-[25px] p-5">Class B</p><div class="h-6 pt-5 pb-5">0kg<input class="ml-[150px] rounded-lg bg-teal-500 h-6 w-[80px]"></input></div>
                        <p class=" ml-[25px] p-5">Class C</p><div class="h-6 pt-5 pb-5">0kg<input class="ml-[150px] rounded-lg bg-teal-500 h-6 w-[80px]"></input></div>
                        <p class=" ml-[25px] p-5">Rejected</p><div class="h-6 pt-5 pb-5">0kg<input class="ml-[150px] rounded-lg bg-teal-500 h-6 w-[80px]"></input></div>
                    </div>
                    <div class="grid grid-cols-2 grid-rows-1 mt-[100px] rounded-lg bg-emerald-400 h-[1px] gap-1">
                        <p class="mt-7 ml-[50px] "><b>Total</b><p class="mt-7 ">0 kg</p></p>
                    </div>
                </div>
                <button class="delay-150 bg-white border-emerald-500 ml-[480px] border-2 place-content-center p-1 h-9 w-[80px] mt-[150px] rounded-lg">Submit</button>
            </div>
        </div>
    </div>





    )
}
export default Inventory;