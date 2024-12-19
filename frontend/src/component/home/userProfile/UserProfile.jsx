import React from 'react';
import Navbar from '../navbar/Navbar';
import CategoryLinks from '../categoryLinks/CategoryLinks';
import { FaCamera, FaEdit } from 'react-icons/fa';
import "./UserProfile.css";

const UserProfile = () => {
  return (
    <div>
      <Navbar />
      <CategoryLinks />

      {/* Profile Container */}
      <div className="container my-5 d-flex justify-content-center">
        <div className="card shadow-lg" style={{ maxWidth:'800px', borderRadius: '8px' }}>
          {/* Profile Header with Gradient Background */}
          <div
            className="text-center p-4"
            style={{
              background: 'linear-gradient(90deg, #3b3b9a, #d33a7d)',
              color: 'white',
              borderTopLeftRadius: '8px',
              borderTopRightRadius: '8px',
              position: 'relative',
            }}
          >
            <div
              className="profile-img-wrapper"
              style={{
                position: 'relative',
                width: '100px',
                height: '100px',
                margin: '0 auto',
                marginTop: '-50px',
              }}
            >
              <img
                src="https://via.placeholder.com/100"
                alt="Profile"
                className="rounded-circle"
                style={{
                  width: '100%',
                  height: '100%',
                  border: '3px solid #ffffff',
                }}
              />
              <div
                className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                style={{
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  borderRadius: '50%',
                  color: '#fff',
                  fontSize: '1.5rem'
                }}
              >
                <FaCamera />
                <span className="d-block" style={{ fontSize: '0.8rem', marginTop: '4px' }}>+ Add</span>
              </div>
            </div>
            <h4 className="mt-3">Hi, Guest</h4>
          </div>

          {/* Account Details */}
          <div className="card-body">
            <h5 className="mb-3">Account Details</h5>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Email Address</span>
              <span className="text-muted">Not Provided</span>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-2">
              <span>Mobile Number</span>
              <div>
                <span>+91 - 9573232368</span>
                <span className="badge bg-success ms-2">Verified</span>
              </div>
              <a href="#" className="text-danger" style={{ fontSize: '0.9rem' }}>
                <FaEdit /> Edit
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
