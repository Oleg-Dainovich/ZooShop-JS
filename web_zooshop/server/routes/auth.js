import {Router} from 'express';
import {register, signin, getCurrentUser} from '../controllers/auth.js'
import { checkAuth } from '../utils/checkAuth.js';

const router = new Router();

//SignUp
router.post('/register', register);

//SignIn
router.post('/signin', signin);

//GetCurrentUser
router.get('/current', checkAuth ,getCurrentUser);

export default router;