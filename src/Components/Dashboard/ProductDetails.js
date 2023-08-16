import React, { useState } from 'react'
import Header from '../../Header Components/Header'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {Typography, Box, Grid, Card, CardMedia, CardContent} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "./ProductDetails.css"

export default function ProductDetails() {
    // const products = useSelector((state) => state.allProducts.products);
    // const dispatch = useDispatch();
    const params = useParams();
    const {id: productId = ''} = params || {}

    const [products, setProducts] = useState([])
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        // dispatch(setProducts(response.data));
        setProducts(response.data)
        console.log(response, "Heello")
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
  
  const {rate="4.1",count= "259"} = rating|| {}
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
        justifyContent: 'center', alignItems: 'center'}}><AttachMoneyIcon/>{price}</Typography></div>
  
     </div>
     </div>
     </div>

    </>
  )
}
