import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { toast } from 'react-toastify';
import orderApi from '../../api/modules/orderApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';

const PaymentButton = ({ order }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const handleToken = async (total, token) => {
        dispatch(setGlobalLoading(true));

        const { response, err } = await orderApi.orderPayment({
            orderId: order.id,
            token,
            amount: total,
        });
        dispatch(setGlobalLoading(false));

        if (err) toast.error(err.message);

        if (response) {
            navigate(0);
        }
    };

    const tokenHandler = (token) => {
        handleToken(order.totalPrice, token);
    };

    return (
        <div>
            <StripeCheckout
                name="Payment"
                email={user.email}
                amount={order?.totalPrice * 100}
                description={`Payment order: ${order?.id}`}
                token={tokenHandler}
                stripeKey="pk_test_51NGzQhAWaH59OtvEbobT1NiRqKYk9Q6C5FLgWEvs4CcEz23nkODRsyBEo7hkYhMlccQcVEJ9hTV3fkUxZYQmJJl100Qeg9dxqt">
                <button
                    type="button"
                    className="rounded-lg border bg-blue-600 p-2 px-4  w-full text-white font-bold text-lg">
                    Pay now
                </button>
            </StripeCheckout>
        </div>
    );
};

export default PaymentButton;
