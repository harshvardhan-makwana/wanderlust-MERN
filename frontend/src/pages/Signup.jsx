import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import api from "../axios/api";
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setToken } from "../redux/authSlice";

export default function Signup() {
  const navigate = useNavigate();
   const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role: ""
  });

  const handleInputChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(
        "/users/register",
        formData
      );
      //old flow
      //localStorage.setItem("token", res.data.token);
      //localStorage.setItem("user", JSON.stringify(res.data));
      dispatch(setToken(res.data))
      
      navigate('/')
      toast.success("signup success");
      setFormData({
        username: "",
        email: "",
        password: "",
        role: ""
      });
    } catch (error) {
      toast(error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center ">
      <div className="w-[40%]  mx-auto rounded-lg mt-3">
        <h1 className="text-[40px] text-black text-start">
          Signup on wanderlust
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label
              htmlFor="username"
              className="label"
            >
              username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="label"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4 mt-4">
            <label
              htmlFor="password"
              className="label"
            >
              password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4 mt-4">
            <label >Select your role</label>
            <select name="role" className="input-field" id="role" value={formData.role} onChange={handleInputChange} required>
              <option value="">Select your role</option>
              <option value="user">user </option>
              <option value="owner">owner</option>
            </select>
          </div>
          <button className="btn-success">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
