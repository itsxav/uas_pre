import express from "express";
import {
    getPlaces,
    getPlacesById,
    createPlace,
    updatePlace,
    deletePlace
} from "../controllers/PlaceController.js";

const router = express.Router();

router.get('/place', getPlaces);
router.get('/place/:id', getPlacesById);
router.post('/place', createPlace);
router.patch('/place/:id', updatePlace);
router.delete('/place/:id', deletePlace);
  
export default router;