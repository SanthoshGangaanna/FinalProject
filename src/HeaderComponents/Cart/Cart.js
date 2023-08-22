import React from 'react';
import { Link } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Cart() {
  return (
          <Link to="/add-to-cart">
            <ShoppingCartIcon />
          </Link>
  );
}

export default Cart;
