import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import CommingSoon from '../components/common/ComingSoon';
import Container from '../components/common/Container';
import FavoriteSlide from '../components/common/FavoriteSlide';
import UpdateForm from '../components/common/UpdateForm';

const UserProfile = () => {
    const { user } = useSelector((state) => state.user);

    return (
        <div className="flex flex-col items-center">
            <Helmet>
                <title>User Profile</title>
            </Helmet>
            <Container>
                <h1 className="text-3xl  font-bold -my-10">
                    Welcome! {user.name?.split(' ')[0]}{' '}
                </h1>
            </Container>
            <Container header={'favorites'} seeMore={'/favorites'}>
                <FavoriteSlide />
            </Container>
            <Container header={'Reviews'}>
                <CommingSoon />
            </Container>
            <Container header={'Orders'}>
                <CommingSoon />
            </Container>
            <UpdateForm />
        </div>
        // <div className="container mx-auto md:w-1/2 xl:w-1/3 p-4">
        //     <Helmet>
        //         <title>User Profile</title>
        //     </Helmet>
        //     <h2 className="text-center text-3xl pb-4 ">User Profile</h2>
        //     <form
        //         onSubmit={handleSubmit}
        //         className="w-full flex flex-col gap-2 mb-4">
        //         <div className="flex flex-col text-lg xl:text-xl gap-1">
        //             <label htmlFor="name">Full Name</label>
        //             <input
        //                 type="text"
        //                 name="name"
        //                 id="name"
        //                 value={name}
        //                 onChange={(e) => setName(e.target.value)}
        //                 className="border rounded-lg bg-gray-50 px-3 py-1"
        //             />
        //         </div>
        //         <div className="flex flex-col  text-lg xl:text-xl gap-1">
        //             <label htmlFor="email">Email</label>
        //             <input
        //                 type="email"
        //                 name="email"
        //                 id="email"
        //                 value={email}
        //                 onChange={(e) => setEmail(e.target.value)}
        //                 className="border rounded-lg bg-gray-50 px-3 py-1"
        //             />
        //         </div>
        //         <div className="flex flex-col  text-lg xl:text-xl gap-1">
        //             <label htmlFor="password">Password</label>
        //             <input
        //                 type="password"
        //                 name="password"
        //                 id="password"
        //                 onChange={(e) => setPassword(e.target.value)}
        //                 className="border rounded-lg bg-gray-50 px-3 py-1"
        //             />
        //         </div>
        //         <div className="flex flex-col text-lg xl:text-xl gap-1">
        //             <label htmlFor="confirmPass">Confirm Password</label>
        //             <input
        //                 type="password"
        //                 name="confirmPass"
        //                 id="confirmPass"
        //                 onChange={(e) => setConfirmPass(e.target.value)}
        //                 className="border rounded-lg bg-gray-50 px-3 py-1"
        //             />
        //         </div>
        //         <button
        //             type="submit"
        //             className="rounded-lg border hover:bg-blue-500 bg-yellow py-3 px-8
        //                  text-black font-medium font-serif text-2xl mt-4">
        //             Update
        //         </button>
        //     </form>
        // </div>
    );
};

export default UserProfile;
