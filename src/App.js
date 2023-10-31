import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import TicketContext from './context/TicketContext';
// Import the component in your App.js
import BigScreen from './components/bigScreen/BigScreen';

import SmallScreen from './components/smallScreen/SmallScreen';
import DataContext from './context/DataContext';
import UserContext from './context/UserContext';
import 'font-awesome/css/font-awesome.min.css'; // Import Font Awesome CSS


function App() {
  const [tickets, setTickets] = useState(null);
  const [data, setData] = useState([]); // Initialize with an empty array
  const [users, setUsers] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json();

        setData(data.tickets);
        setUsers(data.users);

        // Your code for processing and sorting data remains the same

        const filterData = { "Backlog": [], "Todo": [], "In progress": [], "Done": [], "Canceled": [] };
        data.tickets.forEach(ticket => {
          const status = ticket.status;
          if (!filterData[status]) {
            filterData[status] = [ticket];
          } else {
            filterData[status].push(ticket);
          }
        });

        const keysArray = Object.keys(filterData);
        for (const key of keysArray) {
          filterData[key].sort((a, b) => b.priority - a.priority);
        }

        setTickets(filterData);
      } catch (err) {
        console.log("Error Fetching data ", err);
      }
    };

    fetchData();
  }, []);

  if (!data || !tickets) {
    // Add a guard clause to handle the case when data is not yet loaded
    return <div>Loading...</div>;
  }

  return (
    <UserContext.Provider value={{ users }}>
      <DataContext.Provider value={{ data }}>
        <TicketContext.Provider value={{ tickets, setTickets }}>
          <div className="App">
            <Navbar />
            <div className='content'>
              {window.innerWidth > 750 ? <BigScreen /> : <SmallScreen />}
            </div>
          </div>
        </TicketContext.Provider>
      </DataContext.Provider>
    </UserContext.Provider>
  );
}

export default App;

