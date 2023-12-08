import express from "express"
import { productController } from "../controllers/product_controller"
import cors from "cors"
import { allowCrossDomain } from "../utils/corsMiddleware"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/product/add', productController.Add)
route.get('/api/product/:_id', productController.GetA)
route.post('/api/product', productController.GetAll)
route.put('/api/product/update/:_id', productController.Update)
route.delete('/api/product/delete/:_id', productController.Delete)
route.delete('/api/product/delete', productController.DeleteAll)



module.exports = route

const ProductRoute = route

export default ProductRoute