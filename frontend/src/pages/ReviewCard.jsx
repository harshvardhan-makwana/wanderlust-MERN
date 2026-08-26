import axios from 'axios'
import React from 'react'
import { toast } from 'react-toastify'

export default function ReviewCard({ review, listingId, onUpdate }) {
  const token = localStorage.getItem('token')
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isReviewOwner =currentUser?._id=== review.author?._id;
       
  const handleDeleteReview = async (reviewId, listingId) => {
    try {
      console.log(reviewId);
      await axios.delete(`http://localhost:3000/listings/${listingId}/reviews/${reviewId}`, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Review Delete")
      window.location.reload();
    } catch (error) {
      console.log(error.res)
      toast.error(error.response?.data?.message)
    }

  }
  return (

    <div className='border border-black p-4 mt-3 rounded-md'>
      <h2>{review.author?.username}</h2>
      <h2>{review.rating} ⭐</h2>
      <p>{review.comment}</p>
      {isReviewOwner &&(
      <button className='text-white bg-black rounded-[5px] p-1 mt-1' onClick={() => handleDeleteReview(review._id, listingId)}>Delete</button>
      )}
      </div>

  )
}
