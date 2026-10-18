import { Router, Request, Response } from 'express';
import pool from '../database';
import usuarioController from '../controllers/usuarioController';

const router = Router();

// --- Rutas CRUD tradicionales ---
router.get('/', usuarioController.lista);               
router.get('/:id', usuarioController.buscar);            
router.post('/', usuarioController.crear);                
router.put('/:id', usuarioController.actualizar);        
router.delete('/:id', usuarioController.borrar);          

// --- Ruta compleja: usuario + miembro + disciplinas + eventos ---
router.get('/detalle/:idMiembro', async (req: Request, res: Response) => {
  const { idMiembro } = req.params;

  try {
    // Traer datos de usuario y miembro
    const [usuario]: any = await pool.query(`
      SELECT u.id, u.usuario, u.rol, m.nombreMiembros, m.apellidoPaterno, m.apellidoMaterno, m.correoMiembro
      FROM usuarios u
      INNER JOIN miembros m ON u.idMiembro = m.idMiembros
      WHERE u.idMiembro = ?
    `, [idMiembro]);

    if (usuario.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    // Traer disciplinas del usuario
    const [disciplinas]: any = await pool.query(`
      SELECT d.nombreDisciplina, d.dias, d.horario, d.estado
      FROM disciplinas d
      INNER JOIN usuario_disciplinas ud ON d.idDisciplina = ud.idDisciplina
      WHERE ud.idMiembro = ?
    `, [idMiembro]);

    // Traer eventos del usuario
    const [eventos]: any = await pool.query(`
      SELECT e.nombreEvento, e.fecha, e.lugar, ue.estado
      FROM eventos e
      INNER JOIN usuario_eventos ue ON e.idEvento = ue.idEvento
      WHERE ue.idMiembro = ?
    `, [idMiembro]);

    res.json({
      usuario: usuario[0],
      disciplinas,
      eventos
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
});

export default router;
