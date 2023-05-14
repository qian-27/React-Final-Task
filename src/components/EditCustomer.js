import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
// import { color } from '@mui/system';

export default function EditCustomer(props) {
   const [open, setOpen] = React.useState(false);
   const [customer, setCustomers] = React.useState({
      firstname: '',
      lastname: '',
      streetaddress: '',
      postcode: '',
      city: '',
      email: '',
      phone: ''
   });

   const handleClose = () => {
      setOpen(false);
   };

   const handleSave = () => {
      props.updateCustomer(customer, props.params.links[1].href)
      setOpen(false);
   };

   const handleClickOpen = () => {
      // console.log(props.params);
      setCustomers({
         firstname: '',
         lastname: '',
         streetaddress: '',
         postcode: '',
         city: '',
         email: '',
         phone: ''
      })
      setOpen(true);
   };

  return (
    <div>
      <Button size="small" onClick={handleClickOpen}>
         Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Customer</DialogTitle>
        <DialogContent>
            <TextField
               value={customer.firstname}
               onChange={e => setCustomers({...customer, firstname: e.target.value})}
               margin="dense"
               label="First Name"
               fullWidth
               variant="standard"
            />

            <TextField
               value={customer.lastname}
               onChange={e => setCustomers({...customer, lastname: e.target.value})}
               margin="dense"
               label="Last Name"
               fullWidth
               variant="standard"
            />

            <TextField
               value={customer.streetaddress}
               onChange={e => setCustomers({...customer, streetaddress: e.target.value})}
               margin="dense"
               label="Street Address"
               fullWidth
               variant="standard"
            />

            <TextField
               value={customer.postcode}
               onChange={e => setCustomers({...customer, postcode: e.target.value})}
               margin="dense"
               label="Postcode"
               fullWidth
               variant="standard"
            />

            <TextField
               value={customer.city}
               onChange={e => setCustomers({...customer, city: e.target.value})}
               margin="dense"
               label="City"
               fullWidth
               variant="standard"
            />

            <TextField
               value={customer.email}
               onChange={e => setCustomers({...customer, email: e.target.value})}
               margin="dense"
               label="Email"
               fullWidth
               variant="standard"
            />

            <TextField
               value={customer.phone}
               onChange={e => setCustomers({...customer, phone: e.target.value})}
               margin="dense"
               label="phone"
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