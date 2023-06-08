import {
    AiOutlineHome,
    AiOutlineShopping,
    AiOutlineShoppingCart,
    AiOutlineUser,
} from 'react-icons/ai';
import { BiCommentCheck } from 'react-icons/bi';
import { MdOutlineFavorite } from 'react-icons/md';

const main = [
    {
        display: 'home',
        path: '/',
        icon: <AiOutlineHome size={24} />,
        state: 'home',
    },
    {
        display: 'products',
        path: '/products',
        icon: <AiOutlineShopping size={24} />,
        state: 'products',
    },
    {
        display: 'cart',
        path: '/cart',
        icon: <AiOutlineShoppingCart size={24} />,
        state: 'tv',
    },
];

const user = [
    {
        display: 'favorites',
        path: '/favorites',
        icon: <MdOutlineFavorite size={24} />,
        state: 'favorites',
    },
    {
        display: 'reviews',
        path: '/reviews',
        icon: <BiCommentCheck size={24} />,
        state: 'reviews',
    },
    {
        display: 'User Profile',
        path: '/profile',
        icon: <AiOutlineUser size={24} />,
        state: 'profile',
    },
];

const menuConfigs = { main, user };

export default menuConfigs;
