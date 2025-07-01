// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// const dotenv = require("dotenv");
// const expenseRoute = require("./routes/expense");

// dotenv.config();
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use("/expenses", expenseRoute);

// // DB Connection
// mongoose.connect(process.env.DB_CONNECTION).then(() => {
//   console.log("DB Connected Successfully");
// }).catch((err) => {
//   console.log(err);
// });

// app.listen(process.env.PORT, () => {    
//   console.log(`Server is runnig on port ${process.env.PORT}`);
// });


const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const expenseRoute = require("./routes/expense");

dotenv.config();
const app = express();

// ✅ CORS Configuration (allow frontend URLs)
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "https://expense-tracker-system-s.netlify.app/" // Your Netlify frontend
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like Postman or curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Routes
app.use("/expenses", expenseRoute);

// DB Connection
mongoose.connect(process.env.DB_CONNECTION).then(() => {
  console.log("DB Connected Successfully");
}).catch((err) => {
  console.log(err);
});

// Start server
app.listen(process.env.PORT, () => {    
  console.log(`Server is running on port ${process.env.PORT}`);
});
