import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import bellImage from "./../my_Images/bell.png";
import { setUser } from './Store';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';

const defaultTheme = createTheme();
// this component provides a user interface for signing in with an email address and password,
// validates the input, and interacts with the server for authentication.
export default function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email) => { // in here we checks if we got valid email format 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => { // handleSubmit is sending the user email and password to the server
    // in the server we check the information and sees if it existing in the database 
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

    apiBaseUrl = "https://backend-wp4c.onrender.com/auth/login";

    try {
      const response = await axios.post(apiBaseUrl, { email, password });

      if (!response.data) {
        console.error('Server error:', response.statusText);
        alert('Server error. Please try again.');
        return;
      }

      if (typeof response.data === "object") {
       
        dispatch(setUser({ email, password, username: response.data.name, imgUrl: response.data.img_link, id: response.data.user_id, liked: false }));
        // in here we adding all the necessary information to the ridux user variable
        navigate('/components/Home');
        // the navigate function takes us to the home page
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/components/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
