const CartModel = require('./../models/cart_model');
const CartController = {

    getCartForUser: async function(req, res) {
        try {
            const user = req.params. user;
            const foundCart = await CartModel.findOne({ user: user }).populate("items.product");

            if(!foundCart) {
                return res.json({ success: true, data: [] });
            }
            return res.json({ success: true, data: foundCart.items });
        }
        catch(ex){
            return res.json({ success: true, data: newCart, message: ex });
        }
    },

    addToCart: async function (req, res) {
        try {
            //checking if try block excute or not
            console.log("Try block is executed!");

            // Extracting necessary data from the request body
            const { product, user, quantity } = req.body;

            // Finding the cart associated with the user
            const foundCart = await CartModel.findOne({ user: user });




            // If the cart does not exist
            if (!foundCart) {
                // Create a new cart and add the product to its items array
                const newCart = new CartModel({ user: user });
                newCart.items.push({
                    product: product,
                    quantity: quantity
                });

                // Save the new cart to the database
                await newCart.save();

                // Return a success response with the new cart data
                return res.json({ success: true, data: newCart, message: "Product is added to cart" });
            }


            //Deleting the item if it already exist
            const deletedItem = await CartModel.findOneAndUpdate(
                {user:user, "items.product": product},
                { $pull: {items: {product: product} } },
                { new: true }
            )

            // If the cart already exists
            // Update the cart by pushing the new product to its items array
            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user },
                { $push: { items: { product: product, quantity: quantity } } },
                { new: true }
            ).populate("items.product");

            // Return a success response with the updated cart data
            return res.json({ success: true, data: updatedCart.items, message: "Product is added to cart" });
        }
        catch (ex) {
            // If an error occurs, return a failure response
            return res.json({ success: false, message: "Error occurred while adding product to cart" });
        }
    },
    

    removeFromCart: async function(req, res) {
        try {
            const { user, product } = req.body;
            const updatedCart = await CartModel.findOneAndUpdate(
                { user: user},
                { $pull: { items: { product: product }}},

                { new: true }
            ).populate("items.product");
                
             return res.json({ success: true, data: updatedCart.items, message: "Product is removed from the cart" });
        }
        catch (ex){
            return res.json({ success: false, message: ex });
        }
    },
};



module.exports = CartController;
