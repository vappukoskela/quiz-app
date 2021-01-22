import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddCircleIcon from '@material-ui/icons/AddCircle';

function NewQuizDialog(props) {
  const [open, setOpen] = React.useState(false);
  const [quizname, setQuizname] = useState("")

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = (event) => {
      handleClose();
      props.addNewQuiz(quizname);
  }

  return (
    <div>
     <Button onClick={handleClickOpen}><AddCircleIcon /> Add new quiz </Button> 
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create New Quiz</DialogTitle>
        <DialogContent>
     
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Quiz name"
            fullWidth
            onChange={(e)=>setQuizname(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Create new quiz
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default NewQuizDialog;
