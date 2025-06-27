import express from "express";
import authRouter from "./authentication.route";
import userRouter from "./user.route";
import rideRouter from "./ride.route";


const rootRouter = express.Router();

//authentication routes
rootRouter.use('/auth',authRouter);

//user routes
rootRouter.use('/status',userRouter);

//ride routes
rootRouter.use('/rides',rideRouter);



export default rootRouter;