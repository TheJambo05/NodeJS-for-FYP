const { Schema, model } = require('mongoose');

// const productItemSchema = new Schema({
//     user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
//     category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
//     title: { type: String, required: [true, 'title is required'] },
//     description: { type: String, default: "" },
//     price: { type: Number, required: true },
//     images: { type: Array },
// });

const productSchema = new Schema({
    // user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    // items: { type: [productItemSchema], default: [] },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
    title: { type: String, required: [true, 'title is required'] },
    description: { type: String, default: "" },
    price: { type: String, required: true },
    images: { type: String },
    updatedOn: { type: Date }, 
    createdOn: { type: Date }
});

productSchema.pre('save', function(next) {
    this.updatedOn = new Date();
    this.createdOn = new Date();

    next();
});

productSchema.pre(['update', 'findOneAndUpdate', 'updateOne'], function(next) {
    const update = this.getUpdate();
    delete update._id;

    this.updatedOn = new Date();

    next();
});

const ProductModel = model('Product', productSchema);

module.exports = ProductModel;