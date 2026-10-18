import { Request, Response } from "express";
import pool from "../database";

class UsuariosController {

    // Listar todos los usuarios
    public async lista(req: Request, res: Response): Promise<Response> {
        try {
            const usuarios = await pool.query('SELECT * FROM usuarios');
            return res.json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener usuarios" });
        }
    }

    // Crear un nuevo usuario
    public async crear(req: Request, res: Response): Promise<Response> {
        try {
            await pool.query('INSERT INTO usuarios SET ?', [req.body]);
            return res.json({ message: 'Usuario creado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al crear usuario' });
        }
    }

    // Actualizar un usuario
    public async actualizar(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await pool.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
            return res.json({ message: 'Usuario actualizado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar usuario' });
        }
    }

    // Eliminar un usuario
    public async borrar(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
            return res.json({ message: 'Usuario eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar usuario' });
        }
    }

    // Buscar un usuario por ID
    public async buscar(req: Request, res: Response): Promise<Response> {
        const { id } = req.params;
        try {
            const usuario: any = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (usuario.length > 0) {
                return res.json(usuario[0]);
            }
            return res.status(404).json({ message: 'Usuario no encontrado' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar usuario' });
        }
    }

    // Buscar usuarios por rol (opcional, ejemplo de filtro)
    public async buscarPorRol(req: Request, res: Response): Promise<Response> {
        const { rol } = req.params;
        try {
            const usuarios = await pool.query('SELECT * FROM usuarios WHERE rol = ?', [rol]);
            return res.json(usuarios);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar usuarios por rol' });
        }
    }
}

export default new UsuariosController();
