import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import productApi from '../../api/modules/productApi';
import { setGlobalLoading } from '../../redux/features/globalLoadinSlice';
import ProductCard from './ProductCard';
import ProductNotFound from './ProductNotFound';

const FavoritesGrid = () => {
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
        <div className="w-[95vw] md:w-[90vw] flex flex-col items-center mt-8 pb-12">
            {products.length <= 0 && <ProductNotFound />}
            <div className="w-[80vw] grid gap-8 xl:gap-12 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center justify-stretch">
                {products?.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default FavoritesGrid;
