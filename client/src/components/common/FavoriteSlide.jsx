import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { SwiperSlide } from 'swiper/react';
import productApi from '../../api/modules/productApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';
import AutoSwiper from './AutoSwiper';
import ProductCard from './ProductCard';

const FavoriteSlide = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const { listFavorites } = useSelector((state) => state.user);

    useEffect(() => {
        const getProducts = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await productApi.getList();
            if (response) {
                setProducts(
                    listFavorites.map((favorites) =>
                        response.find(
                            (product) => product.id === favorites.product
                        )
                    )
                );
            }
            if (err) toast.error(err.message);
            dispatch(setGlobalLoading(false));
        };
        getProducts();
    }, [dispatch, listFavorites]);
    return (
        <AutoSwiper>
            {products.slice(0, 4).map((product, index) => (
                <SwiperSlide key={index} className="swiper-slide w-fit">
                    <ProductCard product={product} />
                </SwiperSlide>
            ))}
        </AutoSwiper>
    );
};

export default FavoriteSlide;
