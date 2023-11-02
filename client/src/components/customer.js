import React from 'react';
import {Link, Route, Routes} from "react-router-dom";
import Sidebar from './sidebar';

function customer(){
    return(
        <div class="bg-gray-500 w-screen min-h-screen">
    <div class="flex flex-col">
        <Sidebar/>
        
        <div class="bg-white h-[150px] w-[1000px] rounded-lg mt-[80px] ml-[475px]">
            <div class="flex">
                <div class="rounded-full border-2 bg-emerald-500 h-20 w-20 ml-5 mt-5 border-white"></div>
                <div class="flex-col ml-[100px] mt-4 w-[150px] text-left">
                    <div class=""><b>Aaron Macias</b></div>
                    <div class="">Customer</div>
                </div>
                <div class="flex-col ml-[100px] w-[150px] text-left mt-3 whitespace-nowrap">
                    <div class="">Cust ID: C00001</div>
                    <div class="">Fax: +1 (xxx) xxx-xxx</div>
                    <div class=" ">Phone No: 09123098472</div>
                </div>
                <div class="flex-col ml-[100px] w-[150px] text-left mt-3 whitespace-nowrap">
                    <div>Gender: Male</div>
                    <div class="">Bill Address: Toril, Davao City</div>
                    <div class="">Ship Address: Toril, Davao City</div>
                </div>
                </div>
            </div>
            
            <div class="bg-white h-[620px] w-[1000px] rounded-lg mt-[50px] ml-[475px]">
                <div class="flex">
                    <div class="text-center mt-5 bg-white flex-1"><b>Order ID </b></div>
                    <div class="text-center mt-5 bg-white flex-1"><b>Date Ordered </b></div>
                    <div class="text-center mt-5 bg-white flex-1"><b>Class Type </b></div>
                    <div class="text-center mt-5 bg-white flex-1"><b>Quantity </b></div>
                    <div class="text-center mt-5 bg-white flex-1"><b>Total </b></div>
                </div>
                <div class="mt-[20px] ml-[20px] w-[960px] rounded-lg bg-emerald-400 h-[1px]"></div>
                <div class="flex">
                    <div class="text-center mt-5 bg-white flex-1">Ord10000002</div>
                    <div class="text-center mt-5 bg-white flex-1">11/05/23</div>
                    <div class="text-center mt-5 bg-white flex-1">Class A, B, C</div>
                    <div class="text-center mt-5 bg-white flex-1">200 kg</div>
                    <div class="text-center mt-5 bg-white flex-1">Php 11,700</div>
                </div>
                <div class="flex">
                    <div class="text-center mt-5 bg-white flex-1">Ord10000001</div>
                    <div class="text-center mt-5 bg-white flex-1">11/05/23</div>
                    <div class="text-center mt-5 bg-white flex-1">Class A, B, C</div>
                    <div class="text-center mt-5 bg-white flex-1">200 kg</div>
                    <div class="text-center mt-5 bg-white flex-1">Php 11,700</div>
                </div>
                <div class="pl-5 rounded-lg bg-white h-[350px] p-5">
                    <div class="flex flex-wrap">
                        {/* <!-- Your content here --> */}
                    </div>
                </div>
            </div>
        
    </div>
</div>
       



    )



}

export default customer;