import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment, useEffect, useRef } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import menuConfigs from '../../configs/menu.config';
import { setUser } from '../../redux/features/userSlice';

const UserMenu = ({ open, toggleMenu }) => {
    const { user } = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const userMenuRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                userMenuRef.current &&
                !userMenuRef.current.contains(event.target)
            ) {
                toggleMenu();
            }
        }
        // Add event listener to the document object
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [toggleMenu]);

    return (
        <>
            {user && (
                <Transition.Root show={open} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={toggleMenu}>
                        {open && (
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full "
                                enterTo="-translate-x-0">
                                <div
                                    ref={userMenuRef}
                                    id="userMenu"
                                    className="fixed top-12 right-4 mt-4 w-64 bg-blue-400 bg-opacity-90 rounded-lg p-4">
                                    {user && (
                                        <div>
                                            <ul className="flex flex-col gap-2 ml-4 justify-center">
                                                {menuConfigs.user.map(
                                                    (item, index) => (
                                                        <li key={index}>
                                                            <Link
                                                                to={item.path}
                                                                onClick={
                                                                    toggleMenu
                                                                }
                                                                className="flex max-w-max items-center gap-2 rounded-lg py-1 px-2 hover:bg-gray-400 hover:scale-10">
                                                                {item.icon}
                                                                <h6 className="font-medium">
                                                                    {item.display.toUpperCase()}
                                                                </h6>
                                                            </Link>
                                                        </li>
                                                    )
                                                )}
                                                <li>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            dispatch(
                                                                setUser(null)
                                                            );
                                                            navigate(0);
                                                        }}
                                                        className="flex gap-2 items-center font-bold hover:bg-gray-400 hover:scale-10 py-1 px-2 rounded-lg">
                                                        <AiOutlineLogout
                                                            size={24}
                                                        />
                                                        <h1>Sign Out</h1>
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </Transition.Child>
                        )}
                    </Dialog>
                </Transition.Root>
            )}
        </>
    );
};

export default UserMenu;
