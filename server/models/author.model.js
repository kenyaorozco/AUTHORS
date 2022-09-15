// Import mongoose with our DB w/ mongo
const mongoose = require('mongoose');

// create a schema - this will connect to the DB 
const AuthorsSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "Please add a first name"],
        minlength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Please add a last name"],
        minlength: [2, "Last name must be at least 2 characters long"]
    }
}, { timestamps: true })

// Create const to connect to our DB therefore we can input data into our DB
const Author = mongoose.model("Author", AuthorsSchema)

// export the module, access it in our server.js
module.exports = Author;