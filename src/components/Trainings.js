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

const Trainings = () => {
  const [trainings, setTrainings] = useState([])
  const [open,setOpen] = useState(false);

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

  const fetchData = () => {
    fetch('http://traineeapp.azurewebsites.net/api/trainings')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Something went wrong in GET request');
      }
    })
    .then(data => {
      const trainingData = data.content.map(training => {
        return fetch(training.links[2].href)
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Something went wrong in GET request for customer name');
            }
          })

          // Merge the customer name with the training data
          .then(customerName => {
            return {
              ...training,
              customer: `${customerName.firstname} ${customerName.lastname}`
            };
          });

      });
      return Promise.all(trainingData);
    })
    .then(data => setTrainings(data))
    .catch(err => console.error(err))
  }

  //Delete Function
  const deleteTraining=(params) => {
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

  useEffect(() => fetchData(), []);

  return (
    <>
    <div 
      className='ag-theme-material' 
      style={{ width: '90%', height: 600, margin: 'auto'}}
    >
      <AgGridReact 
        rowData={trainings}
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

export default Trainings;