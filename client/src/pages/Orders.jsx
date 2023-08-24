import React from 'react';
import { Helmet } from 'react-helmet-async';
import OrderList from '../components/common/OrderList';

const Orders = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Helmet>
                <title>Order History</title>
            </Helmet>
            <div>
                <h2 className="text-center text-3xl pb-4">Order History</h2>
                <OrderList />
            </div>
        </div>
    );
};

export default Orders;
