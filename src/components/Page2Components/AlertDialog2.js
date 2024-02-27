import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog2(props) {
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
    right: 10,
    fontSize: 25,
    width: 7,
    height: 4,
    borderRadius: '50%', // Adding this to make it a small circle
    marginRight: 1, // Adding margin for better spacing
    disableElevation: true,
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
          {"Your Intolerances:"}
        </DialogTitle>
        <DialogContent>
        <DialogContentText id="alert-dialog-description">
  {props.Intolerances.map((intolerances, index) => (
    <div key={index}>{intolerances}</div>
  ))}
</DialogContentText>
        </DialogContent>
        <DialogActions>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
