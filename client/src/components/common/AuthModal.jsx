import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthModalOpen } from '../../redux/features/authModalSlice';
import Logo from './Logo';
import SigninForm from './SigninForm';
import SignupForm from './SignupForm';

const actionState = {
    signin: 'signin',
    signup: 'signup',
};

const AuthModal = () => {
    const { authModalOpen } = useSelector((state) => state.authModal);
    const dispatch = useDispatch();

    const [action, setAction] = useState(actionState.signin);

    const authModalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (
                authModalRef.current &&
                !authModalRef.current.contains(event.target)
            ) {
                dispatch(setAuthModalOpen(!authModalOpen));
            }
        }
        // Add event listener to the document object
        document.addEventListener('mousedown', handleClickOutside);

        // Remove event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [authModalOpen, dispatch]);

    useEffect(() => {
        if (authModalOpen) setAction(actionState.signin);
    }, [authModalOpen]);

    const handleClose = () => dispatch(setAuthModalOpen(false));

    const switchAuthState = (state) => setAction(state);

    return (
        <Transition.Root
            show={authModalOpen}
            as={Fragment}
            className="w-screen h-screen z-[999]">
            <Dialog as="div" className="absolute " onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="fixed inset-0 backdrop-blur-sm transition-opacity" />
                </Transition.Child>
                {authModalOpen && (
                    <div
                        ref={authModalRef}
                        className="w-[90%] md:max-w-[530px] p-4 lg:p-8 rounded-xl fixed transform top-[20%] left-[5%] -translate-y-[20%]  lg:top-[50%] md:left-[50%]  md:-translate-x-[50%] lg:-translate-y-[50%] backdrop-blur-lg text-black ">
                        <div className="bg-gray-300 bg-opacity-70 rounded-xl p-4">
                            <div className="mb-4">
                                <Logo />
                            </div>
                            {action === actionState.signin && (
                                <SigninForm
                                    switchAuthState={() =>
                                        switchAuthState(actionState.signup)
                                    }
                                />
                            )}
                            {action === actionState.signup && (
                                <SignupForm
                                    switchAuthState={() =>
                                        switchAuthState(actionState.signin)
                                    }
                                />
                            )}
                        </div>
                    </div>
                )}
            </Dialog>
        </Transition.Root>
    );
};

export default AuthModal;
