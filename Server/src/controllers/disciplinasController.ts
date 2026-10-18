import { Request, Response, text } from "express";
import pool from "../database";

class DisciplinasController{
    public async lista(req: Request, res: Response){
        try 
        {    
            const disciplinas = await pool.query('SELECT * FROM disciplinas');
            res.json(disciplinas);
        }catch (error) 
        {
            console.error(error);
            res.status(500).json({ message: "Error al obtener disciplinas" });
        }
    }

    public async crear(req: Request, res: Response){
        //console.log(req.body);
        await pool.query('insert into disciplinas set ?', [req.body]);
        res.json({message: 'Se guardo una disciplina'});
    }
    
    public async actualizar(req: Request, res: Response){
        const {idDisciplinas} = req.params;
        await pool.query('update disciplinas disciplinas set ? where idDisciplinas = ?', [req.body, idDisciplinas]);
        res.json({message: 'Se actualizo una disciplina'});
    }

    public async borrar(req: Request, res: Response){
        const {idDisciplinas} = req.params;
        await pool.query('delete from disciplinas where idDisciplinas = ?', [idDisciplinas]);
        res.json({message: 'Se elimino una disciplina'});
    }    
    
    public async buscar(req: Request, res: Response){
        const {idDisciplinas} = req.params;
        const disciplina = await pool.query('select * from disciplinas where idDisciplinas = ?', [idDisciplinas]);
        if(disciplina.length > 0)
        {
            return res.json(disciplina[0]);
        }
        res.status(404).json({message: 'No se encontro esa disciplina'});
        
    }  



}

const disciplinasController = new DisciplinasController();
export default disciplinasController;