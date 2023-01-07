// import logo from './logo.svg';
// import './App.css';
// import { useEffect } from "react";
import { BrowserRouter as Router,Navigate,Route,Routes} from "react-router-dom";
import Aboutus from "./Components.js/Aboutus";
import Cart from "./Components.js/Cart";
import Categoryproducts from "./Components.js/Categoryproducts";
import Checkout from "./Components.js/Checkout";
import Forgetpassword from "./Components.js/Forgetpassword";
// import Detailproduct from "./Components.js/Detailproduct";
import Home from "./Components.js/Home";
import Login from "./Components.js/Login";
import Orders from "./Components.js/Orders";
import Passwordchange from "./Components.js/Passwordchange";
import Product from "./Components.js/Product";
import Register from "./Components.js/Register";
import Selled from "./Components.js/Selled";
import Sellmyphone from "./Components.js/Sellmyphone";
import Simplecontextprovider from "./Components.js/Simplecontext";
import Userprofile from "./Components.js/Userprofile";

function App() {
 
  
  return (
    <div className="App">
      <Router>
      <Simplecontextprovider> 
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          {/* <Route exact path="detail/:id" element={<Detailproduct/>}/> */}
          <Route exact path="cart" element={<Cart/>}/>
          <Route exact path="product/:id" element={<Product/>}/>
          <Route exact path="categoryproduct/:model" element={<Categoryproducts/>}/>
          <Route exact path="checkout" element={<Checkout/>} /> 
          <Route exact path="sellmyphone" element={<Sellmyphone/>} /> 
          <Route exact path="login" element={<Login/>} /> 
          <Route exact path="register" element={<Register/>} /> 
          <Route exact path="userprofile" element={<Userprofile/>} /> 
          <Route exact path="orders" element={<Orders/>} /> 
          <Route exact path="selled" element={<Selled/>} /> 
          <Route exact path="aboutus" element={<Aboutus/>} /> 
          <Route exact path="forgetpassword" element={<Forgetpassword/>} /> 
          <Route exact path="passwordchange/:id" element={<Passwordchange/>} /> 
          
        </Routes>
      </Simplecontextprovider>
      </Router>
    </div>
  );
}

export default App;
