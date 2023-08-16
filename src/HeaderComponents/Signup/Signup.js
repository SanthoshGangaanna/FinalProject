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

    // Check for errors
    if (newErrors.name || newErrors.email || newErrors.password) {
      hasErrors = true;
      setErrors(newErrors);
    }

    if (!hasErrors) {
      const userData = { name, email, password };
      localStorage.setItem('userData', JSON.stringify(userData));
      setSignedUp(true);
    }
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
            bgcolor: 'background.paper',
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
