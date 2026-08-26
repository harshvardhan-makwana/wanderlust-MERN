import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleInputChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/users/login",
        formData,
      );
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate('/')
      toast.success("login success");
      setFormData({
        email: "",
        password: "",
      });
    } catch (error) {

      toast.error(error.response?.data);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center">
      <div className="w-[40%]  mx-auto rounded-lg mt-3">
        <h1 className="text-[40px] text-black text-start">
          Login on wanderlust
        </h1>

        <form action="" onSubmit={handleSubmit}>
          <div className="mb-4 mt-4">
            <label
              htmlFor="email"
              className="label"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your username"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="input-field"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="label"
            >
              Password
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
          <button className="btn-success">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
