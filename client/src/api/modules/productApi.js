import privateClient from '../client/privateClient';
import publicClient from '../client/publicClient';

const productEndpoints = {
    getList: 'products/',
    create: 'products/create',
    productInfo: ({ slug }) => `products/slug/${slug}`,
    productInfoById: ({ productId }) => `products/${productId}`,
    remove: ({ productId }) => `products/${productId}`,
    update: ({ productId }) => `products/update/${productId}`,
    addImages: ({ productId }) => `products/add-images/${productId}`,
};

const productApi = {
    getList: async () => {
        try {
            const response = await publicClient.get(productEndpoints.getList);
            return { response };
        } catch (err) {
            return { err };
        }
    },
    create: async ({
        name,
        slug,
        category,
        images,
        price,
        countInStock,
        brand,
        description,
    }) => {
        try {
            const response = await privateClient.post(productEndpoints.create, {
                name,
                slug,
                category,
                images,
                price,
                countInStock,
                brand,
                description,
            });
            return { response };
        } catch (err) {
            return { err };
        }
    },
    remove: async ({ productId }) => {
        try {
            const response = await privateClient.delete(
                productEndpoints.remove({ productId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    productInfo: async ({ slug }) => {
        try {
            const response = await publicClient.get(
                productEndpoints.productInfo({ slug })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    productInfoById: async ({ productId }) => {
        try {
            const response = await privateClient.get(
                productEndpoints.productInfoById({ productId })
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    update: async ({
        productId,
        name,
        slug,
        category,
        price,
        countInStock,
        description,
        brand,
    }) => {
        try {
            const response = await privateClient.put(
                productEndpoints.update({ productId }),
                {
                    name,
                    slug,
                    category,
                    price,
                    countInStock,
                    description,
                    brand,
                }
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
    addImages: async ({ productId, images }) => {
        try {
            const response = await privateClient.put(
                productEndpoints.addImages({ productId }),
                { images }
            );
            return { response };
        } catch (err) {
            return { err };
        }
    },
};

export default productApi;
