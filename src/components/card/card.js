import React from 'react'
import './card.css'

const Card = ({ priority }) => {

    return (
        <div className='card-container'>
            <div className='card-id-and-user'>
                <div>CAM - 11</div>
                <div className='card-user'>
                    <div>AK</div>
                    <div className='user-status'></div>
                </div>
            </div>
            <div className='card-title'>Conduct Security Veulnerability Assessment</div>
            <div className='property-tag-and-status'>
                <div className='card-priority'>
                    Priority
                </div>
                <div className='tag-and-status'>
                    <div>
                    </div>
                    <div>feature request</div>
                </div>
            </div>
        </div>
    )
}

export default Card