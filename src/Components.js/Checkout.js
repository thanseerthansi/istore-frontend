import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Scripts from './Scripts'
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { BaseURL } from './urlcall';
import { Modal } from 'react-bootstrap'
import { Simplecontext } from './Simplecontext';
import { useContext } from 'react';
import jwt_decode from "jwt-decode";

export default function Checkout() {
  const {accesscheck} =useContext(Simplecontext)
    const [viewcart,setviewcart]=useState([]);
    const [customerdetails,setcustomerdetails]=useState();
    const [statusModal, setstatusModal] = useState({show: false, login:true});
    const [paymentmodal, setpaymentmodal] = useState({show: false});
    const [username,setusername]=useState()
    const [contact,setcontact]=useState()
    const [password,setpassword]=useState()
    const [load,setload]=useState(false)
    const [load1,setload1]=useState(false)
    // console.log("localStorage.getItem('access_user')",localStorage.getItem('access_user'))
    useEffect(() => {
      window.scrollTo(0, 0);
      Scripts()
      cartfunction()
      // accesscheck()
      tokenCheck()
    }, [])
    const notify = (msg) => toast.success(msg, {
      position: "top-right",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-right",
      });
    const cartfunction=()=>{
        let orderlist = window.localStorage.getItem('cart')
        
        // console.log("orderlis3",JSON.parse(orderlist))
        try {
          if (orderlist.length){
            // console.log("listpresent")
            setviewcart(JSON.parse(orderlist))  
          }else{}      
        } catch (error) {} 
      }
      const tokenCheck=()=>{
        const token = localStorage.getItem('access_user');
        
        
        var dateNow = new Date();
        // console.log("valid1",refresh_token)
        if(token){
          var decodedToken=jwt_decode(token, {complete: true});
          if(decodedToken.exp < dateNow.getTime()){
            localStorage.removeItem('access_user')
          }
        }
        
      }
      const checkout=async(e,price)=>{
        
        e.preventDefault();
        setload1(true)
        if(localStorage.getItem('access_user')){
        accesscheck()
        
        
        // console.log("product",productdetail)
        let checdata = []
        viewcart.map((itm)=>{
          // let price=viewcart.reduce((n, {price}) => n + parseInt(price), 0)
          // console.log("price",price)
          let data = {
            "product":itm.product[0].id,
            "price":itm.price,
            "condition":itm.condition,
            "storage":itm.storage,
            "quantity":itm.quantity,
            "color":itm.color,
            "subtotal_price":price,
            "total_price":parseFloat(price)+(parseFloat(price)*0.05),
            "status":"new",
            "vat":(parseFloat(price)*0.05)
          }
          if (customerdetails){
            // console.log("dddddddddddddddd",data)
            for (const [key, value] of Object.entries(customerdetails)) {
              data[key]= value
            }
          }
          checdata.push(data)
          // console.log("chkdta",checdata)
        })
        // console.log("chkdta",checdata)
        
        // console.log("data",data)
        window.localStorage.setItem('zell_orderedproduct',JSON.stringify(checdata))
        // setallnull()
        Payment_Page(checdata[0].total_price)
        // let postdata = await Callaxios('post',"purchase/order/",checdata)
        // console.log("data",postdata)
        // if (postdata.data.Status===200){
        //   notify("Successfully placed")
        //   Payment_Page("123")
        //   setallnull()
          
        // }else{
        //   notifyerror("Some thing Went wrong")
        // }
      }else{setstatusModal({...statusModal,show:true})} 
      setload1(false)
      }
      const checkoutcashDelivery=async(e,price)=>{
        
        e.preventDefault();
        setload(true)
        if(localStorage.getItem('access_user')){
        accesscheck()
        
        
        // console.log("product",productdetail)
        let checdata = []
        viewcart.map((itm)=>{
          // let price=viewcart.reduce((n, {price}) => n + parseInt(price), 0)
          // console.log("price",price)
          let data = {
            "product":itm.product[0].id,
            "price":itm.price,
            "condition":itm.condition,
            "storage":itm.storage,
            "quantity":itm.quantity,
            "color":itm.color,
            "subtotal_price":price,
            "total_price":parseFloat(price)+(parseFloat(price)*0.05),
            "status":"new",
            "vat":(parseFloat(price)*0.05)
          }
          if (customerdetails){
            // console.log("dddddddddddddddd",data)
            for (const [key, value] of Object.entries(customerdetails)) {
              data[key]= value
            }
          }
          checdata.push(data)
          // console.log("chkdta",checdata)
        })
        // console.log("chkdta",checdata)
        
        // console.log("data",data)
        // window.localStorage.setItem('zell_orderedproduct',JSON.stringify(checdata))
        // setallnull()
        // Payment_Page(checdata[0].total_price)
        let postdata = await Callaxios('post',"purchase/order/",checdata)
        // console.log("data",postdata)
        if (postdata.data.Status===200){
          notify("Successfully placed")
          setallnull()
          setpaymentmodal({...paymentmodal,show:false})
          
        }else{
          notifyerror("Some thing Went wrong")
        }
      }else{setstatusModal({...statusModal,show:true})} 
      setload(false)
      }
      const setallnull=()=>{
        setviewcart([])       
        setcustomerdetails()
        localStorage.setItem('cart','')
        localStorage.setItem('zell_orderedproduct','')
      }
      const Payment_Page = (price) => {
        var data = {
            'product_name' : 'check_out',
            'unit_amount' : price ,
            'currency' : 'AED',
            'site' : window.origin,
            // 'order_id' : order_id
            
        }
        axios.post(`${BaseURL}product/create-checkout-session/`,data,{
          headers : {
            Authorization : `Bearer ${localStorage.getItem('access_user')}`
          }
        })
        .then((res) => {
          // console.log("response",res)
            if (res.data.Status === 200){
              // setload(true)  
              window.location.assign(res.data.Message.url); 
              
            }
            else{
                // setalert({ open : true , msg: "Something Went Wrong",severity:"error"})
                notifyerror("Something Went Wrong")
                // setload(false)
            }
          })
          .catch((error) => {
            // setload(false)
            if (error.response.request.status === 401) {
              // setalert({ open : true , msg: "Un Authorized request",severity:"error"})
              notifyerror("Un Authorized request")
    
            }
            else{
              // setalert({ open : true , msg: "Something Went Wrong",severity:"error"})
              notifyerror("Something Went Wrong")
    
            }
          })
    
    }
    const login=async(e)=>{
      e.preventDefault();
      try {
          let data = await Callaxios("post",'api/token/',{"username":username,"password":password} )
          // console.log("data",data.data.access)
          if (data.status === 200){
              // console.log("pk")

              window.localStorage.setItem('email', username)
              window.localStorage.setItem('access_user', data.data.access)
              window.localStorage.setItem('refresh_user', data.data.refresh) 
              setstatusModal({ ...statusModal, show: false ,login:true})
              
          }
          // else if(data.message==="Request failed with status code 401"){
          //   notifyerror("Incorrect email or password")
          // }
          else{
              notifyerror("Something went wrong")
              // alert(data.data.Message) 
          }
            
      } catch (error) {
        notifyerror("! Invalid Password or Username")
      }
  }
  const userregistercall=async(e)=>{
    // console.log("ok")
    e.preventDefault();
    try {
        let data = await Callaxios("post","user/user/",{'username':username,"email":username,'password':password,'contact':contact})
        // console.log("data",data.data)

        if (data.data.Status===200){
            notify("Registered Successflly")
            setusername('')
            setcontact('')
            setpassword('')
            login()
        }
        else if(data.data.Message==="{'username': [ErrorDetail(string='A user with that username already exists.', code='unique')]}"){
          notifyerror('email already exists')
        }
    } catch (error) {
        console.log(error)
    }
    
                                      
}

  return (
    <div>
        <Header/>
     
    <ToastContainer/>
  {/* Ec breadcrumb start */}
  <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row ec_breadcrumb_inner">
            <div className="col-md-6 col-sm-12">
              <h2 className="ec-breadcrumb-title">Checkout</h2>
            </div>
            <div className="col-md-6 col-sm-12">
              {/* ec-breadcrumb-list start */}
              <ul className="ec-breadcrumb-list">
                <li className="ec-breadcrumb-item"><Link to="/">Home </Link></li>
                <li className="ec-breadcrumb-item active"><span> > </span> Checkout</li>
              </ul>
              {/* ec-breadcrumb-list end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Ec breadcrumb end */}
  {/* Ec checkout page */}
  <section className="ec-page-content section-space-p">
    <div className="container">
      <div className="row">
        <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
          {/* checkout content Start */}
          <div className="ec-checkout-content">
            <div className="ec-checkout-inner">
              
              <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                <div className="ec-checkout-block ec-check-bill">
                  <h3 className="ec-checkout-title">Billing Details</h3>
                  <div className="ec-bl-block-content">
                    
                    
                    <div className="ec-check-bill-form">
                      {viewcart.length ? 
                      <form onSubmit={(e)=>{e.preventDefault(); setpaymentmodal({ ...paymentmodal, show: true })}} >
                        <span className="ec-bill-wrap ">
                          <label>Name*</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,customer_name:e.target.value})} name="name" placeholder="Enter your name" required />
                        </span>
                        {/* <span className="ec-bill-wrap ec-bill-half">
                          <label>Last Name*</label>
                          <input type="text" name="lastname" placeholder="Enter your last name" required />
                        </span> */}
                        <span className="ec-bill-wrap">
                          <label>Address *</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,address:e.target.value})} required name="address" placeholder="Address Line 1" />
                        </span>
                        
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>Email *</label>
                          <input type="email" onChange={(e)=> setcustomerdetails({...customerdetails,email:e.target.value})} required name="email" placeholder="email" /> 
                        </span>
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>Contact *</label> 
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,contact:e.target.value})} name="contact" placeholder="contact" />  
                        </span>
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>Country *</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,country:e.target.value})} name="Country" placeholder="Country" /> 
                        </span>
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>Region State</label> 
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,state:e.target.value})} name="state" placeholder="Region State" />  
                        </span>
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>City *</label>  
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,city:e.target.value})} name="city" placeholder="City" required/>                    
                        </span>
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>Post Code</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,postcode:e.target.value})} name="postalcode" placeholder="Post Code" />
                        </span>
                        {viewcart.length ? 
                        <div className="ec-check-order-btn ml-auto">
                          <button className='btn btn-primary' type="submit" htmlFor="submit" >Place Order</button>
                        </div>
                        :null }
                      </form>
                      :null}
                    </div>
                  </div>
                </div>
              </div>
              {/* <span className="ec-check-order-btn">
                <button className='' type="submit" htmlFor="submit" >Place Order</button>
              </span> */}
            </div>
          </div>
          {/*cart content End */}
        </div>
        {/* Sidebar Area Start */}
        <div className="ec-checkout-rightside col-lg-4 col-md-12">
          <div className="ec-sidebar-wrap">
            {/* Sidebar Summary Block */}
            <div className="ec-sidebar-block">
              <div className="ec-sb-title">
                <h3 className="ec-sidebar-title">Summary</h3>
              </div>
              <div className="ec-sb-block-content">
                <div className="ec-checkout-summary">
                  <div>
                    <span className="text-left">Sub-Total</span>
                    <span className="text-right">{viewcart.length ?  viewcart.reduce((n, {price}) => n + parseInt(price), 0): 0} AED</span>
                  </div>
                  <div>
                    <span className="text-left">VAT</span>
                    <span className="text-right">{viewcart.length ? parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)*0.05):0} AED</span>
                  </div>
                  {/* <div>
                    <span className="text-left">Coupan Discount</span>
                    <span className="text-right"><a className="ec-checkout-coupan">Apply Coupan</a></span>
                  </div>
                  <div className="ec-checkout-coupan-content">
                    <form className="ec-checkout-coupan-form" name="ec-checkout-coupan-form" method="post" action="#">
                      <input className="ec-coupan" type="text" required placeholder="Enter Your Coupan Code" name="ec-coupan" defaultValue />
                      <button className="ec-coupan-btn button btn-primary" type="submit" name="subscribe" value>Apply</button>
                    </form>
                  </div> */}
                  <div className="ec-checkout-summary-total">
                    <span className="text-left">Total Amount</span>
                    <span className="text-right">{viewcart.length ? (viewcart.reduce((n, {price}) => n + parseInt(price), 0))+(parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)*0.05)):0} AED</span>
                  </div>
                </div>
                <div className="ec-checkout-pro">
                {viewcart.length ?  viewcart.map((itm,k)=>(
                  <div key={k} className="col-sm-12 mb-6">
                    <div className="ec-product-inner">
                      <div className="ec-pro-image-outer">
                        <div className="ec-pro-image">
                          <Link to={`/product/${itm.id}`} className="image">
                            <img className="main-image" src={itm.product[0].images[0].image}  alt="Product" />
                            <img className="hover-image" src={itm.product[0].images[0].image}  alt="Product" />
                          </Link>
                        </div>
                      </div>
                      <div className="ec-pro-content">
                        <h5 className="ec-pro-title"><Link to={`/product/${itm.id}`}>{itm.product[0].title} {itm.storage}<span> x {itm.quantity}</span> </Link></h5>
                        <span className='text-uppercase'><b> {itm.condition}</b></span> 
                        <span className="ec-price">
                          {/* <span className="old-price">$95.00</span> */}
                          <span className="new-price">{itm.price} AED</span>
                        </span>
                       
                      </div>
                    </div>
                  </div>
                )):null}
                  
                </div>
              </div>
            </div>
            {/* Sidebar Summary Block */}
          </div>
        </div>
      </div>
    </div>
  </section>
  <Modal
        show={statusModal.show}
        centered
        size='md'
        backdrop="static"
        onHide={() =>
          setstatusModal({ ...statusModal, show: false ,login:true})
        }
      >
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{statusModal.login?"Login Required ":" Register"}</h5>
            <button
              type="button"
              onClick={() =>
                setstatusModal({ ...statusModal, show: false ,login:true })
              }
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body">
          <form onSubmit={(e)=>statusModal.login? login(e):userregistercall(e)}>
                                <span className="ec-login-wrap">
                                    <label>Email Address*</label>
                                    <input onChange={(e)=>setusername(e.target.value)} type="email" name="email" placeholder="Enter your email add..." required />
                                </span>{!statusModal.login?
                                <span className="ec-login-wrap">
                                  <label>Contact*</label>
                                  <input type="contact" onChange={(e)=>setcontact(e.target.value)} value={contact} name="Contact" placeholder="Enter your Contact" required />
                                </span>
                                :null}
                                <span className="ec-login-wrap">
                                    <label>Password*</label>
                                    <input type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="Enter your password" required />
                                </span>
                                <span className="ec-login-wrap ec-login-fp">
                                    <label><Link to="/forgetpassword">Forgot Password?</Link></label>
                                </span>
                                <div className='text-end'>
                                  {statusModal.login===true?
                                <span className="ec-login-wrap ec-login-btn ">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                    <button onClick={()=>setstatusModal({ ...statusModal, show: true , login:false})} className="btn btn-secondary ml-2">Register</button>
                                </span>
                                :<span className="ec-login-wrap ec-login-btn ">
                                <button onClick={()=>setstatusModal({ ...statusModal, show: true , login:true})} className="btn btn-primary" type="button">Login</button>
                                <button type="submit" className="btn btn-secondary ml-2">Register</button>
                            </span>}
                                </div>
                            </form>
           
          </div>
        </div>
      </Modal>
      <Modal
        show={paymentmodal.show}
        centered
        size='md'
        backdrop="static"
        onHide={() =>
          setpaymentmodal({ ...paymentmodal, show: false})
        }
      >
        <div className="modal-content">
          <div className="modal-header">
           <h6>Select Payment type</h6>
            <button
              type="button"
              onClick={() =>
                setpaymentmodal({ ...paymentmodal, show: false })
              }
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>
          <div className="modal-body text-center">
          <button className='btn btn-primary '  onClick={(e)=>checkoutcashDelivery(e,(viewcart.reduce((n, {price}) => n + parseInt(price), 0)))}  type="button">
          {
                      load ? <div className='d-flex'>loading<div class="spinner"></div>
 </div>
                                            :<> Cash On Delivery</>
                    }</button>
          <button className='btn btn-warning ml-4' onClick={(e)=>checkout(e,(viewcart.reduce((n, {price}) => n + parseInt(price), 0)))} type="button">{
                      load1 ? <div className='d-flex'>loading<div class="spinnerb"></div>
 </div>
                                            :<> Online Payment</>
                    }</button>
           
          </div>
        </div>
      </Modal>
    </div>
  )
}
