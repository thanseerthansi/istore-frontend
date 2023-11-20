import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Callaxios from './Callaxios';

export default function Forgetpassword() {
    let navigate = useNavigate();
    const [email,setemail]=useState('')
    const [loading,setloading]=useState(false)
    const notify = (msg) => toast.success(msg, {
        position: "top-center",
        });
    const notifyerror = (msg) => toast.error(msg, {
    position: "top-center",
    });
    const sendmail=async(e)=>{
        e.preventDefault();
        setloading(true)
        // console.log("emil",email)
        try {
            let data = await Callaxios("post","user/sentmail/",{"email":email,"url":window.location.origin+'/passwordchange/'})
            // console.log("message sent",data)
            if (data.data.Status===200){
                
                notify("Mail Sented check your email")
                setemail('')
                // return navigate("/login")
            }else{
                // console.log("data")
                notifyerror(data.data.Message)
            }
        } catch (error) {
            console.log(error)
        }
        
        setloading(false)
    }
  return (
    <div>
        <ToastContainer/>
        <section className="ec-page-content section-space-p mt-10">
        <div className="container">
            <div className="row">
                <div className="col-md-12 text-center">
                    <div className="section-title">
                        {/* <h2 className="ec-bg-title">Log In</h2> */}
                        <h2 className="ec-title">Forget Password</h2>
                        <p className="sub-title mb-3">Best place to buy and sell iPhones </p>
                    </div>
                </div>
                <div className="ec-login-wrapper">
                    <div className="ec-login-container">
                        <div className="ec-login-form">
                            <form  onSubmit={(e)=>sendmail(e)}>
                                <span className="ec-login-wrap">
                                    <label>Email Address*</label>
                                    <input onChange={(e)=>setemail(e.target.value)} value={email} type="email" name="email" placeholder="Enter your email add..." required />
                                </span>
                                <span className="ec-login-wrap ec-login-btn ml-auto">
                                    {loading?
                                    <button className="btn btn-primary" type="button">Loading... </button>
                                    :
                                    <button className="btn btn-primary" type="submit">Send </button>
                                    }
                                    
                                    {/* <Link to="/register" className="btn btn-secondary">Register</Link> */}
                                </span>
                                <span className="ec-login-wrap ec-login-fp mt-2">
                                    <label>Remember Password ? <Link  to="/login"><span className='classheadstyle'>Sign in</span></Link></label>
                                </span>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    </div>
  )
}
