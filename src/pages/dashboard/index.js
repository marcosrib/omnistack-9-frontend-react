import React, { useEffect, useState } from 'react'
import api from '../../services/api';
import './style.css';
import { Link } from 'react-router-dom';
export default function Dashboard() {
    const [spots, setSpots] = useState([]);
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const respose = await api.get('/dashboard', {
                headers: { user_id }
            })
            setSpots(respose.data);
            console.log(respose);

        }
        loadSpots();
    }, [])
    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{spot.price ? `R$${spot.price}/dia` : 'gratuito'}</span>
                    </li>
                ))
                }
            </ul>
           <Link to="/new">
               <button className='btn'>Castrar novo spot</button>
           </Link>
        </>
    )
}