const ProductRoutes = require('express').Router();
const ProductController = require('./../controllers/product_controller');
const upload = require("../middleware/multer");

ProductRoutes.get("/", ProductController.fetchAllProducts);
ProductRoutes.get("/category/:id", ProductController.fetchProductByCategory);
ProductRoutes.post("/",upload.single('images'), ProductController.createProduct);
ProductRoutes.get("/user/:id", ProductController.fetchProductsByUserId); // Add this line for fetching products by user ID
ProductRoutes.delete("/:id", ProductController.deleteProduct);

module.exports = ProductRoutes;
