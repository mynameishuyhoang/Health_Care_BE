import { Request, Response } from "express";
import Product from "../models/product"

const Add = async (req: Request, res: Response) => {
    try {
        const check = await Product.findOne({
            name: req.body.name
        })
        if (check) return res.status(400).json({ message: "Existed" })
        else {
            const data = await Product.create(req.body)
            return res.status(200).json({
                message: "Successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetAll = async (req: Request, res: Response) => {
    try {
        const { name, categoryId, pageSize, pageNumber } = req.query;

        let query: any = {};

        // Kiểm tra nếu có query parameter name, thêm điều kiện tìm kiếm theo tên sản phẩm
        if (name) {
            query.name = { $regex: new RegExp(name as string, 'i') }; // Sử dụng RegExp để tìm kiếm không phân biệt chữ hoa chữ thường
        }

        // Kiểm tra nếu có query parameter category, thêm điều kiện tìm kiếm theo danh mục sản phẩm
        if (categoryId) {
            query.categoryId = { $regex: new RegExp(categoryId as string, 'i') };
        }

        // Xử lý phân trang
        const pageSizeInt = parseInt(pageSize as string, 10) || 8;
        const pageNumberInt = parseInt(pageNumber as string, 10) || 1;

        const skip = (pageNumberInt - 1) * pageSizeInt;

        const data = await Product.find(query)
            .skip(skip)
            .limit(pageSizeInt);

        return res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const GetA = async (req: Request, res: Response) => {
    try {
        const data = await Product.findById(req.params._id)
        if (!data) return res.status(400).json({ message: "Invalid" })
        else return res.status(200).json({
            message: "Successfully",
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const Update = async (req: Request, res: Response) => {
    try {
        const data = await Product.findById(req.params._id)
        if (!data) {
            return res.status(400).json({
                message: "Invalid"
            })
        }
        else {
            await data?.updateOne({ $set: req.body })
            return res.status(200).json({
                message: "Successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}
const Delete = async (req: Request, res: Response) => {
    try {
        const data = await Product.findById(req.params._id)
        if (!data) {
            return res.status(400).json({
                message: "Invalid"
            })
        }
        else {
            await Product.findByIdAndDelete(req.params._id)
            return res.status(200).json({
                message: "Successfully"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something's wrong with system on server"
        })
    }
}

const DeleteAll = async (req, res) => {
    try {
        // Get the list of product IDs to delete from the request body
        const productIds = req.body;

        console.log('req:', req.body);
        console.log('productIds: ', productIds);


        // Convert the product IDs to MongoDB ObjectIDs
        // const objectIds = productIds?.map((id) => new ObjectID(id));

        // console.log('objectIds:', objectIds);

        // Delete the documents matching the provided ObjectIDs
        const deleteResult = await Product.deleteMany({ _id: { $in: productIds } });

        // Check if any documents were deleted
        if (deleteResult.deletedCount > 0) {
            res.status(200).json({ message: 'Documents deleted successfully' });
        } else {
            res.status(404).json({ message: 'No documents found to delete' });
        }
    } catch (error) {
        console.error('Error deleting documents:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
export const productController = {
    Add, GetA, GetAll, Update, Delete, DeleteAll
}