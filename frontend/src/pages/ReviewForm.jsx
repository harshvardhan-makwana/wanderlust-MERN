import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function ReviewForm({ listingId }) {
  const navigate = useNavigate()
  const token = localStorage.getItem("token")
  const [formData, setFormData] = useState({
    rating: 5,
    comment: "",
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "rating" ? Number(value) : value })
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:3000/listings/${listingId}/reviews`,
        formData, { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("review Add");
      setFormData({ rating: 5, comment: "" })
      window.location.reload();
    } catch (error) {
     toast.error(error.response?.data)
    }
  };

  return (
    <div className="mt-3">
      <h2 className="font-bold text-2xl">Leave A Review</h2>
      <form action="" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="rating" className="block mt-2 mb=2">
            Rating
          </label>
          <input
          className="w-full"
            type="range"
            min="1"
            max="5"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="comment" className="block mb-3">
            Commemt
          </label>
          <textarea
            name="review"
            id="comment"
            cols=""
            rows=""
            name="comment"
            className="w-full block border-2 border-black rounded-md p-2" 
            value={formData.comment}
            onChange={handleInputChange}
          ></textarea>
          <button type="submit" className="btn-success">Submit</button>
        </div>
      </form>
    </div>
  );
}
