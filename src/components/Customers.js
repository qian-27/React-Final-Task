//import React
import React, { useEffect, useState } from 'react';

//import ag-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

//import mui
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

//import other components
import { API_URL } from '../constants';
import AddCustomer from './AddCustomer';
import EditCustomer from './EditCustomer';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [open,setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const [columnDefs] = useState([
    { field: 'firstname', sortable: true, filter: true, width: 150 },
    { field: 'lastname', sortable: true, filter: true, width: 150 },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true, width: 150 },
    { field: 'city', sortable: true, filter: true, width: 150 },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
    {cellRenderer: params => 
      <EditCustomer 
        params={params.data} 
        updateCustomer={updateCustomer}/>,  
      width: 100
    },
    {cellRenderer: params => 
      <Button 
        size='small' 
        color='error'
        onClick={() => deleteCustomer(params)}
      >
        Delete
      </Button>, 
      width: 120}
  ])

  //Fetch Date & Save Date
  const getCustomers = () => {
    fetch(API_URL + 'customers')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Something went wrong in GET request');
      }
    })
    .then(data => setCustomers(data.content))
    .catch(err => console.error(err))
  }

  //Add Function
  const addCustomer = (customer) => {
    fetch(API_URL + 'customers', {
       method: 'POST',
       headers: {'Content-type':'application/json'},
       body: JSON.stringify(customer)  
    })
    .then(response => {
       if (response.ok) {
          setMsg('Customer added!')
          setOpen(true);
          getCustomers();
       } else {
          alert('Something went wrong in addition: ' + response.statusText);
       }
    })
    .catch(err => console.error(err))
  }

  //Delete Function
  const deleteCustomer=(params) => {
    if (window.confirm('Are you sure?')){
      fetch(params.data.links[0].href, { method: 'DELETE'})
      .then(response => {
        if (response.ok) {
          setOpen(true);
          getCustomers();
        } else {
          alert('Something went wrong in deletion.')
        }
      })
      .catch(err => console.error(err))
    }
  }

  //Edit Function
  const updateCustomer = (updateCustomer, url) => {
    fetch(url, {
      method: 'PUT',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(updateCustomer)
    })
    .then(response => {
      if (response.ok) {
        setMsg('Customer edited!')
        setOpen(true)
        getCustomers();
      } else {
        alert('Something went wrong with editing.');
      }
    })
    .catch(err => console.error(err))
  }

  useEffect(() => getCustomers(), []);

  return (
    <>
    <AddCustomer addCustomer={addCustomer} />
    <div 
      className='ag-theme-material' 
      style={{ width: '90%', height: 600, margin: 'auto'}}>
        <AgGridReact 
          rowData={customers}
          columnDefs={columnDefs}
          pagination={true}
          paginationPageSize={10}
        />
    </div>

    <Snackbar
      open={open}
      message={msg}
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    />
  </>
  )
};

export default Customers;