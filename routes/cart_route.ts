import express from "express"
import { cartController } from "../controllers/cart_controller"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/cart/add', cartController.Add)
route.post('/api/cart/:_id', cartController.GetA)
route.post('/api/cart', cartController.GetAll)
route.patch('/api/cart/update/:_id', cartController.Update)


module.exports = route

const OrderRoute = route

export default OrderRoute