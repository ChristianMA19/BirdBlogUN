import { createpost, getpost, updatepost} from "./foroupload.controller.js";
import {Router} from 'express';
const router = Router();

// // Endpoint GET /prueba
router.get('/', getpost );

// Endpoint POST /prueba
router.post('/', createpost );

// // Endpoint PATCH /prueba
router.patch('/:idpost', updatepost );

// // Endpoint DELETE /prueba
// router.delete('/:idpedidos', deletepedidos );

export default router;