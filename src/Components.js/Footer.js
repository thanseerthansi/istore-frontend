import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Callaxios from './Callaxios'
import { useEffect } from 'react'

export default function Footer() {
  const [number,setnumber]=useState([])
  // console.log("numberrrrrrrr",number)
  useEffect(() => {
    getNumber()
  }, [])
  
  const getNumber =async()=>{
    try {
      let data = await Callaxios("get","banner/contact/")
      // console.log("contactdara",data)
      if (data.status===200){
        setnumber(data.data)
      }else{
          // notifyerror("Something Went Wrong")
      }
  } catch (error) {
      console.log(error)
  }

  }
  return (
    <div>
      {/*  services Section Start */}
  <section className="section ec-services-section">
    {/* <div className='text-start ml-4' ><h4 className='classheadstyle text-white'>Why iPhoneSales </h4></div> */}
    <h2 className="d-none">Services</h2>
    <div className="container">
      <div className="row">
        <div className="ec_ser_content ec_ser_content_1 col-sm-12 col-md-3">
          <div className="ec_ser_inner">
            <div className="ec-service-image">
              <img src="/assets/images/icons/service_5_1.svg"  className="svg_img" alt={''}/>
            </div>
            <div className="ec-service-desc">
              <h2>Free Shipping</h2>
              <p>Free shipping on all US orders</p>
            </div>
          </div>
        </div>
        
        <div className="ec_ser_content ec_ser_content_3 col-sm-12 col-md-3">
          <div className="ec_ser_inner">
            <div className="ec-service-image">
              <img src="/assets/images/icons/service_3.svg" className="svg_img" alt={''}/>
            </div>
            <div className="ec-service-desc">
              <h2>Online Support</h2>
              <p>24/7 Customer Support</p>
            </div>
          </div>
        </div>
        <div className="ec_ser_content ec_ser_content_2 col-sm-12 col-md-3">
          <div className="ec_ser_inner">
            <div className="ec-service-image">
              <img src="/assets/images/icons/service_2.svg" className="svg_img" alt={''}/>
            </div>
            <div className="ec-service-desc">
              <h2>Money Back Guarantee</h2>
              <p>30 days money back guarantee</p>
            </div>
          </div>
        </div>
        <div className="ec_ser_content ec_ser_content_4 col-sm-12 col-md-3">
          <div className="ec_ser_inner">
            <div className="ec-service-image">
              <img src="/assets/images/icons/service_5_4.svg" className="svg_img" alt={''}/>
            </div>
            <div className="ec-service-desc">
              <h2>Discounts</h2>
              <p>On orders over $120.00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/*services Section End */}
         {/* Footer Start */}
  <footer className="ec-footer">
    <div className="footer-container">
      <div className="footer-top section-space-footer-p">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-lg-4 ec-footer-contact">
              <div className="ec-footer-widget">
                <div className="ec-footer-logo"><a href="#"><img src="/assets/images/logo/logo.png " alt={''}/><img className="dark-footer-logo" src="assets/images/logo/dark-logo-5.png" alt="Site Logo" style={{display: 'none'}} /></a></div>
                <p>A trusted team for buying and selling your iPhones</p>
                <h4 className="ec-footer-heading">Ask Me questions</h4>
                <div className="ec-footer-links">
                  <ul className="align-items-center">
                    <li className="ec-footer-link">
                      <span className="call-img"><img src="/assets/images/icons/call_5.svg" className="svg_img foo_img" alt={''}/></span>
                      <span className="call-desc">
                        <span>Got questions? Call us 24/7!</span>
                        <span><a href={`tel:${number?.[0]?.contact??"+971 56 156 7594"}`}>{number?.[0]?.contact??"+971 56 156 7594"}</a></span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              {/* <div className="ec-footer-widget ec-footer-social">
                <h4 className="ec-footer-heading">Follow Us</h4>
                <div className="ec-footer-links">
                  <ul className="align-items-center">
                    <li className="list-inline-item"><a href="#"><i className="ecicon eci-facebook" /></a>
                    </li>
                    <li className="list-inline-item"><a href="#"><i className="ecicon eci-instagram" /></a></li>
                    <li className="list-inline-item"><a href="#"><i className="ecicon eci-linkedin" /></a>
                    </li>
                    <li className="list-inline-item"><a href="#"><i className="ecicon eci-twitter" /></a>
                    </li>
                  </ul>
                </div>
              </div> */}
            </div>
            <div className="col-sm-12 col-lg-2 ec-footer-info">
              <div className="ec-footer-widget">
                <h4 className="ec-footer-heading">Information</h4>
                <div className="ec-footer-links">
                  <ul className="align-items-center">
                    
                    <li className="ec-footer-link"><a target="_blank" href="https://www.freeprivacypolicy.com/live/fde03286-b72c-4d86-a4ec-6344337a0ee3">Policy &amp; policy </a></li>
                    <li className="ec-footer-link"><Link to="/terms&condition">Terms &amp; conditions</Link></li>
                    <li className="ec-footer-link"><Link to="/">Contact us</Link></li>
                    {/* <li className="ec-footer-link"><Link to="/">Returns</Link></li> */}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-2 ec-footer-account">
              <div className="ec-footer-widget">
                <h4 className="ec-footer-heading">Quick Links</h4>
                <div className="ec-footer-links">
                  <ul className="align-items-center">
                    {/* <li className="ec-footer-link"><Link to="/">Home</Link></li> */}
                    <li className="ec-footer-link"><Link to="/categoryproduct/iphone">Products</Link></li>
                    <li className="ec-footer-link"><Link to="/sellmyphone">Sell My iPhone</Link></li>
                    <li className="ec-footer-link"><Link to="/userprofile">Account</Link></li>
                    {/* <li className="ec-footer-link"><Link to="/aboutus">About Us</Link></li> */}
                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-lg-4 ec-footer-news">
              <div className="ec-footer-widget">
                <h4 className="ec-footer-heading">Follow Us</h4>
                <div className="ec-footer-links">
                  {/* <ul className="align-items-center">
                    <li className="ec-footer-link">Sign up for our e-mail to get latest news.</li>
                  </ul> */}
                  <div className="ec-subscribe-form">
                    <form id="ec-newsletter-form" name="ec-newsletter-form" method="post" action="#">
                      <div id="ec_news_signup" className="ec-form">
                        {/* <input className="ec-email" type="email" required placeholder="Enter your email" name="ec-email" defaultValue />
                        <button id="ec-news-btn" className="button btn-primary" type="submit" name="subscribe" value>subscribe</button> */}
                        <div className="ec-footer-links">
                          <ul className="align-items-center">
                            <li className="list-inline-item"><a target="_blank"  href="https://Facebook.com/zellstores"><i className="ecicon eci-facebook" /></a>
                            </li>
                            <li className="list-inline-item"><a target="_blank"  href="https://instagram.com/zellstores?igshid=OGQ5ZDc2ODk2ZA=="><i className="ecicon eci-instagram" /></a></li>
                            {/* <li className="list-inline-item"><Link to="/"><i className="ecicon eci-linkedin" /></Link>
                            </li>
                            <li className="list-inline-item"><Link to="/"><i className="ecicon eci-twitter" /></Link>
                            </li> */}
                          </ul>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              {/* <div className="ec-footer-widget ec-share">
                <ul>
                  <li className="ec-share-link"><a href="#"><img src="/assets/images/icons/iphone.png" alt={''}/></a></li>
                  <li className="ec-share-link"><a href="#"><img src="/assets/images/icons/google.png" alt={''}/></a></li>
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <div className="row align-items-center">
            {/* Footer Copyright Start */}
            <div className="col footer-copy">
              <div className="footer-bottom-copy ">
                <div className="ec-copy">© 2023 <Link className="site-name" to="/">ZELL</Link>. All Rights Reserved
                </div>
              </div>
            </div>
            {/* Footer Copyright End */}
            {/* Footer payment */}
            <div className="col footer-bottom-right">
              <div className="footer-bottom-payment d-flex justify-content-end">
                <div className="payment-link">
                  <img src="/assets/images/icons/payment.png" alt={''}/>
                </div>
              </div>
            </div>
            {/* Footer payment */}
          </div>
        </div>
      </div>
    </div>
  </footer>
  {/* Footer Area End */}
  {/* chat end */}
    </div>
  )
}
