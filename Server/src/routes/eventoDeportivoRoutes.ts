import { Router } from "express";
import eventoDeportivoController from "../controllers/eventoDeportivoController";

class EventoDeportivoRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', eventoDeportivoController.lista);
        this.router.post('/', eventoDeportivoController.crear);
        this.router.put('/:idEventoDeportivo', eventoDeportivoController.actualizar);
        this.router.delete('/:idEventoDeportivo', eventoDeportivoController.borrar);
        this.router.get('/:idEventoDeportivo', eventoDeportivoController.buscar);
    }
}

const eventoDeportivoRoutes = new EventoDeportivoRoutes();
export default eventoDeportivoRoutes.router;
