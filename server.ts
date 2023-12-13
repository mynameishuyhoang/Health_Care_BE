import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from "cors"
import bodyParser from "body-parser";
import morgan from "morgan"
import CustomerRoute from "./routes/customer_route";
import ProductRoute from "./routes/product_route";
import UserRoute from "./routes/user_route";
import OrderRoute from "./routes/order_route";
import VoucherRoute from "./routes/voucher_route";
import AuthoRoute from "./routes/auth_route";
import CartRoute from "./routes/cart_route";
import ShippRoute from "./routes/shipp_route";

const app = express();
// const router = Router

app.use(
    cors()
);
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan("common"));
dotenv.config();

//Connect database
mongoose.connect((process.env.MONGODB_URL + ""))
const database = mongoose.connection;
database.on("err", (err: any) => {
    console.log(err);
});

database.once("connected", () => {
    console.log("Database Connect successfully...");
});

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running port ${PORT}`);
    console.log(process.env.MONGODB_URL);
})

app.use("", CustomerRoute)
app.use("", ProductRoute)
app.use("", UserRoute)
app.use("", OrderRoute)
app.use("", VoucherRoute)
app.use("", AuthoRoute)
app.use("", CartRoute)
app.use("", ShippRoute)