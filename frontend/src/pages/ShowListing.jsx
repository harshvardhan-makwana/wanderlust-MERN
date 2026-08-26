import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import ReviewForm from "./ReviewForm";
import { toast } from "react-toastify";
import ReviewCard from "./ReviewCard";

export default function ShowListing() {
  const [listing, setListing] = useState({});
  const currentUser = JSON.parse(localStorage.getItem("user"));
  const isOwner = currentUser?._id === (listing?.owner?._id || listing?.owner);
  const navigate = useNavigate()
  const { id } = useParams();
  const token = localStorage.getItem("token")
  const getListing = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/listings/${id}`);
      console.log(res.data);

      setListing(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListing();
  }, [id]);

  const handleDelete = async (id) => {
    if (!token) {
      navigate('/login')
    }
    try {
      await axios.delete(`http://localhost:3000/listings/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      toast.success("listing delete");
      navigate('/')
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  return (
    <div className="max-w-3xl bg-white  mx-auto">
      {listing ? (
        <>
          <h3 className="text-2xl mt-3 mb-3  text-black">{listing.title}</h3>
          <figure>
            <img
              src={listing.image?.url}
              alt={listing.title}
              className="w-full rounded-lg h-[250px]  object-cover shadow-lg"
            />
          </figure>
          <div className="p-1">
            <h2 className="text-2xl">Owned By {listing.owner?.username}</h2>
            <p>{listing.description}</p>
            <p>{listing.price}</p>
            <p>{listing.location}</p>
            <p>{listing.country}</p>
          </div>
          {isOwner && (
            <div className="my-2">
              <Link
                to={`/listings/edit/${listing._id}`}
                className="btn-success"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(listing._id)}
                className="text-white p-2 px-2 bg-red-500 ml-3  rounded-lg"
              >
                Delete
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-center">Loading ...</p>
      )}
      <hr className="mt-5" />
      <ReviewForm listingId={id} />
      <h2 className="font-bold text-xl mt-3">All Reviews</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {
          listing.reviews?.map((review) => (

            <ReviewCard key={review._id} review={review} listingId={id} onUpdate={getListing} />

          ))
        }
      </div>
    </div>
  );
}
