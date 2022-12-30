import React, { useEffect, useState } from 'react'
import Header from './Header'
import Scripts from './Scripts'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useParams } from 'react-router-dom';
import Callaxios from './Callaxios';

export default function Cart() {
    const [productdetail,setproductdetail]=useState()
  const [storagelist,setstoragelist] = useState([])
  const [istorage,setistorage]=useState()
  const  urlparam  = useParams()
  let urlid = urlparam.id
    // console.log("ok",urlid)
    useEffect(() => {
      Scripts()
      getdetailproduct()
    }, [])
    const getdetailproduct=async()=>{
      let data =await Callaxios("get","product/product/",{"id":urlid})
      console.log("prodetsila",data.data)
      if (data.status===200){
        setproductdetail(data.data)
        storagecheck(data.data)
      }
    }
    const storagecheck = (data)=>{
      let list =[];
      (data[0].sellprice.split(',')).map((itm)=>{
        
        let spl = itm.split('-')[0]
        if (list[0]){
          if (list.indexOf(spl) !== -1){
            }else{
              list.push(itm.split('-')[0])
            }
        }else{
          list.push(itm.split('-')[0])
        }
        })
        // console.log("list",list)
        setstoragelist(()=>[...list])
        setistorage(list[0])
    }
  return (
    <div>
        <Header/>
        <div className="ec-side-cart-overlay" />
  <div id="ec-side-cart" className="ec-side-cart">
    <div className="ec-cart-inner">
      <div className="ec-cart-top">
        <div className="ec-cart-title">
          <span className="cart_title">My Cart</span>
          <button className="ec-close">×</button>
        </div>
        <ul className="eccart-pro-items">
          <li>
            <a href="product-left-sidebar.html" className="sidekka_pro_img"><img src="assets/images/product-image/6_1.jpg" alt="product" /></a>
            <div className="ec-pro-content">
              <a href="product-left-sidebar.html" className="cart_pro_title">T-shirt For Women</a>
              <span className="cart-price"><span>$76.00</span> x 1</span>
              <div className="qty-plus-minus">
                <input className="qty-input" type="text" name="ec_qtybtn" defaultValue={1} />
              </div>
              <a href="/" className="remove">×</a>
            </div>
          </li>
          <li>
            <a href="product-left-sidebar.html" className="sidekka_pro_img"><img src="assets/images/product-image/12_1.jpg" alt="product" /></a>
            <div className="ec-pro-content">
              <a href="product-left-sidebar.html" className="cart_pro_title">Women Leather Shoes</a>
              <span className="cart-price"><span>$64.00</span> x 1</span>
              <div className="qty-plus-minus">
                <input className="qty-input" type="text" name="ec_qtybtn" defaultValue={1} />
              </div>
              <a href="/" className="remove">×</a>
            </div>
          </li>
          <li>
            <a href="product-left-sidebar.html" className="sidekka_pro_img"><img src="assets/images/product-image/3_1.jpg" alt="product" /></a>
            <div className="ec-pro-content">
              <a href="product-left-sidebar.html" className="cart_pro_title">Girls Nylon Purse</a>
              <span className="cart-price"><span>$59.00</span> x 1</span>
              <div className="qty-plus-minus">
                <input className="qty-input" type="text" name="ec_qtybtn" defaultValue={1} />
              </div>
              <a href="/" className="remove">×</a>
            </div>
          </li>
        </ul>
      </div>
      <div className="ec-cart-bottom">
        <div className="cart-sub-total">
          <table className="table cart-table">
            <tbody>
              <tr>
                <td className="text-left">Sub-Total :</td>
                <td className="text-right">$300.00</td>
              </tr>
              <tr>
                <td className="text-left">VAT (20%) :</td>
                <td className="text-right">$60.00</td>
              </tr>
              <tr>
                <td className="text-left">Total :</td>
                <td className="text-right primary-color">$360.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="cart_btn">
          <a href="cart.html" className="btn btn-primary">View Cart</a>
          <a href="checkout.html" className="btn btn-secondary">Checkout</a>
        </div>
      </div>
    </div>
  </div>
  {/* ekka Cart End */}
  {/* Ec breadcrumb start */}
  <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row ec_breadcrumb_inner">
            <div className="col-md-6 col-sm-12">
              <h2 className="ec-breadcrumb-title">Single Products</h2>
            </div>
            <div className="col-md-6 col-sm-12">
              {/* ec-breadcrumb-list start */}
              <ul className="ec-breadcrumb-list">
                <li className="ec-breadcrumb-item"><a href="index.html">Home</a></li>
                <li className="ec-breadcrumb-item active">Products</li>
              </ul>
              {/* ec-breadcrumb-list end */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/* Ec breadcrumb end */}
  {/* Sart Single product */}
  <section className="ec-page-content section-space-p">
    <div className="container">
      <div className="row">
        <div className="ec-pro-rightside ec-common-rightside col-lg-9 col-md-12">
          {/* Single product content Start */}
          <div className="single-pro-block">
            <div className="single-pro-inner">
              <div className="row">
                <div className="single-pro-img">
                  <div className="single-product-scroll">
                    <div className="">
                      {/* carousealstart */}
                 
                      <Carousel  infiniteLoop >
                        
                        {productdetail ? productdetail[0].images.map((itm,k)=>(
                          <div>
                              <img src={itm.image}/>
                            
                          </div>
                          )):null}
                       
                          
                      </Carousel>

                      {/* carousealend */}

                      {/* <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="assets/images/product-image/9_1.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="assets/images/product-image/9_2.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="assets/images/product-image/9_3.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="assets/images/product-image/9_4.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="assets/images/product-image/9_3.jpg" alt={''}/>
                      </div> */}
                    </div>
                    {/* <div className="single-nav-thumb">
                      <div className="single-slide">
                        <img className="img-responsive" src="assets/images/product-image/9_1.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="assets/images/product-image/9_2.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="assets/images/product-image/9_3.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="assets/images/product-image/9_4.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="assets/images/product-image/9_3.jpg" alt={''}/>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="single-pro-desc">
                  <div className="single-pro-content">
                    <h5 className="ec-single-title">Unisex Cotton Neck Hoodie</h5>
                    <div className="ec-single-rating-wrap">
                      <div className="ec-single-rating">
                        <i className="ecicon eci-star fill" />
                        <i className="ecicon eci-star fill" />
                        <i className="ecicon eci-star fill" />
                        <i className="ecicon eci-star fill" />
                        <i className="ecicon eci-star-o" />
                      </div>
                      <span className="ec-read-review"><a href="#ec-spt-nav-review">Be the first to
                          review this product</a></span>
                    </div>
                    <div className="ec-single-desc">Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry. Lorem Ipsum has been the industry's standard dummy
                      text ever since the 1990</div>
                    <div className="ec-single-sales">
                      <div className="ec-single-sales-inner">
                        <div className="ec-single-sales-title">sales accelerators</div>
                        <div className="ec-single-sales-visitor">real time <span>18</span> visitor
                          right now!</div>
                        <div className="ec-single-sales-progress">
                          <span className="ec-single-progress-desc">Hurry up!left 17 in
                            stock</span>
                          <span className="ec-single-progressbar" />
                        </div>
                        <div className="ec-single-sales-countdown">
                          <div className="ec-single-countdown"><span id="ec-single-countdown" /></div>
                          <div className="ec-single-count-desc">Time is Running Out!</div>
                        </div>
                      </div>
                    </div>
                    <div className="ec-single-price-stoke">
                      <div className="ec-single-price">
                        <span className="ec-single-ps-title">As low as</span>
                        <span className="new-price">$68.00</span>
                      </div>
                      <div className="ec-single-stoke">
                        <span className="ec-single-ps-title">IN STOCK</span>
                        <span className="ec-single-sku">SKU#: WH12</span>
                      </div>
                    </div>
                    <div className="ec-pro-variation">
                      <div className="ec-pro-variation-inner ec-pro-variation-size">
                        <span>SIZE</span>
                        <div className="ec-pro-variation-content">
                          <ul>
                            <li className="active"><span>S</span></li>
                            <li><span>M</span></li>
                            <li><span>L</span></li>
                            <li><span>XL</span></li>
                          </ul>
                        </div>
                      </div>
                      <div className="ec-pro-variation-inner ec-pro-variation-color">
                        <span>Color</span>
                        <div className="ec-pro-variation-content">
                          <ul>
                            <li className="active"><span style={{backgroundColor: '#1b4a87'}} /></li>
                            <li><span style={{backgroundColor: '#5f94d6'}} /></li>
                            <li><span style={{backgroundColor: '#72aea2'}} /></li>
                            <li><span style={{backgroundColor: '#c79782'}} /></li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="ec-single-qty">
                      <div className="qty-plus-minus">
                        <input className="qty-input" type="text" name="ec_qtybtn" defaultValue={1} />
                      </div>
                      <div className="ec-single-cart ">
                        <button className="btn btn-primary">Add To Cart</button>
                      </div>
                      <div className="ec-single-wishlist">
                        <a className="ec-btn-group wishlist" title="Wishlist"><img src="assets/images/icons/wishlist.svg" className="svg_img pro_svg" alt={''}/></a>
                      </div>
                      <div className="ec-single-quickview">
                        <a href="#" className="ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img src="assets/images/icons/quickview.svg" className="svg_img pro_svg" alt={''}/></a>
                      </div>
                    </div>
                    <div className="ec-single-social">
                      <ul className="mb-0">
                        <li className="list-inline-item facebook"><a href="#"><i className="ecicon eci-facebook" /></a></li>
                        <li className="list-inline-item twitter"><a href="#"><i className="ecicon eci-twitter" /></a></li>
                        <li className="list-inline-item instagram"><a href="#"><i className="ecicon eci-instagram" /></a></li>
                        <li className="list-inline-item youtube-play"><a href="#"><i className="ecicon eci-youtube-play" /></a></li>
                        <li className="list-inline-item behance"><a href="#"><i className="ecicon eci-behance" /></a></li>
                        <li className="list-inline-item whatsapp"><a href="#"><i className="ecicon eci-whatsapp" /></a></li>
                        <li className="list-inline-item plus"><a href="#"><i className="ecicon eci-plus" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Single product content End */}
          {/* Single product tab start */}
          <div className="ec-single-pro-tab">
            <div className="ec-single-pro-tab-wrapper">
              <div className="ec-single-pro-tab-nav">
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-details" role="tablist">Detail</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-info" role="tablist">More Information</a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" data-bs-toggle="tab" data-bs-target="#ec-spt-nav-review" role="tablist">Reviews</a>
                  </li>
                </ul>
              </div>
              <div className="tab-content  ec-single-pro-tab-content">
                <div id="ec-spt-nav-details" className="tab-pane fade show active">
                  <div className="ec-single-pro-tab-desc">
                    <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                      Lorem Ipsum has been the industry's standard dummy text ever since the
                      1500s, when an unknown printer took a galley of type and scrambled it to
                      make a type specimen book. It has survived not only five centuries, but also
                      the leap into electronic typesetting, remaining essentially unchanged.
                    </p>
                    <ul>
                      <li>Any Product types that You want - Simple, Configurable</li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                      <li>Inventory Management with Backordered items</li>
                      <li>Flatlock seams throughout.</li>
                    </ul>
                  </div>
                </div>
                <div id="ec-spt-nav-info" className="tab-pane fade">
                  <div className="ec-single-pro-tab-moreinfo">
                    <ul>
                      <li><span>Weight</span> 1000 g</li>
                      <li><span>Dimensions</span> 35 × 30 × 7 cm</li>
                      <li><span>Color</span> Black, Pink, Red, White</li>
                    </ul>
                  </div>
                </div>
                <div id="ec-spt-nav-review" className="tab-pane fade">
                  <div className="row">
                    <div className="ec-t-review-wrapper">
                      <div className="ec-t-review-item">
                        <div className="ec-t-review-avtar">
                          <img src="assets/images/review-image/1.jpg" alt={''}/>
                        </div>
                        <div className="ec-t-review-content">
                          <div className="ec-t-review-top">
                            <div className="ec-t-review-name">Jeny Doe</div>
                            <div className="ec-t-review-rating">
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star-o" />
                            </div>
                          </div>
                          <div className="ec-t-review-bottom">
                            <p>Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the industry's
                              standard dummy text ever since the 1500s, when an unknown
                              printer took a galley of type and scrambled it to make a
                              type specimen.
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="ec-t-review-item">
                        <div className="ec-t-review-avtar">
                          <img src="assets/images/review-image/2.jpg" alt={''}/>
                        </div>
                        <div className="ec-t-review-content">
                          <div className="ec-t-review-top">
                            <div className="ec-t-review-name">Linda Morgus</div>
                            <div className="ec-t-review-rating">
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star-o" />
                              <i className="ecicon eci-star-o" />
                            </div>
                          </div>
                          <div className="ec-t-review-bottom">
                            <p>Lorem Ipsum is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the industry's
                              standard dummy text ever since the 1500s, when an unknown
                              printer took a galley of type and scrambled it to make a
                              type specimen.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="ec-ratting-content">
                      <h3>Add a Review</h3>
                      <div className="ec-ratting-form">
                        <form action="#">
                          <div className="ec-ratting-star">
                            <span>Your rating:</span>
                            <div className="ec-t-review-rating">
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star fill" />
                              <i className="ecicon eci-star-o" />
                              <i className="ecicon eci-star-o" />
                              <i className="ecicon eci-star-o" />
                            </div>
                          </div>
                          <div className="ec-ratting-input">
                            <input name="your-name" placeholder="Name" type="text" />
                          </div>
                          <div className="ec-ratting-input">
                            <input name="your-email" placeholder="Email*" type="email" required />
                          </div>
                          <div className="ec-ratting-input form-submit">
                            <textarea name="your-commemt" placeholder="Enter Your Comment" defaultValue={""} />
                            <button className="btn btn-primary" type="submit" value="Submit">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* product details description area end */}
        </div>
        
      </div>
    </div>
  </section>
  {/* End Single product */}
  {/* Related Product Start */}
  <section className="section ec-releted-product section-space-p">
    <div className="container">
      <div className="row">
        <div className="col-md-12 text-center">
          <div className="section-title">
            <h2 className="ec-bg-title">Related products</h2>
            <h2 className="ec-title">Related products</h2>
            <p className="sub-title">Browse The Collection of Top Products</p>
          </div>
        </div>
      </div>
      <div className="row margin-minus-b-30">
        {/* Related Product Content */}
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content">
          <div className="ec-product-inner">
            <div className="ec-pro-image-outer">
              <div className="ec-pro-image">
                <a href="product-left-sidebar.html" className="image">
                  <img className="main-image" src="assets/images/product-image/6_1.jpg" alt="Product" />
                  <img className="hover-image" src="assets/images/product-image/6_2.jpg" alt="Product" />
                </a>
                <span className="percentage">20%</span>
                <a href="#" className="quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img src="assets/images/icons/quickview.svg" className="svg_img pro_svg" alt={''}/></a>
                <div className="ec-pro-actions">
                  <a href="compare.html" className="ec-btn-group compare" title="Compare"><img src="assets/images/icons/compare.svg" className="svg_img pro_svg" alt={''}/></a>
                  <button title="Add To Cart" className=" add-to-cart"><img src="assets/images/icons/cart.svg" className="svg_img pro_svg" alt={''}/> Add To Cart</button>
                  <a className="ec-btn-group wishlist" title="Wishlist"><img src="assets/images/icons/wishlist.svg" className="svg_img pro_svg" alt={''}/></a>
                </div>
              </div>
            </div>
            <div className="ec-pro-content">
              <h5 className="ec-pro-title"><a href="product-left-sidebar.html">Round Neck T-Shirt</a></h5>
              <div className="ec-pro-rating">
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star" />
              </div>
              <div className="ec-pro-list-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dutmmy text ever since the 1500s, when an unknown printer took a galley.</div>
              <span className="ec-price">
                <span className="old-price">$27.00</span>
                <span className="new-price">$22.00</span>
              </span>
              <div className="ec-pro-option">
                <div className="ec-pro-color">
                  <span className="ec-pro-opt-label">Color</span>
                  <ul className="ec-opt-swatch ec-change-img">
                    <li className="active"><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/6_1.jpg" data-src-hover="assets/images/product-image/6_1.jpg" data-tooltip="Gray"><span style={{backgroundColor: '#e8c2ff'}} /></a></li>
                    <li><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/6_2.jpg" data-src-hover="assets/images/product-image/6_2.jpg" data-tooltip="Orange"><span style={{backgroundColor: '#9cfdd5'}} /></a></li>
                  </ul>
                </div>
                <div className="ec-pro-size">
                  <span className="ec-pro-opt-label">Size</span>
                  <ul className="ec-opt-size">
                    <li className="active"><a href="#" className="ec-opt-sz" data-old="$25.00" data-new="$20.00" data-tooltip="Small">S</a></li>
                    <li><a href="#" className="ec-opt-sz" data-old="$27.00" data-new="$22.00" data-tooltip="Medium">M</a></li>
                    <li><a href="#" className="ec-opt-sz" data-old="$35.00" data-new="$30.00" data-tooltip="Extra Large">XL</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content">
          <div className="ec-product-inner">
            <div className="ec-pro-image-outer">
              <div className="ec-pro-image">
                <a href="product-left-sidebar.html" className="image">
                  <img className="main-image" src="assets/images/product-image/7_1.jpg" alt="Product" />
                  <img className="hover-image" src="assets/images/product-image/7_2.jpg" alt="Product" />
                </a>
                <span className="percentage">20%</span>
                <span className="flags">
                  <span className="sale">Sale</span>
                </span>
                <a href="#" className="quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img src="assets/images/icons/quickview.svg" className="svg_img pro_svg" alt={''}/></a>
                <div className="ec-pro-actions">
                  <a href="compare.html" className="ec-btn-group compare" title="Compare"><img src="assets/images/icons/compare.svg" className="svg_img pro_svg" alt={''}/></a>
                  <button title="Add To Cart" className=" add-to-cart"><img src="assets/images/icons/cart.svg" className="svg_img pro_svg" alt={''}/> Add To Cart</button>
                  <a className="ec-btn-group wishlist" title="Wishlist"><img src="assets/images/icons/wishlist.svg" className="svg_img pro_svg" alt={''}/></a>
                </div>
              </div>
            </div>
            <div className="ec-pro-content">
              <h5 className="ec-pro-title"><a href="product-left-sidebar.html">Full Sleeve Shirt</a></h5>
              <div className="ec-pro-rating">
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star" />
              </div>
              <div className="ec-pro-list-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dutmmy text ever since the 1500s, when an unknown printer took a galley.</div>
              <span className="ec-price">
                <span className="old-price">$12.00</span>
                <span className="new-price">$10.00</span>
              </span>
              <div className="ec-pro-option">
                <div className="ec-pro-color">
                  <span className="ec-pro-opt-label">Color</span>
                  <ul className="ec-opt-swatch ec-change-img">
                    <li className="active"><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/7_1.jpg" data-src-hover="assets/images/product-image/7_1.jpg" data-tooltip="Gray"><span style={{backgroundColor: '#01f1f1'}} /></a></li>
                    <li><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/7_2.jpg" data-src-hover="assets/images/product-image/7_2.jpg" data-tooltip="Orange"><span style={{backgroundColor: '#b89df8'}} /></a></li>
                  </ul>
                </div>
                <div className="ec-pro-size">
                  <span className="ec-pro-opt-label">Size</span>
                  <ul className="ec-opt-size">
                    <li className="active"><a href="#" className="ec-opt-sz" data-old="$12.00" data-new="$10.00" data-tooltip="Small">S</a></li>
                    <li><a href="#" className="ec-opt-sz" data-old="$15.00" data-new="$12.00" data-tooltip="Medium">M</a></li>
                    <li><a href="#" className="ec-opt-sz" data-old="$20.00" data-new="$17.00" data-tooltip="Extra Large">XL</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content">
          <div className="ec-product-inner">
            <div className="ec-pro-image-outer">
              <div className="ec-pro-image">
                <a href="product-left-sidebar.html" className="image">
                  <img className="main-image" src="assets/images/product-image/1_1.jpg" alt="Product" />
                  <img className="hover-image" src="assets/images/product-image/1_2.jpg" alt="Product" />
                </a>
                <span className="percentage">20%</span>
                <span className="flags">
                  <span className="sale">Sale</span>
                </span>
                <a href="#" className="quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img src="assets/images/icons/quickview.svg" className="svg_img pro_svg" alt={''}/></a>
                <div className="ec-pro-actions">
                  <a href="compare.html" className="ec-btn-group compare" title="Compare"><img src="assets/images/icons/compare.svg" className="svg_img pro_svg" alt={''}/></a>
                  <button title="Add To Cart" className=" add-to-cart"><img src="assets/images/icons/cart.svg" className="svg_img pro_svg" alt={''}/> Add To Cart</button>
                  <a className="ec-btn-group wishlist" title="Wishlist"><img src="assets/images/icons/wishlist.svg" className="svg_img pro_svg" alt={''}/></a>
                </div>
              </div>
            </div>
            <div className="ec-pro-content">
              <h5 className="ec-pro-title"><a href="product-left-sidebar.html">Cute Baby Toy's</a></h5>
              <div className="ec-pro-rating">
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star" />
              </div>
              <div className="ec-pro-list-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dutmmy text ever since the 1500s, when an unknown printer took a galley.</div>
              <span className="ec-price">
                <span className="old-price">$40.00</span>
                <span className="new-price">$30.00</span>
              </span>
              <div className="ec-pro-option">
                <div className="ec-pro-color">
                  <span className="ec-pro-opt-label">Color</span>
                  <ul className="ec-opt-swatch ec-change-img">
                    <li className="active"><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/1_1.jpg" data-src-hover="assets/images/product-image/1_1.jpg" data-tooltip="Gray"><span style={{backgroundColor: '#90cdf7'}} /></a></li>
                    <li><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/1_2.jpg" data-src-hover="assets/images/product-image/1_2.jpg" data-tooltip="Orange"><span style={{backgroundColor: '#ff3b66'}} /></a></li>
                    <li><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/1_3.jpg" data-src-hover="assets/images/product-image/1_3.jpg" data-tooltip="Green"><span style={{backgroundColor: '#ffc476'}} /></a></li>
                    <li><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/1_4.jpg" data-src-hover="assets/images/product-image/1_4.jpg" data-tooltip="Sky Blue"><span style={{backgroundColor: '#1af0ba'}} /></a></li>
                  </ul>
                </div>
                <div className="ec-pro-size">
                  <span className="ec-pro-opt-label">Size</span>
                  <ul className="ec-opt-size">
                    <li className="active"><a href="#" className="ec-opt-sz" data-old="$40.00" data-new="$30.00" data-tooltip="Small">S</a></li>
                    <li><a href="#" className="ec-opt-sz" data-old="$50.00" data-new="$40.00" data-tooltip="Medium">M</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-xs-6 mb-6 pro-gl-content">
          <div className="ec-product-inner">
            <div className="ec-pro-image-outer">
              <div className="ec-pro-image">
                <a href="product-left-sidebar.html" className="image">
                  <img className="main-image" src="assets/images/product-image/2_1.jpg" alt="Product" />
                  <img className="hover-image" src="assets/images/product-image/2_2.jpg" alt="Product" />
                </a>
                <span className="percentage">20%</span>
                <span className="flags">
                  <span className="new">New</span>
                </span>
                <a href="#" className="quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img src="assets/images/icons/quickview.svg" className="svg_img pro_svg" alt={''}/></a>
                <div className="ec-pro-actions">
                  <a href="compare.html" className="ec-btn-group compare" title="Compare"><img src="assets/images/icons/compare.svg" className="svg_img pro_svg" alt={''}/></a>
                  <button title="Add To Cart" className=" add-to-cart"><img src="assets/images/icons/cart.svg" className="svg_img pro_svg" alt={''}/> Add To Cart</button>
                  <a className="ec-btn-group wishlist" title="Wishlist"><img src="assets/images/icons/wishlist.svg" className="svg_img pro_svg" alt={''}/></a>
                </div>
              </div>
            </div>
            <div className="ec-pro-content">
              <h5 className="ec-pro-title"><a href="product-left-sidebar.html">Jumbo Carry Bag</a></h5>
              <div className="ec-pro-rating">
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star fill" />
                <i className="ecicon eci-star" />
              </div>
              <div className="ec-pro-list-desc">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dutmmy text ever since the 1500s, when an unknown printer took a galley.</div>
              <span className="ec-price">
                <span className="old-price">$50.00</span>
                <span className="new-price">$40.00</span>
              </span>                                                
              <div className="ec-pro-option">
                <div className="ec-pro-color">
                  <span className="ec-pro-opt-label">Color</span>
                  <ul className="ec-opt-swatch ec-change-img">
                    <li className="active"><a href="#" className="ec-opt-clr-img" data-src="assets/images/product-image/2_1.jpg" data-src-hover="assets/images/product-image/2_2.jpg" data-tooltip="Gray"><span style={{backgroundColor: '#fdbf04'}} /></a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}
