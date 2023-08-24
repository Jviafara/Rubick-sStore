import mongoose from 'mongoose';
import modelOptions from './model.options.js';

const productSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        category: { type: String },
        images: { type: [String] },
        price: { type: Number },
        countInStock: { type: Number },
        brand: { type: String },
        rating: { type: Number },
        numReviews: { type: Number },
        description: { type: String },
        isFavorite: { type: Boolean },
    },
    modelOptions
);

const Product = mongoose.model('Product', productSchema);
export default Product;
