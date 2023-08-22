import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard/Index/index';
import ProductDetails from './Components/Dashboard/Product Details/ProductDetails'; 
import AddToCart from './Components/Dashboard/Addtocart/Addtocart';
import Electronics from './HeaderComponents/Menu/Electronics'
import Jewelery from './HeaderComponents/Menu/Jewellery';
import Mens from './HeaderComponents/Menu/Mens';
import Womens from './HeaderComponents/Menu/Womens';



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Dashboard/>} />
          <Route path='/products/:id' element={<ProductDetails />} />
          <Route path="/add-to-cart" element={<AddToCart />} />
          <Route path="/electronics" element={<Electronics />} />
          <Route path="/jewelery" element={<Jewelery/>}/>
          <Route path="/mensclothing" element={<Mens />} />
          <Route path="/womensclothing" element={<Womens/>} />
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;