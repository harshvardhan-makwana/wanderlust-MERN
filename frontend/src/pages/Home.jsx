import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
    let [listings, setListings] = useState([])
    const getAllListings = async () => {
        try {
            const res = await axios.get("http://localhost:3000/listings")
            setListings(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)

        };
    }
    useEffect(() => {
        getAllListings();
    }, [])
    return (
        <div className='px-4 lg:px-12 md:px-8'>
            <h2 className='text-2xl text-black w-full  mt-5 ml-18'>All Listings</h2>
            <div className='bg-white max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 mt-5 gap-6 mx-auto'>
                {listings.map((item) => (
                    <Link to={`/listings/${item._id}`} key={item._id}>
                    <div  className="rounded-lg  overflow-hidden">

                        <img
                            src={item.image?.url}
                            alt={item.title}
                            className='w-full h-64 object-cover rounded-lg hover:opacity-70' />

                        <div className="">
                            <h2 className=" text-xl text-black font-bold">{item.title}</h2>
                            <p className='text-black'>&#8377;{item.price} / night</p>
                        </div>
                    </div>
                    </Link>))}

            </div>
        </div>
    )
}
