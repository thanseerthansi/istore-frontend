import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scripts from './Scripts';
import { Simplecontext } from './Simplecontext';
import Footer from './Footer';
import Callaxios from './Callaxios';
import { BaseURLwithout } from './urlcall';
// import ReactWhatsapp from 'react-whatsapp';

export default function Orders() {
    const [orderproduct,setorderproduct]= useState('')
    const [orders,setorders]= useState([])
    const [nextorder,setnextorder]=useState('')
    const {accesscheck,logoutf} =useContext(Simplecontext)
    useEffect(() => {
      window.scrollTo(0, 0);
        Scripts()
        accesscheck()
        getorders()
      }, [])
      const notify = (msg) => toast.success(msg, {
        position: "top-center",
        });
      const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
      const getorders=async()=>{
        try {
            accesscheck()
            let emailid = window.localStorage.getItem('email')
            if (emailid){
                let data = await Callaxios("get","purchase/order/",{'email':emailid})
                // console.log("data",data)
                if (data.status===200){
                    
                    setorders(data.data.results)
                    setnextorder(data.data.next)
                }else{
                    // notifyerror()
                }
            }else{console.log("no email found ")}
        } catch (error) {
            
        }
        
    }
    const getnextorders=async()=>{
        accesscheck()
        let data = await Callaxios("next",nextorder)
        if (data.status===200){
            // console.log("statusdata",data)
            setnextorder(data.data.next)
            setorders(orders=>[...orders,...data.data.results])
        }else{
            notifyerror("Something went wrong ")
        }
    }
    const getorderproduct=async(order_id)=>{ 
        accesscheck()
        let data = await Callaxios("get","purchase/orderedproduct/",{"order_id":order_id})
        // console.log("dataorderproductasfsdfsf",data.data)
        if (data.status===200){
            // console.log("orderproduct", data.data[0].product[0].images[0].image)
            // console.log("statusdata",data.data[0].product)
            setorderproduct(data.data)   
            
        }else{
            
        }
    }
    const whatsappchat=(id,orderid,date)=>{
      // console.log("ok")
      // let isMobileDevice = window.matchMedia("only screen and (max-width: 760px)").matches;
      // if(isMobileDevice){
      // console.log("sdf")
      let url = `https://web.whatsapp.com/send?phone="917034114744"&text= I have got wrong product from your website .want to return  this product -ID${id} in Order-${"SN"+date.split('T')[1].split('.')[1]+orderid}`;
      window.open(url);
      // }
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
          <h2 className="ec-breadcrumb-title">User Profile</h2>
        </div>
        <div className="col-md-6 col-sm-12">
          {/* ec-breadcrumb-list start */}
          <ul className="ec-breadcrumb-list">
            <li className="ec-breadcrumb-item"><Link to="/">Home ></Link></li>
            <li className="ec-breadcrumb-item active"><span>  </span>Profile</li>
          </ul>
          {/* ec-breadcrumb-list end */}
        </div>
      </div>
    </div>
  </div>
</div>
 </div>
{/* Ec breadcrumb end */}
{/* content start */}
<section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
<div className="container">
    <div className="row">
    {/* Sidebar Area Start */}
    <div className="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
        <div className="ec-sidebar-wrap">
        {/* Sidebar Category Block */}
        <div className="ec-sidebar-block">
            <div className="ec-vendor-block">
            {/* <div class="ec-vendor-block-bg"></div>
                        <div class="ec-vendor-block-detail">
                            <img class="v-img" src="assets/images/user/1.jpg" alt="vendor image">
                            <h5>Mariana Johns</h5>
                        </div> */}
            <div className="ec-vendor-block-items">
                <ul>
                <li><Link to="/userprofile">User Profile</Link></li>
                <li><Link to="/orders">Orders</Link></li>
                <li><Link to="/selled">Sells</Link></li>
                <li><Link onClick={()=>logoutf()} >Logout</Link></li>
                
                
                </ul>
            </div>
            </div>
        </div>
        </div>
    </div>
    {/* orders start */}
    <div className="ec-shop-rightside col-lg-9 col-md-12">
  <div className="ec-vendor-dashboard-card">
    <div className="ec-vendor-card-header">
      <h5>Order History</h5>
      
    </div>
    <div className="ec-vendor-card-body overflow-auto">
      <div className="ec-vendor-card-table">
        <table className="table ec-table overflow-auto">
          <thead>
            <tr>
              <th scope="col">SN.ID</th>
             
              <th scope="col">Name</th>
              <th scope="col">Date</th>
              <th scope="col">Price</th>
              <th scope="col">Status</th>
              <th scope="col">Products</th>
            </tr>
          </thead>
          <tbody>
            {orders.length? orders.map((itm,k)=>(
                <tr key={k}>
                <th scope="row"><span>SN{itm.created_date.split('T')[1].split('.')[1]}{itm.id}</span></th>
               
                <td><span>{itm.customer_name}</span></td>
                <td><span>{itm.created_date.split("T")[0]}</span></td>
                <td><span>${itm.total_price}</span></td>
                <td><span>{itm.status[0].status}</span></td>
                <td><span className="tbl-btn"><Link onClick={()=>getorderproduct(itm.id)} className="btn btn-lg btn-primary" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal">View</Link></span></td>
              </tr>
            )):null}
            
            
            
          </tbody>
        </table>
      </div>
      {nextorder ?
      <div className='text-end mr-10'><span onClick={()=>getnextorders()} className='text-primary cursor-pointer bold text-decoration-underline' style={{cursor :"pointer"}}>See more</span></div>
        :null}
      </div>
  </div>
</div>

    {/* orders end */}
    </div>
</div>
</section>

{/* content end */}
<Footer/>
{/* Modal */}
<div className="modal fade" id="edit_modal" tabIndex={-1} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-body">
        <div className="row">
          <div className="ec-vendor-block-img space-bottom-30">
            
           
            <div className="ec-vendor-upload-detail">
            <table className="table ec-table">
          <thead>
            <tr>
                <th scope="col">Phone</th>
                <th scope="col">Image</th>
                <th scope="col">Condition</th>
                <th scope="col">Price</th>
                <th scope="col">status</th>
                <th scope="col">Return</th>
                
            </tr>
          </thead>
          <tbody>
            {orderproduct ? orderproduct.map((itm,k)=>(
                <tr key={k}>
                <th scope="row"><span>{itm.product[0].title}</span></th>
                <td><img className="prod-img" src={BaseURLwithout+itm.product[0].images[0].image} alt="product " height={50}  /></td>
                <td><span>{itm.condition}</span></td>
                <td><span>${itm.price}</span></td>
                <td><span>{itm.status[0].status}</span></td>
                <td>
                <span className="tbl-btn"><Link onClick={()=>whatsappchat(itm.id,itm.order_id[0].id,itm.order_id[0].created_date)} className="btn btn-lg btn-primary">Return</Link></span>
                </td>
                
                
              </tr>
            )):null}
            
            
            
          </tbody>
        </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Modal end */}
</div>
  )
}
