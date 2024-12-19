import { useState } from "react";
import React from "react";
import "./ChangePassword.css";

const ChangePassword = ({ close }) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [existingPassword, setExistingPassword] = useState("");
  const [existingPasswordError, setExistingPasswordError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    return regex.test(password);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(""); // Clear email error when typing
  };

  const handleExistingPassword = (e) => {
    setExistingPassword(e.target.value);
    setExistingPasswordError(""); // Clear error when typing
  };

  const handlePassword = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (!validatePassword(value)) {
      setNewPasswordError(
        "Password must contain at least one uppercase letter, one special character, and one number."
      );
    } else {
      setNewPasswordError("");
    }
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);

    if (value !== newPassword) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email || !validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // Validate existing password
    if (!existingPassword) {
      setExistingPasswordError("Existing password is required");
      return;
    }

    // Validate new password
    if (!newPassword || newPasswordError) {
      setNewPasswordError("Please enter a valid new password");
      return;
    }

    // Validate confirm password
    if (!confirmPassword || confirmPasswordError) {
      setConfirmPasswordError("Please confirm your password");
      return;
    }

    setLoading(true); // Start loading state

    // Step 1: Check if the email exists in the system
    try {
      const emailResponse = await fetch("http://localhost:5000/check-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const emailResult = await emailResponse.json();
      if (!emailResponse.ok || !emailResult.exists) {
        setEmailError("Email ID not found");
        setLoading(false);
        return;
      }

      // Step 2: Validate the existing password
      const passwordResponse = await fetch("http://localhost:5000/validate-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          existingPassword,
        }),
      });

      const passwordResult = await passwordResponse.json();
      if (!passwordResponse.ok || !passwordResult.isValid) {
        setExistingPasswordError("Existing password is incorrect");
        setLoading(false);
        return;
      }

      // Step 3: Change password if email and existing password are correct
      const response = await fetch("http://localhost:5000/changePassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          existingPassword,
          newPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Password changed successfully");
        close(); // Close modal on success
      } else {
        setExistingPasswordError(result.message || "Error changing password");
      }
    } catch (error) {
      console.error("Error:", error);
      setExistingPasswordError("Server error. Please try again later.");
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h4>Change Password</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmail}
                  required
                />
                {emailError && <p className="error">{emailError}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Existing Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter existing password"
                  value={existingPassword}
                  onChange={handleExistingPassword}
                  required
                />
                {existingPasswordError && (
                  <p className="error">{existingPasswordError}</p>
                )}
              </div>
              <div className="mb-3">
                <label className="form-label">Enter New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={handlePassword}
                  required
                />
                {newPasswordError && <p className="error">{newPasswordError}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label">Confirm New Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={handleConfirmPassword}
                  required
                />
                {confirmPasswordError && (
                  <p className="error">{confirmPasswordError}</p>
                )}
              </div>
              <div className="d-flex gap-2">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={close}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading} // Disable button while loading
                >
                  {loading ? "Changing..." : "Change Password"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
