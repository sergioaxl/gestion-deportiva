import { Request, Response } from "express";
import pool from "../database";

class EntrenadoresController {

    public async lista(req: Request, res: Response): Promise<Response> {
        try {
            const entrenadores = await pool.query('SELECT * FROM entrenadores');
            return res.json(entrenadores);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener entrenadores" });
        }
    }

    public async crear(req: Request, res: Response): Promise<Response> {
        try {
            await pool.query('INSERT INTO entrenadores SET ?', [req.body]);
            return res.json({ message: 'Entrenador creado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear entrenador' });
        }
    }

    public async actualizar(req: Request, res: Response): Promise<Response> {
        const { idEntrenadores } = req.params;
        try {
            await pool.query('UPDATE entrenadores SET ? WHERE idEntrenadores = ?', [req.body, idEntrenadores]);
            return res.json({ message: 'Entrenador actualizado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar entrenador' });
        }
    }

    public async borrar(req: Request, res: Response): Promise<Response> {
        const { idEntrenadores } = req.params;
        try {
            await pool.query('DELETE FROM entrenadores WHERE idEntrenadores = ?', [idEntrenadores]);
            return res.json({ message: 'Entrenador eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar entrenador' });
        }
    }

    public async buscar(req: Request, res: Response): Promise<Response> {
        const { idEntrenadores } = req.params;
        try {
            const entrenador: any = await pool.query('SELECT * FROM entrenadores WHERE idEntrenadores = ?', [idEntrenadores]);
            if (entrenador.length > 0) {
                return res.json(entrenador[0]);
            }
            return res.status(404).json({ message: 'No se encontró el entrenador' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar entrenador' });
        }
    }
}
export default new EntrenadoresController();
