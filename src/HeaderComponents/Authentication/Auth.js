import React, { useState } from 'react';
import {
  Button,
  TextField,
  Modal,
  Box,
  Typography,
  Menu,
  MenuItem,
} from '@mui/material';
import { json } from 'react-router-dom';

const AuthenticatedUserMenu = ({ name, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
  };

  return (
    <div>
      <Button onClick={handleMenuOpen}>{`Hello, ${name}`}</Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
};

const Login = () => {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

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

    if (
      storedUserData &&
      storedUserData.email === email &&
      storedUserData.password === password
    ) {
      setError(false);
      setLoggedIn(true);
      setUserName(storedUserData.name);
    } else {
      setError(true);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserName('');
  };

  return (
    <div>
      {loggedIn ? (
        <AuthenticatedUserMenu name={userName} onLogout={handleLogout} />
      ) : (
        <Button variant="outlined" onClick={handleOpen}>
          Login
        </Button>
      )}
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            backgroundColor: 'white',
            boxShadow: 24,
            p: 4,
          }}
        >
          {loggedIn ? (
            <Typography variant="body1">
              Logged in Successfully
            </Typography>
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
                helperText={error && 'Invalid email or password'}
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


