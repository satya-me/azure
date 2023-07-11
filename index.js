const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const userRoutes = require("./Routes/User");
const bodyParser = require("body-parser");
const User = require("./Models/User");
const app = express();

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.set("strictQuery", true);
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("Successfully connected to MongoDB");
    })
    .catch((err) => {
        console.log("Unable to connect to MongoDB");
        console.error(err);
    });

// app.use(express.static('public'));
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello, Azure!'); // This sends the response "Hello, world!" to the browser
});

app.get('/user', async (req, res) => {
    res.send(await User.find({}));
});

app.use("/api/auth", userRoutes);

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));


