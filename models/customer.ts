import mongoose from "mongoose"
import { ICustomer } from "../types/customer"
const Schema = mongoose.Schema

const customerSchema = new Schema<ICustomer>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        adult: {
            type: Number,
            required: true
        },
        child: {
            type: Number,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

const Customer = mongoose.model("Customer", customerSchema)

export default Customer