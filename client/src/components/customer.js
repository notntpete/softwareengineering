import React from 'react';
import {Link, Route, Routes} from "react-router-dom";

function customer(){
    return(
        <div class="bg-gray-500">
            <div class="flex">
            <div class="bg-white h-screen p-5 pt-10 bl-none rounded-r-lg">
                <div class="rounded-full border-2 bg-emerald-500 h-20 w-20 mb-20 ml-5 mt-10 border-white"></div> 
                <button class="rounded-lg pr-5 pt-2 pb-2 pl-5  delay-150 border-emerald-500 border-2 duration-50">
                    <b>Employees</b> </button>
                <br/><button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2  duration-50">
                    <b>Inventory</b> </button> <br/>
                <br/><button class="mt-5  rounded-lg pr-6 pt-2 pb-2 pl-6 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b>Customer</b> </button>  <br/>
                <br/><button class="mt-5  rounded-lg pr-10 pt-2 pb-2 pl-10 delay-150 bg-white border-emerald-500 border-2 duration-50">
                    <b>Sales</b></button> <br/>       
            </div>
            
            <div class="ml-[350px] mt-[30px] bg-white h-[150px] w-[1000px] rounded-lg">
                <div class="rounded-full border-2 bg-emerald-500 h-20 w-20 ml-5 mt-5 border-white grid grid-cols-3 grid-rows-3">
                    <div class="ml-[692px] whitespace-nowrap">Gender: Male</div>
                    <div class="ml-[80px] whitespace-nowrap"><b>Aaron Macias</b>
                    <div class="text-sm">Customer </div> </div>
                    <div class="ml-[333px] whitespace-nowrap">Cust ID: C00001
                    <div class="ml-[300px]">Bill Address: Toril, Davao City</div></div>
                    <div class="ml-[398px] whitespace-nowrap">Fax: +1 (xxx) xxx-xxx   
                    <div class="ml-[300px]">Ship Address: Toril, Davao City</div></div>
                    <div class="ml-[367px] whitespace-nowrap"><br/>Phone No: 09123098472<br/></div>
                </div>
            
            <div class="bg-white h-[620px] w-[1000px] rounded-lg mt-[80px]">
                <div class="grid grid-cols-5">
                    <div class="text-center mt-5 bg-white"><b>Order ID </b></div>
                    <div class="text-center mt-5 bg-white"><b>Date Ordered </b></div>
                    <div class="text-center mt-5 bg-white"><b>Class Type </b></div>
                    <div class="text-center mt-5 bg-white"><b>Quantity </b></div>
                    <div class="text-center mt-5 bg-white"><b>Total </b></div>
                </div>
                <div class="mt-[20px] ml-[20px] w-[960px] rounded-lg bg-emerald-400 h-[1px]"></div>
                <div class="grid grid-cols-5">
                    <div class="text-center mt-5 bg-white">Pay10000002 </div>
                    <div class="text-center mt-5 bg-white">11/05/23 </div>
                    <div class="text-center mt-5 bg-white">Class A, B, C </div>
                    <div class="text-center mt-5 bg-white">200 kg </div>
                    <div class="text-center mt-5 bg-white">Php 11,700 </div>
                </div>
                <div class="grid grid-cols-5">
                    <div class="text-center mt-5 bg-white">Pay10000001 </div>
                    <div class="text-center mt-5 bg-white">11/05/23 </div>
                    <div class="text-center mt-5 bg-white">Class A, B, C </div>
                    <div class="text-center mt-5 bg-white">200 kg </div>
                    <div class="text-center mt-5 bg-white">Php 11,700 </div>
                </div>
                <div class="pl-5 rounded-lg bg-white h-[350px] p-5">
                    <div class="grid grid-cols-2 grid-rows-3">
                    </div>
                    </div>
                </div>
            </div>
        </div>

        </div>



    )



}

export default customer;