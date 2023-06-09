import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setShippingAddress } from '../../redux/features/cartSlice';

const ShippingAddressForm = ({ shippingAddress }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState(shippingAddress?.name || '');
    const [address, setAddress] = useState(shippingAddress?.address || '');
    const [city, setCity] = useState(shippingAddress?.city || '');
    const [postalCode, setPostalCode] = useState(
        shippingAddress?.postalCode || ''
    );
    const [country, setCountry] = useState(shippingAddress?.country || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const userAddress = { name, address, city, postalCode, country };
        dispatch(setShippingAddress(userAddress));
        navigate('/place-order');
    };
    return (
        <div className="flex justify-center w-full ">
            <div className="flex flex-col items-center w-[90vw] md:w-[66vw] lg:w-[33vw]">
                <h2 className="text-center text-3xl ">Shipping Address</h2>
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col items-center gap-2 mb-4">
                    <div className="flex w-full flex-col text-lg xl:text-xl gap-1">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg py-2 px-4 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent"
                        />
                    </div>
                    <div className="flex w-full flex-col text-lg xl:text-xl gap-1">
                        <label htmlFor="address">Address</label>
                        <input
                            type="text"
                            name="address"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full rounded-lg py-2 px-4 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent"
                        />
                    </div>
                    <div className="flex w-full flex-col text-lg xl:text-xl gap-1">
                        <label htmlFor="city">City</label>
                        <input
                            type="text"
                            name="city"
                            id="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            className="w-full rounded-lg py-2 px-4 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent"
                        />
                    </div>
                    <div className="flex w-full flex-col text-lg xl:text-xl gap-1">
                        <label htmlFor="postalCode">Postal Code</label>
                        <input
                            type="text"
                            name="postalCode"
                            id="postalCode"
                            value={postalCode}
                            onChange={(e) => setPostalCode(e.target.value)}
                            className="w-full rounded-lg py-2 px-4 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent"
                        />
                    </div>
                    <div className="flex w-full flex-col text-lg xl:text-xl gap-1">
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            name="country"
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full rounded-lg py-2 px-4 text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent"
                        />
                    </div>
                    <button
                        type="submit"
                        className="rounded-lg w-1/2 border hover:bg-blue-500 bg-yellow py-2 px-4
                        font-medium font-roboto uppercase mt-4 text-white">
                        Countinue
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ShippingAddressForm;
