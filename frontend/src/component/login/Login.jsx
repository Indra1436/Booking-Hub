import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export const Login = ({ userLoginData }) => {
  const [formData, setFormData] = useState({
    mobileNumber: "",
    password: "",
    error: {
      mobileNumber: "",
      password: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const [isLoggedIn,setIsLoggedIn] = useState(false);

  // Check if the user is already logged in
  // useEffect(() => {
  //   const userId = Cookies.get("userId");
  //   if (userId) {
  //     setIsLoggedIn(true);
  //   }
  // }, []);

  // Handle input changes with validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear errors if user starts typing
    if (value && formData.error[name]) {
      setFormData((prevData) => ({
        ...prevData,
        error: {
          ...prevData.error,
          [name]: "", // Clear error when the user starts typing
        },
      }));
    }
  };

  // Validate mobile number format (for example: 10 digits)
  const validateMobileNumber = (number) => {
    const regex = /^[6-9]\d{9}$/; // Basic regex for Indian mobile numbers
    return regex.test(number);
  };

  // Handle Login button click
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsSubmitted(true);

    const { mobileNumber, password } = formData;

    // Check if both fields are filled
    if (!mobileNumber || !password) {
      setFormData((prevData) => ({
        ...prevData,
        error: {
          mobileNumber: mobileNumber ? "" : "Please enter mobile number",
          password: password ? "" : "Please enter password",
        },
      }));

      return;
    }

    // Validate the mobile number
    if (!validateMobileNumber(mobileNumber)) {
      setFormData((prevData) => ({
        ...prevData,
        error: {
          ...prevData.error,
          mobileNumber: "Please enter a valid mobile number",
        },
      }));
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        mobile: mobileNumber, // Send the field as mobile to the backend
        password,
      });
        console.log(response.data.success)
      // Handle the response
      if (response.data.success) {
        const { fullName } = response.data.data;
            console.log(response);
        // Save user data to cookies
        localStorage.setItem("token",response.data.token);
        userLoginData(fullName); // Update the user data in the state

        navigate("/"); // Redirect to the homepage
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        if (status === 401) {
          setFormData((prevData) => ({
            ...prevData,
            error: {
              mobileNumber: data.message.includes("User not found")
                ? "User not found"
                : "",
              password: data.message.includes("Incorrect password")
                ? "Incorrect password"
                : "",
            },
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            error: {
              mobileNumber: "Unexpected error. Please try again later.",
            },
          }));
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          error: {
            mobileNumber: "Unable to connect to the server. Please try again later.",
          },
        }));
      }
    }
  };

  return (
    <div className="loginBg">
      <div className="loginContainer">
        <h2>Login Now</h2>
        <input
          type="tel"
          name="mobileNumber"
          className="L"
          placeholder="Enter mobile number"
          value={formData.mobileNumber}
          onChange={handleChange}
        />
        {isSubmitted && formData.error.mobileNumber && (
          <p style={{ color: "red" }}>{formData.error.mobileNumber}</p>
        )}
        <br />
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
        />
        {isSubmitted && formData.error.password && (
          <p style={{ color: "red" }}>{formData.error.password}</p>
        )}
        <Link to="/forgot-password">
          <p>Forgot Password</p>
        </Link>
        <br />
        {(formData.mobileNumber || formData.password) && (
          <button className="loginButton" onClick={handleLogin}>
            Login
          </button>
        )}
        <Link to="/register">
          <button>Register Now</button>
        </Link>
      </div>
    </div>
  );
};
