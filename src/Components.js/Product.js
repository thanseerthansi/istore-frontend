import React, { useEffect, useState } from 'react'
import Header from './Header'
import Scripts from './Scripts'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { Link, useParams } from 'react-router-dom';
import Callaxios from './Callaxios';
import ReactStars from "react-rating-stars-component";
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RiDeleteBin6Line } from 'react-icons/ri';

export default function Product() {
    const [productdetail,setproductdetail]=useState()
  const [storagelist,setstoragelist] = useState([])
  const [istorage,setistorage]=useState()
  const [reviewdata,setreviewdata]=useState([])
  const [reviewaverage,setreviewaverage]=useState()
  const [icondition,seticondition]=useState()//store as array index :value
  const [iprice,setiprice]=useState()//store as array index :value
  const [iquantity,setiquantity]=useState(1)
  const [ogprice,setogprice]=useState()
  const [images,setimages]=useState([])
  const [review,setreview]=useState()
  const [reviename,setreviename]=useState()
  const [reviewmail,setreviewmail]=useState()
  const [starrating,setstarrating]=useState()
  const [viewcart,setviewcart]=useState([])
  const [conditiondata,setconditiondata]=useState([])
  // console.log("quantity",iquantity)
  // console.log("documentquantity",document.getElementById('quantityvalue').value)
  const  urlparam  = useParams()
  let urlid = urlparam.id
    // console.log("reviewdata",reviewdata.length)
    useEffect(() => {
      Scripts()
      getdetailproduct()
      getreview()
      getcondition()
    }, [])

    const notify = (msg) => toast.success(msg, {
      position: "top-center",
      });
    const notifyerror = (msg) => toast.error(msg, {
      position: "top-center",
      });
    const notifyfunction=(e,msg)=>{
      e.preventDefault()
      notifyerror(msg)
    }
    const getdetailproduct=async()=>{
      let data =await Callaxios("get","product/product/",{"id":urlid})
      // console.log("prodetsila",data.data)
      
      if (data.status===200){
        setproductdetail(data.data)
        storagecheck(data.data)
      }
    }
    const storagecheck = (data)=>{
      let list =[];
      // console.log("sellpricesad",data[0].sellprice)
      (data[0].sellprice.split(',')).map((itm)=>{
        // console.log("itm",itm)
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
    const getreview=async()=>{
      let data = await Callaxios("get","purchase/review/",{"product":urlid})
      // console.log("data",data.data)
      if(data.status===200){
        // console.log("daatojk")
        setreviewdata(data.data)
        setreviewaverage(data.data.reduce((n, {review_star}) => n + parseInt(review_star), 0)/data.data.length)
        // setreviewnext(data.data.next)
      }
    }
    const ratingChanged = (newRating) => {
      // console.log(newRating);
      setstarrating(newRating)
    };
    const imageaddtolist = (img)=>{
      // console.log("image",img)
      let imagelist = images.concat(img)
      setimages(imagelist)
    }
    const deletefromlist=(k)=>{
        const splc = images
        splc.splice(k,1)
        setimages(() => [ ...splc]);
      }
    const reviewadd =async(e)=>{
      e.preventDefault()
      // console.log("productdetail",productdetail[0].id)
      const form_data = new FormData();      
      if (images){
          images.map((itm)=>{
              form_data.append("imagelist",itm)
              
          })  
      }
      form_data.append("description",review)
      form_data.append("customer",reviename)
      form_data.append("product",productdetail[0].id)
      form_data.append("review_star",starrating)
    
      let postreview = await Callaxios("post","purchase/review/",form_data)
      console.log("postdata",postreview.data.Status)
      if (postreview.data.Status===200){
        notify("Review added Successfully")
        getreview()
        setimages([])
        setreview('')
        setreviename('')
        setreviewmail('')
        setstarrating('')
      }else{
        notifyerror("Something Went Wrong")
      }
    }
    const addtocartfunction = ()=>{
      let list = []
      let orderlist = window.localStorage.getItem('cart')     
      
      try {
        if (orderlist.length){
          console.log("orderlis3",JSON.parse(orderlist))
          list =  (JSON.parse(orderlist))  
        }else{}      
      } catch (error) {} 
      let cartproduct = {
        "product":productdetail,
        "price":iprice,
        "condition":icondition,
        "storage":istorage,
        "quantity":iquantity,
        // "color":icolor
      }
      let cart = list.concat(cartproduct)
      setviewcart(cart)
      window.localStorage.setItem('cart',JSON.stringify(cart))
      notify("Product Added to cart")
      // return navigate('/')
      
    }
    const incrementhandler =()=>{
      if (iquantity!==10){
        let lessone = iquantity+1
        setiquantity(lessone)
        setiprice(parseFloat(lessone)*parseFloat(ogprice))
      }
    }
    const decrementhandler =()=>{
      if (iquantity!==1){
        // console.log("quanty",iquantity)
        let lessone = iquantity-1
        setiquantity(lessone)
        setiprice(parseFloat(ogprice)*parseFloat(lessone))
        // console.log("price",singleprice)
        
      }
    }
    const getcondition=async()=>{
      let data = await Callaxios("get","product/condition/")
      console.log(data)
      if (data.status===200){
        console.log("datacondition",data.data)
        setconditiondata(()=>[...data.data])
      }
    }
    
  return (
    <div>
        <Header/>
        {/* <div className="ec-side-cart-overlay" />
  <div id="ec-side-cart" className="ec-side-cart">
    <div className="ec-cart-inner">
      <div className="ec-cart-top">
        <div className="ec-cart-title">
          <span className="cart_title">My Cart</span>
          <button className="ec-close">×</button>
        </div>
        <ul className="eccart-pro-items">
          <li>
            <a href="product-left-sidebar.html" className="sidekka_pro_img"><img src="/assets/images/product-image/6_1.jpg" alt="product" /></a>
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
            <a href="product-left-sidebar.html" className="sidekka_pro_img"><img src="/assets/images/product-image/12_1.jpg" alt="product" /></a>
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
            <a href="product-left-sidebar.html" className="sidekka_pro_img"><img src="/assets/images/product-image/3_1.jpg" alt="product" /></a>
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
  </div> */}
  {/* ekka Cart End */}
  {/* Ec breadcrumb start */}
  <ToastContainer/>
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
                <li className="ec-breadcrumb-item"><Link to="/">Home </Link></li>
                <li className="ec-breadcrumb-item active"><span> ></span>Products</li>
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
        <div className="ec-pro-rightside ec-common-rightside col-lg-12 col-md-12">
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
                          <div key={k}>
                              <img src={itm.image}/>
                            
                          </div>
                          )):null}
                       
                          
                      </Carousel>

                      {/* carousealend */}

                      {/* <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="/assets/images/product-image/9_1.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="/assets/images/product-image/9_2.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="/assets/images/product-image/9_3.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="/assets/images/product-image/9_4.jpg" alt={''}/>
                      </div>
                      <div className="single-slide zoom-image-hover">
                        <img className="img-responsive" src="/assets/images/product-image/9_3.jpg" alt={''}/>
                      </div> */}
                    </div>
                    {/* <div className="single-nav-thumb">
                      <div className="single-slide">
                        <img className="img-responsive" src="/assets/images/product-image/9_1.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="/assets/images/product-image/9_2.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="/assets/images/product-image/9_3.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="/assets/images/product-image/9_4.jpg" alt={''}/>
                      </div>
                      <div className="single-slide">
                        <img className="img-responsive" src="/assets/images/product-image/9_3.jpg" alt={''}/>
                      </div>
                    </div> */}
                  </div>
                </div>
                <div className="single-pro-desc">
                  <div className="single-pro-content">
                    <h5 className="ec-single-title">{productdetail ? productdetail[0].title :null}</h5>
                    <div className="ec-single-rating-wrap">
                    {/* <span>ytd : {reviewaverage}</span> */}
                    <ReactStars 
                      key={`stars_${reviewaverage}`}
                      value={reviewaverage ? reviewaverage :0}
                      count={5}
                      size={25}
                      edit={false}
                      isHalf={false}
                      activeColor="#ffd700"
                  />
                  <span className='pt-2 pl-2'><p>({reviewdata.length}-Reviews)</p></span>
                      
                    </div>
                    {/* <div className="ec-single-desc">{productdetail ? productdetail[0].description : null}</div> */}
                    
                    <div className="ec-single-price-stoke">
                      {/* <div className="ec-single-price">
                        <span className="ec-single-ps-title">As low as</span>
                        <span className="new-price">$68.00</span>
                      </div> */}
                      {/* <div className="ec-single-stoke">
                        <span className="ec-single-ps-title">IN STOCK</span>
                        <span className="ec-single-sku">SKU#: WH12</span>
                      </div> */}
                    </div>
                    <div className="ec-pro-variation">
                      <div className="ec-pro-variation-inner ec-pro-variation-size">
                        <span>STORAGE</span>
                        <div className="ec-pro-variation-content">
                          <ul>
                          {storagelist ?
                            storagelist.map((itm,k)=>(
                              
                              // <div key={k} className='p-2'><button onClick={()=>setistorage(itm) &seticondition('') &setiprice('') & setogprice('')} className={istorage === itm ? `bg-gray-700 font-semibold  py-2 px-4 border  text-white border-gray-400  hover:bg-gray-700  rounded`:`bg-gray font-semibold  py-2 px-4 border text-gray-400 hover:text-white border-gray-400  hover:bg-gray-700  rounded`} >{itm}</button></div>
                              <li key={k} className="classheadstyle"  style={istorage === itm ?{backgroundColor:"#143f66",color:"#ffffff"}:{}} onClick={()=>setistorage(itm) &seticondition('') &setiprice('') & setogprice('')}><span >{itm}</span></li>
                            ))
                          :null}
                          </ul>
                        </div>
                      </div>
                      <div className="ec-pro-variation-inner ec-pro-variation-size">
                        <span>PRICE</span>
                        <div className="ec-pro-variation-content">
                          <ul className='text-center ' >
                          {productdetail ? <>
                            {(productdetail[0].sellprice.split(',')).filter(name => name.includes(istorage)).map((itm,i) =>(
                              <li key={i} className='price p-2 classchildstyle '  style={icondition === itm.split('-')[1] ?{backgroundColor:"#13b5e1",color:"#ffffff",height:"60px",width:"130px"}:{height:"60px",width:"130px"}} onClick={()=>seticondition(itm.split('-')[1]) & setiprice(itm.split('-')[2]) &setogprice(itm.split('-')[2])}><span className='text-capitalize '><span className='fw-bold' >{itm.split("-")[1]}</span><br/> AED {itm.split('-')[2]}</span></li>
                              // <div key={k} className='p-2'><button onClick={()=>seticondition(itm.split('-')[1]) & setiprice(itm.split('-')[2]) &setogprice(itm.split('-')[2])} className={`font-semibold ${icondition === itm.split('-')[1]? `text-white bg-gray-700`:`bg-gray text-gray-400`} px-4 border  hover:text-white border-gray-400   hover:bg-gray-700  rounded `}> {itm.split("-")[1]}<br/>AED {itm.split('-')[2]}</button></div>
                            ))}
                          </> :null}
                          </ul>
                        </div>
                      </div>
                      
                    </div>
                    <div className="ec-single-qty ">
                      <div className="d-flex quantitydiv pt-1 item-center">
                        <button onClick={()=>decrementhandler()} className='border border-secondary h-75 px-2'><b> -&nbsp; </b></button>
                        <input className="qty-input  h-75" type="text" name="ec_qtybtn"   onChange={(e)=>setiquantity(e.target.value)} value={iquantity} />
                        <button onClick={()=>incrementhandler()} className='border border-secondary h-75 px-2' style={{padding:"2px"}}><b>+</b></button>
                      </div>
                      <div className="ec-single-cart ">
                        <button onClick={()=>iprice ? addtocartfunction(): notifyerror("Select all fields")} className="btn btn-primary">Add To Cart</button>
                      </div>
                      {/* <div className="ec-single-wishlist">
                        <a className="ec-btn-group wishlist" title="Wishlist"><img src="/assets/images/icons/wishlist.svg" className="svg_img pro_svg" alt={''}/></a>
                      </div> */}
                      {/* <div className="ec-single-quickview">
                        <a href="/" className="ec-btn-group quickview" data-link-action="quickview" title="Quick view" data-bs-toggle="modal" data-bs-target="#ec_quickview_modal"><img src="/assets/images/icons/quickview.svg" className="svg_img pro_svg" alt={''}/></a>
                      </div> */}
                    </div>
                    <div className="ec-single-social">
                      <ul className="mb-0">
                        <li className="list-inline-item facebook"><a href="/"><i className="ecicon eci-facebook" /></a></li>
                        <li className="list-inline-item twitter"><a href="/"><i className="ecicon eci-twitter" /></a></li>
                        <li className="list-inline-item instagram"><a href="/"><i className="ecicon eci-instagram" /></a></li>
                        <li className="list-inline-item youtube-play"><a href="/"><i className="ecicon eci-youtube-play" /></a></li>
                        <li className="list-inline-item behance"><a href="/"><i className="ecicon eci-behance" /></a></li>
                        <li className="list-inline-item whatsapp"><a href="/"><i className="ecicon eci-whatsapp" /></a></li>
                        <li className="list-inline-item plus"><a href="/"><i className="ecicon eci-plus" /></a></li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="single-pro-sidebar   ">
                  {conditiondata.map((itm,k)=>(
                    <div className='pt-2'key={k}>
                    <div  style={{width: '100%',backgroundColor:"#F8F4F4" }}>
                      <div className="ec-sb-pro-sl-item p-2">
                        
                        <div className="ec-pro-content">
                          <h5 className=" single-pro-content ec-single-title text-center" style={{fontFamily:"Montserrat",fontWeight: 900,lineHeight: "30px",fontSize:"16px"}} >{itm.condition}</h5>
                          
                          <ul className='text-center'>
                            {itm.description.split(',').map((cond,c)=>(
                              <li key={c} className='text-capitalize ' style={{fontFamily:"Montserrat",fontWeight:"600",fontSize:"12px"}}> {cond}</li>
                            ))}
                            
                            
                           
                          </ul>
                        </div>
                        
                      </div>
                    </div>
                    </div>
                  ))}
                  

                </div>
                
              </div>
            </div>
          </div>
          {/*Single product content End */}
          {/* sidebar start */}
          
          {/* sidebar end */}
          {/* Single product tab start */}
          <div className="ec-single-pro-tab">
            <div className="ec-single-pro-tab-wrapper">
              <div className="ec-single-pro-tab-nav">
                
                <ul className="nav nav-tabs">
                  <li className="nav-item">
                    <a className="nav-link active" href='/' data-bs-toggle="tab" data-bs-target="#ec-spt-nav-details" role="tablist">Detail</a>
                  </li>
                  {/* <li className="nav-item">
                    <a className="nav-link" href='/' data-bs-toggle="tab" data-bs-target="#ec-spt-nav-info" role="tablist">More Information</a>
                  </li> */}
                  <li className="nav-item">
                    <a className="nav-link" href='/' data-bs-toggle="tab" data-bs-target="#ec-spt-nav-review" role="tablist">Reviews</a>
                  </li>
                </ul>
              </div>
              <div className="tab-content  ec-single-pro-tab-content">
                <div id="ec-spt-nav-details" className="tab-pane fade show active">
                  <div className="ec-single-pro-tab-desc classchildstyle mt-5">
                    {productdetail ? productdetail[0].description.split(',').map((item,key)=>
                    <ul>
                      <li key={key} className='text-capitalize ' style={{fontFamily:"Montserrat",fontWeight:"600",fontSize:"12px"}}> {item}</li>
                    </ul>) : null}
                    
                    {/* <ul>
                      <li>Any Product types that You want - Simple, Configurable</li>
                      <li>Downloadable/Digital Products, Virtual Products</li>
                      <li>Inventory Management with Backordered items</li>
                      <li>Flatlock seams throughout.</li>
                    </ul> */}
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
                    <div className="ec-t-review-wrapper ">
                      
                      {reviewdata.length ? reviewdata.map((itm,k)=>(
                        <div key={k} className="ec-t-review-item pt-2">
                        <div className="ec-t-review-avtar">   
                          {itm.images[0] ?  itm.images.map((imge,i)=>(
                            <img  key={i} src={imge.image} alt={''} height='auto' width={'160'} />
                          )):null}
                          
                          
                        </div>
                        <div className="ec-t-review-content">
                          <div className="ec-t-review-top">
                            <div className="ec-t-review-name classheadstyle">{itm.customer}</div>
                            <ReactStars 
                              value={itm.review_star}
                              count={5}
                              size={25}
                              edit={false}
                              isHalf={false}
                              activeColor="#ffd700"
                            />
                          </div>
                          <div className="ec-t-review-bottom ">
                            <p  style={{fontFamily:"Montserrat",fontWeight:"600",fontSize:"12px"}}>{itm.description}
                            </p>
                          </div>
                        </div>
                        <hr className="bg-secondary border-1 border-top border-secondary" />

                      </div>
                 
                      )) :null}
                      
                      
                    </div>
                    <div className="ec-ratting-content row">
                      <h3>Add a Review</h3>
                      <div className="ec-ratting-form col-md-8">
                        <form onSubmit={(e)=>starrating  ? reviewadd(e):notifyfunction(e,"fill all the fields")}>
                          <div className="ec-ratting-star">
                            <span>Your rating:</span>
                            <ReactStars
                              count={5}
                              onChange={ratingChanged}
                              size={24}
                              activeColor="#ffd700"
                            />
                          </div>
                          
                          <div className="ec-ratting-input">
                            <input className='border border-secondary border-bottom-0' name="your-name" onChange={(e)=>setreviename(e.target.value)} value={reviename} placeholder="Name" type="text" required />
                          </div>
                          <div className="ec-ratting-input">
                            <input className='border border-secondary border-bottom-0' name="your-email" onChange={(e)=>setreviewmail(e.target.value)} value={reviewmail} placeholder="Email*" type="email" required />
                          </div>
                          <div className="ec-ratting-input form-submit">
                            <textarea onChange={(e)=>setreview(e.target.value)} value={review} name="your-commemt" placeholder="Enter Your Comment" defaultValue={""} required />
                            <div className='row'>
                              <div className='col-12 '>

                              
                            {images ?
                              <>
                              
                              {images.map((itm,k)=>(
                                  <div key={k} className="col-6 pt-1"> 
                                  <div className='d-flex w-25'>
                                  <img  className='rounded '  src={ URL.createObjectURL(itm)} alt='img' />
                                  <button type='button' className='pl-2 hover:text-red-600 ' onClick={()=>deletefromlist(k)}>< RiDeleteBin6Line /></button>
                                  </div>
                              </div> 
                              ))}
                                                                      
                            </>: null}
                            </div>
                            </div>
                                <label className='font-bold'><b>Add Images :</b></label><br/>
                              <input  onChange={(e)=>e.target.files[0] !== undefined ? imageaddtolist(e.target.files[0]):''} style={{color: "rgba(0, 0, 0, 0)"}} value={''} type='file' className='border border-gray-600 inputfile rounded '/>
                      
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
    <Footer/>
    </div>
  )
}
