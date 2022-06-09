


import cloudinary from '../config/cloudinary.config';

async function CloudinaryImageSave(file: string) {
     const response = await cloudinary.uploader.upload(file);
     return response;
}

export default CloudinaryImageSave;