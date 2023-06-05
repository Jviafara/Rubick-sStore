import express from 'express';
import responseHandler from '../handlers/response.handler.js';
import Order from '../models/order.js';
import User from '../models/user.js';

const router = express.Router();

const create = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return responseHandler.unauthorize(res);

        const order = await Order.create({
            orderItems: req.body.orderItems.map((product) => ({
                ...product,
                product: product._id,
            })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice,
            user: user.id,
        });

        responseHandler.created(res, order);
    } catch {
        responseHandler.error(res);
    }
};

const orderDetail = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return responseHandler.unauthorize(res);

        //Find Order
        const order = await Order.findById(req.params.id);

        responseHandler.ok(res, order);
    } catch {
        responseHandler.error(res);
    }
};

const ordersList = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        //Find Orders
        const orders = await Order.find();

        responseHandler.ok(res, orders);
    } catch {
        responseHandler.error(res);
    }
};

const updateOrder = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return responseHandler.unauthorize(res);

        const order = await Order.findById(req.params.id);
        if (!order) return responseHandler.notFound(res);

        order.shippingAddress = req.body.shippingAddress;
        order.paymentMethod = req.body.paymentMethod;

        await order.save();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const orderPayment = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return responseHandler.unauthorize(res);

        const order = await Order.findById(req.params.id);
        if (!order) return responseHandler.notFound(res);

        order.isPaid = true;
        order.paidAt = Date.now();
        // order.paymentResults = {
        //     id: req.body.id,
        //     status: req.body.status,
        //     update_time: req.body.update_time,
        //     email_address: req.body.email_address,
        // };

        await order.save();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const orderDelivery = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        const order = await Order.findById(req.params.id);
        if (!order) return responseHandler.notFound(res);

        order.isDelivered = true;
        order.deliveredAt = Date.now();

        await order.save();
        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

const remove = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) return responseHandler.unauthorize(res);

        await Order.findByIdAndDelete(req.params.id);

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

export default {
    create,
    orderDetail,
    ordersList,
    orderPayment,
    orderDelivery,
    remove,
    updateOrder,
};
