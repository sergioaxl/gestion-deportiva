import { Request, Response } from "express";
import pool from "../database";

class InscripcionesController {

    public async lista(req: Request, res: Response): Promise<Response> {
        try {
            const inscripciones = await pool.query('SELECT * FROM inscripciones');
            return res.json(inscripciones);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener inscripciones" });
        }
    }

    public async crear(req: Request, res: Response): Promise<void> {
        try {
        const { idMiembros, idDisciplinas } = req.body;

        // Validación de datos
        if (!idMiembros || !idDisciplinas) {
            res.status(400).json({ message: 'Faltan datos: idMiembros o idDisciplinas' });
            return;
        }

        // Obtener fecha actual del sistema (YYYY-MM-DD)
        const fechaActual = new Date().toISOString().split('T')[0];
        
        console.log('Datos recibidos en inscripciones:', req.body); // 👈 añade esto
        // Insertar nueva inscripción
        await pool.query(
            'INSERT INTO inscripciones (idMiembros, idDisciplinas, fechaInscripcion) VALUES (?, ?, ?)',
            [idMiembros, idDisciplinas, fechaActual]
        );

        res.json({ message: '✅ Inscripción creada correctamente' });
        } catch (error) {
        console.error('❌ Error al crear la inscripción:', error);
        res.status(500).json({ message: 'Error al crear la inscripción' });
        }
    }

    public async actualizar(req: Request, res: Response): Promise<Response> {
        const { idInscripciones } = req.params;
        try {
            await pool.query('UPDATE inscripciones SET ? WHERE idInscripciones = ?', [req.body, idInscripciones]);
            return res.json({ message: 'Inscripción actualizada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar inscripción' });
        }
    }

    public async borrar(req: Request, res: Response): Promise<Response> {
        const { idInscripciones } = req.params;
        try {
            await pool.query('DELETE FROM inscripciones WHERE idInscripciones = ?', [idInscripciones]);
            return res.json({ message: 'Inscripción eliminada correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar inscripción' });
        }
    }

    public async buscar(req: Request, res: Response): Promise<Response> {
        const { idInscripciones, idMiembros } = req.params;

        try {
            if (idInscripciones) {
                const [inscripcion] = await pool.query(
                    'SELECT * FROM inscripciones WHERE idInscripciones = ?',
                    [idInscripciones]
                );
                return inscripcion.length > 0
                    ? res.json(inscripcion[0])
                    : res.status(404).json({ message: 'No se encontró la inscripción' });
            } else if (idMiembros) {
                const inscripciones = await pool.query(
                    'SELECT * FROM inscripciones WHERE idMiembros = ?',
                    [idMiembros]
                );
                return inscripciones.length > 0
                    ? res.json(inscripciones)
                    : res.status(404).json({ message: 'No se encontraron inscripciones para este miembro' });
            } else {
                return res.status(400).json({ message: 'Falta un parámetro válido (idInscripciones o idMiembro)' });
            }
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar inscripción' });
        }
    }
    // controllers/inscripcionesController.ts
    public async buscarPorMiembro(req: Request, res: Response): Promise<Response> {
        const { idMiembros } = req.params;

        if (!idMiembros) {
            return res.status(400).json({ message: 'Falta el parámetro idMiembros' });
        }

        try {
            const query = `
            SELECT d.idDisciplinas, d.nombreDisciplina, d.nivel, d.imagen
            FROM inscripciones i
            INNER JOIN disciplinas d ON i.idDisciplinas = d.idDisciplinas
            WHERE i.idMiembros = ?
            `;

            const disciplinas = await pool.query(query, [idMiembros]);

            if (disciplinas.length > 0) {
            return res.json(disciplinas);
            } else {
            return res.status(404).json({ message: 'El miembro no tiene disciplinas inscritas' });
            }
        } catch (error) {
            console.error('Error al buscar disciplinas del miembro:', error);
            return res.status(500).json({ message: 'Error interno del servidor' });
        }
    }
    public async list(req: Request, res: Response): Promise<void> {
        const inscripciones = await pool.query('SELECT * FROM inscripciones');
        res.json(inscripciones);
    }

    public async create(req: Request, res: Response): Promise<void> {
        try {
        await pool.query('INSERT INTO inscripciones SET ?', [req.body]);
        res.json({ message: 'Inscripción creada correctamente' });
        } catch (err) {
        console.error('❌ Error al crear inscripción:', err);
        res.status(500).json({ message: 'Error al crear inscripción' });
        }
    }



}

export default new InscripcionesController();