import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function AddTraining({ addTraining }) {
  const [open, setOpen] = useState(false);
  const [training, setTraining] = useState({
    date: new Date(),
    duration: '',
    activity: '',
    customer: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    addTraining(training);
    setOpen(false);
    setTraining({
      date: new Date(),
      duration: '',
      activity: '',
      customer: '',
    });
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add Training
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Training</DialogTitle>
        <DialogContent>
          <DatePicker
            selected={training.date}
            onChange={(date) => setTraining({ ...training, date })}
            dateFormat="yyyy-MM-dd"
            customInput={<TextField label="Date" fullWidth />}
          />
          <TextField
            value={training.duration}
            onChange={(e) => setTraining({ ...training, duration: e.target.value })}
            margin="dense"
            label="Duration"
            fullWidth
            variant="standard"
          />
          <TextField
            value={training.activity}
            onChange={(e) => setTraining({ ...training, activity: e.target.value })}
            margin="dense"
            label="Activity"
            fullWidth
            variant="standard"
          />
          <TextField
            value={training.customer}
            onChange={(e) => setTraining({ ...training, customer: e.target.value })}
            margin="dense"
            label="Customer Id"
            fullWidth
            variant="standard"
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


