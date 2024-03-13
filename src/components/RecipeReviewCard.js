import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../components/Store';
import Button from '@mui/material/Button';
import { GolfCourseRounded } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const FavoriteIconButton = styled(IconButton)(({ theme, isLiked }) => ({
  color: isLiked ? red[500] : theme.palette.text.secondary,
}));

export default function RecipeReviewCard(props) {
  const [isLiked, setIsLiked] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [clickAble, setClickAble] = useState(true);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleFavoriteClick = () => {
    if (clickAble) {
      setOpenDialog(true);
    }
  };

  const handleDialogClose = () => {
    setIsLiked(false);
    setOpenDialog(false);
    setClickAble(false);
  
    // Send data to the server
    const dataToSend = {
      userId: user.id,
      recipeId: props.recipeData.id,
      isLiked: false
    };
  
    // Example of sending data to the server using axios
    axios.post('YOUR_SERVER_ENDPOINT', dataToSend)
      .then(response => {
        // Handle response if needed
        console.log('Data sent successfully:', response.data);
        
      })
      .catch(error => {
        // Handle error if needed
        console.error('Error sending data:', error);
      });
  };
  
  const handleRemoveFromFavorites = () => {
    setIsLiked(true);
    setOpenDialog(false);
   
  };

  const moveToRecipie = () => {
    if (clickAble) {
      // Send user ID to the server
      axios.post('YOUR_SERVER_ENDPOINT', { userId: user.id })
        .then(response => {
          // Handle response
          const  json = response.data;
  
          // Navigate to the next page and pass the received data
          navigate('/components/Page3Components/HomeP3', { state: { value: props.recipeData, Json: json } });
        })
        .catch(error => {
          // Handle error if needed
          console.error('Error sending user ID to server:', error);
        });
    }
  };
  
  return (
    <Card sx={{ maxWidth: 300, marginBottom: '10px' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={props.recipeData.title}
      />
      <CardMedia component="img" height="150" image={props.recipeData.image} alt="Paella dish" />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        This recipe is a delightful combination of flavors and textures, sure to impress your guests at any gathering. Feel free to customize it to your liking with additional ingredients or substitutions
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <FavoriteIconButton
          aria-label="add to favorites"
          onClick={handleFavoriteClick}
          isLiked={isLiked}
        >
          <FavoriteIcon />
        </FavoriteIconButton>
        <Button onClick={moveToRecipie} variant="outlined">View Recipie</Button>
      </CardActions>

      <Dialog open={openDialog} onClose={handleDialogClose}>
        <DialogTitle>Remove from Favorites</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this recipe from your favorites?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={handleRemoveFromFavorites}>
            <FavoriteIcon color="error" />
          </IconButton>
          <IconButton onClick={handleDialogClose}>
            <Typography color="error">Remove</Typography>
          </IconButton>
        </DialogActions>
      </Dialog>
    </Card>
  );
}
