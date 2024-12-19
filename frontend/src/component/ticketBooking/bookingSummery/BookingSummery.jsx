import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { GrPrevious } from "react-icons/gr";

const BookingSummary = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    movieTitle = "Unknown Title",
    selectedDate,
    certification = "U",
    selectedFormat = "Standard",
    selectedLanguage = "English",
    selectedShowtime,
    theaterName = "Unknown Theater",
    theaterLocation = "Unknown Location",
    selectedSeats = [],
    totalPrice = 0,
    ticketPrices = {},
  } = location.state || {};

  const formatDate = (date) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    return new Date(date).toLocaleDateString("en-US", options);
  };

  const handleProcess = async () => {
    try {
      const response = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          movieTitle,
          selectedDate,
          selectedShowtime,
          theaterName,
          theaterLocation,
          selectedSeats,
          totalPrice,
        }),
      });

      if (!response.ok) {
        console.error("HTTP Error:", response.status, response.statusText);
        alert("Error saving booking details. Please try again.");
        return;
      }

      const text = await response.text(); // Read raw response body
      console.log("Raw Response:", text);

      const data = JSON.parse(text); // Parse JSON response
      console.log("Response Data:", data);

      if (data.success) {
        navigate("/razorpay", { state: { bookingId: data.bookingId, totalPrice } });
      } else {
        alert(data.message || "Error saving booking details. Please try again.");
      }
    } catch (error) {
      console.error("Error processing booking:", error);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="d-flex align-items-center justify-content-between border-bottom p-3 bg-white">
        <GrPrevious
          className="text-secondary fs-4 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <div className="flex-grow-1 ms-3">
          <div className="d-flex flex-wrap gap-2">
            <h6 className="fs-5 fw-bold text-dark d-flex align-items-center justify-content-center">
              {movieTitle}
            </h6>
            <button
              id="badge"
              style={{ width: "25px", height: "25px" }}
              className="btn border-secondary rounded-circle d-flex align-items-center justify-content-center"
            >
              <small className="badge text-secondary">{certification}</small>
            </button>
          </div>
          <p className="m-0 text-muted fw-bold">
            {theaterName}, {theaterLocation} | {" "}
            {selectedDate ? formatDate(selectedDate) : "Date Not Selected"}, {" "}
            {selectedShowtime || "Showtime Not Selected"}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="container mt-4">
        <h5 className="fw-bold text-dark">Booking Summary</h5>
        {selectedSeats.length > 0 ? (
          <div className="border p-3 rounded bg-light">
            {/* Movie Details */}
            <div className="mb-3">
              <p className="fw-bold m-0">Movie</p>
              <p className="m-0">{movieTitle}</p>
            </div>
            {/* Theater Details */}
            <div className="mb-3">
              <p className="fw-bold m-0">Theater</p>
              <p className="m-0">
                {theaterName}, {theaterLocation}
              </p>
            </div>
            {/* Date and Time */}
            <div className="mb-3">
              <p className="fw-bold m-0">Date & Time</p>
              <p className="m-0">
                {formatDate(selectedDate)}, {selectedShowtime}
              </p>
            </div>
            {/* Language and Format */}
            <div className="mb-3">
              <p className="fw-bold m-0">Language & Format</p>
              <p className="m-0">
                {selectedLanguage}, {selectedFormat}
              </p>
            </div>
            {/* Seats */}
            <div className="mb-3">
              <p className="fw-bold m-0">Seats</p>
              <p className="m-0">{selectedSeats.join(", ")}</p>
            </div>
            {/* Pricing */}
            <div>
              <p className="fw-bold m-0">Pricing</p>
              {selectedSeats.map((seat, index) => {
                const row = seat[0];
                const price =
                  row >= "K" && row <= "N"
                    ? ticketPrices.Premium
                    : row >= "F" && row <= "J"
                    ? ticketPrices.Gold
                    : ticketPrices.Silver;
                return (
                  <p key={index} className="m-0">
                    Seat {seat}: Rs. {price}
                  </p>
                );
              })}
              <p className="fw-bold mt-2">Total: Rs. {totalPrice}</p>
            </div>
          </div>
        ) : (
          <p className="text-muted">No seats selected yet.</p>
        )}
      </div>

      {/* Payment Button */}
      {selectedSeats.length > 0 && (
        <div className="card bg-light position-fixed bottom-0 start-0 w-100 text-center shadow">
          <div className="p-3">
            <button
              className="btn btn-success btn-lg px-5 fs-5"
              onClick={handleProcess}
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingSummary;