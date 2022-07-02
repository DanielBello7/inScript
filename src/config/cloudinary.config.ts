



import Cloudinary from 'cloudinary';
import envConfig from './env.config';


envConfig();

Cloudinary.v2.config({ 
     cloud_name: process.env.CLOUDINARY_NAME, 
     api_key: process.env.CLOUDINARY_KEY, 
     api_secret: process.env.CLOUDINARY_SECRET
});


export default Cloudinary.v2;