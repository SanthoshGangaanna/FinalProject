import React, { useState } from 'react'
import Header from '../../Header Components/Header'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Typography, Box, Grid, Card, CardMedia, CardContent} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';


export default function Dashboard() {
    // const products = useSelector((state) => state.allProducts.products);
    // const dispatch = useDispatch();

    const [products, setProducts] = useState([])
    console.log("Hello World",products)
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
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
  return (
    <>
    <Header/>
     <Grid container spacing={4}>
    {products?.length > 0 && products?.map((item, index) => {
      const {image = '', title = '', description='', id = '', price=""} = item || {}
      return( 
       
          <Grid item xs={3} >        
          <Box  sx={{width:300, height:300}}>
           <Link style={{textDecoration:"none"}} to={`products/${id}`}>
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', 
        display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
        component="img"
        sx={{ width: 150, height: 150, objectFit: 'contain', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        image={image}
        alt={title}
      />
      <CardContent>
        {/* <img src={image} style={{width:100, height:100}}alt={title} /> */}
        <Typography variant='H4' style={{textDecoration:"none", fontSize:"large"}}>{title}</Typography>
        <div><Typography variant='H4'style={{textDecoration:"none", 
        fontSize:"large", padding:"10px", display: 'flex',
        justifyContent: 'center', alignItems: 'center'}}><AttachMoneyIcon/>{price}</Typography></div>
        {/* <Typography variant="subtitle2">{description}</Typography> */}
        </CardContent>
        </Card>
      </Link>
      </Box>
      </Grid>
    )
    })}
     </Grid>
    </>
  )
}
