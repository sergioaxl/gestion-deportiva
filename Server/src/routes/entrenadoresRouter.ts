import { Router } from "express";
import entrenadoresController from "../controllers/entrenadoresController";

class EntrenadoresRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    config(): void {
        this.router.get('/', entrenadoresController.lista);
        this.router.post('/', entrenadoresController.crear);
        this.router.put('/:idEntrenadores', entrenadoresController.actualizar);
        this.router.delete('/:idEntrenadores', entrenadoresController.borrar);
        this.router.get('/:idEntrenadores', entrenadoresController.buscar);
    }
}

const entrenadoresRoutes = new EntrenadoresRoutes();
export default entrenadoresRoutes.router;
