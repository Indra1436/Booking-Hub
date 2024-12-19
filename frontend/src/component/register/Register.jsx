// src/Register.js
import React, { useState } from "react";
import axios from "axios"; // Import axios
import "./Register.css";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [fullNameError, setFullNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const validateAlphabetic = (value) => /^[A-Za-z\s]+$/.test(value);

  const handleFullNameChange = (e) => {
    const value = e.target.value;
    setFullName(value);

    if (value === "") {
      setFullNameError(""); // Clear error if empty
    } else if (!validateAlphabetic(value)) {
      setFullNameError("Full name must contain only alphabetic characters");
    } else {
      setFullNameError("");
    }
  };

  const handleMobileChange = (e) => {
    const value = e.target.value;

    if (/^\d{0,10}$/.test(value)) {
      setMobile(value);

      if (value === "") {
        setMobileError(""); // Clear error if input is empty
      } else if (value.length === 10) {
        setMobileError(""); // Clear error if exactly 10 digits are entered
      } else {
        setMobileError("Mobile number must be 10 digits");
      }
    } else {
      setMobileError("Mobile number cannot exceed 10 digits");
      setTimeout(() => {
        setMobileError("");
      }, 1500);
    }
  };

  const handleEmail = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (value === "") {
      setEmailError("");
    } else if (!emailRegex.test(value)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handlePassword = (e) => { 
    const value = e.target.value;
    setPassword(value);

    if (value === "") {
      setPasswordError("");
    } else if (!validatePassword(value)) {
      setPasswordError(
        "Password must contain at least one uppercase letter, one special character, and one number."
      );
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value === "") {
      setConfirmPasswordError(""); // Clear error if empty
    } else if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const isFormValid = () => {
    return (
      fullName &&
      email &&
      mobile.length === 10 &&
      validatePassword(password) &&
      confirmPassword === password
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    const userData = {
      fullName,
      email,
      mobile,
      password,
    };

    try {
      // Update the URL to match the backend registration endpoint
      const response = await axios.post(
        "http://localhost:5000/register", // Corrected URL to match the backend
        userData
      );
      if (response.status === 201) {
        alert("User registered successfully!");
        window.location.href = "/"; // Redirect after successful registration
      } else {
        console.error("Failed to register user.");
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <div className="registerContainer">
      <h2>Register Now</h2> <br />
      <form onSubmit={handleSubmit}>
        <label htmlFor="full-name">Full Name:</label> <br />
        <input
          type="text"
          id="full-name"
          placeholder="Full Name"
          value={fullName}
          onChange={handleFullNameChange}
        />
        {fullNameError && <p className="error">{fullNameError}</p>}
        <br />
        <label htmlFor="email">Email:</label> <br />
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmail}
        />
        {emailError && <p className="error">{emailError}</p>}
        <br />
        <label htmlFor="mobile">Mobile Number:</label> <br />
        <input
          type="tel"
          id="mobile"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={handleMobileChange}
        />
        {mobileError && <p className="error">{mobileError}</p>}
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          placeholder="Enter password"
          value={password}
          onChange={handlePassword}
        />
        {passwordError && <p className="error">{passwordError}</p>}
        <br />
        <label htmlFor="confirm-password">Confirm Password:</label> <br />
        <input
          type="password"
          id="confirm-password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={handleConfirmPassword}
        />
        {confirmPasswordError && (
          <p className="error">{confirmPasswordError}</p>
        )}
        <br />
        <button type="submit" disabled={!isFormValid()}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
