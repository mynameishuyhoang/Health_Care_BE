import express from "express"
import { cartController } from "../controllers/cart_controller"
import { allowCrossDomain } from "../utils/corsMiddleware"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/cart/add', cartController.Add)
route.post('/api/cart/:_id', cartController.GetA)
route.post('/api/cart', cartController.GetAll)
route.patch('/api/cart/update/:_id', cartController.Update)
route.patch('/api/cart/update', cartController.UpdateCart)
route.delete('/api/cart/deleteproduct/:_id', cartController.DeleteProductInCart)
route.delete('/api/cart/delete/:_id', cartController.Delete)


module.exports = route

const CartRoute = route

export default CartRoute