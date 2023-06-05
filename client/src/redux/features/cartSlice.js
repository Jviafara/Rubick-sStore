import { createSlice } from '@reduxjs/toolkit';

export const cartSlice = createSlice({
    name: 'Cart',
    initialState: {
        shippingAddress: null,
        cartItems: [],
    },
    reducers: {
        setShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
        },
        setcartItems: (state, action) => {
            state.cartItems = action.payload;
        },
        removecartItem: (state, action) => {
            const { productId } = action.payload;
            state.cartItems = [...state.cartItems].filter(
                (e) => e.product !== productId
            );
        },
        addcartItem: (state, action) => {
            state.cartItems = [action.payload, ...state.cartItems];
        },
        clearCart: (state, action) => {
            state.cartItems = [];
        },
    },
});

export const {
    clearCart,
    setShippingAddress,
    setcartItems,
    removecartItem,
    addcartItem,
} = cartSlice.actions;

export default cartSlice.reducer;
