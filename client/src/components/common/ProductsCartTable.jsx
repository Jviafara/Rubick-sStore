import React, { useEffect } from 'react';
import { FaMinusCircle, FaPlusCircle, FaTrash } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { addcartItem, removecartItem } from '../../redux/features/cartSlice';

const ProductsCartTable = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { cartItems } = useSelector((state) => state.cart);
    const updateCartHandler = async (item, quantity) => {
        dispatch(addcartItem({ ...item, quantity }));
    };

    const removeItem = async (item) => {
        dispatch(removecartItem({ ...item }));
    };

    useEffect(() => {
        if (!cartItems) navigate(0);
    }, [navigate, cartItems]);

    return (
        <div className="flex justify-center w-full">
            <ul className=" flex flex-col  backdrop-blur-2xl rounded-lg">
                {cartItems?.map((item) => (
                    <li
                        key={item.slug}
                        className="flex items-center justify-between xs:gap-8 sm:px-4 md:px-8 pb-4">
                        <div className="min-w-[150px] md:w-[200px] ">
                            <Link to={`/product/slug/${item.slug}`}>
                                <img
                                    src={item.images[0]}
                                    alt={item.name}
                                    className=" object-cover rounded-lg hover:scale-105"
                                />
                            </Link>
                        </div>
                        <div className="hidden md:inline-flex w-[100%] text-xl text-center font-bold justify-center font-roboto hover:scale-105">
                            <Link to={`/product/slug/${item.slug}`}>
                                {item.name}
                            </Link>
                        </div>
                        <div className="flex flex-col md:flex-row items-center gap-2  md:px-4">
                            <div className="md:hidden text-sm text-left font-bold font-roboto truncate hover:scale-105">
                                <Link to={`/product/slug/${item.slug}`}>
                                    <h1>{item.name}</h1>
                                </Link>
                            </div>
                            <div className="flex justify-center gap-2 text-2xl flex-grow w-[135px]">
                                <button
                                    onClick={() =>
                                        updateCartHandler(
                                            item,
                                            item.quantity - 1
                                        )
                                    }
                                    type="button"
                                    disabled={item.quantity === 1}>
                                    {item.quantity === 1 ? (
                                        <FaMinusCircle
                                            color="#AAAAAA"
                                            size={24}
                                        />
                                    ) : (
                                        <FaMinusCircle
                                            className="hover:scale-110"
                                            size={24}
                                        />
                                    )}
                                </button>{' '}
                                <span>{item.quantity}</span>{' '}
                                <button
                                    onClick={() =>
                                        updateCartHandler(
                                            item,
                                            item.quantity + 1
                                        )
                                    }
                                    type="button"
                                    disabled={
                                        item.quantity === item.countInStock
                                    }>
                                    {item.quantity === item.countInStock ? (
                                        <FaPlusCircle
                                            color="#AAAAAA"
                                            size={24}
                                        />
                                    ) : (
                                        <FaPlusCircle
                                            className="hover:scale-110"
                                            size={24}
                                        />
                                    )}
                                </button>
                            </div>
                            <div className="w-full text-center">
                                <p className="text-2xl font-bold font-roboto">
                                    ${item.price}
                                </p>
                            </div>
                            <div className="">
                                <button
                                    className="hover:scale-110"
                                    onClick={() => removeItem(item)}
                                    type="button">
                                    <FaTrash size={32} />
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductsCartTable;
