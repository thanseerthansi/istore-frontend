import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Scripts from './Scripts'

export default function Aboutus() {
    useEffect(() => {
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
          
          <h2 className="ec-title">About Us</h2>
          <p className="sub-title mb-3">About our business Firm</p>
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
              <h3 className="ec-cms-block-title">What is the iPhone Sales?</h3>
              <p>Electronic typesetting text of the printing and typesetting industry. when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. Lorem Ipsum is
                simply dutmmy text ever since the 1500s, It has survived not only,
                but also the leap into electronic typesetting.</p>
              <p>Lorem Ipsum is simply dummy text of the printing. It has survived not only five centuries,
                but also the leap into electronic typesetting.</p>
              <p>Also the leap into electronic typesetting printing and typesetting industry. It has survived not only five centuries,
                but also the leap into electronic typesetting, when an unknown printer took a galley of type
                and scrambled it to make a type specimen book. It has survived not only five centuries,
                but also the leap into electronic typesetting, remaining essentially unchanged.</p>
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
