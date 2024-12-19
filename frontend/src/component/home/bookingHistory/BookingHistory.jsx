import React, { useState, useEffect } from "react";

const BookingHistory = () => {
  const [previousBookings, setPreviousBookings] = useState([]);
  const [upcomingShows, setUpcomingShows] = useState([]);
  const [showPrevious, setShowPrevious] = useState(false);
  const [showUpcoming, setShowUpcoming] = useState(false);

  useEffect(() => {
    // Simulate fetching data from API
    const fetchBookingHistory = async () => {
      const previous = [
        {
          id: 1,
          movieTitle: "Avatar: The Way of Water",
          theaterName: "PVR Cinemas",
          date: "2024-11-05",
          time: "7:00 PM",
          seats: ["A1", "A2", "A3"],
        },
        {
          id: 2,
          movieTitle: "The Batman",
          theaterName: "INOX",
          date: "2024-10-20",
          time: "9:30 PM",
          seats: ["B1", "B2"],
        },
      ];

      const upcoming = [
        {
          id: 3,
          movieTitle: "The Marvels",
          theaterName: "Cinepolis",
          date: "2024-12-15",
          time: "6:30 PM",
          seats: ["C1", "C2", "C3", "C4"],
        },
      ];

      setPreviousBookings(previous);
      setUpcomingShows(upcoming);
    };

    fetchBookingHistory();
  }, []);

  return (
    <div className="container my-4">
      <h2 className="text-center fw-bold mb-4">Booking History</h2>

      <div className="row">
        {/* Previous Bookings Dropdown */}
        <div className="col-md-6 mb-3">
          <button
            className="btn btn-primary w-100"
            onClick={() => setShowPrevious(!showPrevious)}
          >
            Previous Bookings
          </button>
          {showPrevious && (
            <div className="mt-3">
              {previousBookings.length > 0 ? (
                previousBookings.map((booking) => (
                  <div className="card mb-3 shadow-sm" key={booking.id}>
                    <div className="card-body">
                      <h5 className="card-title">{booking.movieTitle}</h5>
                      <p className="card-text">
                        <strong>Theater:</strong> {booking.theaterName}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong> {booking.date}
                      </p>
                      <p className="card-text">
                        <strong>Time:</strong> {booking.time}
                      </p>
                      <p className="card-text">
                        <strong>Seats:</strong> {booking.seats.join(", ")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No previous bookings found.</p>
              )}
            </div>
          )}
        </div>

        {/* Upcoming Shows Dropdown */}
        <div className="col-md-6 mb-3">
          <button
            className="btn btn-success w-100"
            onClick={() => setShowUpcoming(!showUpcoming)}
          >
            Upcoming Bookings 
          </button>
          {showUpcoming && (
            <div className="mt-3">
              {upcomingShows.length > 0 ? (
                upcomingShows.map((booking) => (
                  <div className="card mb-3 shadow-sm" key={booking.id}>
                    <div className="card-body">
                      <h5 className="card-title">{booking.movieTitle}</h5>
                      <p className="card-text">
                        <strong>Theater:</strong> {booking.theaterName}
                      </p>
                      <p className="card-text">
                        <strong>Date:</strong> {booking.date}
                      </p>
                      <p className="card-text">
                        <strong>Time:</strong> {booking.time}
                      </p>
                      <p className="card-text">
                        <strong>Seats:</strong> {booking.seats.join(", ")}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-muted">No upcoming shows found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingHistory;
