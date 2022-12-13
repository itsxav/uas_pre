import express from "express";
import {
    getFoods,
    getFoodById,
    createFood,
    updateFood,
    deleteFood
} from "../controllers/FoodController.js";

const router = express.Router();

router.get('/food', getFoods);
router.get('/food/:id', getFoodById);
router.post('/food', createFood);
router.patch('/food/:id', updateFood);
router.delete('/food/:id', deleteFood);
  
export default router;