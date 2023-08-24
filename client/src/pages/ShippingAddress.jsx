import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import ShippingAddressForm from '../components/common/ShippingAddressForm';

const ShippingAddress = () => {
    const { shippingAddress } = useSelector((state) => state.cart);

    return (
        <div className="flex flex-col gap-4">
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <ShippingAddressForm shippingAddress={shippingAddress} />
        </div>
    );
};

export default ShippingAddress;
