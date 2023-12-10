import mongoose from "mongoose";
import { IShipp } from "../types/shipp";

const shippSchema = new mongoose.Schema<IShipp>(
    {
        shippName: {
            type: String,
            required: true,
        },
        shippPrice: {
            type: Number,
            required: true
        },
    },
    {
        timestamps: true
    }
)

const Shipp = mongoose.model("Shipp", shippSchema)

export default Shipp