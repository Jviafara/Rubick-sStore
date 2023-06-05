/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import favoriteApi from '../../api/modules/favoriteApi';
import userApi from '../../api/modules/userApi';
import { setListFavorites, setUser } from '../../redux/features/userSlice';
import Navbar from '../common/Navbar';
// import AuthModal from '../common/AuthModal';
// import Footer from '../common/Footer';
// import GlobalLoading from '../common/GlobalLoading';

const MainLayout = () => {
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.user);

    useEffect(() => {
        const authUser = async () => {
            const { response, err } = await userApi.getInfo();

            if (response) dispatch(setUser(response));
            if (err) dispatch(setUser(null));
        };
        authUser();
    }, [dispatch]);

    useEffect(() => {
        const gegtFavorites = async () => {
            const { response, err } = await favoriteApi.getList();

            if (response) dispatch(setListFavorites(response));
            if (err) toast(err.message);
        };
        if (user) gegtFavorites();
        if (!user) dispatch(setListFavorites([]));
    }, [user, dispatch]);

    return (
        <>
            {/* global loading */}
            {/* <GlobalLoading /> */}
            {/* global loading */}

            {/* login modal */}
            {/* <AuthModal /> */}
            {/* login modal */}

            <div display={'flex'} minHeight="100vh">
                {/* header */}
                <Navbar />
                {/* header */}

                {/* main */}
                <div
                    component="main"
                    flexGrow={1}
                    overflow="hidden"
                    minHeight="100vh">
                    <Outlet />
                </div>
                {/* main */}
            </div>

            {/* footer */}
            {/* <Footer /> */}
            {/* footer */}
        </>
    );
};

export default MainLayout;
