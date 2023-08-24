import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import CommingSoon from '../components/common/ComingSoon';
import Container from '../components/common/Container';
import FavoriteSlide from '../components/common/FavoriteSlide';
import OrderList from '../components/common/OrderList';
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
            <Container header={'Orders'} seeMore={'/orders'}>
                <OrderList max={4} />
            </Container>
            <UpdateForm />
        </div>
    );
};

export default UserProfile;
