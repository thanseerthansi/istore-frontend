// import logo from './logo.svg';
// import './App.css';
// import { useEffect } from "react";
import { BrowserRouter as Router,Navigate,Route,Routes} from "react-router-dom";
import Cart from "./Components.js/Cart";
import Categoryproducts from "./Components.js/Categoryproducts";
import Checkout from "./Components.js/Checkout";
// import Detailproduct from "./Components.js/Detailproduct";
import Home from "./Components.js/Home";
import Product from "./Components.js/Product";
import Sellmyphone from "./Components.js/Sellmyphone";
import Simplecontextprovider from "./Components.js/Simplecontext";

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
        </Routes>
      </Simplecontextprovider>
      </Router>
    </div>
  );
}

export default App;
