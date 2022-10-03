import {Router} from 'express';
import { userRegisterSchema, userLoginSchema, validator } from '../validators/users.js';
import { registerController, loginController } from '../controller/users.js';

const router = Router();

//register endpoint
router.post('/register', userRegisterSchema, validator, registerController);

//login endpoint
router.post('/login',userLoginSchema, validator, loginController);

export default router;