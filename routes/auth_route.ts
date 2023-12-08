import express from "express"
import { authController } from "../controllers/auth_controller"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/register', authController.Register)
route.post('/api/login', authController.Login)


module.exports = route

const AuthoRoute = route

export default AuthoRoute