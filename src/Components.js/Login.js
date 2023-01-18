import React, { useEffect, useState } from 'react'
import Scripts from './Scripts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';
import Footer from './Footer';
import { Link, useNavigate } from 'react-router-dom';
import Callaxios from './Callaxios';

export default function Login() {
    const [username,setusername]=useState()
    const [password,setpassword]=useState()
    let navigate = useNavigate();
    useEffect(() => {
     Scripts()
    }, [])
    const notify = (msg) => toast.success(msg, {
        position: "top-center",
        });
    const notifyerror = (msg) => toast.error(msg, {
    position: "top-center",
    });
    const login=async(e)=>{
        e.preventDefault();
        try {
            let data = await Callaxios("post",'/api/token/',{"username":username,"password":password} )
            // console.log("data",data.data.access)
            if (data.status === 200){
                // console.log("pk")

                window.localStorage.setItem('email', username)
                window.localStorage.setItem('access_user', data.data.access)
                window.localStorage.setItem('refresh_user', data.data.refresh) 
                
                return navigate('/userprofile');
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
              <h2 className="ec-breadcrumb-title">Login</h2>
            </div>
            <div className="col-md-6 col-sm-12">
              {/* ec-breadcrumb-list start */}
              <ul className="ec-breadcrumb-list">
                <li className="ec-breadcrumb-item"><Link to="/">Home </Link></li>
                <li className="ec-breadcrumb-item active"><span> > </span> Login</li>
              </ul>
              {/* ec-breadcrumb-list end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Ec breadcrumb end */}
        <section className="ec-page-content section-space-p">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title">
                        {/* <h2 className="ec-bg-title">Log In</h2> */}
                        <h2 className="ec-title">Log In</h2>
                        <p className="sub-title mb-3">Best place to buy and sell iPhones </p>
                    </div>
                </div>
                <div className="ec-login-wrapper">
                    <div className="ec-login-container">
                        <div className="ec-login-form">
                            <form onSubmit={(e)=>login(e)}>
                                <span className="ec-login-wrap">
                                    <label>Email Address*</label>
                                    <input onChange={(e)=>setusername(e.target.value)} type="email" name="email" placeholder="Enter your email add..." required />
                                </span>
                                <span className="ec-login-wrap">
                                    <label>Password*</label>
                                    <input type="password" onChange={(e)=>setpassword(e.target.value)}  placeholder="Enter your password" required />
                                </span>
                                <span className="ec-login-wrap ec-login-fp">
                                    <label><Link to="/forgetpassword">Forgot Password?</Link></label>
                                </span>
                                <span className="ec-login-wrap ec-login-btn">
                                    <button className="btn btn-primary" type="submit">Login</button>
                                    <Link to="/register" className="btn btn-secondary">Register</Link>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <Footer/>
    </div>
  )
}
