import React from 'react'
import Header from '../Components.js/Header'
import Footer from '../Components.js/Footer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Callaxios from '../Components.js/Callaxios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function Success() {
    const [order,setorder]=useState()
    const navigate =useNavigate();
    useEffect(() => {
        orderProduct()
    }, [])
    
    const notify = (msg) => toast.success(msg, {
        position: "top-center",
        });
      const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
    const setallnull=()=>{
        localStorage.setItem('cart','')
        localStorage.setItem('zell_orderedproduct','')
    }
    const orderProduct=async()=>{
        try {
            if(localStorage.getItem('zell_orderedproduct')){
                let checdata = JSON.parse(localStorage.getItem('zell_orderedproduct'))
            checdata.forEach(element => {
                element.payment =true
            });
            let postdata = await Callaxios('post',"purchase/order/",checdata)
            // console.log("data",postdata)
            if (postdata.data.Status===200){
              notify("Successfully placed")
              setorder(postdata.data.data)
              setallnull()
              
            }else{
              notifyerror("Some thing Went wrong")
            }
            }else{
                navigate('/') 
            }
            
        } catch (error) {
            
        }
       
    }
  return (
    <div>
        <Header/>
        <ToastContainer/>
        <div className=''>
        <div className='row padd text-center m-10' >
          <h1>Thank You</h1>
          <h4>Successfully Ordered</h4>
          {/* <h4>order Id : {order?.id??""}</h4> */}
          
          
       
        </div>       
      </div>
        <Footer/>
    </div>
  )
}
