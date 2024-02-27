import {Router} from 'express';
import {createProduct, getAll, getById, removeProduct, updateProduct} from '../controllers/products.js';

const router = new Router();

//Create Product
router.post('/create', createProduct);

//Get All Products
router.get('/getProducts', getAll);

//Get Product By Id 
router.get('/:id', getById);

//Remove Product
router.delete('/delete/:id', removeProduct);

//Update Product
router.put('/update/:id', updateProduct);

export default router;