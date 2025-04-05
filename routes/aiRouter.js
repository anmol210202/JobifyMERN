import { Router } from "express";
const router = Router();
import { generateAIText } from "../controllers/aiController.js";
import rateLimiter from "express-rate-limit";

const aiLimiter = rateLimiter({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 50, // 50 requests per hour
    message: { msg: "AI text generation rate limit exceeded, try again later" },
    validate: { xForwardedForHeader: false },
});

router.post("/generate-text", generateAIText);

export default router;