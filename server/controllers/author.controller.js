// taking calls to our DB, using the models file the schema we created will need to connect to this to our routes that will connect to our DB
const Author =  require("../models/author.model")

// CREATE COMMANDS HERE !! 

module.exports.createAuthor = (request,result) => {
    Author.create(request.body)
        .then(newAuthor => result.json({newAuthor}))
        .catch(err => result.status(400).json(err))
}

module.exports.findAll = (request,result) => {
    Author.find()
        .then(allAuthors => {result.json(allAuthors)})
        .catch(err => result.json({message:"OOPS something went wrong with our get all method", messageError : err}))
}

module.exports.deleteAuthor = (request,result) => {
    Author.deleteOne({_id:request.params.id})
        .then(remove => result.json({remove:remove}))
        .catch(err => result.json({message:"OOPS something went wrong with our delete method", messageError : err}))
}

module.exports.findOneAuthor = (request,result) =>{
    Author.findOne({_id: request.params.id})
        .then( oneAuthor => result.json({author:oneAuthor}))
        .catch(err => result.json({message:"OOPS something went wrong with our findOne method", messageError : err}))
}

module.exports.updateAuthor = (request,result) => {
    Author.findOneAndUpdate({_id:request.params.id},
        request.body,
        {new:true, runValidators:true})
    .then(editAuthor => result.json(editAuthor))
    .catch(err => result.status(400).json(err))

}