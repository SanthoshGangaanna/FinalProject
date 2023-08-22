import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent, CardHeader, CardMedia, Typography } from '@mui/material';
import Header from '../../../HeaderComponents/Header';
import './Addtocart.css'
const AddToCart = () => {
  const [products, setProducts] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then(response => response.json())
      .then(productsData => {
        setProducts(productsData);
      })
      .catch(error => {
        <h2>('Error fetching product data:', error)</h2>;
      });
    
    const storedCartData = JSON.parse(localStorage.getItem('cart')) || [];
    setCartData(storedCartData);
  }, []);

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCartData = cartData.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );
    setCartData(updatedCartData);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  };

  const handleRemoveProduct = productId => {
    const updatedCartData = cartData.filter(item => item.productId !== productId);
    setCartData(updatedCartData);
    localStorage.setItem('cart', JSON.stringify(updatedCartData));
  };

  const getProductTotal = (productPrice, quantity) => {
  const total = productPrice * quantity;
  return total.toFixed(2);
};

const calculateGrandTotal = () => {
  const grandTotal = cartData.reduce((total, cartItem) => {
    const product = products.find(product => product.id === cartItem.productId);
    if (product) {
      const productTotal = getProductTotal(product.price, cartItem.quantity);
      return total + parseFloat(productTotal); 
    }
    return total;
  }, 0);
  return grandTotal.toFixed(2);
};


//   return (
//     <div>
//       <Header/>
//       <div>
//         {cartData.map((cartItem) => {
//           const product = products.find((product) => product.id === cartItem.productId);
//           if (product) {
//             const productTotal = getProductTotal(product.price, cartItem.quantity);
//             return (
//               <Card key={product.id} style={{ marginBottom: '10px' }}>
//                 <CardHeader title={product.title} />
//                 <CardMedia
//                   component="img"
//                   src={product.image}
//                   alt={product.title}
//                   style={{ maxWidth: '100px' }}
//                 />
//                 <CardContent>
//                   <Typography variant="body1">Price: ${product.price}</Typography>
//                   <Typography variant="body1">Total: ${productTotal}</Typography>
//                   <Button
//                     onClick={() =>
//                       handleUpdateQuantity(cartItem.productId, cartItem.quantity + 1)
//                     }
//                     variant="contained"
//                   >
//                     +
//                   </Button>
//                   <Typography variant="body1">Qty: {cartItem.quantity}</Typography>
//                   <Button
//                     onClick={() =>
//                       handleUpdateQuantity(cartItem.productId, cartItem.quantity - 1)
//                     }
//                     disabled={cartItem.quantity === 1}
//                     variant="contained"
//                   >
//                     -
//                   </Button>
//                   <Button
//                     onClick={() => handleRemoveProduct(cartItem.productId)}
//                     variant="contained"
//                     color="error"
//                   >
//                     Remove
//                   </Button>
//                 </CardContent>
//               </Card>
//             );
//           }
//           return null;
//         })}
//       </div>
//       <div>
//         <Typography variant="h3" style={{color:"red"}}>Grand Total: ${calculateGrandTotal()}</Typography>
//       </div>
//     </div>
//   );
// };

return (
    <div>
      <Header />
      <div>
        {cartData.length === 0 ? (
          <Typography variant="h5">Your cart is empty.</Typography>
        ) : (
          cartData.map((cartItem) => {

            const product = products.find(({ id }) => id === cartItem.productId);
            if (product) {
              const productTotal = getProductTotal(product.price, cartItem.quantity);
            return (
              <Card key={product.id} style={{ marginBottom: '10px' }}>
                <CardHeader title={product.title} />
                <CardMedia
                  component="img"
                  src={product.image}
                  alt={product.title}
                  style={{ maxWidth: '100px' }}
                />
                <CardContent>
                  <Typography variant="body1">Price: ${product.price}</Typography>
                  <Typography variant="body1">Total: ${productTotal}</Typography>
                  <div className='QtyStyle'>
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(cartItem.productId, cartItem.quantity + 1)
                    }
                    variant="contained"
                  >
                    +
                  </Button>
                  <Typography variant="body1">Qty: {cartItem.quantity}</Typography>
                  <Button
                    onClick={() =>
                      handleUpdateQuantity(cartItem.productId, cartItem.quantity - 1)
                    }
                    disabled={cartItem.quantity === 1}
                    variant="contained"
                  >
                    -
                    </Button>
                    </div>
                  <Button
                    onClick={() => handleRemoveProduct(cartItem.productId)}
                    variant="contained"
                    color="error"
                  >
                    Remove
                  </Button>
                </CardContent>
              </Card>
            )
            }
            return null;
          })
        )}
      </div>
      {cartData.length > 0 && (
        <div>
          <Typography variant="h4" style={{ color: 'red' }}>
            Grand Total: ${calculateGrandTotal()}
          </Typography>
        </div>
      )}
    </div>
  );
};
export default AddToCart;
