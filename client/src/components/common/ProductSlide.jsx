import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { SwiperSlide } from 'swiper/react';
import productApi from '../../api/modules/productApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';
import AutoSwiper from './AutoSwiper';
import ProductCard from './ProductCard';

const ProductSlide = ({ slideType }) => {
    const dispatch = useDispatch();

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await productApi.getList();

            if (response) {
                setProducts(response);
            }
            if (err) toast.error(err.message);
            dispatch(setGlobalLoading(false));
        };
        getProducts();
    }, [dispatch]);

    return (
        <AutoSwiper>
            {slideType === 'latest' &&
                products
                    .sort(
                        (a, b) =>
                            Date.parse(b.createdAt) - Date.parse(a.createdAt)
                    )
                    .slice(0, 8)
                    .map((product, index) => (
                        <SwiperSlide key={index} className="swiper-slide w-fit">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
            {slideType === 'top_rated' &&
                products
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 8)
                    .map((product, index) => (
                        <SwiperSlide
                            key={index}
                            className="swiper-slide w-full">
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
        </AutoSwiper>
    );
};

export default ProductSlide;
