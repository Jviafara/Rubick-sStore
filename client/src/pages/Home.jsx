import React from 'react';
import { Helmet } from 'react-helmet-async';
import Container from '../components/common/Container';
import InfoPanel from '../components/common/InfoPanel';
import ProductSlide from '../components/common/ProductSlide';
import TutorialsSlide from '../components/common/TutorialsSlide';

const Home = () => {
    return (
        <div className="flex flex-col items-center relative -z-[10]  mt-4 mb-16">
            <Helmet>
                <title>Home</title>
            </Helmet>
            <Container header={'new products'} seeMore={'/products'}>
                <ProductSlide slideType="latest" />
            </Container>
            <InfoPanel />
            <Container header={'Top Rated'} seeMore={'/products'}>
                <ProductSlide slideType="top_rated" />
            </Container>
            <Container header={'tutorials'}>
                <TutorialsSlide />
            </Container>
        </div>
    );
};

export default Home;
