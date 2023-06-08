// import ProtectedPage from '../components/common/ProtectedPage';
// import FavoriteList from '../pages/FavoriteList';
import Cart from '../pages/Cart';
import HomePage from '../pages/Home';
import Product from '../pages/Product';
import Products from '../pages/Products';

export const routesGen = {
    home: '/',
    person: (id) => `/person/${id}`,
    favoriteList: '/favorites',
    products: '/products',
    product: (slug) => `/product/slug/${slug}`,
    cart: '/cart',
};

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
    // {
    //     path: '/person/:personId',
    //     element: <PersonDetail />,
    //     state: 'person.detail',
    // },
    // {
    //     path: '/search',
    //     element: <MediaSearch />,
    //     state: 'search',
    // },
    // {
    //     path: '/password-update',
    //     element: (
    //         <ProtectedPage>
    //             <PasswordUpdate />
    //         </ProtectedPage>
    //     ),
    //     state: 'password.update',
    // },
    // {
    //     path: '/favorites',
    //     element: (
    //         <ProtectedPage>
    //             <FavoriteList />
    //         </ProtectedPage>
    //     ),
    //     state: 'favorites',
    // },
    // {
    //     path: '/reviews',
    //     element: (
    //         <ProtectedPage>
    //             <ReviewList />
    //         </ProtectedPage>
    //     ),
    //     state: 'reviews',
    // },
    // {
    //     path: '/:mediaType',
    //     element: <MediaList />,
    // },
    // {
    //     path: '/:mediaType/:mediaId',
    //     element: <MediaDetail />,
    // },
];

export default routes;
