import express from "express"
import { allowCrossDomain } from "../utils/corsMiddleware"
import { shippController } from "../controllers/shipp_controller"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/shipp/add', shippController.Add)
route.post('/api/shipp/:_id', shippController.GetA)
route.post('/api/shipp', shippController.GetAll)
route.patch('/api/shipp/update/:_id', shippController.Update)
route.delete('/api/shipp/delete/:_id', shippController.Delete)


module.exports = route

const ShippRoute = route

export default ShippRoute