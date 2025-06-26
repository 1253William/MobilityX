import express from "express";
import authRouter from "./authentication.route";
import userRouter from "./user.route";
import newsfeedRoutes from "./newsfeed.route"


const rootRouter = express.Router();


//authentication routes
rootRouter.use('/auth',authRouter);

//user routes
rootRouter.use('/status',userRouter);

//news feed routes
rootRouter.use('/feed',newsfeedRoutes);


export default rootRouter;