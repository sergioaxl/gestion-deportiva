import { Router } from "express";
import miembrosController from "../controllers/miembrosController";

class MiembrosRoutes{
    public router: Router = Router();
    constructor(){
        this.config();
    }
    config(): void{
        this.router.get('/', miembrosController.lista);
        this.router.post('/', miembrosController.crear);
        this.router.put('/:idMiembros', miembrosController.actualizar);        
        this.router.delete('/:idMiembros', miembrosController.borrar);   
        this.router.get('/:idMiembros', miembrosController.buscar); 
        this.router.post('/login', miembrosController.login);    
        this.router.post('/recuperar-contrasena', miembrosController.recuperarContrasena);
             
    }
}

const miembrosRoutes = new MiembrosRoutes();
export default miembrosRoutes.router;