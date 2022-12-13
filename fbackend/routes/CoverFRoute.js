import express from "express";
import {
    getCoverFs,
    getCoverFById,
    createCoverF,
    updateCoverF,
    deleteCoverF
} from "../controllers/CoverFController.js";

const router = express.Router();

router.get('/coverf', getCoverFs);
router.get('/coverf/:id', getCoverFById);
router.post('/coverf', createCoverF);
router.patch('/coverf/:id', updateCoverF);
router.delete('/coverf/:id', deleteCoverF);
  
export default router;