import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import orderApi from '../../api/modules/orderApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';
import PaymentButton from './PaymentButton';

const OrderList = ({ max }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const getOrders = async () => {
            dispatch(setGlobalLoading(true));

            const { response, err } = await orderApi.getListUser();

            dispatch(setGlobalLoading(false));

            if (err) toast.error(err.message);

            if (response) {
                if (max) {
                    setOrders(
                        response
                            .sort(
                                (a, b) =>
                                    Date.parse(b.createdAt) -
                                    Date.parse(a.createdAt)
                            )
                            .slice(0, 4)
                    );
                } else {
                    setOrders(
                        response.sort(
                            (a, b) =>
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                        )
                    );
                }
            }
        };
        getOrders();
    }, [dispatch, max]);
    return (
        <div>
            <div className="hidden md:inline-flex ">
                <ul className="w-[95vw] lg:w-[90vw]  flex flex-col gap-2">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="w-full border border-pink rounded-xl flex items-center justify-between py-2 px-4 bg-gray-200 bg-opacity-50 backdrop-blur-2xl">
                            <div className="flex justify-between items-center xl:gap-5 w-1/3 lg:w-[40%] ">
                                <p className="truncate w-full">
                                    <strong>ID:</strong> {order.id}
                                </p>
                                <div className="flex flex-col lg:flex-row lg:gap-4 lg:justify-evenly items-center w-full">
                                    <p>
                                        <strong>Price:</strong> $
                                        {order.totalPrice}
                                    </p>
                                    <p className="flex flex-col xl:flex-row items-center">
                                        <strong>Date:</strong>
                                        <p>{order.createdAt.slice(0, 10)}</p>
                                    </p>
                                </div>
                            </div>
                            <div className="w-1/4 lg:w-[20%] flex justify-center">
                                {order.isPaid ? (
                                    <p
                                        className="min-w-fit border border-green-300 rounded-lg shadow-sm shadow-green-300
                         bg-green-200 p-1 font-bold text-green-800 px-4 py-2">
                                        Order Paid
                                    </p>
                                ) : (
                                    <PaymentButton order={order} />
                                )}
                            </div>
                            <div className="w-1/4 lg:w-[20%] flex justify-center">
                                {order.isDelivered ? (
                                    <p
                                        className="min-w-fit border border-green-300 rounded-lg shadow-sm shadow-green-300
                         bg-green-200 p-1 font-bold text-green-800 px-4 py-2">
                                        Order Delivered
                                    </p>
                                ) : (
                                    <p
                                        className="border min-w-fit border-red-300 rounded-lg shadow-sm shadow-red-300
                         bg-red-200 p-1 font-bold text-red-800 px-4 py-2">
                                        Waiting Delivery
                                    </p>
                                )}
                            </div>

                            <div className="w-[8%]">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/order/${order.id}`)
                                    }
                                    className="rounded-lg border hover:bg-blue-500 bg-yellow p-2
                    text-black font-medium font-roboto ">
                                    Details
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="md:hidden">
                <ul className="w-[90vw]  flex flex-col gap-3">
                    {orders.map((order) => (
                        <li
                            key={order.id}
                            className="border rounded-xl border-pink flex items-center gap-3 p-2 bg-gray-200 bg-opacity-50 backdrop-blur-2xl">
                            <div className="w-full flex flex-col gap4">
                                <div className="flex flex-col sm:flex-row sm:gap-3 sx:items-center">
                                    <p className="truncate">
                                        <strong>ID:</strong> {order.id}
                                    </p>
                                    <p className="flex gap-1">
                                        <strong>Date:</strong>
                                        <p>{order.createdAt.slice(0, 10)}</p>
                                    </p>
                                </div>

                                <div className="w-full flex flex-col sm:flex-row gap-4 sm:items-center">
                                    <p>
                                        <strong>Price:</strong> $
                                        {order.totalPrice}
                                    </p>
                                    {order.isPaid ? (
                                        <p
                                            className="min-w-fit border border-green-300 rounded-lg shadow-sm shadow-green-300
                         bg-green-200 p-1 font-bold text-green-800 text-center sm:mt-2">
                                            Order Paid
                                        </p>
                                    ) : (
                                        <PaymentButton order={order} />
                                    )}

                                    {order.isDelivered ? (
                                        <p
                                            className="min-w-fit text-center border border-green-300 rounded-lg shadow-sm shadow-green-300
                         bg-green-200 p-1 font-bold text-green-800 sm:mt-2">
                                            Order Delivered
                                        </p>
                                    ) : (
                                        <p
                                            className="border min-w-fit border-red-300 rounded-lg shadow-sm shadow-red-300
                         bg-red-200 p-1 font-bold text-red-800 text-center sm:mt-2">
                                            Waiting Delivery
                                        </p>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(`/order/${order.id}`)
                                        }
                                        className="w-[60vw] mx-auto sm:hidden rounded-lg border hover:bg-blue-500 bg-yellow py-3 px-4
                    text-black font-medium font-serif ">
                                        Details
                                    </button>
                                </div>
                            </div>
                            <div className="hidden sm:inline-flex w-1/4">
                                <button
                                    type="button"
                                    onClick={() =>
                                        navigate(`/order/${order.id}`)
                                    }
                                    className="w-full rounded-lg border hover:bg-blue-500 bg-yellow py-3 px-4
                    text-black font-medium font-serif ">
                                    Details
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default OrderList;
