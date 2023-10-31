import React, { useContext } from 'react';
import TicketContext from '../../context/TicketContext';
import Card from '../Card/card'; // Import the Card component
import './BigScreen.css'; // Import the external CSS

const BigScreen = () => {
  const { tickets } = useContext(TicketContext);

  const statuses = Object.keys(tickets).filter(status => status.trim().toLowerCase() !== 'cancelled');

  return (
    <div className="big-screen-container">
      {statuses.map((status) => (
        <div key={status} className="status-container">
          <h2>
            {status.trim().toLowerCase() === 'backlog' && <i className="fa fa-clock-o"></i>} {/* Example icon */}
            {status.trim().toLowerCase() === 'to-do' && <i className="fa fa-list-ul"></i>} {/* Example icon */}
            {status.trim().toLowerCase() === 'in progress' && <i className="fa fa-spinner"></i>} {/* Example icon */}
            {status.trim().toLowerCase() === 'done' && <i className="fa fa-check-circle"></i>} {/* Example icon */}
            {status}
          </h2>
          <div className="cards-container">
            {tickets[status].map((ticket) => (
              <Card key={ticket.id} ticket={ticket} className="card" />
            ))} {/* Fixed this line */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BigScreen;
// import React, { useContext } from 'react';
// import TicketContext from '../../context/TicketContext';
// import Card from '../Card/card'; // Import the Card component
// import './BigScreen.css'; // Import the external CSS

// const BigScreen = () => {
//   const { tickets } = useContext(TicketContext);

//   const statuses = Object.keys(tickets).filter(status => status.trim().toLowerCase() !== 'cancelled');

//   return (
//     <div className="big-screen-container">
//       {statuses.map((status) => (
//         <div key={status} className="status-container">
//           <h2>
//             {status.trim().toLowerCase() === 'backlog' && <i className="fas fa-clock"></i>} {/* Example icon */}
//             {status.trim().toLowerCase() === 'to-do' && <i className="fas fa-tasks"></i>} {/* Example icon */}
//             {status.trim().toLowerCase() === 'in progress' && <i className="fas fa-spinner"></i>} {/* In Progress icon */}
//             {status.trim().toLowerCase() === 'blocked' && <i className="fas fa-ban"></i>} {/* Blocked icon */}
//             {status.trim().toLowerCase() === 'high priority' && <i className="fas fa-exclamation-triangle"></i>} {/* High Priority icon */}
//             {status.trim().toLowerCase() === 'low priority' && <i className="fas fa-info-circle"></i>} {/* Low Priority icon */}
//             {status.trim().toLowerCase() === 'review' && <i className="fas fa-search"></i>} {/* Review icon */}
//             {status.trim().toLowerCase() === 'approved' && <i className="fas fa-check-circle"></i>} {/* Approved icon */}
//             {status.trim().toLowerCase() === 'rejected' && <i className="fas fa-times-circle"></i>} {/* Rejected icon */}
//             {status}
//           </h2>
//           <div className="cards-container">
//             {tickets[status].map((ticket) => (
//               <Card key={ticket.id} ticket={ticket} className="card" />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BigScreen;

