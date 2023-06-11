import privateClient from '../client/privateClient';

const orderEndpoints = {
    getList: 'orders/',
    getListUser: 'orders/history',
    create: 'orders/create',
    orderDetail: ({ orderId }) => `orders/order-detail/${orderId}`,
    productInfoById: ({ orderId }) => `orders/${orderId}`,
    remove: ({ orderId }) => `orders/delete/${orderId}`,
    update: ({ orderId }) => `orders/update/${orderId}`,
    orderPayment: ({ orderId }) => `orders/pay/${orderId}`,
    orderDelivery: ({ orderId }) => `orders/order-delivery/${orderId}`,
};

const orderApi = {
    getList: async () => {
        try {
            const response = await privateClient.get(orderEndpoints.getList);
            return { response };
        } catch (err) {
            return { err };
        }
    },
    getListUser: async () => {
        try {
            const response = await privateClient.get(
                orderEndpoints.getListUser
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    create: async ({
        shippingAddress,
        paymentId,
        itemsPrice,
        shippingPrice,
        totalPrice,
        orderItems,
    }) => {
        try {
            const response = await privateClient.post(orderEndpoints.create, {
                shippingAddress,
                paymentId,
                itemsPrice,
                shippingPrice,
                totalPrice,
                orderItems,
            });
            return { response };
        } catch (err) {
            return { err };
        }
    },
    remove: async ({ orderId }) => {
        try {
            console.log(orderId);
            const response = await privateClient.delete(
                orderEndpoints.remove({ orderId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    orderDetail: async ({ orderId }) => {
        try {
            const response = await privateClient.get(
                orderEndpoints.orderDetail({ orderId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    update: async ({ orderId, shippingAddress, paymentMethod }) => {
        try {
            const response = await privateClient.put(
                orderEndpoints.update({ orderId }),
                {
                    shippingAddress,
                    paymentMethod,
                }
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    orderPayment: async ({ orderId, token, amount }) => {
        try {
            const response = await privateClient.post(
                orderEndpoints.orderPayment({ orderId }),
                { token, amount }
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    orderDelivery: async ({ orderId }) => {
        try {
            const response = await privateClient.put(
                orderEndpoints.orderDelivery({ orderId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default orderApi;
