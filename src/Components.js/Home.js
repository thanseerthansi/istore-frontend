import React, { useContext, useEffect, useState } from 'react'
import Footer from './Footer'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Callaxios from './Callaxios';
import { Simplecontext } from './Simplecontext';
import { Link } from 'react-router-dom';
import Scripts from './Scripts';

export default function Home() {
  const {products,modelsname} =useContext(Simplecontext)
  // const [selectitem,setselectitem]=useState()
  useEffect(() => {
    Scripts()
  }, [])
  // console.log("setselectitem",selectitem)

  const notifyproductadded = (msg) => toast.success(msg, {
    position: "top-center",
    });
  const notifyerror = (msg) => toast.error(msg ,{
    position: "top-center",
    });
  
  return (
    <div>
      <div>
    <Header/>
    <ToastContainer/>
  
  {/* Main Slider Start */}
  <div className="ec-main-slider section ">
    <div className="ec-slider">
      <div className="ec-slide-item d-flex slide-1">
        <div className="container align-self-center">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 align-self-center">
              <div className="ec-slide-content slider-animation">
                <h2 className="ec-slide-stitle">new arrival</h2>
                <h1 className="ec-slide-title">stylish iphone</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <Link to="/categoryproduct/iphone" className="btn btn-lg btn-secondary">See More</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ec-slide-item d-flex slide-2">
        <div className="container align-self-center">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 align-self-center">
              <div className="ec-slide-content slider-animation">
                <h2 className="ec-slide-stitle">Trending Item</h2>
                <h1 className="ec-slide-title">iphone 14</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <Link to="/categoryproduct/iphone" className="btn btn-lg btn-secondary">See more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="ec-slide-item d-flex slide-3">
        <div className="container align-self-center">
          <div className="row">
            <div className="col-xl-7 col-lg-7 col-md-7 col-sm-7 align-self-center">
              <div className="ec-slide-content slider-animation">
                <h2 className="ec-slide-stitle">new arrival</h2>
                <h1 className="ec-slide-title">iphone</h1>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry's standard dummy text ever since the 1500s</p>
                <Link to="/categoryproduct/iphone" className="btn btn-lg btn-secondary">See more</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Main Slider End */}
  {/*  category Section Start */}
  <section className="section ec-category-section section-space-mb">
    <div className="container">
      <div className="row">
        <div className="ec_cat_slider">
          {modelsname.length ?modelsname[0].model_name.split(',').map((itm,k)=>(
            <div key={k} className="ec_cat_content">
            <div className="ec_cat_inner">
              <Link to={`/categoryproduct/${itm}`}>
                <h2 className="d-none">Category</h2>
                <div className="ec-cat-image">
                  <img src="assets/images/category-image/image-svg.svg" className="svg_img cat_svg" alt={''}/>
                </div>
                <div className="ec-cat-desc">
                  <span className="ec-section-title">{itm}</span>
                </div>
              </Link>
            </div>
          </div>
          )) :null}
          
          
        </div>
      </div>
    </div>
  </section>
  {/*category Section End */}
  {/* Product tab Area Start */}
  <section className="section ec-product-tab section-space-p">
    <div className="container">
      <div className="row">
        <div className="col-md-12 section-title-block">
          <div className="section-title">
            <h2 className="ec-title">Featured Products</h2>
            <h6 className="ec-sub-title">Lorem Ipsum is simply dummy text of the printing</h6>
          </div>
        </div>
      </div>
      <div className="row m-tb-minus-15">
        <div className="col-">
          <div className="tab-content">
            <div className="row">
            {products.length ? products.filter((item,index)=>index < 8).map((itm,k)=>( 
              <div key={k} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 ec-product-content">
                <Link to={`/product/${itm.id}`}><div className="ec-product-inner">
                  <div className="ec-product-hover" />
                  <div className="ec-pro-image-outer ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal">
                    <div className="ec-pro-image m-auto ">
                      <p to={`/product/${itm.id}`} className="image ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal">
                        <img className="main-image objectimage " src={itm.images[0] ? itm.images[0].image: null} alt="Product "   height="auto"/>
                        
                        <img className="hover-image objectimage" src={itm.images[0] ? itm.images[0].image :null } alt="Product"  height="auto" />
                       
                      </p>
                    </div>
                  </div>
                  <div className="ec-pro-content">
                    <div className="ec-pro-option">
                      {/* <div className="ec-pro-opt-inner">
                        <div className="ec-pro-color">
                        <ul className="ec-opt-swatch ec-change-img">
                            <li className="active"><a href="/" className="ec-opt-clr-img" data-src={itm.images[0] ? itm.images[0].image:null} data-src-hover={itm.images[0] ? itm.images[0].image:null} data-tooltip="Gray"><span style={{backgroundColor: '#dddddd'}} /></a></li>
                            <li><a href="/" className="ec-opt-clr-img" data-src={itm.images[1] ? itm.images[1].image:null} data-src-hover={itm.images[1] ? itm.images[1].image:null} data-tooltip="Orange"><span style={{backgroundColor: '#818181'}} /></a></li>
                          </ul>
                        </div>
                        <div className="ec-pro-compare">
                          <a href="compare.html" className="ec-btn-group compare" title="Compare"><img src="assets/images/icons/compare_5.svg" className="svg_img pro_svg" alt={''}/></a>
                        </div>
                      </div> */}
                    </div>
                    <h5  className="ec-pro-title "><p  className="ec-btn-group ">{itm.title}</p></h5>
                    {/* <h6 className="ec-pro-stitle"><a href="shop-left-sidebar-col-3.html">Camera</a></h6> */}
                    <div className="ec-pro-rat-price">
                      <div className="ec-pro-rat-pri-inner">
                        <span className="ec-price">
                          <span className="new-price">${itm.sellfromprice}</span>
                          <span className="old-price">${itm.oldfromprice}</span>
                        </span>
                        <span className="ec-price "  >
                          <span className="new-price">${itm.sellfromprice}</span>
                          <span className="old-price">${itm.oldfromprice}</span>
                          {/* <div className='text-right ml-3'><button title="Add To Cart" className="add-to-cart btn btn-primary">Add To Cart</button></div> */}
                        </span>
                      </div>
                    </div>
                    {/* <div className="pro-hidden-block"> */}
                      {/* <div className="ec-pro-desc">{itm.description}.</div> */}
                      {/* <div className="ec-pro-actions"> */}
                        {/* <a className="ec-btn-group wishlist" title="Wishlist"><img src="assets/images/icons/pro_wishlist.svg" className="svg_img pro_svg" alt={''}/></a> */}
                        {/* <button title="Add To Cart" className="add-to-cart btn btn-primary">Add To
                          Cart</button> */}
                        {/* <a href="/" className="ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal">sdvd</a> */}
                      {/* </div> */}
                    {/* </div> */}
                  </div>
                </div>
                </Link>
              </div>
              )):null}
                 
              {/* dsfdsf */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ec Product tab Area End */}
  {/* ec Banner Section Start */}
  <section className="ec-banner section section-space-p">
    <h2 className="d-none">Banner</h2>
    <div className="container">
      <div className="row m-tb-minus-15">
        <div className="ec-banners">
          <div className="ec-banner-left col-sm-6">
            <div className="ec-banner-block ec-banner-block-1 col-sm-12">
              <div className="banner-block">
                <img src="assets/images/banner/23.png" alt={''}/>
                <div className="banner-content">
                  <span className="ec-banner-stitle">iPhone</span>
                  <span className="ec-banner-title">UP to 70% OFF</span>
                  <span className="ec-banner-btn"><Link to="/categoryproduct/iphone" className="btn-primary">See more</Link></span>
                </div>
              </div>
            </div>
          </div>
          <div className="ec-banner-right col-sm-6">
            <div className="ec-banner-block ec-banner-block-2 col-sm-12">
              <div className="banner-block">
                <img src="assets/images/banner/24.png" alt={''}/>
                <div className="banner-content">
                  <span className="ec-banner-stitle">iPhone</span>
                  <span className="ec-banner-title">iPhone 14 pro</span>
                  <span className="ec-banner-btn"><Link to="/categoryproduct/iphone" className="btn-primary">See more</Link></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* ec Banner Section End */}
  {/*  Feature & Special Section Start */}
  <section className="section ec-exe-spe-section section-space-ptb-100 section-space-mt section-space-mb-100" style={{backgroundImage: 'url("assets/images/special-product/background.jpg")'}}>
    <div className="container">
      <div className="row">
        {/*  Special Section Start */}
        <div className="ec-spe-section col-lg-6 col-md-12 col-sm-12 margin-b-30">
          <div className="col-md-12 text-left">
            <div className="section-title mb-6">
              <h2 className="ec-title">Deals of the days</h2>
            </div>
          </div>
          <div className="ec-spe-products">
           
            {products.filter(t => t.category.toUpperCase().includes("DEAL")).map((itm,k)=>(
            <div key={k} className="ec-fs-product">
              <div className="ec-fs-pro-inner ec-product-inner">
                <div className="ec-fs-pro-image-outer col-lg-6 col-md-6 col-sm-6">
                  <div className="ec-fs-pro-image">
                    <Link to={`/product/${itm.id}`} className="image"><img className="main-image .objectimage" src={itm.images[0].image} alt="Product" height="auto"/></Link>
                  </div>
                </div>
                <div className="ec-pro-content col-lg-6 col-md-6 col-sm-6">
                  <h5 className="ec-pro-title"><Link to={`/product/${itm.id}`}>{itm.title} </Link></h5>
                  <h6 className="ec-pro-stitle"><Link to={`/product/${itm.id}`}>{itm.model_name}</Link></h6>
                  <div className="ec-pro-rat-price">
                    <span className="ec-price">
                      <span className="new-price">${itm.sellfromprice}</span>
                      <span className="old-price">${itm.oldfromprice}</span>
                    </span>
                  </div>
                  <Link to={`/product/${itm.id}`}>
                  <div className="ec-pro-actions">
                    <button  className="add-to-cart btn btn-primary">Deatils</button>
                  </div></Link>
                </div>
              </div>
            </div>
            )) }
            
          </div>
        </div>
        {/*  Special Section End */}
        {/*  Feature Section Start */}
        <div className="ec-exe-section col-lg-6 col-md-12 col-sm-12">
          <div className="col-md-12 text-left">
            <div className="section-title mb-6">
              <h2 className="ec-title">Exclusive Products</h2>
            </div>
          </div>
          <div className="ec-exe-products product-mt-minus-15">
          {products.length ? products.filter(t => t.category.toUpperCase().includes("EXCLUSIVE")).map((itm,k)=>( 
              <div key={k} className="ec-product-content">
                <Link to={`/product/${itm.id}`}><div className="ec-product-inner">
                  <div className="ec-product-hover" />
                  <div className="ec-pro-image-outer" >
                    <div className="ec-pro-image ">
                      <p  className="image ">
                        <img className="main-image objectimage " src={itm.images[0] ? itm.images[0].image: null} alt="Product "   height="auto"/>
                        
                        <img className="hover-image objectimage" src={itm.images[0] ? itm.images[0].image :null } alt="Product"  height="auto" />
                       
                      </p>
                    </div>
                  </div>
                  <div className="ec-pro-content">
                    <div className="ec-pro-option">
                    </div>
                    <h5 className="ec-pro-title "><p  className="ec-btn-group ">{itm.title}</p></h5>
                    {/* <h6 className="ec-pro-stitle"><a href="shop-left-sidebar-col-3.html">Camera</a></h6> */}
                    <div className="ec-pro-rat-price">
                      <div className="ec-pro-rat-pri-inner">
                        <span className="ec-price">
                          <span className="new-price">${itm.sellfromprice}</span>
                          <span className="old-price">${itm.oldfromprice}</span>
                        </span>
                        <span className="ec-price "  >
                          <span className="new-price">${itm.sellfromprice}</span>
                          <span className="old-price">${itm.oldfromprice}</span>
                          {/* <div className='text-right ml-3'><button title="Add To Cart" className="add-to-cart btn btn-primary">Add To Cart</button></div> */}
                        </span>
                      </div>
                    </div>
                    
                  </div>
                </div>
                </Link>
              </div>
              )):null}
           
          </div>
        </div>
        {/*  Feature Section End */}
      </div>
    </div>
  </section>
  {/* Feature & Special Section End */}
  {/*  offer Section Start */}
  <section className="section ec-offer-section section-space-mt section-space-mb">
    <h2 className="d-none">Offer</h2>
    <div className="container">
      <div className="ec-offer-inner ofr-img">
        {/* <img src="assets/images/offer-image/offer_bg.png" alt="" class="offer_bg" /> */}
        <div className="col-sm-6 ec-offer-content">
          <div className="ec-offer-content-inner">
            <h2 className="ec-offer-stitle">black friday</h2>
            <h2 className="ec-offer-title">up to 60 % off</h2>
            <span className="ec-offer-desc">Select accessories for your favourites gadgets</span>
            <span className="ec-offer-btn"><Link to="/categoryproduct/iphone" className="btn btn-primary">See more</Link></span>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* offer Section End */}
  {/* All Product Start */}
  <section className="section ec-all-products section-space-p">
    <h2 className="d-none">all product</h2>
    <div className="container">
      <div className="row">
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6 ec-all-product-content ec-new-product-content margin-b-30">
          <div className="col-md-12 text-left">
            <div className="section-title">
              <h2 className="ec-title">New Arrivals</h2>
            </div>
          </div>
          <div className="ec-new-slider">
          {products.length ? products.filter(t => t.category.toUpperCase().includes("NEW")).map((itm,k)=>(
            <div key={k} className="col-sm-12 ec-all-product-block">
              <div className="ec-all-product-inner">
                <div className="ec-pro-image-outer">
                  <div className="ec-pro-image">
                    <a href="product-left-sidebar.html" className="image">
                      <img className="main-image" src={itm.images.length ? itm.images[0].image :null} alt="Product" />
                    </a>
                  </div>
                </div>
                <div className="ec-pro-content">
                  <h5 className="ec-pro-title"><Link to={`/product/${itm.id}`}>{itm.title}</Link></h5>
                  <h6 className="ec-pro-stitle">{itm.model_name}</h6>
                  <div className="ec-pro-rat-price">
                    <div className="ec-pro-rat-pri-inner">
                      <span className="ec-price">
                        <span className="new-price">${itm.sellfromprice}</span>
                        <span className="old-price">${itm.oldfromprice}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )):null}
            
            
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6 ec-all-product-content ec-special-product-content margin-b-30">
          <div className="col-md-12 text-left">
            <div className="section-title">
              <h2 className="ec-title">Special offer</h2>
            </div>
          </div>
          <div className="ec-special-slider">
          {products.length ? products.filter(t => t.category.toUpperCase().includes("SPECIAL")).map((itm,k)=>(
            <div key={k} className="col-sm-12 ec-all-product-block">
              <div className="ec-all-product-inner">
                <div className="ec-pro-image-outer">
                  <div className="ec-pro-image">
                    <a href="product-left-sidebar.html" className="image">
                      <img className="main-image" src={itm.images.length ? itm.images[0].image :null} alt="Product" />
                    </a>
                  </div>
                </div>
                <div className="ec-pro-content">
                  <h5 className="ec-pro-title"><Link to={`/product/${itm.id}`}>{itm.title}</Link></h5>
                  <h6 className="ec-pro-stitle">{itm.model_name}</h6>
                  <div className="ec-pro-rat-price">
                    <div className="ec-pro-rat-pri-inner">
                      <span className="ec-price">
                        <span className="new-price">${itm.sellfromprice}</span>
                        <span className="old-price">${itm.oldfromprice}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )):null}
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6 ec-all-product-content ec-best-product-content">
          <div className="col-md-12 text-left">
            <div className="section-title">
              <h2 className="ec-title">Best Sellers</h2>
            </div>
          </div>
          <div className="ec-best-slider">
          {products.length ? products.filter(t => t.category.toUpperCase().includes("BEST")).map((itm,k)=>(
            <div key={k} className="col-sm-12 ec-all-product-block">
              <div className="ec-all-product-inner">
                <div className="ec-pro-image-outer">
                  <div className="ec-pro-image">
                    <a href="product-left-sidebar.html" className="image">
                      <img className="main-image" src={itm.images.length ? itm.images[0].image :null} alt="Product" />
                    </a>
                  </div>
                </div>
                <div className="ec-pro-content">
                  <h5 className="ec-pro-title"><Link to={`/product/${itm.id}`}>{itm.title}</Link></h5>
                  <h6 className="ec-pro-stitle">{itm.model_name}</h6>
                  <div className="ec-pro-rat-price">
                    <div className="ec-pro-rat-pri-inner">
                      <span className="ec-price">
                        <span className="new-price">${itm.sellfromprice}</span>
                        <span className="old-price">${itm.oldfromprice}</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )):null}
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-6 ec-right-banner-content dis-n-767">
          <div className="ec-right-banner-inner">
            <div className="right-banner-block">
              <img className="right-banner-img" src="assets/images/banner/22.png" alt="Banner" />
              <div className="right-banner-content">
                <span className="ec-right-banner-title">iPhone</span>
                <span className="ec-right-banner-stitle">selfies and style</span>
                {/* <span className="ec-right-banner-btn"><a href="/" className="btn-primary">Add to cart</a></span> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* All Item end */}
  {/* ec testimonial Start */}
  {/* <section className="section ec-test-section section-space-ptb-100 section-space-mt section-space-mb" style={{backgroundImage: 'url("assets/images/testimonial/testimonial_bg.jpg")'}}>
    <div className="container">
      <div className="row">
        <div className="col-md-12 section-title-block">
          <div className="section-title">
            <h2 className="ec-title">Client Testimonials</h2>
            <h6 className="ec-sub-title">Lorem Ipsum is simply dummy text of the printing</h6>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="ec-test-outer">
          <ul id="ec-testimonial-slider">
            <li className="ec-test-item">
              <div className="ec-test-inner">
                <div className="ec-test-img"><img alt="testimonial" title="testimonial" src="assets/images/testimonial/1.jpg" /></div>
                <div className="ec-test-content">
                  <div className="ec-test-name">david james</div>
                  <div className="ec-test-designation">united states of america</div>
                  <div className="ec-test-rating">
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                  </div>
                  <div className="ec-test-desc">Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry</div>
                </div>
              </div>
            </li>
            <li className="ec-test-item">
              <div className="ec-test-inner">
                <div className="ec-test-img"><img alt="testimonial" title="testimonial" src="assets/images/testimonial/2.jpg" /></div>
                <div className="ec-test-content">
                  <div className="ec-test-name">david james</div>
                  <div className="ec-test-designation">united states of america</div>
                  <div className="ec-test-rating">
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                  </div>
                  <div className="ec-test-desc">Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry</div>
                </div>
              </div>
            </li>
            <li className="ec-test-item">
              <div className="ec-test-inner">
                <div className="ec-test-img"><img alt="testimonial" title="testimonial" src="assets/images/testimonial/3.jpg" /></div>
                <div className="ec-test-content">
                  <div className="ec-test-name">david james</div>
                  <div className="ec-test-designation">united states of america</div>
                  <div className="ec-test-rating">
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                  </div>
                  <div className="ec-test-desc">Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry</div>
                </div>
              </div>
            </li>
            <li className="ec-test-item">
              <div className="ec-test-inner">
                <div className="ec-test-img"><img alt="testimonial" title="testimonial" src="assets/images/testimonial/1.jpg" /></div>
                <div className="ec-test-content">
                  <div className="ec-test-name">david james</div>
                  <div className="ec-test-designation">united states of america</div>
                  <div className="ec-test-rating">
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                    <i className="ecicon eci-star fill" />
                  </div>
                  <div className="ec-test-desc">Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry</div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section> */}
  {/* ec testimonial end */}
  {/* Ec Brand Section Start */}
  {/* <section className="section ec-brand-area section-space-p">
    <h2 className="d-none">Brand</h2>
    <div className="container">
      <div className="row">
        <div className="ec-brand-outer">
          <ul id="ec-brand-slider">
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/1.png" /></a></div>
            </li>
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/2.png" /></a></div>
            </li>
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/3.png" /></a></div>
            </li>
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/4.png" /></a></div>
            </li>
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/5.png" /></a></div>
            </li>
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/6.png" /></a></div>
            </li>
            <li className="ec-brand-item">
              <div className="ec-brand-img"><a href="/"><img alt="brand" title="brand" src="assets/images/brand-image/7.png" /></a></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section> */}
  {/* Ec Brand Section End */}
  {/* Ec Instagram Start */}
  {/*  */}
  {/* Ec Instagram End */}
  
  <Footer/>
  {/* Modal */}
 
  {/* Modal end */}
  {/* Click To ChatPro */}	
 
  {/*successfully toast end */}
 

</div>

    </div>

  )
}
