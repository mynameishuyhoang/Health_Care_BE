import mongoose, { Schema } from "mongoose";
import { IProduct } from "../types/product";
const productSchema = new mongoose.Schema<IProduct>(
    {
        name: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true
        },
        inputPrice: {
            type: Number,
            required: true
        },
        exportPrice: {
            type: Number,
            required: true
        },
        calo: {
            type: Number,
            required: true
        },
        protein: {
            type: Number,
            required: true
        },
        lipid: {
            type: Number,
            required: true
        },
        sugar: {
            type: Number,
            required: true
        },
        starch: {
            type: Number,
            required: true
        },
        images: [{
            type: String,
            required: true
        }],
        description: {
            type: String,
        },
        categoryId: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)


const Product = mongoose.model("Product", productSchema)

export default Product