const Product = require("../models/Product")

module.exports = class ProductController {
    static showProducts(req, res){
      res.render('products/all')  
    }
    static createProduct(req, res){
      res.render('products/create')
    }

    static createProductPost(req, res){
      const name = req.body.name
      const description = req.body.description
      const price = req.body.price

      const product = new Product(name, description, price)
      product.save()
      
      res.redirect('/products')
    }
}