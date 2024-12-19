const express = require("express");
const Razorpay = require("razorpay");
const crypto = require("crypto");

const app = express();
app.use(express.json());

// Endpoint to save booking details
app.post("/api/booking", async (req, res) => {
  const {
    movieTitle,
    selectedDate,
    selectedShowtime,
    theaterName,
    theaterLocation,
    selectedSeats,
    totalPrice,
  } = req.body;

  try {
    // Save booking details to the database (pseudo code)
    const bookingId = await saveBookingToDatabase({
      movieTitle,
      selectedDate,
      selectedShowtime,
      theaterName,
      theaterLocation,
      selectedSeats,
      totalPrice,
    });

    res.status(200).json({ success: true, bookingId });
  } catch (error) {
    console.error("Error saving booking:", error);
    res.status(500).json({ success: false, error: "Booking could not be saved" });
  }
});

// Endpoint to create Razorpay payment order
app.post("/bookingSummary", async (req, res) => {
  const { amount, bookingId } = req.body;
  const options = {
    amount: amount * 100, 
    currency: "INR",
    receipt: `receipt_order_${bookingId}`,
  };

  try {
    const order = await razorpay.orders.create(options);
    res.json({
      id: order.id,
      amount: order.amount / 100,
      currency: order.currency,
      bookingId,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: "Error creating payment order" });
  }
});

// Endpoint to verify payment
app.post("/api/payment/verify", async (req, res) => {
  const { order_id, payment_id, signature, bookingId } = req.body;
  const generatedSignature = crypto
    .createHmac("sha256", "your_razorpay_secret")
    .update(`${order_id}|${payment_id}`)
    .digest("hex");

  if (generatedSignature === signature) {
    try {
      // Update booking payment status (pseudo code)
      await updatePaymentStatus(bookingId, "Paid", payment_id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error updating payment status:", error);
      res.status(500).json({ success: false, error: "Error updating payment status" });
    }
  } else {
    res.status(400).json({ success: false, error: "Invalid signature" });
  }
});

app.listen(5173, () => console.log("Server running on port 5173"));
