import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

export default function EditListing() {
  const token = localStorage.getItem("token")
  const [file, setFile] = useState(null)
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    country: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
    const getListings = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/listings/${id}`)
        setFormData(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    getListings();
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const data = new FormData();
      data.append("title", formData.title)
      data.append("description", formData.description)
      data.append("listing", file)
      data.append("price", formData.price)
      data.append("country", formData.country)
      data.append("location", formData.location)
      const res = await axios.put(
        `http://localhost:3000/listings/${id}`, data,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message);
      navigate(`/listings/${id}`);
      //window.location.reload(`/listings/${id}`);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <>
      {
        (isLoading) ?
          (<>
            <Loader text={"Edit Your Listings"}/>
          </>) : (<>
            <div className="flex justify-around">
              <div className="w-[50%] mx-auto mt-3">
                <h1 className="text-3xl mt-2">Edit Your Listings</h1>
                <form action="" onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="mt-2">
                    <label htmlFor="" className="label">
                      Title
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Add a title"
                      value={formData.title || ""}
                      name="title"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="label">
                      Description
                    </label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Enter Description"
                      value={formData.description || ""}
                      name="description"
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="label">
                      Uplode New Image
                    </label>
                    <input
                      type="file"
                      className="input-field"
                      placeholder="enter the image url"
                      name="listing"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="label">
                      Price
                    </label>
                    <input
                      type="text"
                      placeholder="1200"
                      value={formData.price || ""}
                      name="price"
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="label">
                      Country
                    </label>
                    <input
                      type="text"
                      placeholder="india"
                      value={formData.country || ""}
                      name="country"
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="label">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="jaipur, Rajesthan"
                      value={formData.location || ""}
                      name="location"
                      onChange={handleInputChange}
                      className="input-field"
                    />
                  </div>
                  <button className="btn-success" disabled={isLoading}>
                    Add
                  </button>
                </form>
              </div>
            </div>
          </>)
      }
    </>
  );
}
