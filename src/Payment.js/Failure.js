import React from 'react'
import Header from '../Components.js/Header'
import Footer from '../Components.js/Footer'

export default function Failure() {
  return (
    <div>
        <Header/>
         <div>
      <div className=''>
        <div className='row padd text-center m-10' >
          <h1>Failed</h1>
          <h4>Sorry The Transaction Not completed</h4>
        </div>       
      </div>
    </div>
    <Footer/>
    </div>
  )
}
