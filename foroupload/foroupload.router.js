import { createpost} from "./foroupload.controller.js";
import {Router} from 'express';
const router = Router();

// // Endpoint GET /prueba
// router.get('/', getpedidos );

// Endpoint POST /prueba
router.post('/', createpost );

// // Endpoint PATCH /prueba
// router.patch('/:idpedidos', patchpedidos );

// // Endpoint DELETE /prueba
// router.delete('/:idpedidos', deletepedidos );

export default router;