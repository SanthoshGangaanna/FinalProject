import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import ProductDetails from './Components/Dashboard/ProductDetails';



function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>

      <Route path='/' element={<Dashboard/>} />
      <Route path='/products/:id' element={<ProductDetails/>} />
      
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;