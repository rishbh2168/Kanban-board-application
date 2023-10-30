import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar';
import TicketContext from './context/ticketContext';
import BigScreen from './components/bigScreen/bigScreen';
import SmallScreen from './components/smallScreen/smallScreen';
import UserContext from './context/userContext';
import DataContext from './context/dataContext';

function App() {
  const [tickets, setTickets] = useState(null);
  const [data, setData] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");
        const data = await response.json()

        setData(data.tickets);
        setUsers(data.users);

        const filterData = { "Backlog": [], "Todo": [], "In progress": [], "Done": [], "Canceled": [] };
        data.tickets.map(ticket => {
          const status = ticket.status;
          if (!filterData[status]) {
            filterData[status] = [ticket];
          } else {
            filterData[status].push(ticket);
          }
        })
        const keysArray = Object.keys(filterData);
        for (const key of keysArray) {
          filterData[key].sort((a, b) => b.priority - a.priority);
        }
        setTickets(filterData)
      } catch (err) {
        console.log("Error Fetching data ", err);
      }
    }

    fetchData();
  }, [])

  return (
    <UserContext.Provider value={{ users }}>
      <DataContext.Provider value={{ data }}>
        <TicketContext.Provider value={{ tickets, setTickets }}>
          <div className="App">
            <Navbar />
            <div className='content'>
              {window.innerWidth > "750px" ? BigScreen() : SmallScreen()}
            </div>
          </div>
        </TicketContext.Provider>
      </DataContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
