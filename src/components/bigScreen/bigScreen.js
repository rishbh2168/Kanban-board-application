import React, { useContext } from 'react'
import TicketContext from '../../context/ticketContext'

const BigScreen = () => {

    const { tickets } = useContext(TicketContext);

    return (
        <div>
            bigscreen
        </div>
    )
}

export default BigScreen