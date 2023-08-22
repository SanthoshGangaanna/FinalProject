import React, { useState } from 'react'
import Header from '../Header';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {Typography, Box, Grid, Card, CardMedia, CardContent, Tooltip} from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import GradeIcon from '@mui/icons-material/Grade';


export default function Mens() {
    // const products = useSelector((state) => state.allProducts.products);
    // const dispatch = useDispatch();

  const [products, setProducts] = useState([])
  const [rating, setRating] = useState();
  const [search, setSearch] = useState('')
    
  
  const fetchProducts = async (props) => {
      const {search = ''} = props || {} //
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/men's clothing`);
        // dispatch(setProducts(response.data));
        setProducts(response.data)

      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };
    useEffect(() => {
      fetchProducts();
    }, []);
  
  useEffect(() => {
    if (search !== '') {
        const filteredProducts = []; 
        for (const product of products) {
            if (product.title.toLowerCase().includes(search.toLowerCase())) {
                filteredProducts.push(product);
            }
        }
        setProducts(filteredProducts); 
    } else {
        fetchProducts();
    }
  }, [search]);
  
  
  const headerProps = {
    setProducts: setProducts,
    setSearch: setSearch
  }
  
  return (
    <>
      <Header {...headerProps} />
     <Grid container spacing={4}>
    {products?.length > 0 && products?.map((item, index) => {
      const { image = '', title = '', description = '', id = '', price = "", rating = {} } = item || {}
      const {rate='', count=''} = rating || {}
      return( 
       
          <Grid key={index} item xs={3} >        
          <Box  sx={{width:300, height:300}}>
            <Link style={{ textDecoration: "none" }} to={`products/${id}`}>
              <Tooltip title={description} placement="top">
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
        <Grid item>    
            <Grid item>
                <Typography variant='H4' style={{textDecoration: "none", fontSize:"large", paddingTop:"10px", display: 'flex',
        justifyContent: 'center', alignItems: 'center'}}><AttachMoneyIcon/>{price}</Typography></Grid>
            {/* <Typography variant="subtitle2">{description}</Typography> */}
        <Grid item><Typography variant='H4'style={{textDecoration:"none", fontSize:"large", paddingTop:"10px", 
        display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Rating: {rate}<GradeIcon /></Typography></Grid>
        </Grid>
        </CardContent>
                </Card>
                </Tooltip>
            </Link>
            
      </Box>
      </Grid>
    )
    })}
     </Grid>
    </>
  )
}
