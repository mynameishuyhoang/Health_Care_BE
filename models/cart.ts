import mongoose from "mongoose";
import { ICart } from "../types/cart";

const cartSchema = new mongoose.Schema<ICart>(
    {
        customerId: {
            type: String
        },
        status: {
            type: Number
        },
        products: [{
            type: Object
        }],
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model("Cart", cartSchema)

export default Cart