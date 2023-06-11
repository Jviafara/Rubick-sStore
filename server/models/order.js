import { Schema, model } from 'mongoose';
import modelOptions from './model.options.js';

const orderSchema = new Schema(
    {
        orderItems: [
            {
                slug: { type: String, required: true },
                name: { type: String, required: true },
                quantity: { type: Number, required: true },
                images: { type: [String], required: true },
                price: { type: Number, required: true },
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
        shippingAddress: {
            name: { type: String, required: true },
            address: { type: String, required: true },
            city: { type: String, required: true },
            postalCode: { type: String, required: true },
            country: { type: String, required: true },
        },
        paymentId: { type: String, required: true },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        totalPrice: { type: Number, required: true },

        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },

        isPaid: { type: Boolean, default: false },
        paidAt: Date,
        isDelivered: { type: Boolean, default: false },
        deliveredAt: Date,
    },
    modelOptions
);

const Order = model('Order', orderSchema);

export default Order;
