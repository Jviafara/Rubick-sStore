import React, { Fragment, useContext, useState } from 'react';
import { AiOutlineSearch, AiOutlineShoppingCart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { HiShoppingCart } from 'react-icons/hi';
import { TiThMenuOutline } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import Sidebar from './Sidebar';

const Navbar = () => {
    const { user } = useSelector((state) => state.user);
    const { appState } = useSelector((state) => state.appState);

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const dispatch = useDispatch();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="shadow-sm backdrop-blur-2xl py-4 px-2 text-black max-w-[100%]">
            <Sidebar open={sidebarOpen} toggleSidebar={toggleSidebar} />
            <nav className="flex items-center md:justify-between gap-0 lg:container lg:mx-auto">
                <div
                    onClick={toggleSidebar}
                    className="md:hidden p-2 hover:scale-105 hover:shadow-lg rounded-full text-lg">
                    <TiThMenuOutline size={24} />
                </div>
                <Link to="/products" className="hidden md:inline-flex">
                    <AiOutlineSearch size={28} />
                </Link>
                <div className=" md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
                    <Link to="/">
                        <Logo />
                    </Link>
                </div>

                <ul className="list-none flex justify-between ml-auto items-center gap-1 md:gap-5">
                    <li className="p-2 hover:scale-105 hover:shadow-lg rounded-full text-lg">
                        <div className="cursor-pointer flex items-center gap-1">
                            <FaUserCircle size={24} />
                            User
                        </div>
                    </li>
                    <li className="p-2 hover:scale-105 hover:shadow-lg rounded-full text-lg">
                        <NavLink to="/cart" className="flex items-center gap-1">
                            <HiShoppingCart size={24} />
                            Cart
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Navbar;
