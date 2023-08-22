import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';

const Signup = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });
  const [signedUp, setSignedUp] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
    setPassword('');
    setErrors({
      name: false,
      email: false,
      password: false,
    });
  };

  const handleSignup = () => {
    let hasErrors = false;
    const newErrors = {
      name: !name,
      email: !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      password: !password || password.length < 6,
    };

    if (newErrors.name || newErrors.email || newErrors.password) {
      hasErrors = true;
      setErrors(newErrors);
    }

    if (!hasErrors) {
      const userData = { name, email, password };
      localStorage.setItem('userData', JSON.stringify(userData));
      setSignedUp(true);
    }
    fetch('https://fakestoreapi.com/users',{
            method:"POST",
            body:JSON.stringify(
                {
                    email:'vengatesh@codenatives.com',
                    username:'vengatesh',
                    password:'Qwerty@123',
                    name:{
                        firstname:'Vengatesh',
                        lastname:'Raman'
                    },
                    address:{
                        city:'kilcoole',
                        street:'7835 new road',
                        number:3,
                        zipcode:'12926-3874',
                        geolocation:{
                            lat:'-37.3159',
                            long:'81.1496'
                        }
                    },
                    phone:'1-570-236-7033'
                }
            )
        })
            .then(res=>res.json())
            .then(json=>console.log(json))
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Signup
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {signedUp ? (
            <div>
              <Typography variant="body1">
              Signed up Successfully
      </Typography>
            </div>
          ) : (
            <div>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                margin="normal"
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={errors.name}
                helperText={errors.name && 'Name is required'}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={errors.email}
                helperText={errors.email && 'Enter a valid email'}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                helperText={
                  errors.password &&
                  'Password must be at least 6 characters long'
                }
              />
              <Button variant="contained" color="primary" onClick={handleSignup}>
                Sign Up
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Signup;

