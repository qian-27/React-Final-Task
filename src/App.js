import './App.css';

//import React Router
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Customers from './components/Customers';
import Trainings from './components/Trainings';
import Calendar from './components/Calendar';
import NotFound from './components/NotFound';

//import Mui
import { Drawer, List, ListItem, Button } from '@mui/material';

//import App Bar from Mui
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        {/* Header */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Personal Trainer
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: 240,
              boxSizing: 'border-box',
            },
          }}
        >
          <List>
            <ListItem>
              <Button
                fullWidth
                component={Link}
                to="/"
              >
                Customers
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                component={Link}
                to="/Trainings"
              >
                Trainings
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                component={Link}
                to="/Calendar"
              >
                Calendar
              </Button>
            </ListItem>
          </List>
        </Drawer>

        <div style={{ marginLeft: 240, padding: 16 }}>
          <Routes>
            <Route exact path="/" element={<Customers />} />
            <Route path="/Trainings" element={<Trainings />} />
            <Route path="/Calendar" element={<Calendar />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;