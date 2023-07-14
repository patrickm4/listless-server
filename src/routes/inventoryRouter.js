import express from 'express'
import * as inventoryController from '../controllers/inventoryController.js'

const inventoryRouter = express.Router();

inventoryRouter.post('/bulk-create-inventory-item', (req, res) => {
    try {
        // call controller to create inventory item
    } catch (error) {
        res.send({err: error})
    }
})