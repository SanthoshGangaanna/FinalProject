import React, { useState } from 'react'
import Header from '../../../HeaderComponents/Header'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Typography, Box, Grid, Card, CardMedia, CardContent, TextField, Button, Stack} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "./ProductDetails.css"
import GradeIcon from '@mui/icons-material/Grade';

export default function ProductDetails() {
    // const products = useSelector((state) => state.allProducts.products);
    // const dispatch = useDispatch();
    const params = useParams();
    const {id: productId = ''} = params || {}

  const [products, setProducts] = useState([])
  const [Quantity, setQuantity] = useState(0)
  
    const fetchProducts = async () => {
      
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        // dispatch(setProducts(response.data));
        setProducts(response.data)
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);

    const {
      id='',
      title= "Mens Casual Premium Slim Fit T-Shirts ",
      price= "22.3",
      description= "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
      category= "men's clothing",
      image= "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
      rating= {}
  } = products || {}
  
  const { rate = "4.1", count = "259" } = rating || {}
  const handleQty = (e) => {
    e.preventDefault();
    const newValue = parseInt(e.target.value);
    if (newValue >= 0) {
      setQuantity(newValue);
    } else {
       setQuantity(0);
    }
  }

const handleAddToCart = () => {
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProductIndex = existingCart.findIndex(item => item.productId === id);
  if (existingProductIndex !== -1) {
    console.log('Quantity>', parseInt(existingCart[existingProductIndex].quantity+Quantity))
    existingCart[existingProductIndex].quantity = parseInt(existingCart[existingProductIndex].quantity + Quantity);
  } else {
    existingCart.push({ productId: id, quantity: Quantity });
  }


  localStorage.setItem('cart', JSON.stringify(existingCart));
};



  return (
    <>
    <Header/>
    <div className='OuterOuterContainer'>
    <div className='OuterContainer'>
    <img className='ImageContainer' src={image} alt={title} />
    <div className='CardContainer'spacing={10}>
        <Typography variant='H1' className='TitleStyle' >{title}</Typography>
        <Typography variant="H1">{description}</Typography>
        <div><Typography variant='H4'style={{textDecoration:"none", 
        fontSize:"large", padding:"10px", display: 'flex',
        justifyContent: 'center', alignItems: 'center'}}>Price:<AttachMoneyIcon/>{price}</Typography></div>
        <div><Typography variant='H4'style={{textDecoration:"none", 
        fontSize:"large", padding:"5px", display: 'flex',
              justifyContent: 'center', alignItems: 'center'
            }}>Rating:{rate}<GradeIcon /></Typography></div>
          
        <Stack spacing={3}>
               <TextField value={Quantity} label="Qty" min="0" variant="outlined"
                size="small" type='number' onChange={handleQty} style={{ width: 80 }} />
              <Button variant='contained' onClick={()=>handleAddToCart(productId)}>Add to cart</Button>
        </Stack>  
     </div>
     </div>
     </div>

    </>
 
  )
}
