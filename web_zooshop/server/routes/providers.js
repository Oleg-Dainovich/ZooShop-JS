import {Router} from 'express';
import {createProvider, getAll} from '../controllers/providers.js';

const router = new Router();

//Create Provider
router.post('/create', createProvider);

//Get All Providers
router.get('/getProviders', getAll);

export default router;
