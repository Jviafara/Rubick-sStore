import ProtectedPage from '../components/common/ProtectedPage';
import Cart from '../pages/Cart';
import Favorites from '../pages/Favorites';
import HomePage from '../pages/Home';
import OrderDetails from '../pages/OrderDetails';
import Orders from '../pages/Orders';
import PlaceOrder from '../pages/PlaceOrder';
import Product from '../pages/Product';
import Products from '../pages/Products';
import Reviews from '../pages/Reviews';
import ShippingAddress from '../pages/ShippingAddress';
import UserProfile from '../pages/UserProfile';

const routes = [
    {
        index: true,
        element: <HomePage />,
        state: 'home',
    },
    {
        path: '/products',
        element: <Products />,
        state: 'products',
    },
    {
        path: 'product/slug/:slug',
        element: <Product />,
        state: 'product',
    },
    {
        path: '/cart',
        element: <Cart />,
        state: 'cart',
    },
    {
        path: '/favorites',
        element: <Favorites />,
        state: 'favorites',
    },
    {
        path: '/reviews',
        element: <Reviews />,
        state: 'reviews',
    },
    {
        path: '/profile',
        element: (
            <ProtectedPage>
                <UserProfile />
            </ProtectedPage>
        ),
        state: 'profile',
    },
    {
        path: '/shipping-address',
        element: (
            <ProtectedPage>
                <ShippingAddress />
            </ProtectedPage>
        ),
        state: 'shipping addres',
    },
    {
        path: '/place-order',
        element: (
            <ProtectedPage>
                <PlaceOrder />
            </ProtectedPage>
        ),
        state: 'place order',
    },
    {
        path: '/order/:id',
        element: (
            <ProtectedPage>
                <OrderDetails />
            </ProtectedPage>
        ),
        state: 'place order',
    },
    {
        path: '/orders',
        element: (
            <ProtectedPage>
                <Orders />
            </ProtectedPage>
        ),
        state: 'orderd history',
    },
];

export { routes };
