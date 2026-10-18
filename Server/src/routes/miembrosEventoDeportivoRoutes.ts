import { Router } from "express";
import miembrosEventoDeportivoController from "../controllers/miembrosEventoDeprotivoController";

class MiembrosEventoDeportivoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', miembrosEventoDeportivoController.lista);
        this.router.post('/', miembrosEventoDeportivoController.crear);
        this.router.put('/:idMiembrosEventoDeportivo', miembrosEventoDeportivoController.actualizar);
        this.router.delete('/:idMiembrosEventoDeportivo', miembrosEventoDeportivoController.borrar);
        this.router.get('/miembro/:idMiembro', miembrosEventoDeportivoController.obtenerEventosPorMiembro);
        this.router.get('/:idMiembrosEventoDeportivo', miembrosEventoDeportivoController.buscar);
    }
}

const miembrosEventoDeportivoRoutes = new MiembrosEventoDeportivoRoutes();
export default miembrosEventoDeportivoRoutes.router;
