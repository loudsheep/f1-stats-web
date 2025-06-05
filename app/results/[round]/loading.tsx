import TireSpinner from '@/components/TireSpinner'
import React from 'react'

export default function Loading() {
  return (
    <div className='w-full h-full flex flex-col justify-center items-center mt-10'>
        <TireSpinner size={100}></TireSpinner>
    </div>
  )
}
