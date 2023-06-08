import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/common/Container';
import FavoritesGrid from '../components/common/FavoritesGrid';

const Favorites = () => {
    return (
        <div className="w-full flex flex-col items-center">
            <Helmet>
                <title>Favorites</title>
            </Helmet>
            <Container header={'favorites'}>
                <FavoritesGrid />
            </Container>
        </div>
    );
};

export default Favorites;
