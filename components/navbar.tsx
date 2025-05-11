import React from 'react'

export default function Navbar() {
    return (
        <div className='flex items-center flex-col'>
            <div className='flex-1'>
                <a href="/">
                    <h1 className='text-2xl'>
                        F1 stats
                    </h1>
                </a>
            </div>
            <div className='w-100 flex justify-between items-center'>
                <div className='border-b-2 hover:border-red-500'>
                    <a href="/schedule">Schedule</a>
                </div>
                <div className='border-b-2 hover:border-red-500'>
                    <a href="/standings">Standings</a>
                </div>
                <div className='border-b-2 hover:border-red-500'>
                    <a href="/telemetry">Telemetry</a>
                </div>
            </div>
        </div>
    )
}
