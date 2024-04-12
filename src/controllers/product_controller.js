const ProductModel = require('./../models/product_model');

const ProductController = {

    ////Done
    createProduct: async function(req, res) {
        try {
            const productData = req.body;
            const image = req.file ? req.file.filename: null;
            productData.images = image;
            console.log(productData);
            const newProduct = new ProductModel(productData);
            await newProduct.save();

            return res.json({ success: true, data: newProduct, message: "Product created!" });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },
    
    ////Done
    fetchAllProducts: async function(req, res) {
        try {
            const products = await ProductModel.find();
            return res.json({ success: true, data: products });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },


    ////Done
    fetchProductByCategory: async function(req, res) {
        try {
            const category = req.params.id;
            const products = await ProductModel.find({ category: category });
            return res.json({ success: true, data: products });
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },


    

    fetchProductsByUserId: async function(req, res) {
        try {
            const userId = req.params.id;
            const products = await ProductModel.find({ user: userId });
            return res.json ({ success: true, data: products})
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    },

    deleteProduct: async function(req, res) {
        try {
            const productId = req.params.id;
            const deletedProduct = await ProductModel.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.json({ success: false, message: "Product not found!" });
            }
            return res.json ({ success: true, data: deletedProduct, message: "Product deleted!"});
        }
        catch(ex) {
            return res.json({ success: false, message: ex });
        }
    }
};

module.exports = ProductController;

