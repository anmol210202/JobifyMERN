import { Router } from "express";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats
} from "../controllers/jobController.js";
import { validateJobInput , validateIdParam} from "../middleware/validationMiddleware.js";
import { checkForTestUser } from "../middleware/authMiddleware.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

// above method is too lengthy so we can use below method
// we can use auth middleware here too but's easy to use in server for all job routes at the same time

router.route("/").get(getAllJobs).post(checkForTestUser,validateJobInput, createJob);

// only in between because :id might interfere
router.route("/stats").get(showStats);

router
  .route("/:id")
  .get(validateIdParam,getJob)
  .patch(checkForTestUser,validateIdParam,validateJobInput, updateJob)
  .delete(checkForTestUser,validateIdParam,deleteJob);

export default router;
