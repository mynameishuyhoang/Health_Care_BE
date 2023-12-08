import express from "express";
import { voucherController } from "../controllers/voucher_controller";

const route = express.Router()
const app = express()

app.use(allowCrossDomain)

route.post('/api/voucher/add', voucherController.Add)
route.get('/api/voucher/:_id', voucherController.GetA)
route.get('/api/voucher', voucherController.GetAll)
route.put('/api/voucher/update/:_id', voucherController.Update)
route.delete('/api/voucher/delete/:_id', voucherController.Delete)


module.exports = route

const VoucherRoute = route

export default VoucherRoute