import { Router } from "express";
const router = Router();
import { login, logout, register } from "../controllers/authController.js";
import { validateRegisterInput, validateLoginInput } from "../middleware/validationMiddleware.js";

router.post("/login", validateLoginInput,login);
router.post("/register", validateRegisterInput, register);
router.get("/logout" , logout)

export default router;
