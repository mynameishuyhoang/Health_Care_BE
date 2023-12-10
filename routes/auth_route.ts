import express from "express"
import { authController } from "../controllers/auth_controller"
import { allowCrossDomain } from "../utils/corsMiddleware"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/register', authController.Register)
route.post('/api/login', authController.Login)
route.post('/api/dashboard/login', authController.LoginDasboard)



module.exports = route

const AuthoRoute = route

export default AuthoRoute