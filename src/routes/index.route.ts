import express from "express";
import authRouter from "./authentication.route";
import userRouter from "./user.route";


const rootRouter = express.Router();

//authentication routes
rootRouter.use('/auth',authRouter);

//user routes
rootRouter.use('/status',userRouter);



export default rootRouter;