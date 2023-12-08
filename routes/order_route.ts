import express from "express"
import { orderController } from "../controllers/order_controller"
import { allowCrossDomain } from "../utils/corsMiddleware"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/order/add', orderController.Add)
route.post('/api/order/:_id', orderController.GetA)
route.post('/api/order', orderController.GetAll)
route.put('/api/order/update/:_id', orderController.Update)


module.exports = route

const OrderRoute = route

export default OrderRoute