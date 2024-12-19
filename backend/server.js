const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const secretKey = "ertygvtyhfddrijhguiguierihjioaf"

const app = express();
const port = 5000;

// Configure CORS
const corsOptions = {
  origin: "http://localhost:5173", // Frontend React app URL
  methods: ["GET", "POST"],
  credentials: true,
  allowedHeaders: ["Content-Type","Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Database connection
const server = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "ik_store",
});

// Login endpoint
app.post("/login", async (req, res) => {
  const { mobile, password } = req.body;

  const query = "SELECT * FROM registration WHERE mobile = ?";
  server.query(query, [mobile], async (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    var user = results[0];

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }
   
  //  var user = { ...userFromDb }; // This spreads the properties into a plain object

// Remove sensitive information before creating the token
const payload = {
  id: user.id,
  fullName: user.fullName,
  email: user.email
};
   const token = jwt.sign(payload,secretKey);
   console.log(token);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data:payload,
      token:token
    });
  });
});

// Change Password Endpoint
app.post("/change-password", async (req, res) => {
  const { existingPassword, newPassword } = req.body;
  const userId = req.cookies.userId;


  // Check if user is authenticated
  if (!userId) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  // Fetch the user from the database
  const query = "SELECT * FROM registration WHERE id = ?";
  server.query(query, [userId], async (error, results) => {
    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    const user = results[0];

    // Validate existing password
    const isMatch = await bcrypt.compare(existingPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Existing password is incorrect" });
    }

    // Validate the new password (e.g., check length, special characters)
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,}$/;
    if (!regex.test(newPassword)) {
      return res.status(400).json({
        message: "New password must contain at least one uppercase letter, one special character, and one number.",
      });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the password in the database
    const updateQuery = "UPDATE registration SET password = ? WHERE id = ?";
    server.query(updateQuery, [hashedPassword, user.id], (updateError) => {
      if (updateError) {
        console.error("Error updating password:", updateError);
        return res.status(500).json({ message: "Error updating password" });
      }

      res.status(200).json({ message: "Password updated successfully" });
    });
  });
});

app.put("/changePassword", (req,res)=> {
  console.log(req.body)
})

// Auth check endpoint
app.get("/auth", (req, res) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const query = "SELECT * FROM registration WHERE id = ?";
  server.query(query, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching user data:", error);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "Authenticated", userData: results[0] });
  });
});

//token update

app.get("/getUserData",(req,res)=>{
  console.log('get call')
  const token = req.headers.authorization.slice(7)
  console.log(token)
  jwt.verify(token,secretKey,(error,decoded)=>{
    if(error){
      console.log(error)
     return res.status(400).json({ok:false,message:"Failed to verify the Token"})
    }else{
     const id=decoded.id;
     const query = "SELECT * FROM registration WHERE id = ?";
     server.query(query,[id],(error,results)=>{
      if(error){
        return res.status(400).json({
          success:false,
          message:'error in getting data'
        })
      }else{
        return res.status(200).json({
          success:true,
          message:results
        })
      }
     })

    }
  })
})
//check email-id 
// Check if email exists endpoint
app.post("/check-email", (req, res) => {
  const { email } = req.body;

  // Query the database to check if the email exists
  const query = "SELECT * FROM registration WHERE email = ?";
  server.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error checking email:", error);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Email not found" });
    }

    // If email exists, send a success message
    res.status(200).json({ message: "Email found" });
  });
});


// Register endpoint
app.post("/register", async (req, res) => {
  const { fullName, email, mobile, password } = req.body;

  // Check if user already exists
  const checkQuery = "SELECT * FROM registration WHERE mobile = ? OR email = ?";
  server.query(checkQuery, [mobile, email], async (error, results) => {
    if (error) {
      console.error("Error checking user:", error);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length > 0) {
      return res.status(409).json({ message: "User already exists with this mobile or email" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database
    const insertQuery = "INSERT INTO registration (fullName, email, mobile, password) VALUES (?, ?, ?, ?)";
    server.query(insertQuery, [fullName, email, mobile, hashedPassword], (insertError, insertResults) => {
      if (insertError) {
        console.error("Error inserting user:", insertError);
        return res.status(500).json({ message: "Error registering user" });
      }

      res.status(201).json({ message: "User registered successfully" });
    });
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
