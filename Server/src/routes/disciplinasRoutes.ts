import { Router } from "express";
import disciplinasController from "../controllers/disciplinasController";

class DisciplinasRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', disciplinasController.lista);
        this.router.post('/', disciplinasController.crear);
        this.router.put('/:idDisciplinas', disciplinasController.actualizar);        
        this.router.delete('/:idDisciplinas', disciplinasController.borrar);   
        this.router.get('/:idDisciplinas', disciplinasController.buscar);                
    }
}

const disciplinasRoutes = new DisciplinasRoutes();
export default disciplinasRoutes.router;