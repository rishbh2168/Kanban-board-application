import React, { useContext } from 'react';
import TicketContext from '../../context/TicketContext';
import Card from '../Card/card'; // Import the Card component

const SmallScreen = () => {
  const { tickets } = useContext(TicketContext);

  return (
    <div>
      {Object.keys(tickets).map((status) =>
        tickets[status].map((ticket) => (
          <Card key={ticket.id} priority={ticket.priority} title={ticket.title} />
        ))
      )}
    </div>
  );
};

export default SmallScreen;

