import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketSelection from './pages/TicketSelection';
import AttendeeDetails from './pages/AttendeeDetails';
import TicketReady from './pages/TicketReady';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<TicketSelection /> } />
          <Route path='/attendeedetails' element={<AttendeeDetails />} />
          <Route path='ticketready' element= {<TicketReady />} />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
