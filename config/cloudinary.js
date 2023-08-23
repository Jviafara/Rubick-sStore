import { v2 as cloudinary } from 'cloudinary';
import 'dotenv/config';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

//Instance os cloudinary storage
const storage = new CloudinaryStorage({
    cloudinary,
    alowwFormat: ['jpg', 'jpeg', 'png', 'webp'],
    params: {
        folder: 'RubickStore/Products',
        transformation: [{ width: 500, height: 5000, crop: 'limit' }],
    },
});

export default storage;
