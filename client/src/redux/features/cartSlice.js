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
        removecartItem: (state, action) => {
            const { id: productId } = action.payload;
            state.cartItems = [...state.cartItems].filter(
                (e) => e.id !== productId
            );
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
        },
        setcartItems: (state, action) => {
            if (!action.payload) {
                localStorage.setItem('cartItems', []);
            }
            state.cartItems = action.payload;
        },
        addcartItem: (state, action) => {
            const newItem = action.payload;
            if (!localStorage.getItem('cartItems')) {
                state.cartItems = [newItem];
                localStorage.setItem(
                    'cartItems',
                    JSON.stringify(state.cartItems)
                );
                return;
            }

            const cartItems = JSON.parse(localStorage.getItem('cartItems'));

            const existItem = cartItems.find((item) => item.id === newItem.id);

            if (existItem) {
                const newList = cartItems.map((item) =>
                    item.id === newItem.id ? newItem : item
                );
                state.cartItems = newList;
                localStorage.setItem(
                    'cartItems',
                    JSON.stringify(state.cartItems)
                );
            } else {
                state.cartItems = [...state.cartItems, newItem];
                localStorage.setItem(
                    'cartItems',
                    JSON.stringify(state.cartItems)
                );
                return;
            }
        },
        clearCart: (state, action) => {
            state.cartItems = [];
            localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
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
