const express = require('express');
const app = express();

// app.use(express.static('public'));
// const POST = process.env.PORT | 8080
const port = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.send('Hello, Azure! auto deploy'); // This sends the response "Hello, world!" to the browser
});

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));