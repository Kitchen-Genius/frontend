import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import bellImage from "./../my_Images/bell.png";
import { setUser } from './Store';
import { useDispatch } from 'react-redux';

const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
  
    if (!isValidEmail(email)) {
      alert('Invalid email format');
      return;
    }
    if (password === "") {
      alert('Must insert password');
      return;
    }

    let apiBaseUrl;
    
    apiBaseUrl = "https://frontend-41ag.onrender.com";
  
    const serverEndpoint = `${apiBaseUrl}/auth/login`;
  
    try {
      const response = await fetch(serverEndpoint, {  // Use serverEndpoint here
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) {   
        console.error('Server error:', response.statusText);
        alert('Server error. Please try again.');
        return;
      }
  
      const responseData = await response.json();
  
      if (responseData.valid_user === true) {
        dispatch(setUser({ email, password, username: "", imgUrl: "", id: 0, liked: false }));
        navigate('/components/Home');
      } else {
        alert('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        > 
         <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
         <img src={bellImage} alt="kitchengenius.png" />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
           
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}