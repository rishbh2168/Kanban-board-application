import React, { useContext, useEffect, useState } from 'react'
import "./navbar.css"
import TicketContext from '../../context/ticketContext';
import { getUserName, orderData } from '../../utils';
import DataContext from '../../context/dataContext';
import UserContext from '../../context/userContext';

const Navbar = () => {
    const { setTickets } = useContext(TicketContext);
    const { data } = useContext(DataContext);
    const { users } = useContext(UserContext);
    const [toggler, setToggler] = useState(false);
    const [group, setGroup] = useState("status");
    const [order, setOrder] = useState("priority");

    useEffect(() => {
        if (data === undefined) return;
        const tickets_status = { "Backlog": [], "Todo": [], "In progress": [], "Done": [], "Canceled": [] }
        const tickets_user = {}
        const tickets_priority = { 0: [], 1: [], 2: [], 3: [], 4: [] }

        data.map((ticket) => {
            const status = ticket.status;
            if (!tickets_status[status]) {
                tickets_status[status] = [ticket];
            } else {
                tickets_status[status].push(ticket);
            }

            const priority = ticket.priority;
            if (!tickets_priority[priority]) {
                tickets_priority[priority] = [ticket];
            } else {
                tickets_priority[priority].push(ticket);
            }

            const userId = getUserName(users, ticket.userId);
            if (!tickets_user[userId]) {
                tickets_user[userId] = [ticket];
            } else {
                tickets_user[userId].push(ticket);
            }
        })

        if (group === "status") {
            setTickets(orderData(order, group, tickets_status));
        } else if (group === "users") {
            setTickets(orderData(order, group, tickets_user));
        } else {
            setTickets(orderData(order, group, tickets_priority));
        }
    }, [group, order])

    const handleGroupingChange = (e) => {
        const way_of_grouping = e.target.value;
        setGroup(way_of_grouping);
    }

    const handleOrderChange = (e) => {
        const way_of_ordering = e.target.value;
        setOrder(way_of_ordering);
    }

    return (
        <div className='navbar-container'>
            <div className='main-dropdown' onClick={() => setToggler(!toggler)}>
                Display
            </div>
            {
                toggler && (<div className="dropdown-container">
                    <div className='dropdown-item'>
                        <div>Grouping</div>
                        <select name="grouping" onChange={handleGroupingChange}>
                            <option value="status">Status</option>
                            <option value="users">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className='dropdown-item'>
                        <div>Ordering</div>
                        <select name="ordering" onChange={handleOrderChange}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>)
            }
        </div>
    )
}

export default Navbar