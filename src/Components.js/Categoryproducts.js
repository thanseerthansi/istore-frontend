import React, { useContext, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import Header from './Header'
import Scripts from './Scripts'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Simplecontext } from './Simplecontext';
import Footer from './Footer';

export default function Categoryproducts() {
  const {products} =useContext(Simplecontext)
  console.log("product",products)
    useEffect(() => {
      Scripts()
    }, [])
  const  urlparam  = useParams()
  let urlmodel = urlparam.model
  // console.log("models",urlmodel)
  return (
    <div>
        <Header/>
        <ToastContainer/>
  <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row ec_breadcrumb_inner">
            <div className="col-md-6 col-sm-12">
              <h2 className="ec-breadcrumb-title">Category Products</h2>
            </div>
            <div className="col-md-6 col-sm-12">
              {/* ec-breadcrumb-list start */}
              <ul className="ec-breadcrumb-list">
                <li className="ec-breadcrumb-item"><Link to="/">Home </Link></li>
                <li className="ec-breadcrumb-item active"><span> ></span>Category Products</li>
              </ul>
              {/* ec-breadcrumb-list end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Product tab Area Start */}
  <section className="section ec-product-tab section-space-p">
    <div className="container">
      <div className="row">
        <div className="col-md-12 section-title-block">
          <div className="section-title">
            <h2 className="ec-title">{urlmodel}</h2>
            {/* <h6 className="ec-sub-title">Lorem Ipsum is simply dummy text of the printing</h6> */}
          </div>
        </div>
      </div>
      <div className="row m-tb-minus-15">
        <div className="col-">
          <div className="tab-content">
            <div className="row">
            {products.length ? products.filter(t => t.model_name.toUpperCase().includes(urlmodel.toUpperCase())).map((itm,k)=>( 
              <div key={k} className="col-lg-3 col-md-6 col-sm-6 col-xs-6 ec-product-content">
                <Link to={`/product/${itm.id}`}><div className="ec-product-inner">
                  <div className="ec-product-hover" />
                  <div className="ec-pro-image-outer ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal">
                    <div className="ec-pro-image m-auto ">
                      <p className="image ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal">
                        <img className="main-image objectimage " src={itm.images[0] ? itm.images[0].image: null} alt="Product "   height="200"/>
                        
                        <img className="hover-image objectimage" src={itm.images[0] ? itm.images[0].image :null } alt="Product"  height="200" />
                       
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
                    <h5  className="ec-pro-title "><p className="ec-btn-group ">{itm.title}</p></h5>
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
  <Footer/>
    </div>
  )
}
