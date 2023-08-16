import React, { useState } from 'react';
import { Button, TextField, Modal, Box, Typography } from '@mui/material';

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    resetForm();
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setError(false);
  };

  const handleLogin = () => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));

    if (storedUserData && storedUserData.email === email && storedUserData.password === password) {
      setError(false);
      setLoggedIn(true);
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Login
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
          {loggedIn ? (
            <div>
              <Typography variant="body1">
                Logged in Successfully
              </Typography>
            </div>
          ) : (
            <div>
              <Typography variant='h4'>Login</Typography>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                helperText={error && 'Invalid email or password'}
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={error}
              />
              <Button variant="contained" color="primary" onClick={handleLogin}>
                Login
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Login;
