/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { BsFillArrowUpSquareFill } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-scroll';
import { toast } from 'react-toastify';
import favoriteApi from '../../api/modules/favoriteApi';
import userApi from '../../api/modules/userApi';
import { setcartItems } from '../../redux/features/cartSlice';
import { setListFavorites, setUser } from '../../redux/features/userSlice';
import AuthModal from '../common/AuthModal';
import Footer from '../common/Footer';
import GlobalLoading from '../common/GlobalLoading';
import Navbar from '../common/Navbar';

const MainLayout = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    const location = useLocation();

    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getInfo();

            if (response) dispatch(setUser(response));
            if (err) dispatch(setUser(null));
        };
        authUser();
    }, [dispatch]);

    useEffect(() => {
        const getFavorites = async () => {
            const { response, err } = await favoriteApi.getList();

            if (response) dispatch(setListFavorites(response));
            if (err) toast(err.message);
        };
        if (user) getFavorites();
        if (!user) dispatch(setListFavorites([]));
    }, [user, dispatch]);

    useEffect(() => {
        const getCartItems = async () => {
            const cartItems = JSON.parse(localStorage.getItem('cartItems'));
            dispatch(setcartItems(cartItems));
        };
        getCartItems();
    }, [dispatch]);

    return (
        <div className="w-full min-h-screen">
            {/* global loading */}
            <GlobalLoading />
            {/* global loading */}

            {/* login modal */}
            <AuthModal />
            {/* login modal */}

            <div className="flex flex-col w-full">
                {/* header */}
                {location.pathname === '/' ? (
                    <header className="w-full flex flex-col items-center h-full backdrop-blur-2xl">
                        <Navbar />
                        {/* <HeroSlide /> */}
                    </header>
                ) : (
                    <header>
                        <Navbar />
                    </header>
                )}

                {/* header */}

                {/* main */}
                <div className="w-full min-h-[50vh] overflow-hidden flex-grow">
                    <Outlet />
                </div>
                {/* main */}
            </div>

            <div className="fixed bottom-2 md:bottom-10 right-2 md:right-10 z-10">
                <button
                    type="button"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }
                    className="hidden md:inline-flex cursor-pointer">
                    <BsFillArrowUpSquareFill size={45} />
                </button>
                <button
                    type="button"
                    onClick={() =>
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth',
                        })
                    }
                    className="md:hidden inline-flex cursor-pointer">
                    <BsFillArrowUpSquareFill size={24} />
                </button>
            </div>

            {/* footer */}
            <Footer />
            {/* footer */}
        </div>
    );
};

export default MainLayout;
