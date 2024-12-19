import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import ForgotPassword from "./component/forgotPassword/ForgotPassword";
import Register from "./component/register/Register";
import Homepage from "./pages/Homepage";
import UserProfile from "./component/home/userProfile/UserProfile";
import SettingsPage from "./pages/settingsPage";
import ChangePassword from "./component/settings/changePassword/ChangePassword";
import MovieDetails from "./component/home/movieDetails/MovieDetails";
import TicketBooking from "./component/ticketBooking/ticketBooking/TicketBooking";
import SeatLayout from "./component/ticketBooking/seatLayout/SeatLayout";
import BookingHistory from "./component/home/bookingHistory/BookingHistory";
import BookingSummary from "./component/ticketBooking/bookingSummery/BookingSummery";
import RazorPay from "./component/ticketBooking/razorPay/RazorPay";

const App = () => {
  const location = useLocation();

  // Get the state for the popup
  const showPopup = location.state?.showPopup || false;

  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userProfile" element={<UserProfile />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="/bookTicket" element={<TicketBooking />} />
        <Route path="/seatLayout" element={<SeatLayout/>}/>
        <Route path="/bookingHistory" element = {<BookingHistory/>}/>
        <Route path="/bookingSummary" element = {<BookingSummary/>}/>
        <Route path ="/razorPay" element = {<RazorPay/>}/>
       
        

        {/* Nested Routes for Settings */}
        <Route path="/settings" element={<SettingsPage />}>
          <Route path="/settings/changePassword" element={<ChangePassword />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
