import React, { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Callaxios from './Callaxios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Passwordchange() {
    const [password,setpassword]=useState('')
    const [password1,setpassword1]=useState('')
    let navigate = useNavigate();
    const  urlparam  = useParams()
    const notifyerror = (msg) => toast.error(msg, {
        position: "top-center",
        });
    let urlid = urlparam.id
    const changepasswordfnctn = async(e)=>{
        e.preventDefault();
        if(password === password1){
            try {
                let data = await Callaxios("post",'user/passwordchange/',{id:urlid,password:password})
                // console.log("data",data)
                if(data.data.Status===200){
                    return navigate("/login")
                }else{
                    notifyerror(data.data.Message)
                }
            } catch (error) {
                
            }
        }else{
            notifyerror("Password not same")
        }
        
        

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
                        <h2 className="ec-title">Change Password</h2>
                        <p className="sub-title mb-3">Best place to buy and sell iPhones </p>
                    </div>
                </div>
                <div className="ec-login-wrapper">
                    <div className="ec-login-container">
                        <div className="ec-login-form">
                            <form onSubmit={(e)=>changepasswordfnctn(e)} >
                                <span className="ec-login-wrap">
                                    <label>Password*</label>
                                    <input required onChange={(e)=>setpassword(e.target.value)} type="password" name="password" placeholder="Enter your new password" required />
                                </span>
                                <span className="ec-login-wrap">
                                    <label>Re-enter Password *</label>
                                    <input required onChange={(e)=>setpassword1(e.target.value)} type="password" name="password" placeholder="Re-enter your new password" required />
                                </span>
                                <span className="ec-login-wrap ec-login-btn ml-auto">
                                    <button className="btn btn-primary" type="submit">Reset</button>
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
