import 'dotenv/config';
import responseHandler from '../handlers/response.handler.js';
import tokenMiddleware from '../middlewares/token.middleware.js';
import Favorite from '../models/favorite.js';
import Product from '../models/product.js';
import User from '../models/user.js';

//Fetch All Products
const productList = async (req, res) => {
    try {
        const products = await Product.find();
        responseHandler.ok(res, products);
    } catch {
        responseHandler.error(res);
    }
};

const create = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        if (req.files.length <= 0) {
            return res.status(400).json({ msg: 'Images required' });
        }

        const product = await Product.create({
            ...req.body,
        });

        req.files.forEach((image) => product.images.push(image.path));
        await product.save();

        responseHandler.created(res, product);
    } catch {
        responseHandler.error(res);
    }
};

//Fetch On producto by slug
const productInfo = async (req, res) => {
    try {
        const slug = req.params.slug;

        const product = await Product.findOne({ slug });

        const tokenDecoded = tokenMiddleware.tokenDecode(req);

        if (tokenDecoded) {
            const user = await User.findById(tokenDecoded.data);
            if (user) {
                const isFavorite = await Favorite.findOne({
                    user: user.id,
                    product: product.id,
                });
                product.isFavorite = isFavorite !== null;
            }
        }

        responseHandler.ok(res, product);
    } catch {
        responseHandler.error(res);
    }
};

//DeleteProduct
const remove = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        const favorite = await Favorite.findOne({
            user: user.id,
            product: req.params.id,
        });

        if (favorite) await Favorite.findByIdAndDelete(favorite.id);

        await Product.findByIdAndDelete(req.params.id);

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

//Fetch On producto by id
const productInfoById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        responseHandler.ok(res, product);
    } catch {
        responseHandler.error(res);
    }
};

//Add images
const addImages = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        if (req.files.length <= 0) {
            return res.status(400).json({ msg: 'Images required' });
        }

        const product = await Product.findById(req.params.id);

        req.files.forEach((image) => product.images.push(image.path));
        await product.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

//Update Product
const update = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('isAdmin');
        if (!user.isAdmin) return responseHandler.unauthorize(res);

        const {
            name,
            slug,
            category,
            price,
            countInStock,
            description,
            brand,
        } = req.body;

        const product = await Product.findById(req.params.id);

        product.name = name;
        product.price = price;
        product.slug = slug;
        product.countInStock = countInStock;
        product.category = category;
        product.description = description;
        product.brand = brand;

        await product.save();

        responseHandler.ok(res);
    } catch {
        responseHandler.error(res);
    }
};

export default {
    productList,
    create,
    productInfo,
    productInfoById,
    update,
    addImages,
    remove,
};
