import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Scripts from './Scripts';
import { Simplecontext } from './Simplecontext';
import Footer from './Footer';
export default function Userprofile() {
    const {accesscheck} =useContext(Simplecontext)
    useEffect(() => {
        Scripts()
        accesscheck()
      }, [])
  return (
    <div>
        <Header/>
        <ToastContainer/>
     {/* Ec breadcrumb start */}
    <div className="sticky-header-next-sec  ec-breadcrumb section-space-mb">
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="row ec_breadcrumb_inner">
            <div className="col-md-6 col-sm-12">
              <h2 className="ec-breadcrumb-title">User Profile</h2>
            </div>
            <div className="col-md-6 col-sm-12">
              {/* ec-breadcrumb-list start */}
              <ul className="ec-breadcrumb-list">
                <li className="ec-breadcrumb-item"><Link to="/">Home ></Link></li>
                <li className="ec-breadcrumb-item active"><span>  </span>Profile</li>
              </ul>
              {/* ec-breadcrumb-list end */}
            </div>
          </div>
        </div>
      </div>
    </div>
     </div>
    {/* Ec breadcrumb end */}
    {/* content start */}
    <section className="ec-page-content ec-vendor-uploads ec-user-account section-space-p">
    <div className="container">
        <div className="row">
        {/* Sidebar Area Start */}
        <div className="ec-shop-leftside ec-vendor-sidebar col-lg-3 col-md-12">
            <div className="ec-sidebar-wrap">
            {/* Sidebar Category Block */}
            <div className="ec-sidebar-block">
                <div className="ec-vendor-block">
                {/* <div class="ec-vendor-block-bg"></div>
                            <div class="ec-vendor-block-detail">
                                <img class="v-img" src="assets/images/user/1.jpg" alt="vendor image">
                                <h5>Mariana Johns</h5>
                            </div> */}
                <div className="ec-vendor-block-items">
                    <ul>
                    <li><Link to="/userprofile">User Profile</Link></li>
                    <li><Link to="/orders">Orders</Link></li>                  
                    <li><Link to="/selled">Sells</Link></li>
                    <li><a href="cart.html">Cart</a></li>
                    <li><a href="checkout.html">Checkout</a></li>
                    <li><a href="track-order.html">Track Order</a></li>
                    <li><a href="user-invoice.html">Invoice</a></li>
                    </ul>
                </div>
                </div>
            </div>
            </div>
        </div>
        <div className="ec-shop-rightside col-lg-9 col-md-12">
            <div className="ec-vendor-dashboard-card ec-vendor-setting-card">
            <div className="ec-vendor-card-body">
                <div className="row">
                <div className="col-md-12">
                    <div className="ec-vendor-block-profile">
                    
                    <h5>Account Information</h5>
                    <div className="row">
                        <div className="col-md-6 col-sm-12">
                        <div className="ec-vendor-detail-block ec-vendor-block-email space-bottom-30">
                            <h6>E-mail address <a href="/" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="assets/images/icons/edit.svg" className="svg_img pro_svg" alt="edit" /></a></h6>
                            <ul>
                            <li><strong>Email 1 : </strong>support1@exapmle.com</li>
                            <li><strong>Email 2 : </strong>support2@exapmle.com</li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                        <div className="ec-vendor-detail-block ec-vendor-block-contact space-bottom-30">
                            <h6>Contact nubmer<a href="/" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="assets/images/icons/edit.svg" className="svg_img pro_svg" alt="edit" /></a></h6>
                            <ul>
                            <li><strong>Phone Nubmer 1 : </strong>(123) 123 456 7890</li>
                            <li><strong>Phone Nubmer 2 : </strong>(123) 123 456 7890</li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                        <div className="ec-vendor-detail-block ec-vendor-block-address mar-b-30">
                            <h6>Address<a href="javasript:void(0)" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="assets/images/icons/edit.svg" className="svg_img pro_svg" alt="edit" /></a></h6>
                            <ul>
                            <li><strong>Home : </strong>123, 2150 Sycamore Street, dummy text of
                                the, San Jose, California - 95131.</li>
                            </ul>
                        </div>
                        </div>
                        <div className="col-md-6 col-sm-12">
                        <div className="ec-vendor-detail-block ec-vendor-block-address">
                            <h6>Shipping Address<a href="javasript:void(0)" data-link-action="editmodal" title="Edit Detail" data-bs-toggle="modal" data-bs-target="#edit_modal"><img src="assets/images/icons/edit.svg" className="svg_img pro_svg" alt="edit" /></a></h6>
                            <ul>
                            <li><strong>Office : </strong>123, 2150 Sycamore Street, dummy text of
                                the, San Jose, California - 95131.</li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </div>
    </section>

    {/* content end */}
    <Footer/>
    {/* model start */}
 {/* Modal */}
<div className="modal fade" id="edit_modal" tabIndex={-1} role="dialog">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-body">
        <div className="row">
          <div className="ec-vendor-block-img space-bottom-30">
            
           
            <div className="ec-vendor-upload-detail">
              <form className="row g-3">
                <div className="col-md-6 space-t-15">
                  <label className="form-label">First name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Last name</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-12 space-t-15">
                  <label className="form-label">Address 1</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-12 space-t-15">
                  <label className="form-label">Address 2</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-12 space-t-15">
                  <label className="form-label">Address 3</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Email id 1</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Email id 2</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Phone number 1</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-6 space-t-15">
                  <label className="form-label">Phone number 2</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-md-12 space-t-15">
                  <button type="submit" className="btn btn-primary">Update</button>
                  <a href="#" className="btn btn-lg btn-secondary qty_close" data-bs-dismiss="modal" aria-label="Close">Close</a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Modal end */}

    {/* model end */}
    </div>
    )
}
