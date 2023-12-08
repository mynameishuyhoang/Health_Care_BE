import mongoose from "mongoose"
import { IUser } from "../types/user"
const Schema = mongoose.Schema

const userSchema = new mongoose.Schema<IUser>(
    {
        userName: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        isAdmin: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", userSchema)

export default User