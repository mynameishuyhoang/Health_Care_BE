import { Request, Response } from "express";
import Cart from "../models/cart";
import { errorFunction } from "../utils/errorFunction";
import { ICart, productCart } from "../types/cart";

const Add = async (req: Request, res: Response) => {
    try {

        const mergeProductsById = (existingProducts: productCart[], newProducts: productCart[]): productCart[] => {
            const mergedProducts: productCart[] = [...existingProducts];

            newProducts.forEach((product) => {
                const existingProductIndex = mergedProducts.findIndex((p) => p.productId === product.productId);

                if (existingProductIndex !== -1) {
                    // Nếu sản phẩm đã tồn tại, thì gộp lại thông tin
                    mergedProducts[existingProductIndex].quantity += product.quantity;
                    // Bạn có thể thực hiện các bước gộp thông tin khác tùy ý
                } else {
                    // Nếu sản phẩm chưa tồn tại, thêm mới vào mảng gộp
                    mergedProducts.push({ ...product });
                }
            });

            return mergedProducts;
        };

        const existingCart = await Cart.findOne({ customerId: req.body.customerId })

        if (!existingCart) {
            const data = await Cart.create(req.body)
            res.json(errorFunction(false, 200, "Successfully", data))
        }
        else {
            // Nếu giỏ hàng đã tồn tại, gộp các sản phẩm có cùng productId
            const updatedProducts = mergeProductsById(existingCart.products, req.body.products);

            // Cập nhật giỏ hàng với sản phẩm đã gộp
            const updatedCart = await Cart.findOneAndUpdate(
                { customerId: req.body.customerId },
                { $set: { products: updatedProducts } },
                { new: true }
            );

            res.json(errorFunction(false, 200, "Successfully", updatedCart))
        }

    } catch (error) {
        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetA = async (req: Request, res: Response) => {
    try {
        const data = await Cart.findOne({ customerId: req.params._id })

        if (!data)
            return res.status(400).json({
                message: "Invalid"
            })
        else return res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetAll = async (req: Request, res: Response) => {
    try {
        const data = await Cart.find()
        res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}
const Update = async (req: Request, res: Response) => {
    try {
        const cart = await Cart.findOne({ customerId: req.params._id })
        if (!cart) return res.status(400).json({ message: "Invalid" })
        else {
            await cart?.updateOne({ $set: req.body })
            res.status(200).json({ message: "Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Something's wrong with system on server" })
    }
}

export const cartController = {
    Add, GetA, GetAll, Update
}