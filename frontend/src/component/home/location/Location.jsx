import React, { useState } from "react";

const Location = ({ handleLocationChange, handleCloseLocation }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const cities = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Pune", "Ahmedabad", "Jaipur", "Lucknow", "Chandigarh", "Indore", "Patna"];

  const filteredCities = cities.filter((city) => city.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="location-popup">
      <div className="location-header">
        <h2>Select Your Location</h2>
        <button className="close-btn" onClick={handleCloseLocation}>X</button>
      </div>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Search for your city"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="location-cities">
        {filteredCities.map((city, index) => (
          <button
            key={index}
            className="btn btn-outline-primary w-100 mb-2"
            onClick={() => handleLocationChange(city)}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Location;
