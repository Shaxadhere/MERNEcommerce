const Category = require('../models/CategoryModel')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.categoryById = (req, res, next, id) => {
    Category.findById(id).exec((err, category) => {
        if(err){
            return res.status(400).json({error: err})
        }
        req.category = category
        next()
    })
}

exports.read = (req, res) => {
    return res.status(200).json(req.category)
}

exports.create = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({error: errorHandler(err)})
        }
        res.json({data})
    })
}

exports.remove = (req, res) => {
    
}

exports.update = (req, res) => {

}