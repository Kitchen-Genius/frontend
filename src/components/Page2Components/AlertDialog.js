import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
<Button
  variant="none"
  sx={{
    
    fontSize: 25,
    width: 7,
    height: 4,
    borderRadius: '50%', // Adding this to make it a small circle
    marginRight: 1, // Adding margin for better spacing
    disableElevation: true,
    right: 10,
  }}
  onClick={handleClickOpen}
>
  ...
</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Your ingredeiants:"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
  {props.ingredients.map((ingredient, index) => (
    <div key={index}>{ingredient}</div>
  ))}
</DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
