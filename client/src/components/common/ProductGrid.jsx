import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import productApi from '../../api/modules/productApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';
import ProductCard from './ProductCard';
import ProductNotFound from './ProductNotFound';

const MediaGrid = ({ filter, priceFilter, priceSort, query }) => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { response, err } = await productApi.getList();
            if (response) {
                if (
                    response.filter(
                        (product) =>
                            product.name
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase()) ||
                            product.category
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase()) ||
                            product._id
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase())
                    ).length <= 0
                )
                    toast.error('Product not found');
                setProducts(
                    response.filter(
                        (product) =>
                            product.name
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase()) ||
                            product.category
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase()) ||
                            product._id
                                ?.toLowerCase()
                                ?.includes(query?.toLowerCase())
                    )
                );
            }

            if (err) toast.error(err.message);
        };
        getProducts();
    }, [query]);

    useEffect(() => {
        const getProducts = async () => {
            const { response, err } = await productApi.getList();
            if (response) {
                if (priceSort === 'Lower to Higher') {
                    setProducts(response.sort((a, b) => a.price - b.price));
                } else if (priceSort === 'Higher to Lower') {
                    setProducts(response.sort((a, b) => b.price - a.price));
                } else if (priceSort === 'Latest') {
                    setProducts(
                        response.sort(
                            (a, b) =>
                                Date.parse(b.createdAt) -
                                Date.parse(a.createdAt)
                        )
                    );
                } else if (priceSort === 'top_rated') {
                    setProducts(response.sort((a, b) => b.rating - a.rating));
                } else {
                    setProducts(response);
                }
            }
            if (err) toast.error(err.message);
        };
        getProducts();
    }, [priceSort]);

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
        <div className="w-[95vw] md:w-[90vw] flex flex-col items-center">
            <p className="my-2">
                {'Category: ' +
                    filter.toUpperCase() +
                    ' / Min Price: ' +
                    priceFilter[0] +
                    ' / Max Price: ' +
                    priceFilter[1] +
                    ' / Sort: ' +
                    priceSort.toUpperCase()}
            </p>
            {filter !== 'All products' &&
                products
                    ?.filter((product) => product.category === filter)
                    ?.filter(
                        (product) =>
                            (product.price >= priceFilter[0]) &
                            (product.price <= priceFilter[1])
                    ).length <= 0 && <ProductNotFound />}
            {filter === 'All products' &&
                products?.filter(
                    (product) =>
                        (product.price >= priceFilter[0]) &
                        (product.price <= priceFilter[1])
                )?.length <= 0 && <ProductNotFound />}
            <div className="w-[80vw] grid gap-8 xl:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center justify-stretch">
                {filter !== 'All products' &&
                    products
                        ?.filter((product) => product.category === filter)
                        ?.filter(
                            (product) =>
                                (product.price >= priceFilter[0]) &
                                (product.price <= priceFilter[1])
                        )
                        ?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                {filter === 'All products' &&
                    products
                        ?.filter(
                            (product) =>
                                (product.price >= priceFilter[0]) &
                                (product.price <= priceFilter[1])
                        )
                        ?.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
            </div>
        </div>
    );
};

export default MediaGrid;
