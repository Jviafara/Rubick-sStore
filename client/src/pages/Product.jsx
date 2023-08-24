import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { AiFillHeart } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import favoriteApi from '../api/modules/favoriteApi';
import productApi from '../api/modules/productApi';
import ImagesSlide from '../components/common/ImagesSlide';
import { setAuthModalOpen } from '../redux/features/authModalSlice';
import { addcartItem } from '../redux/features/cartSlice';
import { setGlobalLoading } from '../redux/features/globalLoadinSlice';
import { addFavorite, removeFavorite } from '../redux/features/userSlice';

const Product = () => {
    const params = useParams();
    const { slug } = params;
    const navigate = useNavigate();

    const dispatch = useDispatch();
    const { listFavorites } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState([]);

    useEffect(() => {
        const fav = listFavorites.find((item) => item.product === product.id);
        if (fav) setIsFavorite(true);
    }, [listFavorites, product]);

    useEffect(() => {
        const getProduct = async () => {
            const { response, err } = await productApi.productInfo({ slug });

            if (response) {
                setProduct(response);
            }
            if (err) toast.error(err.message);
        };
        getProduct();
    });

    useEffect(() => {
        const getProduct = async () => {
            dispatch(setGlobalLoading(true));
            const { response, err } = await productApi.productInfo({ slug });

            if (response) {
                setProduct(response);
            }
            if (err) toast.error(err.message);
            dispatch(setGlobalLoading(false));
        };
        getProduct();
    }, [dispatch, slug]);

    const addToCartHandler = async () => {
        const existItem = cartItems?.find((x) => x.id === product.id);
        const quantity = existItem ? existItem.quantity + 1 : 1;

        if (product.countInStock < quantity) {
            toast.error('Product Out of Stock');
            return;
        }

        dispatch(addcartItem({ ...product, quantity }));
    };

    const onFavoriteClick = async () => {
        if (!user) return dispatch(setAuthModalOpen(true));
        if (isFavorite) {
            onRemoveFavorite();
            return;
        }

        const { response, err } = await favoriteApi.add({
            productId: product.id,
        });

        if (err) toast.error(err.message);
        if (response) {
            dispatch(addFavorite(response));
            setIsFavorite(true);
            toast.success('Product added to favorites');
        }
    };

    const onRemoveFavorite = async () => {
        const favorite = listFavorites.find(
            (item) => item.product === product.id
        );
        const { response, err } = await favoriteApi.remove({
            favoriteId: favorite.id,
        });

        if (err) toast.error(err.message);
        if (response) {
            dispatch(removeFavorite(product.id));
            setIsFavorite(false);
            toast.success('Product remove from favorites');
            navigate(0);
        }
    };

    return (
        <div className="w-[95vw] md:max-w-[90vw] mx-auto  flex flex-col md:flex-row gap-4 p-4 justify-evenly">
            <div className="md:w-[50vw] lg:w-[45vw] xl:w-[40vw] shadow-lg">
                <ImagesSlide images={product.images} />
            </div>
            <div className="w-full lg:w-[50%] xl:w-[30%]  flex flex-col xl:flex-row xl:justify-center gap-4 shadow-lg rounded-lg border border-yellow h-fit">
                <ul className="flex flex-col gap-2 p-4 w-full">
                    <li className="flex justify-between">
                        <Helmet>
                            <title>{product.name}</title>
                        </Helmet>
                        <h1 className="text-lg font-bold">{product.name}</h1>
                        <button type="button" onClick={onFavoriteClick}>
                            {isFavorite ? (
                                <AiFillHeart size={32} color="red" />
                            ) : (
                                <AiFillHeart size={32} color="gray" />
                            )}
                        </button>
                    </li>
                    <hr className="border border-yellow" />
                    <li className="my-2">
                        <p>
                            <strong>${product.price}</strong>
                        </p>
                    </li>
                    <hr className="border border-yellow" />
                    <li className="my-2">
                        <p>{product.description}</p>
                    </li>
                    <hr className="border border-yellow" />
                    <li className="flex gap-8 p-2 lg:px-0">
                        <p>Status:</p>
                        {product.countInStock > 0 ? (
                            <p className="rounded-lg bg-green-500 px-4 text-white font-bold text-lg">
                                In Stock
                            </p>
                        ) : (
                            <p className="rounded-lg bg-red-500 px-4 text-white font-bold text-lg">
                                Unavailable
                            </p>
                        )}
                    </li>
                    {product.countInStock > 0 && (
                        <div>
                            <hr className="border border-yellow" />
                            <li>
                                <button
                                    onClick={addToCartHandler}
                                    type="button"
                                    className="w-full md:w-1/2 rounded-lg border hover:bg-blue-500 bg-yellow py-3 px-4
                                        text-white font-bold font-serif text-lg mt-4">
                                    Add to Cart
                                </button>
                            </li>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Product;
