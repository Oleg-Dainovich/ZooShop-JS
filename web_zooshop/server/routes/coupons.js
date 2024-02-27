import {Router} from 'express';
import {createCoupon, getAll} from '../controllers/coupons.js';

const router = new Router();

//Create Coupon
router.post('/create', createCoupon);

//Get All Coupons
router.get('/getCoupons', getAll);

export default router;