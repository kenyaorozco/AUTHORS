// import controller to use the model that were created
const Author = require("../controllers/author.controller")
// const Author = require("../models/author.model")

// Controller is calling the WHOLE THING and the 2nd param will envoke a certain function
module.exports = (app) => {
    // Create Product
    app.post("/newAuthor",Author.createAuthor)
    // Display all Products
    app.get("/author",Author.findAll)
    // Delete product by ID
    app.delete("/delete/author/:id",Author.deleteAuthor)
    // Get one product by ID
    app.get("/author/:id",Author.findOneAuthor)
    // Update a product by a certain ID
    app.put("/update/author/:id",Author.updateAuthor)
}


