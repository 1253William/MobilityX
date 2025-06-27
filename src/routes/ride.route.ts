import express from 'express';
const router = express.Router();
import { requestRide } from "../controllers/ride.controller";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";


//@route POST /api/v1/rides/request
//@desc Rider Request ride(rider only)
//@access Private
router.post('/request', authMiddleware, authorizedRoles("rider"), requestRide);




export default router;