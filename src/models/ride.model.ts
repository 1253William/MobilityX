import { Schema, Document, model } from 'mongoose';
import {RideStatus} from "../types/ride.types";


export interface IRide extends Document {
    rider: Schema.Types.ObjectId;
    driver?: Schema.Types.ObjectId;
    pickupLocation: string;
    dropOffLocation: string;
    status: RideStatus;
    createdAt: Date;
    updatedAt: Date;
}

const RideSchema = new Schema<IRide>(
    {
        rider: { type: Schema.Types.ObjectId, ref: 'User', index: true, required: true },
        driver: { type: Schema.Types.ObjectId, ref: 'User' },
        pickupLocation: { type: String, required: true },
        dropOffLocation: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accepted', 'in_progress', 'completed'], default: 'pending' },
    },
    {
        timestamps: true,
    }
)

export const Ride = model<IRide>('Ride', RideSchema);

