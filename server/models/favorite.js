import mongoose, { Schema } from 'mongoose';
import modelOptions from './model.options.js';

export default mongoose.model(
    'Favorite',
    mongoose.Schema(
        {
            user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
            product: {
                type: Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        },
        modelOptions
    )
);
