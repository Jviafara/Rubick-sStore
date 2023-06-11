import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../api/modules/orderApi';
import PaymentButton from '../components/common/PaymentButton';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';

const OrderDetails = () => {
    const params = useParams();

    const dispatch = useDispatch();
    const [order, setOrder] = useState(null);

    const { id: orderId } = params;

    useEffect(() => {
        const getOrder = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await orderApi.orderDetail({ orderId });
            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);

            if (response) {
                setOrder(response);
            }
        };
        getOrder();
    }, [dispatch, orderId]);

    return (
        <div className="w-[90vw] mx-auto flex flex-col items-center justify-center">
            <Helmet>
                <title>Order Preview</title>
            </Helmet>
            <h2 className="text-center text-xl xl:text-3xl mx-5 py-4 truncate flex gap-2 justify-center">
                Order: #<span>{order ? order.id : ''}</span>
            </h2>
            <div className="flex flex-col lg:flex-row gap-8 w-full">
                <section className="w-full lg:w-[70%] flex flex-col gap-4 ">
                    <div className="flex flex-col gap-2 p-6 border border-yellow rounded-lg">
                        <h1 className="text-2xl font-medium ">Shipping</h1>
                        <div>
                            <p className="text-lg">
                                <strong>Name:</strong>{' '}
                                {order?.shippingAddress.name}
                            </p>
                            <p>
                                <strong>Address:</strong>{' '}
                                {order?.shippingAddress.address}
                            </p>
                        </div>
                        {order?.isDelivered ? (
                            <div
                                className="border border-green-300 rounded-lg shadow-sm shadow-green-300 bg-green-200 p-4 font-bold
                text-green-800 mt-2">
                                Order Delivered
                            </div>
                        ) : (
                            <div
                                className="border border-red-300 rounded-lg shadow-sm shadow-red-300 bg-red-200 p-4 font-bold
                text-red-800 mt-2">
                                Not Delivered
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 p-6 border border-yellow rounded-lg">
                        <h1 className="text-2xl font-medium ">Payment</h1>
                        {order?.isPaid ? (
                            <div
                                className="border border-green-300 rounded-lg shadow-sm shadow-green-300 bg-green-200 p-4 font-bold
                text-green-800 mt-2">
                                Order Paid
                            </div>
                        ) : (
                            <div>
                                <div
                                    className="border mb-3 border-red-300 rounded-lg shadow-sm shadow-red-300 bg-red-200 p-4 font-bold
                text-red-800 mt-2">
                                    Not Paid
                                </div>
                                <div className="w-full ">
                                    <PaymentButton order={order} />
                                    <h1 className="mt-4 text-center">
                                        Demo card: 4242 4242 4242 4242 / any
                                        future date / any 3 digit CVV
                                    </h1>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-2 p-6 border border-yellow rounded-lg">
                        <h1 className="text-2xl font-medium ">Items</h1>
                        <div className="w-full">
                            <ul className=" flex flex-col w-full rounded-lg ">
                                {order?.orderItems.map((item) => (
                                    <div
                                        key={item.slug}
                                        className="border-b last-of-type:border-none h-full">
                                        <li className="flex flex-col md:flex-row  items-center gap-4 p-4">
                                            <div className="flex-grow">
                                                <Link
                                                    to={`/product/slug/${item.slug}`}>
                                                    <img
                                                        src={item.images?.[0]}
                                                        alt={item.name}
                                                        className=" max-w-full min-w-[96px] h-24 "
                                                    />
                                                </Link>
                                            </div>
                                            <div className="text-xl text-center font-bold flex-grow-3 w-full">
                                                <Link
                                                    to={`/product/slug/${item.slug}`}>
                                                    {item.name}
                                                </Link>
                                            </div>
                                            <div className="flex flex-col items-center gap-2 lg:flex-row w-full px-4">
                                                <div className="flex justify-center gap-2 text-2xl flex-grow w-[135px]">
                                                    <span>{item.quantity}</span>{' '}
                                                </div>
                                                <div className="flex-grow w-full text-center">
                                                    <p className="text-xl font-bold">
                                                        ${item.price}
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="w-full lg:w-[30%] flex flex-col xl:mx-4 xl:px-6 gap-4">
                    <div className="flex flex-col gap-2 p-6 border border-yellow rounded-lg">
                        <h1 className="text-2xl font-medium mb-2">
                            Order Summary
                        </h1>
                        <div className="flex justify-between px-4 lg:p-0 text-2xl">
                            <div className="w-2/3">
                                <p>Items</p>
                            </div>
                            <p>${order?.itemsPrice}</p>
                        </div>
                        <hr className="border border-yellow" />
                        <div className="flex justify-between px-4 lg:p-0 text-2xl">
                            <div className="w-2/3">
                                <p>Shipping</p>
                            </div>
                            <p>${order?.shippingPrice}</p>
                        </div>
                        <hr className="border border-yellow" />
                        <div className="flex justify-between px-4 lg:p-0 text-2xl font-bold">
                            <div className="w-2/3">
                                <p>Order Total</p>
                            </div>
                            <p>${order?.totalPrice}</p>
                        </div>
                    </div>
                    {order?.isPaid && (
                        <div className="flex flex-col gap-3">
                            <Link
                                to={'/products'}
                                type="button"
                                className="rounded-lg border hover:bg-blue-600 bg-yellow p-2 w-full text-center text-white font-bold text-lg">
                                Cotinue Shopig!
                            </Link>
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};

export default OrderDetails;
