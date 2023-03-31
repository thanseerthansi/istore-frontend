import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Scripts from './Scripts'

export default function Aboutus() {
    useEffect(() => {
      window.scrollTo(0, 0);
      Scripts()
    }, [])
    
  return (
    <div>
        <Header/>
        <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
        <div className="container">
        <div className="row">
            <div className="col-12">
            <div className="row ec_breadcrumb_inner">
                <div className="col-md-6 col-sm-12">
                <h2 className="ec-breadcrumb-title">About Us</h2>
                </div>
                <div className="col-md-6 col-sm-12">
                {/* ec-breadcrumb-list start */}
                <ul className="ec-breadcrumb-list">
                    <li className="ec-breadcrumb-item"><Link to="/">Home </Link></li>
                    <li className="ec-breadcrumb-item active"><span> ></span>About Us</li>
                </ul>
                {/* ec-breadcrumb-list end */}
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    {/* content start  */}
    <section className="ec-page-content section-space-p">
  <div className="container">
    <div className="row">
      <div className="col-md-12 text-center">
        <div className="section-title">
          
          <h2 className="ec-title mb-5">ABOUT US</h2>
          {/* <p className="sub-title mb-3">About our business Firm</p> */}
        </div>
      </div>
      <div className="ec-common-wrapper">
        <div className="row">
          <div className="col-md-6 ec-cms-block ec-abcms-block text-center">
            <div className="ec-cms-block-inner">
              <img className="a-img" src="assets/images/offer-image/1.jpg" alt="about" />
            </div>
          </div>
          <div className="col-md-6 ec-cms-block ec-abcms-block text-center">
            <div className="ec-cms-block-inner">
              {/* <h3 className="ec-cms-block-title">What is the iPhone Sales?</h3> */}
              <p>Hassle-free and trustworthy</p>
              <p>Get smarter to own your dream iPhone.</p>
              <p>As a refurbished iPhone supplier, we strive to provide customers with high-quality and affordable pricing. Technology should be accessible to everyone without paying high prices for brand-new phones. Our team of experienced technicians inspects and refurbishes every iPhone carefully before it's sold to a customer, making sure that it's in great condition.</p>
              <p>We offer a platform for individuals to sell their old iPhones as well as a trusted source for customers looking to purchase refurbished iPhones. Your iPhone will be refurbished and given a new life when you sell it to us. You will receive a fair price for your device. Our team is dedicated to providing a hassle-free and trustworthy experience, regardless of whether you are looking to buy or sell an iPhone.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

    {/* content end  */}
        <Footer/>
    </div>
  )
}
