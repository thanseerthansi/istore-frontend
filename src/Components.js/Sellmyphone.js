import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Simplecontext } from './Simplecontext';
import Callaxios from './Callaxios';
import Scripts from './Scripts';
export default function Sellmyphone() {
    const {products,modelsname} =useContext(Simplecontext)
    const [imodel,setimodel]=useState(null);
    const [istorage,setistorage]=useState(null);
    const [icondition,seticondition]=useState();
    const [iprice,setiprice]=useState();
    const [conditiondata,setconditiondata]=useState()
    const [storagelist,setstoragelist]=useState([])
    const [selectedproduct,setselectedproduct]=useState()
    const [customerdetails,setcustomerdetails]=useState([])
    const [conditions,setconditions]=useState([])
    // console.log("conditiom",icondition)
    const notify = (msg) => toast.success(msg, {
        position: "top-center",
        });
      const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
    useEffect(() => {
      Scripts()
      getcondition()
    }, [])
    
    const callstorage=(k)=>{
        // console.log("dataasfsasaf", products.filter(t => t.title.toUpperCase().includes(k.toUpperCase())))
        let data = products.filter(t => t.title.toUpperCase().includes(k.toUpperCase()))
        .reduce((a,b)=>a.buyprice.length>b.buyprice.length?a:b)
        // console.log("data16565",data)
        setselectedproduct(data)
        // console.log("data1",data[0])
        let list =[];
        (data.buyprice.split(',')).map((itm)=>{
          
          let spl = itm.split('-')[0]
          if (list[0]){
            if (list.indexOf(spl) !== -1){
              }else{
                list.push(itm.split('-')[0])
              }
          }else{
            list.push(itm.split('-')[0])
          }
          })
          // console.log("list",list)
          setstoragelist(()=>[...list])
         
      } 
      const callconditionfn=async(value)=>{
        // console.log("datsvcfa",value.split('-')[1])
        seticondition(value.split('-')[1]) 
        setiprice(value.split('-')[2])
        let data = await Callaxios("get","product/condition/",{"condition":value.split('-')[1]})
        // console.log(data)
        if (data.status===200){
        //   console.log("datasuccess",data.data)
          setconditiondata(()=>[...data.data])
        }
      }  
      const checkout=async(e)=>{
        e.preventDefault();
        // console.log("product",selectedproduct)
        let data = {
          "product":selectedproduct.id,
          "price":iprice,
          "condition":icondition,
          "storage":istorage,
          "quantity":1,
          // "color":icolor,
          "total_price":iprice,
          // "total_price":parseFloat(iprice)+(parseFloat(iprice)/10),
          "status":"new",
          // "vat":(parseFloat(iprice)/10)
    
        }
        if (customerdetails){
          for (const [key, value] of Object.entries(customerdetails)) {
            // console.log("key",key)
            // console.log("value",value)
            data[key]= value
          }
        }
        // console.log("data",data)
        let postdata = await Callaxios('post',"selling/sellorder/",[data])
        // console.log("data",postdata)
        if (postdata.data.Status===200){
          notify(`SELL${postdata.data.date.split('T')[1].split('.')[1]}${postdata.data.id}`)
          setallnull()
        }else{
          notifyerror()
        }
        
      }
      const getcondition=async()=>{
        let data = await Callaxios("get","product/condition/")
        // console.log(data)
        if (data.status===200){
          // console.log("datacondition",data.data)
          setconditions(()=>[...data.data])
        }
      }
      const setallnull=()=>{
        setstoragelist()
        setselectedproduct()
        setimodel()
        setistorage()
        seticondition()
        setiprice()
        setconditiondata()
        setcustomerdetails()
      }
  return (
    <div>
        <Header/>
        <ToastContainer/>
    <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
        <div className="row">
            <div className="col-12">
            <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                <h2 className="ec-breadcrumb-title">Sell Your iPhone here.</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                {/* ec-breadcrumb-list start */}
                <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item"><Link to="/">Home </Link></li>
                    <li className="ec-breadcrumb-item active"><span> ></span>Sell Your iPhone</li>
                </ul>
                {/* ec-breadcrumb-list end */}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    <div>
    {/* Ec checkout page */}
    <section className="ec-page-content section-space-p">
    
        <div className="container">
        {/* <h2 className="ec-breadcrumb-title">Sell My iPhone</h2> */}
        <div className="row">
            <div className="ec-checkout-leftside col-lg-8 col-md-12 ">
            {/* checkout content Start */}
            <div className="ec-checkout-content">
                <div className="ec-checkout-inner">
                <div className="ec-checkout-wrap margin-bottom-30">     
                <div className="ec-bl-block-content">
                  {/* steps start */}
                  <div className='pt-2 mb-5'>
                    <div  className='rounded' style={{width: '100%',backgroundColor:"#F8F4F4",padding:"20px" }}>
                      <div className="ec-sb-pro-sl-item p-2">                        
                        <div className="ec-pro-content text-start  ">
                          <h5 className="ec-pro-title classheadstyle mb-2  "style={{fontSize:"13px",fontWeight:700,lineHeight: "15px"}}>Step-1 :  Add Your iPhone</h5>                         
                          <ul className='ml-5 mb-3 '  >
                              <li  className='classchildstyle text-capitalize  '>• Select Your phone</li>
                              <li  className='classchildstyle text-capitalize '>• Select Storage</li>
                              <li  className='classchildstyle text-capitalize '>• Select condition</li>
                              <li  className='classchildstyle text-capitalize '>(You will be able to See the condition and its properties)</li>
                          </ul>
                          <h5 className="ec-pro-title classheadstyle mb-2 "style={{fontSize:"13px",fontWeight:700,lineHeight:"15px"}}>Step-2 :  Add Your Personal information</h5>                         
                          <ol className='ml-5 mb-3' >
                              <li  className='classchildstyle text-capitalize  '>• add your information</li>
                              <li  className='classchildstyle text-capitalize  '>• Sell Your iPhone</li>
                              <li  className='classchildstyle text-capitalize '>(Our Expert will contact you soon)</li>
                          </ol>
                        </div>                        
                      </div>
                    </div>
                    </div>
                  
                  {/* steps end */}
                <h1 className='classheadstyle'>Select Your iPhone</h1>
                <div className="ec-check-bill-form">
                  {/* cardrd start */}
                  <div className='row'>
                  {modelsname.length ? modelsname[0].model_name.split(',').map((itm,k)=>(
                   
                  
                  (products.filter(t=>t.model_name.toUpperCase().includes(itm.toUpperCase()))).length ? 
                    <div key={k} className="col-md-2 col-3 ec-product-content ">
                  <a href="#form_section">
                <div onClick={()=>setimodel(itm) & callstorage(itm) & seticondition('') & setistorage('')} className=" text-center p-2 card-product  " style={imodel ===itm ? {border:"4px solid red",flexDirection:"row"}:{}} >
                  
                  
                    <div className="m-auto ">
                      <p >
                        <img className="main-image objectimage " src={(products.filter(t=>t.model_name.toUpperCase().includes(itm.toUpperCase())))[0].images[0].image} alt="Product "   />           
                                            
                      </p>
                    </div>
                  
                  <div className="ec-pro-content ">
                    <div className="ec-pro-option">                    
                    </div>
                    <h5  className="ec-pro-title  "><p className="classchildstyle  " style={{fontSize: "10px"}}>{itm}</p></h5>                 
                  </div>
                </div>  </a>
                </div>
                :null            
              
              

              )) :null}
              </div>
                  {/* cardrd end */}
                  <div id="form_section" className=''>
                    <form action="#"  method="post"  style={{paddingTop:"50px"}}>
                    {/* <span className="ec-bill-wrap ">
                        <label>Select iphone *</label>
                        <span  className="ec-bl-select-inner">
                        <select onChange={(e)=>setimodel(e.target.value) & callstorage(e.target.value) & seticondition()}  className="ec-bill-select">
                            <option hidden >Select Your iPhone</option>
                            {modelsname.length ? modelsname[0].model_name.split(',').map((itm,k)=>(
                                <option key={k} value={itm}>{itm}</option>
                            )) :null}
                            
                           
                        </select>
                        </span>
                    </span> */}
                    {imodel? 
                    <span className="ec-bill-wrap ec-bill-half">
                        <label>Select Your Phone  Capacity *</label>
                        <span className="ec-bl-select-inner">
                        <select onChange={(e)=>setistorage(e.target.value ) & seticondition('')} value={istorage} className="form-select ">
                            <option hidden>Select Storage Capacity</option>
                            {storagelist.map((itm,k)=>(
                            <option key={k} value={itm}>{itm}</option>
                            ))}
                        </select>
                        </span>
                    </span>
                    :null}
                    {istorage ? 
                    <span className="ec-bill-wrap ec-bill-half">
                        <label>Select Your  Phone Condition *</label>
                        {/* {icondition} */}
                        <span className="ec-bl-select-inner">
                        <select onChange={(e)=>callconditionfn(e.target.value)} value={icondition ? icondition : ''} className="form-select  text-capitalize">
                            <option hidden>Select Condition</option>
                            {(selectedproduct.buyprice.split(',')).filter(name => name.includes(istorage)).map((itm,k) =>(
                            <option key={k} value={itm}>{itm.split('-')[1]}</option>
                            ))}
                           
                        </select>
                        </span>
                    </span>
                    :null}
                    </form>
                    </div>
                </div>
                </div>

                
              </div>
              
             
            </div>
          </div>
        {/* card start */}
        {icondition ? <>
        <div className="pt-5 m-auto card-width " aria-hidden="false" role="tabpanel" id="slick-slide100" ><div><li className="ec-test-item " style={{display: 'inline-block'}}>
      <div className="ec-test-inner ">
        <div className="ec-test-content pb-6">
        <h5 className="ec-pro-title text-capitalize classheadstyle fs-3 " >{icondition}</h5>
          <div className="ec-test-name classheadstyle">Price : <b>Upto ${iprice}</b></div>
          
          <div className='textstart'>
          <div className="ec-test-designation  text-center">Our expert will conduct a thorough condition assessment at the time of handover to ensure your iPhone is in the correct condition, and based on the evaluation, they will determine the final price.</div>
          <hr className='bg-secondary' />
          <div className="m-right ">
            <h5 className='text-center classheadstyle' style={{textDecoration:"underline"}}>Condition</h5 >
          <ul className='text-center '>
            
          {conditiondata ? conditiondata[0] ? conditiondata[0].description.split(',').map((itm,k)=>(
              <li key={k} className='classchildstyle text-capitalize'>{itm}</li>
          )):null :null}
 
          </ul>
          </div>                
          </div>
        </div>
      </div>
    </li></div></div> 
    </>:null}

          {/*cart content End */}
          
        </div>
        {/* Sidebar Area Start */}

        <div className="ec-checkout-rightside d-md-block d-none col-lg-4 col-md-12">
          <div className="ec-sidebar-wrap">
            {/* Sidebar Summary Block */}
            <div className="ec-sidebar-block">
             <div className="ml-6  ">
                  {conditions.map((itm,k)=>(
                    <div className='pt-2'key={k}>
                    <div  style={{width: '100%',backgroundColor:"#F8F4F4" }}>
                      <div className="ec-sb-pro-sl-item p-2">
                        
                        <div className="ec-pro-content text-center ">
                          <h5 className="ec-pro-title classheadstyle  ">{itm.condition}</h5>
                          
                          <ul className=''>
                            {itm.description.split(',').map((cond,c)=>(
                              <li key={c} className='classchildstyle text-capitalize '> {cond}</li>
                            ))}
                            
                            
                           
                          </ul>
                        </div>
                        
                      </div>
                    </div>
                    </div>
                  ))}
                  

                </div>
              <div className="ec-sb-block-content">
                <div className="ec-checkout-summary">
                 
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
                  
                </div>
                
              </div>
            </div>
            {/* Sidebar Summary Block */}
          </div>
         
          
          
        </div>
        {/* billing starts */}
        {icondition ? <>
        <div className="ec-checkout-wrap margin-bottom-30 padding-bottom-3">
                <div className="ec-checkout-block ec-check-bill">
                  <h3 className="ec-checkout-title pt-2">Please enter your personal Info</h3>
                  <div className="ec-bl-block-content">
                    
                    
                    <div className="ec-check-bill-form ">
                      <form onSubmit={(e)=>checkout(e)}>
                        
                        <span className="ec-bill-wrap ec-bill-half ">
                          <label>Name*</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,customer_name:e.target.value})} name="name" placeholder="Enter your name" required />
                        </span>
                        
                        {/* <span className="ec-bill-wrap ec-bill-half">
                          <label>Last Name*</label>
                          <input type="text" name="lastname" placeholder="Enter your last name" required />
                        </span> */}
                        <span className="ec-bill-wrap ec-bill-half">
                          <label>Address *</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,address:e.target.value})} required name="address" placeholder="Address Line 1" />
                        </span>
                        
                        <span className="ec-bill-wrap ec-bill-quarter">
                          <label>Email *</label>
                          <input type="email" onChange={(e)=> setcustomerdetails({...customerdetails,email:e.target.value})} required name="email" placeholder="email" /> 
                        </span>
                        <span className="ec-bill-wrap ec-bill-quarter">
                          <label>Contact *</label> 
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,contact:e.target.value})} required name="contact" placeholder="contact" />  
                        </span>
                        <span className="ec-bill-wrap ec-bill-quarter">
                          <label>Country *</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,country:e.target.value})} required name="Country" placeholder="Country" /> 
                        </span>
                        <span className="ec-bill-wrap ec-bill-quarter">
                          <label>Region State *</label> 
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,state:e.target.value})} required name="state" placeholder="Region State" />  
                        </span>
                        <span className="ec-bill-wrap ec-bill-quarter">
                          <label>City *</label>  
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,city:e.target.value})}  name="city" placeholder="City" required/>                    
                        </span>
                        <span className="ec-bill-wrap ec-bill-quarter">
                          <label>Post Code</label>
                          <input type="text" onChange={(e)=> setcustomerdetails({...customerdetails,postcode:e.target.value})}  name="postalcode" placeholder="Post Code" />
                        </span>
                       
                        <div className="ec-check-order-btn ml-auto " style={{paddingRight: "13px"}}>
                          <button className='btn btn-primary' type="submit" htmlFor="submit" >Sell Now</button>
                        </div>
                        
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              </>:null}
          {/* billing end */}
      </div>
    </div>
  </section>
</div>


  <Footer/>
    </div>
  )
}
