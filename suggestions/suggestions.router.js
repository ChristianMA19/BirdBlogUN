import { scientificname , commonname,family,order,redlistcategory} from "./suggestions.controller.js";
import {Router} from 'express';
const router = Router();

// // Endpoint GET /prueba
 router.get('/scientific/:input', scientificname );
 router.get('/common/:input', commonname );
 router.get('/family/:input', family );
 router.get('/order/:input', order );
 router.get('/redlist/:input', redlistcategory );

// Endpoint POST /prueba
//router.post('/', createpost );

// // Endpoint PATCH /prueba
// router.patch('/:idpedidos', patchpedidos );

// // Endpoint DELETE /prueba
// router.delete('/:idpedidos', deletepedidos );

export default router;