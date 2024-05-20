const express = require("express");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/userRoutes");
const taskRouter = require("./routes/taskRoutes");
const dotenv = require("dotenv");
const path = require("path");

const app = express();
const cors = require("cors");
dotenv.config();

app.use(express.json());
app.use(cookieParser());
app.use(cors());

// Serve static files from the dist directory
// app.use(express.static(path.join(__dirname, "./frontend/dist")));

// // Route for serving index.html for any other routes
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "./frontend/dist/index.html"), function(err) {
//         if (err) {
//             res.status(500).send(err);
//         }
//     });
// });

app.use("/api/v1", userRouter);
app.use("/api/v2", taskRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send("Something went wrong!");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
