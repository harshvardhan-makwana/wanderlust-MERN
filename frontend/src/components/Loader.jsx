import React from 'react'

export default function Loader({text}) {
  return (
    <div className="w-[100%] h-[70vh] flex flex-col justify-center items-center">
       <div className='loader'></div>
       <br />
       <p className='mt-2 text-2xl'>{text}</p>
    </div>
  )
}
