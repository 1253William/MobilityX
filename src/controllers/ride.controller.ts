import { Request, Response } from 'express';
import { Ride } from '../models/ride.model';
import {AuthRequest} from "../types/authRequest";


//@route POST /api/v1/rides/request
//@desc Rider Request ride(rider only)
//@access Private
export const requestRide = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { pickuplocation, dropofflocation } = req.body;
        const userId = req.user?.userId;


        if(!pickuplocation || !dropofflocation) {
            res.status(400).json({
                success: false,
                message: "Pickup location and drop-off location are required"
            });
            return;
        }

        const ride = await Ride.create(
            {
                pickupLocation: pickuplocation,
                dropOffLocation: dropofflocation,
                rider: userId,
            }
        )

        res.status(200).json({
            success: true,
            message: "Ride requested successfully.",
            data: ride
        })

    } catch (error) {
        console.log({ message: "Error requesting ride", error });
        res.status(500).json({ success: false, error: "Internal Server Error" });
        return;
    }
}


//@route GET /api/v1/rides/pending
//@desc Driver views all pending rides (driver only), Fetch all new rides (pending)
//@access Private


//@route PATCH /api/v1/rides/:id/accept
//@desc Driver accepts ride (driver only), (status change to accepted)
//@access Private


//Trip History
//@route PATCH /api/v1/rides/:id/start
//@desc Driver starts ride (driver only), (status change to in progress)
//@access Private


//@route PATCH /api/v1/rides/:id/complete
//@desc Driver completes ride (driver only), (status change to completed)
//@access Private

//@route GET /api/v1/rides/my-trips
//@desc View/fetch user specific trips (all roles)
//@access Private