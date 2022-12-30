import React, {useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Simplecontext } from './Simplecontext';

export default function Header() {
  const {modelsname} =useContext(Simplecontext)
    // const [showcart,setshowcart]=useState(false)
    const [viewcart,setviewcart]=useState([]);
    useEffect(() => {
      cartfunction()
    }, [])
    
    const cartfunction=()=>{
      let orderlist = window.localStorage.getItem('cart')
      
      // console.log("orderlis3",JSON.parse(orderlist))
      try {
        if (orderlist.length){
          // console.log("listpresent")
          setviewcart(JSON.parse(orderlist))  
        }else{}      
      } catch (error) {} 
    }
    const decrementhandler =(k,itm)=>{
      if (itm.quantity!==1){
        // console.log("kkquantity",itm.quantity)
        // console.log("itmprice",itm.price)
        let value = parseFloat(itm.price)/parseFloat(itm.quantity)
        // console.log("don",value)
        let cart = viewcart
        cart[k].quantity = parseFloat(itm.quantity)-1
        cart[k].price = parseFloat(itm.price) - parseFloat(value)
        setviewcart(()=>[...cart]);
        // console.log("vviewcart",viewcart)
        window.localStorage.setItem('cart',JSON.stringify(viewcart))
        
      }
    }

    const incrementhandler =(k,itm)=>{
      if (itm.quantity!==10){
        let value = parseFloat(itm.price)/parseFloat(itm.quantity)
        let cart = viewcart
        cart[k].quantity = parseFloat(itm.quantity)+1
        cart[k].price = parseFloat(itm.price) + parseFloat(value)
        setviewcart(()=>[...cart]);
        // console.log("vviewcart",viewcart)
        window.localStorage.setItem('cart',JSON.stringify(viewcart))
      }
    }
    const deletefromcartfunction =(k)=>{
      // console.log("kk",k)
      // console.log("kk",k.k)
      const splc = viewcart
      // console.log("splc",splc) 
      splc.splice(k,1)
      setviewcart(() => [ ...splc]);
      // setviewcart(splc);
      window.localStorage.setItem('cart', viewcart)  
    }
    return (
    <div>
      {/* Header start  */}
  <header className="ec-header">
    {/*Ec Header Top Start */}
    <div className="header-top">
      <div className="container">
        <div className="row align-items-center">
          {/* Header Top phone Start */}
          <div className="col header-top-left">
            {/* Social Start */}
            <div className="header-top-social">
              <ul className="mb-0">
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-facebook" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-instagram" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-linkedin" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-twitter" /></a></li>
              </ul>
            </div>
            {/* Social End */}
          </div>
          {/* Header Top phone End */}
          {/* Header Top call Start */}
          <div className="col header-top-center">
            {/* Language Start */}
            <div className="header-top-lan-curr header-top-lan dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">English <i className="ecicon eci-angle-down" aria-hidden="true" /></button>
              <ul className="dropdown-menu">
                <li className="active"><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Italiano</a></li>
              </ul>
            </div>
            {/* Language End */}
            {/* Currency Start */}
            <div className="header-top-lan-curr header-top-curr dropdown">
              <button className="dropdown-toggle" data-bs-toggle="dropdown">USD <i className="ecicon eci-angle-down" aria-hidden="true" /></button>
              <ul className="dropdown-menu">
                <li className="active"><a className="dropdown-item" href="#">USD $</a></li>
                <li><a className="dropdown-item" href="#">EUR €</a></li>
              </ul>
            </div>
            {/* Currency End */}
          </div>
          {/* Header Top call End */}
          {/* Header Top Language Currency */}
          <div className="col header-top-right d-none d-lg-block">
            <div className="header-top-right-inner d-flex justify-content-end">
              {/* Header User Start */}
              <div className="ec-header-user dropdown">
                <button className="dropdown-toggle" data-bs-toggle="dropdown"><img src="/assets/images/icons/user_5.svg" className="svg_img top_svg" alt={''}/><span className="ec-btn-title">Login</span></button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a className="dropdown-item" href="register.html">Register</a></li>
                  <li><a className="dropdown-item" href="checkout.html">Checkout</a></li>
                  <li><a className="dropdown-item" href="login.html">Login</a></li>
                </ul>
              </div>
              {/* Header User End */}
              {/* Header wishlist Start */}
              <div className="ec-header-wishlist">
                <a href="#">
                  <div className="top-icon"><img src="/assets/images/icons/pro_wishlist.svg" className="svg_img top_svg" alt={''}/></div>
                  <span className="ec-btn-title">wishlist</span>
                </a>
              </div>
            </div>
          </div>
          {/* Header Top Language Currency */}
          {/* Header Top responsive Action */}
          <div className="col header-top-res d-lg-none">
            <div className="ec-header-bottons">
              {/* Header User Start */}
              <div className="ec-header-user dropdown">
                <button className="dropdown-toggle" data-bs-toggle="dropdown"><img src="/assets/images/icons/user_5.svg" className="svg_img header_svg" alt={''}/></button>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li><a className="dropdown-item" href="register.html">Register</a></li>
                  <li><a className="dropdown-item" href="checkout.html">Checkout</a></li>
                  <li><a className="dropdown-item" href="login.html">Login</a></li>
                </ul>
              </div>
              {/* Header User End */}
              {/* Header Cart Start */}
              <a href="#" className="ec-header-btn ec-header-wishlist">
                <div className="header-icon"><img src="/assets/images/icons/wishlist.svg" className="svg_img header_svg" alt={''}/></div>
                <span className="ec-header-count ec-wishlist-count">0</span>
              </a>
              {/* Header Cart End */}
              {/* Header Cart Start */}
              <a href="#ec-side-cart" className="ec-header-btn ec-side-toggle">
                <div className="header-icon"><img src="/assets/images/icons/cart_5.svg" className="svg_img header_svg" alt={''}/></div>
                <span className="ec-header-count ec-cart-count">3</span>
              </a>
              {/* Header Cart End */}
              {/* Header menu Start */}
              <a href="#ec-mobile-menu" className="ec-header-btn ec-side-toggle d-lg-none">
                <i className="ecicon eci-bars" />
              </a>
              {/* Header menu End */}
            </div>
          </div>
          {/* Header Top responsive Action */}
        </div>
      </div>
    </div>
    {/* Ec Header Top  End */}
    {/* Ec Header Bottom  Start */}
    <div className="ec-header-bottom d-none d-lg-block">
      <div className="container position-relative">
        <div className="row">
          <div className="ec-flex">
            {/* Ec Header Logo Start */}
            <div className="align-self-center ec-header-logo ">
              <div className="header-logo">
                <a href="index.html"><img src="/assets/images/logo/logo-5.png" alt="Site Logo" /><img className="dark-logo" src="/assets/images/logo/dark-logo-5.png" alt="Site Logo" style={{display: 'none'}} /></a>
              </div>
            </div>
            {/* Ec Header Logo End */}
            {/* Ec Header Search Start */}
            <div className="align-self-center d-none ec-header-search">
              <div className="header-search">
                <form className="ec-search-group-form" action="#">
                  <div className="ec-search-select-inner">
                    <div className="ec-search-cat-title">All</div>
                    <ul className="ec-search-cat-block">
                      <li><a href="#">Cloths</a></li>
                      <li><a href="#">Bag</a></li>
                      <li><a href="#">Shoes</a></li>
                    </ul>
                  </div>
                  <input className="form-control" placeholder="Search Here..." type="text" />
                  <button className="search_submit" type="submit"><i className="ecicon eci-search" /></button>
                </form>
              </div>
            </div>
            {/* Ec Header Search End */}
            {/* Ec Header Button Start */}
            <div className="align-self-center ec-header-bottons">
              <div className="ec-header-bottons">
                {/* Header wishlist End */}
                {/* Header Cart Start */}
                <a href="#ec-side-cart" onClick={()=>cartfunction()} className="ec-header-btn ec-side-toggle">
                  <div className="header-icon"><img src="/assets/images/icons/cart_5.svg" className="svg_img header_svg" alt={''}/></div>
                  <span className="ec-btn-title"><span className="ec-cart-count"></span> Cart</span>
                </a>
                {/* Header Cart End */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Ec Header Button End */}
    {/* Header responsive Bottom  Start */}
    <div className="ec-header-bottom d-lg-none">
      <div className="container position-relative">
        <div className="row ">
          {/* Ec Header Logo Start */}
          <div className="col">
            <div className="header-logo">
              <a href="index.html"><img src="/assets/images/logo/logo-5.png" alt="Site Logo" /><img className="dark-logo" src="/assets/images/logo/dark-logo-5.png" alt="Site Logo" style={{display: 'none'}} /></a>
            </div>
          </div>
          {/* Ec Header Logo End */}
          {/* Ec Header Search Start */}
          <div className="col align-self-center ec-header-search">
            <div className="header-search">
              <form className="ec-search-group-form" action="#">
                <div className="ec-search-select-inner">
                  <div className="ec-search-cat-title">All</div>
                  <ul className="ec-search-cat-block">
                    <li><a href="#">Cloths</a></li>
                    <li><a href="#">Bag</a></li>
                    <li><a href="#">Shoes</a></li>
                  </ul>
                </div>
                <input className="form-control" placeholder="Search Here..." type="text" />
                <button className="search_submit" type="submit"><i className="ecicon eci-search" /></button>
              </form>
            </div>
          </div>
          {/* Ec Header Search End */}
        </div>
      </div>
    </div>
    {/* Header responsive Bottom  End */}
    {/* EC Main Menu Start */}
    <div id="ec-main-menu-desk" className="sticky-nav">
      <div className="container position-relative">
        <div className="row">
          <div className="col ec-category-block">
            <div className="ec-cat-menu">
              <div className="ec-category-toggle">
                <span className="ec-category-icon" />
                <span className="ec-category-title">all categories</span>
              </div>
              <div className="ec-category-content">
                <div id="ec-category-menu" className="ec-category-menu">
                  <ul className="ec-category-wrapper">
                  <li><Link className="ec-cat-menu-link text-uppercase" to={`/categoryproduct/iphone`}>ALL PRODUCTS</Link></li>
                    {modelsname.length ? modelsname.map((itm,k)=>(                    
                    <li key={k}><Link className="ec-cat-menu-link text-uppercase" to={`/categoryproduct/${itm.model_name}`}>{itm.model_name}</Link></li>
                    )):null}
                    {/* <li><a className="ec-cat-menu-link" href="#">Electronics &amp; Digital</a></li>
                    <li><a className="ec-cat-menu-link" href="#">Home Accessories</a></li>
                    <li><a className="ec-cat-menu-link" href="#">Electronics</a></li>
                    <li><a className="ec-cat-menu-link" href="#">Office Furniture</a></li>
                    <li><a className="ec-cat-menu-link" href="#">Hotel Furniture</a></li> */}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="col ec-main-menu-block align-self-center d-none d-lg-block p-0">
            <div className="ec-main-menu">
              <ul>
                <li className="dropdown"><Link to="/">Home</Link>
                  
                </li>
                <li className="dropdown position-static"><a href="/">Categories</a>
                  <ul className="mega-menu d-block">
                    <li className="d-flex">
                      <ul className="d-block">
                        <li className="menu_title"><a href="/">Classic</a></li>
                        <li><a href="shop-left-sidebar-col-3.html">Left sidebar 3 column</a>
                        </li>
                        <li><a href="shop-left-sidebar-col-4.html">Left sidebar 4 column</a>
                        </li>
                        <li><a href="shop-right-sidebar-col-3.html">Right sidebar 3 column</a>
                        </li>
                        <li><a href="shop-right-sidebar-col-4.html">Right sidebar 4 column</a>
                        </li>
                        <li><a href="shop-full-width.html">Full width 4 column</a></li>
                      </ul>
                      <ul className="d-block">
                        <li className="menu_title"><a href="/">Banner</a></li>
                        <li><a href="shop-banner-left-sidebar-col-3.html">left sidebar 3
                            column</a></li>
                        <li><a href="shop-banner-left-sidebar-col-4.html">left sidebar 4
                            column</a></li>
                        <li><a href="shop-banner-right-sidebar-col-3.html">right sidebar
                            3 column</a></li>
                        <li><a href="shop-banner-right-sidebar-col-4.html">right sidebar
                            4 column</a></li>
                        <li><a href="shop-banner-full-width.html">Full width 4 column</a>
                        </li>
                      </ul>
                      <ul className="d-block">
                        <li className="menu_title"><a href="/">Columns</a></li>
                        <li><a href="shop-full-width-col-3.html">3 Columns full width</a></li>
                        <li><a href="shop-full-width-col-4.html">4 Columns full width</a></li>
                        <li><a href="shop-full-width-col-5.html">5 Columns full width</a></li>
                        <li><a href="shop-full-width-col-6.html">6 Columns full width</a></li>
                        <li><a href="shop-banner-full-width-col-3.html">Banner 3 Columns</a>
                        </li>
                      </ul>
                      <ul className="d-block">
                        <li className="menu_title"><a href="/">List</a>
                        </li>
                        <li><a href="shop-list-left-sidebar.html">Shop left sidebar</a></li>
                        <li><a href="shop-list-right-sidebar.html">Shop right sidebar</a></li>
                        <li><a href="shop-list-banner-left-sidebar.html">Banner left sidebar</a>
                        </li>
                        <li><a href="shop-list-banner-right-sidebar.html">Banner right
                            sidebar</a></li>
                        <li><a href="shop-list-full-col-2.html">Full width 2 columns</a></li>
                      </ul>
                    </li>
                    <li>
                      <ul className="ec-main-banner w-100">
                        <li><a className="p-0" href="shop-left-sidebar-col-3.html"><img className="img-responsive" src="/assets/images/menu-banner/1.jpg" alt={''}/></a></li>
                        <li><a className="p-0" href="shop-left-sidebar-col-4.html"><img className="img-responsive" src="/assets/images/menu-banner/2.jpg" alt={''}/></a></li>
                        <li><a className="p-0" href="shop-right-sidebar-col-3.html"><img className="img-responsive" src="/assets/images/menu-banner/3.jpg" alt={''}/></a></li>
                        <li><a className="p-0" href="shop-right-sidebar-col-4.html"><img className="img-responsive" src="/assets/images/menu-banner/4.jpg" alt={''}/></a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="dropdown"><Link to="/sellmyphone">Sell My iPhone</Link>
                 
                </li>
                <li className="dropdown"><a href="/">About Us</a>
                  
                </li>
              </ul>
            </div>
          </div>
          <div className="col ec-spe-offer-block">
            <div className="ec-spe-offer-link">
              <Link to="/" className="ec-spe-offer-title">Special offer</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    {/* Ec Main Menu End */}
    {/* Ekka Menu Start */}
    <div id="ec-mobile-menu" className="ec-side-cart ec-mobile-menu">
      <div className="ec-menu-title">
        <span className="menu_title">My Menu</span>
        <button className="ec-close">×</button>
      </div>
      <div className="ec-menu-inner">
        <div className="ec-menu-content">
          <ul>
            <li><a href="/">Home</a>
              
            </li>
            <li><a href="/">Categories</a>
              <ul className="sub-menu">
                <li>
                  <a href="/">Classic Variation</a>
                  <ul className="sub-menu">
                    <li><a href="shop-left-sidebar-col-3.html">Left sidebar 3 column</a></li>
                    <li><a href="shop-left-sidebar-col-4.html">Left sidebar 4 column</a></li>
                    <li><a href="shop-right-sidebar-col-3.html">Right sidebar 3 column</a></li>
                    <li><a href="shop-right-sidebar-col-4.html">Right sidebar 4 column</a></li>
                    <li><a href="shop-full-width.html">Full width 4 column</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/">Classic Variation</a>
                  <ul className="sub-menu">
                    <li><a href="shop-banner-left-sidebar-col-3.html">Banner left sidebar 3
                        column</a></li>
                    <li><a href="shop-banner-left-sidebar-col-4.html">Banner left sidebar 4
                        column</a></li>
                    <li><a href="shop-banner-right-sidebar-col-3.html">Banner right sidebar 3
                        column</a></li>
                    <li><a href="shop-banner-right-sidebar-col-4.html">Banner right sidebar 4
                        column</a></li>
                    <li><a href="shop-banner-full-width.html">Banner Full width 4 column</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/">Columns Variation</a>
                  <ul className="sub-menu">
                    <li><a href="shop-full-width-col-3.html">3 Columns full width</a></li>
                    <li><a href="shop-full-width-col-4.html">4 Columns full width</a></li>
                    <li><a href="shop-full-width-col-5.html">5 Columns full width</a></li>
                    <li><a href="shop-full-width-col-6.html">6 Columns full width</a></li>
                    <li><a href="shop-banner-full-width-col-3.html">Banner 3 Columns</a></li>
                  </ul>
                </li>
                <li>
                  <a href="/">List Variation</a>
                  <ul className="sub-menu">
                    <li><a href="shop-list-left-sidebar.html">Shop left sidebar</a></li>
                    <li><a href="shop-list-right-sidebar.html">Shop right sidebar</a></li>
                    <li><a href="shop-list-banner-left-sidebar.html">Banner left sidebar</a></li>
                    <li><a href="shop-list-banner-right-sidebar.html">Banner right sidebar</a></li>
                    <li><a href="shop-list-full-col-2.html">Full width 2 columns</a></li>
                  </ul>
                </li>
                <li><a className="p-0" href="shop-left-sidebar-col-3.html"><img className="img-responsive" src="/assets/images/menu-banner/1.jpg" alt={''}/></a>
                </li>
              </ul>
            </li>
            <li><a href="/">Products</a>
              <ul className="sub-menu">
                <li><a href="/">Product page</a>
                  <ul className="sub-menu">
                    <li><a href="product-left-sidebar.html">Product left sidebar</a></li>
                    <li><a href="product-right-sidebar.html">Product right sidebar</a></li>
                  </ul>
                </li>
                <li><a href="/">Product 360</a>
                  <ul className="sub-menu">
                    <li><a href="product-360-left-sidebar.html">360 left sidebar</a></li>
                    <li><a href="product-360-right-sidebar.html">360 right sidebar</a></li>
                  </ul>
                </li>
                <li><a href="/">Product vodeo</a>
                  <ul className="sub-menu">
                    <li><a href="product-video-left-sidebar.html">vodeo left sidebar</a></li>
                    <li><a href="product-video-right-sidebar.html">vodeo right sidebar</a></li>
                  </ul>
                </li>
                <li><a href="/">Product gallery</a>
                  <ul className="sub-menu">
                    <li><a href="product-gallery-left-sidebar.html">Gallery left sidebar</a></li>
                    <li><a href="product-gallery-right-sidebar.html">Gallery right sidebar</a></li>
                  </ul>
                </li>
                <li><a href="product-full-width.html">Product full width</a></li>
                <li><a href="product-360-full-width.html">360 full width</a></li>
                <li><a href="product-video-full-width.html">Video full width</a></li>
                <li><a href="product-gallery-full-width.html">Gallery full width</a></li>
              </ul>
            </li>
            <li><a href="/">Others</a>
              <ul className="sub-menu">
                <li><a href="/">Mail Confirmation</a>
                  <ul className="sub-menu">
                    <li><a href="email-template-confirm-1.html">Mail Confirmation 1</a></li>
                    <li><a href="email-template-confirm-2.html">Mail Confirmation 2</a></li>
                    <li><a href="email-template-confirm-3.html">Mail Confirmation 3</a></li>
                    <li><a href="email-template-confirm-4.html">Mail Confirmation 4</a></li>
                    <li><a href="email-template-confirm-5.html">Mail Confirmation 5</a></li>
                  </ul>
                </li>
                <li><a href="/">Mail Reset password</a>
                  <ul className="sub-menu">
                    <li><a href="email-template-forgot-password-1.html">Reset password 1</a></li>
                    <li><a href="email-template-forgot-password-2.html">Reset password 2</a></li>
                    <li><a href="email-template-forgot-password-3.html">Reset password 3</a></li>
                    <li><a href="email-template-forgot-password-4.html">Reset password 4</a></li>
                    <li><a href="email-template-forgot-password-5.html">Reset password 5</a></li>
                  </ul>
                </li>
                <li><a href="/">Mail Promotional</a>
                  <ul className="sub-menu">
                    <li><a href="email-template-offers-1.html">Offer Mail 1</a></li>
                    <li><a href="email-template-offers-2.html">Offer Mail 2</a></li>
                    <li><a href="email-template-offers-3.html">Offer Mail 3</a></li>
                    <li><a href="email-template-offers-4.html">Offer Mail 4</a></li>
                    <li><a href="email-template-offers-5.html">Offer Mail 5</a></li>
                    <li><a href="email-template-offers-6.html">Offer Mail 6</a></li>
                    <li><a href="email-template-offers-7.html">Offer Mail 7</a></li>
                    <li><a href="email-template-offers-8.html">Offer Mail 8</a></li>
                  </ul>
                </li>
                <li><a href="/">Vendor Account Pages</a>
                  <ul className="sub-menu">
                    <li><a href="vendor-dashboard.html">Vendor Dashboard</a></li>
                    <li><a href="vendor-profile.html">Vendor Profile</a></li>
                    <li><a href="vendor-uploads.html">Vendor Uploads</a></li>
                    <li><a href="vendor-settings.html">Vendor Settings</a></li>
                  </ul>
                </li>
                <li><a href="/">User Account Pages</a>
                  <ul className="sub-menu">
                    <li><a href="user-profile.html">User Profile</a></li>
                    <li><a href="user-history.html">User History</a></li>
                    <li><a href="wishlist.html">Wishlist</a></li>
                    <li><a href="track-order.html">Track Order</a></li>
                    <li><a href="user-invoice.html">User Invoice</a></li>
                  </ul>
                </li>
                <li><a href="/">Construction Pages</a>
                  <ul className="sub-menu">
                    <li><a href="404-error-page.html">404 Error Page</a></li>
                    <li><a href="under-maintenance.html">Maintenance Page</a></li>
                    <li><a href="coming-soon.html">Comming Soon Page</a></li>
                  </ul>
                </li>
                <li><a href="/">Vendor Catalog Pages</a>
                  <ul className="sub-menu">
                    <li><a href="catalog-single-vendor.html">Catalog Single Vendor</a></li>
                    <li><a href="catalog-multi-vendor.html">Catalog Multi Vendor</a></li>
                  </ul>
                </li>
              </ul>
            </li>
            <li><a href="/">Pages</a>
              <ul className="sub-menu">
                <li><a href="about-us.html">About Us</a></li>
                <li><a href="contact-us.html">Contact Us</a></li>
                <li><a href="cart.html">Cart</a></li>
                <li><a href="checkout.html">Checkout</a></li>
                <li><a href="compare.html">Compare</a></li>
                <li><a href="faq.html">FAQ</a></li>
                <li><a href="login.html">Login</a></li>
                <li><a href="register.html">Register</a></li>
                <li><a href="track-order.html">Track Order</a></li>
                <li><a href="terms-condition.html">Terms Condition</a></li>
                <li><a href="privacy-policy.html">Privacy Policy</a></li>
              </ul>
            </li>
            <li className="dropdown"><a href="/">Blog</a>
              <ul className="sub-menu">
                <li><a href="blog-left-sidebar.html">Blog left sidebar</a></li>
                <li><a href="blog-right-sidebar.html">Blog right sidebar</a></li>
                <li><a href="blog-detail-left-sidebar.html">Blog detail left sidebar</a></li>
                <li><a href="blog-detail-right-sidebar.html">Blog detail right sidebar</a></li>
                <li><a href="blog-full-width.html">Blog full width</a></li>
                <li><a href="blog-detail-full-width.html">Blog detail full width</a></li>
              </ul>
            </li>
            <li className="dropdown"><a href="/">Elements</a>
              <ul className="sub-menu">
                <li><a href="elemets-products.html">Products</a></li>
                <li><a href="elemets-typography.html">Typography</a></li>
                <li><a href="elemets-title.html">Titles</a></li>
                <li><a href="elemets-categories.html">Categories</a></li>
                <li><a href="elemets-buttons.html">Buttons</a></li>
                <li><a href="elemets-tabs.html">Tabs</a></li>
                <li><a href="elemets-accordions.html">Accordions</a></li>
                <li><a href="elemets-blog.html">Blogs</a></li>
              </ul>
            </li>
            <li><a href="offer.html">Hot Offers</a></li>
          </ul>
        </div>
        <div className="header-res-lan-curr">
          <div className="header-top-lan-curr">
            {/* Language Start */}
            <div className="header-top-lan dropdown">
              <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">Language <i className="ecicon eci-caret-down" aria-hidden="true" /></button>
              <ul className="dropdown-menu">
                <li className="active"><a className="dropdown-item" href="#">English</a></li>
                <li><a className="dropdown-item" href="#">Italiano</a></li>
              </ul>
            </div>
            {/* Language End */}
            {/* Currency Start */}
            <div className="header-top-curr dropdown">
              <button className="dropdown-toggle text-upper" data-bs-toggle="dropdown">Currency <i className="ecicon eci-caret-down" aria-hidden="true" /></button>
              <ul className="dropdown-menu">
                <li className="active"><a className="dropdown-item" href="#">USD $</a></li>
                <li><a className="dropdown-item" href="#">EUR €</a></li>
              </ul>
            </div>
            {/* Currency End */}
          </div>
          {/* Social Start */}
          <div className="header-res-social">
            <div className="header-top-social">
              <ul className="mb-0">
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-facebook" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-twitter" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-instagram" /></a></li>
                <li className="list-inline-item"><a href="#"><i className="ecicon eci-linkedin" /></a></li>
              </ul>
            </div>
          </div>
          {/* Social End */}
        </div>
      </div>
    </div>
    {/* Ekka Menu End */}
  </header>
  {/* Header End  */}
  {/* cartstart */}
  {/* Ekka Cart Start */}
  <div className="ec-side-cart-overlay" />
  <div id="ec-side-cart" className="ec-side-cart">
    <div className="ec-cart-inner">
      <div className="ec-cart-top">
        <div className="ec-cart-title">
          <span className="cart_title">My Cart</span>
          <button className="ec-close">×</button>
        </div>
        <ul className="eccart-pro-items">

          {viewcart.length ?  viewcart.map((itm,k)=>(
            <li key={k}>
            <Link to={`/product/${itm.product[0].id}`} className="sidecart_pro_img"><img src={itm.product[0].images[0].image} alt="product" /></Link>
            <div className="ec-pro-content">
              <Link to={`/product/${itm.product[0].id}`} className="cart_pro_title">{itm.product[0].title} {itm.storage}</Link>
              <span className='text-uppercase'>{itm.condition}</span>
              <span className="cart-price"><span>${itm.price}</span></span>
              
                <div className="d-flex quantitydiv pt-1 ">
                  <button onClick={()=>decrementhandler(k,itm)} className='border border-secondary'><b>-</b></button>
                  <span className="border border-secondary px-3 " type="text"> {itm.quantity}</span>  
                  <button onClick={()=>incrementhandler(k,itm)} className='border border-secondary '><b>+</b></button>
                </div>
              
              <button onClick={()=>deletefromcartfunction(k)} className='deletecart'>×</button>
            </div>
          </li>
          )):
          <div className='text-center'>
          <p>Cart is empty !</p>
          </div>}
          
         
        </ul>
      </div>
      {viewcart.length ? <>
      <div className="ec-cart-bottom">
        <div className="cart-sub-total">
          <table className="table cart-table">
            <tbody>
              
              <tr>
                <td className="text-left">Sub-Total :</td>
                <td className="text-right">${viewcart.reduce((n, {price}) => n + parseInt(price), 0)}</td>
              </tr>
              <tr>
                <td className="text-left">VAT (20%) :</td>
                <td className="text-right">${parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)*0.2)}</td>
              </tr>
              <tr>
                <td className="text-left">Total :</td>
                <td className="text-right primary-color">${(viewcart.reduce((n, {price}) => n + parseInt(price), 0))+(parseFloat(viewcart.reduce((n, {price}) => n + parseInt(price), 0)*0.2))}</td>
              </tr>
              
              
            </tbody>
          </table>
        </div>
        <div className="cart_btn">
          {/* <a href="cart.html" className="btn btn-primary">View Cart</a> */}
          <Link to="/checkout" className="btn btn-secondary">Checkout</Link>
        </div>
      </div>
      </>:null}
    </div>
  </div>
  {/* Ekka Cart End */}
  {/* cartend */}
    </div>

  )
}
