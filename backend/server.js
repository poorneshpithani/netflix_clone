const express = require("express");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require("path");

const connectDB = require("./config/db");

const authRouter = require("./routes/auth");
const movieRouter = require("./routes/movie.route");
const tvRouter = require("./routes/tvRoutes");
const searchRoute = require("./routes/searchRoute");

const protectedRoute = require("./middleware/protectedRoute");

const app = express();

// No need to redeclare __dirname, it's already globally available

// const __dirname = path.resolve();

app.use(express.json());  // will allow us to parse req.body
app.use(cookieParser());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/movie", protectedRoute, movieRouter);
app.use("/api/v1/tv", protectedRoute, tvRouter);
app.use("/api/v1/search", protectedRoute, searchRoute);



if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
    });
}


// Listen on port 8000
app.listen(8000, () => {
    console.log(`Server running successfully on port 8000`);
    connectDB();
});
