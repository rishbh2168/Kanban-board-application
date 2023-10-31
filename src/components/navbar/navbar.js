import React, { useContext, useEffect, useState } from 'react';
import './Navbar.css'; // Make sure the path to your CSS file is correct
import TicketContext from '../../context/TicketContext';
import { getUserName, orderData } from '../../utils';
import DataContext from '../../context/DataContext';
import UserContext from '../../context/UserContext';

const Navbar = () => {
  const { setTickets } = useContext(TicketContext);
  const { data } = useContext(DataContext);
  const { users } = useContext(UserContext);
  const [toggler, setToggler] = useState(false);
  const [group, setGroup] = useState('status');
  const [order, setOrder] = useState('priority');

  useEffect(() => {
    if (data === undefined) return;

    const ticketsStatus = { Backlog: [], Todo: [], 'In progress': [], Done: [], Canceled: [] };
    const ticketsUser = {};
    const ticketsPriority = { 0: [], 1: [], 2: [], 3: [], 4: [] };

    data.map((ticket) => {
      const status = ticket.status;
      if (!ticketsStatus[status]) {
        ticketsStatus[status] = [ticket];
      } else {
        ticketsStatus[status].push(ticket);
      }

      const priority = ticket.priority;
      if (!ticketsPriority[priority]) {
        ticketsPriority[priority] = [ticket];
      } else {
        ticketsPriority[priority].push(ticket);
      }

      const userId = getUserName(users, ticket.userId);
      if (!ticketsUser[userId]) {
        ticketsUser[userId] = [ticket];
      } else {
        ticketsUser[userId].push(ticket);
      }
    });

    if (group === 'status') {
      setTickets(orderData(order, group, ticketsStatus));
    } else if (group === 'users') {
      setTickets(orderData(order, group, ticketsUser));
    } else {
      setTickets(orderData(order, group, ticketsPriority));
    }
  }, [group, order]);

  const handleGroupingChange = (e) => {
    const wayOfGrouping = e.target.value;
    setGroup(wayOfGrouping);
  };

  const handleOrderChange = (e) => {
    const wayOfOrdering = e.target.value;
    setOrder(wayOfOrdering);
  };

  return (
    <div className='navbar-container'>
      <div className='main-dropdown' onClick={() => setToggler(!toggler)}>
        Display
      </div>
      {toggler && (
        <div className='dropdown-container'>
          <div className='dropdown-item'>
            <div>Grouping</div>
            <select name='grouping' onChange={handleGroupingChange}>
              <option value='status'>Status</option>
              <option value='users'>User</option>
              <option value='priority'>Priority</option>
            </select>
          </div>
          <div className='dropdown-item'>
            <div>Ordering</div>
            <select name='ordering' onChange={handleOrderChange}>
              <option value='priority'>Priority</option>
              <option value='title'>Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
