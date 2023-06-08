import React, { useState } from 'react';
import { AiFillPhone, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook, BsInstagram, BsWhatsapp } from 'react-icons/bs';
import { FaTelegramPlane } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import menuConfigs from '../../configs/menu.config';
import Container from './Container';
import Logo from './Logo';

const Footer = () => {
    const [email, setEmail] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success('Email Registered Succesfully');
        setEmail('');
    };
    return (
        <div className="shadow-inner bg-gray-200 bg-opacity-50 backdrop-blur-3xl px-2 text-black max-w-[100%] w-full h-full">
            <footer>
                <Container>
                    <div className="h-full w-full flex flex-col items-center justify-center gap-8 pt-8">
                        <Logo />
                        <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-0 md:justify-evenly">
                            <div className="flex flex-col items-center gap-2 font-bold">
                                <div className="flex justify-center gap-2 items-center">
                                    <AiFillPhone size={32} />/
                                    <BsWhatsapp size={32} />
                                </div>
                                <p>(+57) 319-7136375</p>
                                <p>(+57) 302-9547732</p>
                                <p>(+57) 316-9081366</p>
                            </div>
                            <div>
                                <ul className="w-full h-full flex flex-col gap-4 md:justify-evenly items-center font-bold">
                                    {menuConfigs.main.map((item, index) => (
                                        <li key={index}>
                                            <Link to={item.path}>
                                                {item.display.toUpperCase()}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex flex-col w-full items-center justify-center gap-4 md:w-[35%] lg:w-[25%]">
                                <h1 className="font-roboto font-bold text-lg">
                                    NewsLetter
                                </h1>
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex flex-col gap-4 w-full">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        className=" px-4 py-2 text-lg rounded-lg bg-gray-300 w-full"
                                    />
                                    <button
                                        type="submit"
                                        className="h-full w-full rounded-lg hover:bg-blue-600 bg-yellow px-4 py-2 text-white"
                                        // className="h-full bg-gray-800 bg-opacity-40 rounded-lg "
                                    >
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                        <div className="w-full flex justify-center gap-8">
                            <BsWhatsapp size={20} />
                            <Link
                                target="_blank"
                                to="https://www.instagram.com/">
                                <BsInstagram size={20} />
                            </Link>
                            <Link
                                target="_blank"
                                to="https://web.telegram.org/a/">
                                <FaTelegramPlane size={24} />
                            </Link>
                            <Link target="_blank" to="https://www.twitter.com">
                                <AiFillTwitterCircle size={24} />
                            </Link>
                            <Link
                                target="_blank"
                                to="https://www.facebook.com/">
                                <BsFacebook size={24} />
                            </Link>
                        </div>
                        <div className="w-full text-center font-bold">
                            <h1>2023-24 Demo Page. All rights reverved</h1>
                        </div>
                    </div>
                </Container>
            </footer>
        </div>
    );
};

export default Footer;
