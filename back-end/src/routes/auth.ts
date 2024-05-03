import { Router } from "express";
import { signup, login, refreshToken, activateAccount, deactivateAccount } from "../controllers/auth";
import { authToken } from "../middleware/authToken";
import { authUser } from "../middleware/authUser";
const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.patch('/accounts/refresh-token', refreshToken);
router.patch('/accounts/recover', activateAccount);
router.patch('/accounts/deactivate', authToken, authUser, deactivateAccount);

//TODO: PERMANENT DELETE
// router.delete('/accounts/delete-forever', authToken, authUser, permanentDelete);

export default router;
