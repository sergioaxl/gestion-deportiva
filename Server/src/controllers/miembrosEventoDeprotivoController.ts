import { Request, Response } from "express";
import pool from "../database";

class MiembrosEventoDeportivoController {

    public async lista(req: Request, res: Response): Promise<Response> {
        try {
            const miembrosEventos = await pool.query('SELECT * FROM miembroseventodeportivo');
            return res.json(miembrosEventos);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener registros de miembros en eventos deportivos" });
        }
    }

    public async crear(req: Request, res: Response): Promise<Response> {
        try {
            await pool.query('INSERT INTO miembroseventodeportivo SET ?', [req.body]);
            return res.json({ message: 'Registro de miembro en evento deportivo creado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear registro de miembro en evento deportivo' });
        }
    }

    public async actualizar(req: Request, res: Response): Promise<Response> {
        const { idMiembrosEventoDeportivo } = req.params;
        try {
            await pool.query('UPDATE miembroseventodeportivo SET ? WHERE idMiembrosEventoDeportivo = ?', [req.body, idMiembrosEventoDeportivo]);
            return res.json({ message: 'Registro actualizado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar registro' });
        }
    }

    public async borrar(req: Request, res: Response): Promise<Response> {
        const { idMiembrosEventoDeportivo } = req.params;
        try {
            await pool.query('DELETE FROM miembroseventodeportivo WHERE idMiembrosEventoDeportivo = ?', [idMiembrosEventoDeportivo]);
            return res.json({ message: 'Registro eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar registro' });
        }
    }

    public async buscar(req: Request, res: Response): Promise<Response> {
        const { idMiembrosEventoDeportivo } = req.params;
        try {
            const registro: any = await pool.query('SELECT * FROM miembroseventodeportivo WHERE idMiembrosEventoDeportivo = ?', [idMiembrosEventoDeportivo]);
            if (registro.length > 0) {
                return res.json(registro[0]);
            }
            return res.status(404).json({ message: 'No se encontró el registro' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar registro' });
        }
    }
    public async obtenerEventosPorMiembro(req: Request, res: Response): Promise<Response> {
        const { idMiembro } = req.params;
        try {
            const query = `
                SELECT 
                    e.idEventoDeportivo,
                    e.nombreEvento,
                    e.fechaEvento,
                    e.horaEvento,
                    e.lugar,
                    e.descripcion
                FROM miembroseventodeportivo me
                INNER JOIN eventodeportivo e 
                    ON me.EventoDeportivo_idEventoDeportivo = e.idEventoDeportivo
                WHERE me.Miembros_idMiembros = ?;
            `;
            const eventos = await pool.query(query, [idMiembro]);
            return res.json(eventos);
        } catch (error) {
            console.error('Error al obtener eventos del miembro:', error);
            return res.status(500).json({ message: 'Error al obtener eventos del miembro', error });
        }
    }
}

export default new MiembrosEventoDeportivoController();
