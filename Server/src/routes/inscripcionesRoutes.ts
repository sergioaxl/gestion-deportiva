import { Router } from "express";
import inscripcionesController from "../controllers/inscripcionesController";

class InscripcionesRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', inscripcionesController.lista);
        this.router.post('/', inscripcionesController.crear);
        this.router.get('/', inscripcionesController.list);
        this.router.post('/', inscripcionesController.create);
        this.router.put('/:idInscripciones', inscripcionesController.actualizar);
        this.router.delete('/:idInscripciones', inscripcionesController.borrar);
        this.router.get('/miembro/:idMiembros/disciplinas', inscripcionesController.buscarPorMiembro);
        this.router.get('/miembro/:idMiembros', inscripcionesController.buscar);
        this.router.get('/:idInscripciones', inscripcionesController.buscar);
    }
}

const inscripcionesRoutes = new InscripcionesRoutes();
export default inscripcionesRoutes.router;