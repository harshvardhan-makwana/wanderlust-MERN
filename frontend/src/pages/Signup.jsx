import axios from "axios";
import React from "react";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    role:""
  });

  const handleInputChange = (e) => {
    setFormData((currData) => {
      return { ...currData, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData)
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/users/register",
        formData,
      );
      toast.success("user register");
      localStorage.setItem("token", res.data.token);
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
          <div className="mb-4">
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
          <div>
            <select name="role" id="role" value={formData.role} onChange={handleInputChange} required>
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
