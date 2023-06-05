import privateClient from '../client/privateClient';
import publicClient from '../client/publicClient';

const orderEndpoints = {
    getList: 'orders/',
    create: 'orders/create',
    orderDetail: ({ orderId }) => `orders/order-detail/${orderId}`,
    productInfoById: ({ orderId }) => `orders/${orderId}`,
    remove: ({ orderId }) => `orders/${orderId}`,
    update: ({ orderId }) => `orders/update/${orderId}`,
    orderPayment: ({ orderId }) => `orders/order-payment/${orderId}`,
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
    create: async ({
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        totalPrice,
        orderItems,
    }) => {
        try {
            const response = await privateClient.post(orderEndpoints.create, {
                shippingAddress,
                paymentMethod,
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
    orderPayment: async ({ orderId }) => {
        try {
            const response = await privateClient.put(
                orderEndpoints.orderPayment({ orderId })
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
