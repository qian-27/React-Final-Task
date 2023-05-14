//import React
import React, { useEffect, useState } from 'react';

//import ag-grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

//import mui
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';

//import Day.js
import dayjs from 'dayjs';

//import other components
import { API_URL } from '../constants';
import AddTraining from './AddTraining';

const Trainings = () => {
  const [trainings, setTrainings] = useState([])
  const [open,setOpen] = useState(false);
  const [msg, setMsg] = useState('');

  const customDateFormatter = (params) => {
    return dayjs(params.value).format('DD.MM.YYYY HH:mm');
  }

  const [columnDefs] = useState([
    { field: 'date', sortable: true, filter: true, valueFormatter: customDateFormatter},
    { field: 'duration', sortable: true, filter: true },
    { field: 'activity', sortable: true, filter: true },
    { field: 'customer', sortable: true, filter: true },
    {cellRenderer: params => 
      <Button 
        size='small' 
        color='error'
        onClick={() => deleteTraining(params)}
      >
        Delete
      </Button>, 
      width: 120}
  ])

  //Fetch Customer's name
  const getCustomerName = (training) => {
    return fetch(training.links[2].href)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong in GET request for customer name');
        }
      })
      .then(customerName => {
        return {
          ...training,
          customer: `${customerName.firstname} ${customerName.lastname}`
        };
      });
  }
  
  //Fetch Training Data and merge with customers' name
  const getTrainings = () => {
    fetch(API_URL + 'trainings')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Something went wrong in GET request');
      }
    })
    .then(data => {
      const trainingData = data.content.map(getCustomerName);
      return Promise.all(trainingData);
    })
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }
  
  //Add Function
  const addTraining = (training) => {
    fetch(API_URL + 'trainings', {
      method: 'POST',
      headers: {'Content-type':'application/json'},
      body: JSON.stringify(training)  
    })
    .then(response => {
      if (response.ok) {
        setMsg('Training added!')
        setOpen(true);
        getTrainings();
      } else {
        alert('Something went wrong in addition: ' + response.statusText);
      }
    })
    .catch(err => console.error(err))
  }

  //Delete Function
  const deleteTraining=(params) => {
    if (window.confirm('Are you sure?')){
      fetch(params.data.links[0].href, { method: 'DELETE'})
      .then(response => {
        if (response.ok) {
          setOpen(true);
          getTrainings();
        } else {
          alert('Something went wrong in deletion.')
        }
      })
       .catch(err => console.error(err))
    }
  }

  useEffect(() => getTrainings(), []);

  return (
    <>
    <AddTraining addTraining={addTraining} />
    <div 
      className='ag-theme-material' 
      style={{ width: '90%', height: 600, margin: 'auto'}}>
        <AgGridReact 
          rowData={trainings}
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

export default Trainings;