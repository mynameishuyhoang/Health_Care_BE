import express from "express"
import { customerController } from "../controllers/customer_controller"
import { allowCrossDomain } from "../utils/corsMiddleware"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/customer/add', customerController.Add)
route.post('/api/customer/:_id', customerController.GetA)
route.post('/api/customer', customerController.GetAll)
route.patch('/api/customer/update/:_id', customerController.Update)
route.delete('/api/customer/delete/:_id', customerController.Delete)


module.exports = route

const CustomerRoute = route

export default CustomerRoute