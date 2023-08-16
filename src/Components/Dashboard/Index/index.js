import React, { useState } from 'react'
import Header from '../../../HeaderComponents/Header'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Typography, Box, Grid, Card, CardMedia, CardContent} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';


export default function Dashboard() {
    // const products = useSelector((state) => state.allProducts.products);
    // const dispatch = useDispatch();

  const [products, setProducts] = useState([])
  const [rating, setRating] = useState();
    console.log("Hello World",products)
  
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products`);
        // dispatch(setProducts(response.data));
        setProducts(response.data)

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
      const { image = '', title = '', description = '', id = '', price = "", rating = {} } = item || {}
      const {rate='', count=''} = rating || {}
      return( 
       
          <Grid item xs={3} >        
          <Box  sx={{width:300, height:300}}>
           <Link style={{textDecoration:"none"}} to={`products/${id}`}>
        <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', 
        display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CardMedia
        component="img"
        sx={{ width: 125, height: 125, objectFit: 'contain', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
        image={image}
        alt={title}
      />
      <CardContent>
        {/* <img src={image} style={{width:100, height:100}}alt={title} /> */}
        <Typography variant='H4' style={{ textDecoration: "none", fontSize: "large" }}>{title}</Typography>
        <div className=''>    
            <div>
                <Typography variant='H4' style={{textDecoration: "none", fontSize:"large", paddingTop:"10px", display: 'flex',
        justifyContent: 'center', alignItems: 'center'}}><AttachMoneyIcon/>{price}</Typography></div>
            {/* <Typography variant="subtitle2">{description}</Typography> */}
        <div><Typography variant='H4'style={{textDecoration:"none", fontSize:"large", paddingTop:"10px", 
        display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Rating: {rate}<GradeIcon /></Typography></div>
        </div>
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
