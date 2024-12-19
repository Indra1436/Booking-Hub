import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import "./TicketBooking.css";

const DateSelector = ({ dates, selectedDate, onSelectDate }) => (
  <div className="date-selector">
    {dates.map((date, index) => (
      <div
        key={index}
        className={`date-item ${selectedDate === date.fullDate ? "active" : ""}`}
        onClick={() => onSelectDate(date.fullDate)}
        role="button"
        aria-label={`Select date ${date.day} ${date.date} ${date.month}`}
      >
        <span className="day">{date.day}</span>
        <span className="date">{date.date}</span>
        <span className="month">{date.month}</span>
      </div>
    ))}
  </div>
);

const Filters = () => (
  <div className="filters">
    <select aria-label="Filter by price range">
      <option>Filter Price Range</option>
    </select>
    <select aria-label="Filter by show timings">
      <option>Filter Show Timings</option>
    </select>
    <button className="search-button" aria-label="Search">
      🔍
    </button>
  </div>
);

const TheaterList = ({ theaters, selectedDate }) => (
  <ul className="theater-list">
    {theaters.map((theater, index) => (
      <li key={index} className="theater-item">
        <div className="theater-info">
          <i className="bi bi-heart"></i>
          <strong>{theater.Theatrename}</strong>: <span>{theater.Area}</span>
        </div>
        <div className="amenities">
          <span>
            <i className="bi bi-phone"></i> M-Ticket
          </span>
          <span>
            <i className="bi bi-house-door"></i> Food & Beverage
          </span>
        </div>
        <Link to="/seatLayout">
          <div className="showtimes">
            {["11:30 AM", "02:30 PM", "06:30 PM", "09:30 PM"].map((time, idx) => (
              <button key={idx} aria-label={`Book for ${time}`}>
                {time}
              </button>
            ))}
          </div>
        </Link>
        <div className="note">
          {index % 2 === 0 ? "Non-cancellable" : "Cancellation Available"}
        </div>
      </li>
    ))}
  </ul>
);

const TicketBooking = () => {
  const { state } = useLocation();
  const { movieTitle, selectedLanguage, selectedFormat } = state || {};
  const [theaters, setTheaters] = useState([]);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTheaterData = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await axios.get(
          "https://mocki.io/v1/510e9776-abf0-4e0c-8150-f4bd188521c3"
        );
        setTheaters(response.data);
      } catch (err) {
        console.error("Error fetching theater data:", err);
        setError("Failed to fetch theater data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    // Generate dynamic dates (next 7 days)
    const generateDates = () => {
      const today = new Date();
      return Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
          day: date.toLocaleDateString("en-US", { weekday: "short" }),
          date: date.getDate(),
          month: date.toLocaleDateString("en-US", { month: "short" }),
          fullDate: date.toISOString().split("T")[0],
        };
      });
    };

    const generatedDates = generateDates();
    setDates(generatedDates);
    setSelectedDate(generatedDates[0].fullDate);

    fetchTheaterData();
  }, []);

  if (isLoading) return <p>Loading theaters...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="ticket-booking-container">
      {/* Movie Header */}
      <h1>
        {movieTitle} - {selectedLanguage}
      </h1>
      <div className="tags">
        <span>{selectedFormat}</span>
        <span>Action</span>
        <span>Drama</span>
        <span>Thriller</span>
      </div>

      <div className="data-and-filters">
        <DateSelector
          dates={dates}
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
        />
        <Filters />
      </div>

      <TheaterList theaters={theaters} selectedDate={selectedDate} />
    </div>
  );
};

export default TicketBooking;
