import axios from 'axios'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import api from '../axios/api'
import Loader from "../components/Loader";

export default function Home() {
    const [isLoading, setIsLoading] = useState(false);
    const [showTax, setShowTax] = useState(false)
    let [listings, setListings] = useState([])
    const getAllListings = async () => {
        try {
            setIsLoading(true)
            const res = await api.get("/listings")
            setListings(res.data)
            console.log(res.data)
        } catch (error) {
            console.log(error)

        }finally{
            setIsLoading(false)
        }
    }
    useEffect(() => {
        getAllListings();
    }, [])
    return (
        <>
            {
                (isLoading) ?
                    (<>
                        <Loader text={"Loading..."} />
                    </>) : (<>
                        <div className='bg-white max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 mt-6 gap-6 mx-auto'>
                            {listings.map((item) => (
                                <Link to={`/listings/${item._id}`} key={item._id}>
                                    <div className="rounded-lg  overflow-hidden">

                                        <img
                                            src={item.image?.url}
                                            alt={item.title}
                                            className='w-[80%] mx-auto  md:w-full h-64 object-cover rounded-lg hover:opacity-70' />

                                        <div className="ml-11 md:ml-0">
                                            <h2 className=" text-xl text-black font-bold">{item.title}</h2>
                                            <p className='text-black'>&#8377;{item.price} / night {showTax ? <span>+18% GST</span> : false}</p>
                                        </div>
                                    </div>
                                </Link>))}

                        </div>
                    </>)
            }
        </>
    )
}
