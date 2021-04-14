const formidable = require('formidable')
const _ = require('lodash')
const fs = require('fs')
const Product = require('../models/ProductModel')
const {errorHandler} = require('../helpers/dbErrorHandler')

exports.productById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if (err || !product) {
            return res.status(400).json({error: "Product not found"})
        }
        req.product = product

        next()
    })

}

exports.read = (req, res) => {
    req.product.photo = undefined
    return res.json(req.product)
}

exports.create = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({error: "Image could not be uploaded"})
        }

        // check for all fields
        const {
            name,
            description,
            price,
            category,
            quantity,
            shipping
        } = fields

        if (!name || !description || !price || !category || !quantity || !shipping) {
            return res.status(400).json({error: "All fields are required"})
        }

        let product = new Product(fields)
        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({error: "Image should be less than 1 mb in size"})
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                res.status(400).json({error: errorHandler(err)})
            }
            res.json({result})
        })
    })
}

exports.remove = (req, res) => {
    let product = req.product
    product.remove((err) => {
        if (err) {
            return res.status(400).json({error: errorHandler(err)})
        }
        res.json({message: "Product deleted successfully"})
    })
}

exports.update = (req, res) => {
    let form = new formidable.IncomingForm()
    form.keepExtensions = true
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({error: "Image could not be uploaded"})
        }

        let product = req.product
        product = _.extend(product, fields)

        if (files.photo) {
            if (files.photo.size > 1000000) {
                return res.status(400).json({error: "Image should be less than 1 mb in size"})
            }
            product.photo.data = fs.readFileSync(files.photo.path)
            product.photo.contentType = files.photo.type;
        }

        product.save((err, result) => {
            if (err) {
                res.status(400).json({error: errorHandler(err)})
            }
            res.json({result})
        })
    })
}

/**Sale & Arrival
* /products?sortBy=sold&order=desc&limi4
* /products?sortBy=createdAt&order=desc&limi4
* if no params are sent, then all products are returned
**/

exports.list = (req, res) => {

    let sortBy = req.query.sortBy ? req.query.sortBy : "_id"
    let order = req.query.order ? req.query.order : "asc"
    let limit = req.query.limit ? parseInt(req.query.limit) : 6

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .limit(limit)
        .exec((err, products) => {
            if(err){
                return res.status(400).json({message: "Products not found"})
            }
            res.status(200).json(products)
        })
}

exports.listRelated = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 6
    Product.find({_id : {$ne : req.product}, category: req.product.category})
    .limit(limit)
    .populate('category', '_id name')
    .exec((err, products) => {
        if(err){
            return res.status(400).json({error: "Products not found"})
        }
        res.json(products)
    })
}

