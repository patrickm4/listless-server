import express from 'express'
import * as tradingController from '../controllers/tradingController.js'

const tradingRouter = express.Router();

tradingRouter.post('/add-item', (req, res) => {
    try {
        const result = tradingController.addItem()
        res.send({ok:true, result})
    } catch (error) {
        res.send({err: error})
    }
})

tradingRouter.get('/get-seller-list', async (req, res) => {
    try {
        const result = await tradingController.getSellerList()
        console.log("ress", result)
        res.send({ok:true, result})
    } catch (error) {
        console.log("errr", error)
        res.send({err: error})
    }
})

export default tradingRouter;