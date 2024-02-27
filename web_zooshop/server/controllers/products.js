import Product from '../models/Product.js';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';

//Create Product
export const createProduct = async (req, res) => {
    try {
        const {title, description, price} = req.body;

        if (req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            const newProductWithImage = new Product({
                title, description, price,
                imgUrl: fileName,
            });

            await newProductWithImage.save();
            return res.json({newProductWithImage, message: 'Product added successfully.'});
        }

        const newProductWithoutImage = new Product({
            title, description, price,
            imgUrl: '',
        });
        await newProductWithoutImage.save();
        return res.json({newProductWithoutImage, message: 'Product added successfully.'});

    } catch (error) {
        res.json({message: "Error during creation product."});
        console.log(error);
    }
}

//Get All Products
export const getAll = async (req, res) => {
    try {
        const products = await Product.find();
        if (!products){
            return res.json({message: "There is no products."});
        }
        res.json({products});
    } catch (error) {
        res.json({message: "Error during getting list of products."});
        console.log(error);
    }
}

//Get Product By Id
export const getById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product){
            return res.json({message: "There is no such product."});
        }
        res.json(product);
    } catch (error) {
        res.json({message: "Error during getting product."});
        console.log(error);
    }
}

//Remove Product
export const removeProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product){
            return res.json({message: "There is no such product."});
        }
    } catch (error) {
        res.json({message: "Error during removing product."});
        console.log(error);
    }
}

//Update Product
export const updateProduct = async (req, res) => {
    try {
        const {title, description, price, id} = req.body;
        const product = await Product.findById(id);
        
        if (req.files){
            let fileName = Date.now().toString() + req.files.image.name;
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, '..', 'uploads', fileName));

            product.imgUrl = fileName || '';
        }
        product.title = title;
        product.description = description;
        product.price = price;

        await product.save();
        res.json(product);
    }
    catch (error) {
        res.json({message: "Error during updating product."});
        console.log(error);
    }
}