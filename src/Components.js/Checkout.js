import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Scripts from './Scripts'
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Checkout() {
    const [viewcart,setviewcart]=useState([]);
    const [customerdetails,setcustomerdetails]=useState();
    useEffect(() => {
      Scripts()
      cartfunction()
    }, [])
    const notify = (msg) => toast.success(msg, {
      position: "top-center",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-center",
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
      const checkout=async(e,price)=>{
        e.preventDefault();
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
            "total_price":parseFloat(price)+(parseFloat(price)/10),
            "status":"new",
            "vat":(parseFloat(price)/10)
          }
          if (customerdetails){
            for (const [key, value] of Object.entries(customerdetails)) {
              // console.log("key",key)
              // console.log("value",value)
              data[key]= value
            }
          }
          checdata.push(data)
          
        })
        // console.log("chkdta",checdata)
        
        // console.log("data",data)
        let postdata = await Callaxios('post',"purchase/order/",checdata)
        // console.log("data",postdata)
        if (postdata.data.Status===200){
          notify("Successfully placed")
          setallnull()
          
        }else{
          notifyerror("Some thing Went wrong")
        }
        
      }
      const setallnull=()=>{
        setviewcart([''])
        window.localStorage.setItem('cart','')
        setcustomerdetails()
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
                      <form onSubmit={(e)=>checkout(e,(viewcart.reduce((n, {price}) => n + parseInt(price), 0)))} >
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
                    <span className="text-right">${viewcart.length ?  viewcart.reduce((n, {price}) => n + parseInt(price), 0): 0}</span>
                  </div>
                  <div>
                    <span className="text-left">VAT</span>
                    <span className="text-right">${viewcart.length ? parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)*0.2):0}</span>
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
                    <span className="text-right">${viewcart.length ? (viewcart.reduce((n, {price}) => n + parseInt(price), 0))+(parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)*0.2)):0}</span>
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
                          <span className="new-price">${itm.price}</span>
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


    </div>
  )
}
