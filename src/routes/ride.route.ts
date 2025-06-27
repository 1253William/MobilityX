import express from 'express';
const router = express.Router();
import { requestRide, getPendingRides } from "../controllers/ride.controller";
import { authMiddleware } from "../middlewares/authentication.middleware";
import { authorizedRoles } from "../middlewares/roles.middleware";


//@route POST /api/v1/rides/request
//@desc Rider Request ride(rider only)
//@access Private
router.post('/request', authMiddleware, authorizedRoles("rider"), requestRide);

//@route GET /api/v1/rides/pending
//@desc Driver views all pending rides (driver only), Fetch all new rides (pending)
//@access Private
router.get('/pending', authMiddleware, authorizedRoles("driver"), requestRide);




export default router;