//import React
import React, { useEffect, useState } from 'react';

//import ag-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

//import mui
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [open,setOpen] = useState(false);

  const [columnDefs] = useState([
    { field: 'firstname', sortable: true, filter: true, width: 150 },
    { field: 'lastname', sortable: true, filter: true, width: 150 },
    { field: 'streetaddress', sortable: true, filter: true },
    { field: 'postcode', sortable: true, filter: true, width: 150 },
    { field: 'city', sortable: true, filter: true, width: 150 },
    { field: 'email', sortable: true, filter: true },
    { field: 'phone', sortable: true, filter: true },
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
  const fetchData = () => {
    fetch('http://traineeapp.azurewebsites.net/api/customers')
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

  useEffect(() => fetchData(), []);

  //Delete Function
  const deleteCustomer=(params) => {
    if (window.confirm('Are you sure?')){
      fetch(params.data.links[0].href, { method: 'DELETE'})
      .then(response => {
        if (response.ok) {
          setOpen(true);
          fetchData();
        } else {
          alert('Something went wrong in deletion.')
        }
      })
      .catch(err => console.error(err))
    }
  }

  return (
    <>
    <div 
      className='ag-theme-material' 
      style={{ width: '90%', height: 600, margin: 'auto'}}
    >
      <AgGridReact 
        rowData={customers}
        columnDefs={columnDefs}
        pagination={true}
        paginationPageSize={10}
      />

    </div>

    <Snackbar
      open={open}
      message="It is successful deleted!"
      autoHideDuration={3000}
      onClose={() => setOpen(false)}
    />
  </>
  )
};

export default Customers;