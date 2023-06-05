import {
    AiFillLock,
    AiOutlineHome,
    AiOutlineSearch,
    AiOutlineShopping,
    AiOutlineShoppingCart,
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
        icon: <MdOutlineFavorite />,
        state: 'favorites',
    },
    {
        display: 'reviews',
        path: '/reviews',
        icon: <BiCommentCheck />,
        state: 'reviews',
    },
    {
        display: 'password update',
        path: '/password-update',
        icon: <AiFillLock />,
        state: 'password.update',
    },
];

const menuConfigs = { main, user };

export default menuConfigs;
