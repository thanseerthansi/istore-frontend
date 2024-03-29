import axios from 'axios';
import jwt_decode from "jwt-decode";
import React, { createContext, useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';
import Callaxios from './Callaxios';
import Scripts from './Scripts';
import { BaseURL } from './urlcall';
export const Simplecontext = createContext();



export default function Simplecontextprovider({children}) {
  
  const [products,setproducts]=useState([])
  const [modelsname,setmodelsname]=useState([])
  const [categorydata,setcategorydata]=useState([])
  let navigate = useNavigate();
  
  useEffect(() => {
    getproduct()
    getmodel()
    Scripts()
    // getcategory()
    }, [])

  const getproduct = async()=>{
    let data = await Callaxios("get","product/product/",{sellstatus:"True"})
    // console.log("dataresponsenwxt",data)
    if (data.status===200){ 
        setproducts(data.data) 
    }else{
        // notifyerror(' Something went wrong',)
    }
  }
  const getmodel = async()=>{
    let data = await Callaxios("get","product/modelname/")
    // console.log("dataresponsenwxt",data)
    if (data.status===200){ 
      setmodelsname(data.data) 

  }else{
      // notifyerror(' Something went wrong',)
  }
  }
  
  const accesscheck = async()=>{
    
    const token = localStorage.getItem('access_user');
    var refresh_token = window.localStorage.getItem('refresh_user')
    // console.log("valid1",refresh_token)
    
    if (refresh_token && token){
      var decodedToken=jwt_decode(token, {complete: true});
      var dateNow = new Date();
      // console.log("valid1",refresh_token)
      if(decodedToken.exp < dateNow.getTime()){
        // console.log("valid",refresh_token)
        try {
            let accessdata = await axios({
              method: 'post',
              url: BaseURL+'api/token/refresh/',
              data:{"refresh" : refresh_token },
            })
        //   console.log("data",accessdata)    
            if(accessdata.status===200){
              window.localStorage.setItem('access_user', accessdata.data.access)   
            } else{
              window.localStorage.removeItem('access_user')
              // return navigate('/login')
            }
            
        }catch (error) {
          console.log("error",error)
          window.localStorage.removeItem('access_user')
          // console.log("erro/rmessga",error.response.status)
          if (error.response.status===401){
            console.log(error)
              // return navigate('/login');
          }
        }
      }else{
        // console.log("notvalid")
        window.localStorage.removeItem('access_user')
        return navigate('/login');
      }
  }else{
    // console.log("notrefresh token")
        return navigate('/login');
  }
}
  const logoutf=()=>{
    window.localStorage.removeItem("access_user")
    window.localStorage.removeItem("refresh_user")
    window.localStorage.removeItem("email")
    // console.log("okdelete")
    return navigate('/');
  }  
  const getcategory = async()=>{
    try {
      let data = await Callaxios("get","product/category")
      if (data.status===200){
        setcategorydata(data.data)
      }
    } catch (error) {
      
    }
  }

  return (
    <Simplecontext.Provider value={{
        accesscheck,products,setproducts,modelsname,logoutf,categorydata
    }}>{children}</Simplecontext.Provider>
  )
}
