import React from 'react';
import './card.css';

const Card = ({ ticket }) => {
  return (
    <div className='card-container'>
      <div className='card-id-and-user'>
        <div>{ticket.id}</div>
        <div className='card-user'>
          <div>{ticket.user}</div>
          <div className='user-status'></div>
        </div>
      </div>
      <div className='card-title'>{ticket.title}</div>
      <div className='property-tag-and-status'>
        <div className='card-priority'>
          Priority: {ticket.priority}
        </div>
        <div className='tag-and-status'>
          {/* You can add more information here */}
        </div>
      </div>
    </div>
  );
};

export default Card;
