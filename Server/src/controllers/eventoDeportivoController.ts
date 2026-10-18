import { Request, Response } from "express";
import pool from "../database";

class EventoDeportivoController {

    public async lista(req: Request, res: Response): Promise<Response> {
        try {
            const eventos = await pool.query('SELECT * FROM eventoDeportivo');
            return res.json(eventos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener eventos deportivos" });
        }
    }

    public async crear(req: Request, res: Response): Promise<Response> {
        try {
            await pool.query('INSERT INTO eventoDeportivo SET ?', [req.body]);
            return res.json({ message: 'Evento deportivo creado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear evento deportivo' });
        }
    }

    public async actualizar(req: Request, res: Response): Promise<Response> {
        const { idEventoDeportivo } = req.params;
        try {
            await pool.query('UPDATE eventoDeportivo SET ? WHERE idEventoDeportivo = ?', [req.body, idEventoDeportivo]);
            return res.json({ message: 'Evento deportivo actualizado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar evento deportivo' });
        }
    }

    public async borrar(req: Request, res: Response): Promise<Response> {
        const { idEventoDeportivo } = req.params;
        try {
            await pool.query('DELETE FROM eventoDeportivo WHERE idEventoDeportivo = ?', [idEventoDeportivo]);
            return res.json({ message: 'Evento deportivo eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar evento deportivo' });
        }
    }

    public async buscar(req: Request, res: Response): Promise<Response> {
        const { idEventoDeportivo } = req.params;
        try {
            const evento: any = await pool.query('SELECT * FROM eventoDeportivo WHERE idEventoDeportivo = ?', [idEventoDeportivo]);
            if (evento.length > 0) {
                return res.json(evento[0]);
            }
            return res.status(404).json({ message: 'No se encontró el evento deportivo' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar evento deportivo' });
        }
    }
}

export default new EventoDeportivoController();
