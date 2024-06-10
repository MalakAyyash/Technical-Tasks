import React from 'react'
import { Outlet } from 'react-router-dom'
import './Layout.css';

export default function Layout() {

    return (
        <div className='mt-5'>
            <div className="d-flex justify-content-center">
                <h1 className='permanent-marker-regular'>Memeory Game</h1>
            </div>
            <hr></hr>
            <Outlet />
        </div>
    )
}
