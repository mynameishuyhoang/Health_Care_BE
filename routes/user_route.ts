import express from "express"
import { userController } from "../controllers/user_controller"

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/user/add', userController.Add)
route.get('/api/user/:_id', userController.GetA)
route.get('/api/user', userController.GetAll)
route.put('/api/user/update/:_id', userController.Update)
route.delete('/api/user/delete/:_id', userController.Delete)


module.exports = route

const UserRoute = route

export default UserRoute