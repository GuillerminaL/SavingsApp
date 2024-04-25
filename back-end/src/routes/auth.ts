import { Router } from "express";
import { signup, login, refreshToken, activateAccount, deactivateAccount } from "../controllers/auth";
import { authToken } from "../middleware/authToken";
import { authUser } from "../middleware/authUser";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/accounts/refresh-token', authToken, authUser, refreshToken);
router.patch('/accounts/recover', activateAccount);
router.patch('/accounts/deactivate', authToken, authUser, deactivateAccount);

export default router;
