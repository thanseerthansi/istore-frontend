import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scripts from './Scripts';
import { Simplecontext } from './Simplecontext';
import Footer from './Footer';
import Callaxios from './Callaxios';
export default function Userprofile() {
    const {accesscheck,logoutf} =useContext(Simplecontext)
    const [userdata,setuserdata]=useState([])
    const [email,setemail]=useState('')
    const [contact,setcontact]=useState('')
    const [password,setpassword]=useState('')
    const [userid,setuserid]=useState('')
    useEffect(() => {
      window.scrollTo(0, 0);
        Scripts()
        accesscheck()
        getuser()
      }, [])
      const notify = (msg) => toast.success(msg, {
        position: "top-center",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-center",
      });
    const getuser=async()=>{
      try {
        let emailid = window.localStorage.getItem('email')
        // console.log("emua",emailid)
        if (emailid){
        let data = await Callaxios("get",'user/user/',{email:emailid}) 
        // console.log("data",data)
        if(data.status===200){
          setuserdata(data.data)
          setemail(data.data[0].email)
          setcontact(data.data[0].contact)
          setuserid(data.data[0].id)
        }
    }
      } catch (error) {
        
      }
      
    }
    const edituserfn =async(e)=>{
      e.preventDefault();
      try {
        let data = await Callaxios("post","user/user/",{"id":userid,"username":email,"email":email,"contact":contact,"oldpassword":password})
        console.log("data",data)
        if(data.data.Status===200){
          notify('Updated Successfully')
          setemail(email)
          setcontact(contact)
          setpassword('')
          getuser()
        }else{
          notifyerror("Something Went wrong")
        }
      } catch (error) {
        
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
                    <li><a onClick={()=>logoutf()} >Logout</a></li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="ec-shop-rightside col-lg-9 col-md-12">
            <div className="ec-vendor-dashboard-card ec-vendor-setting-card">
            <div className="ec-vendor-card-body">
                <div className="row">
                <div className="col-md-12">
                    <div className="ec-vendor-block-profile">
                    
                    <h5>Account Information</h5>
                    <div className="row">
                        <div className="col-md-12 col-sm-12">
                        <div className="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                            <h6>E-mail address <a href="/" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="assets/images/icons/edit.svg" className="svg_img pro_svg" alt="edit" /></a></h6>
                            <ul>
                            <li><strong>Email : </strong>{window.localStorage.getItem('email')}</li>
                            <li><strong>Contact : </strong>{userdata.length ?  userdata[0].contact : null}</li>
                            </ul>
                        </div>
                        </div>
                        
                      
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>

    {/* content end */}
    <Footer/>
    {/* model start */}
 {/* Modal */}
<div className="modal fade" id="edit_modal" tabIndex={-1} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-body">
        <div className="row">
          <div className="ec-vendor-block-img space-bottom-30">
            
           
            <div className="ec-vendor-upload-detail">
              <form onSubmit={(e)=>edituserfn(e)} className="row g-3">
               
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Email id </label>
                  <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" className="form-control" />
                </div>
                
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Phone number </label>
                  <input onChange={(e)=>setcontact(e.target.value)} value={contact} type="text" className="form-control" />
                </div>
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Password </label>
                  <input onChange={(e)=>setpassword(e.target.value)}  value={password} type="password" className="form-control" />
                </div>
                
                <div className="col-md-12 space-t-15 pt-2">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <a href="#" className="btn btn-lg btn-secondary qty_close" data-bs-dismiss="modal" aria-label="Close">Close</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Modal end */}

    {/* model end */}
    </div>
    )
}
