const dotenv = require('dotenv');
dotenv.config(); 

const express = require('express');
const cors = require('cors');
const connectDB = require('./db/db'); 
const userRoutes = require('./routes/user.routes')
const app = express();

// Connect to the database
connectDB();

// Enable CORS for all domains (you can customize this)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true }))

// Define routes
app.get('/', (req, res) => {
    res.send("Hello World");
});

app.use('/users',userRoutes);


// Export the app (so you can use it in another file, e.g., for testing)
module.exports = app;

