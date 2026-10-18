import { Router, Request, Response } from 'express';
import pool from '../database'; // conexión a MariaDB

const router = Router();

router.post('/login', async (req: Request, res: Response) => {
  const { usuario, contrasena } = req.body;
  console.log('📥 Datos recibidos:', usuario, contrasena);

  try {
    // ============================================================
    // 🧩 1️⃣ Buscar primero en la tabla de ADMINISTRADOR
    // ============================================================
    const [adminRows]: any = await pool.query(
      `SELECT id, usuario, contrasena, nombre, correo, direccion, rol
       FROM administrador
       WHERE BINARY usuario = ? AND BINARY contrasena = ?`,
      [usuario.trim(), contrasena.trim()]
    );

    if (adminRows.length > 0) {
      const admin = adminRows[0];
      console.log('✅ Administrador encontrado:', admin);

      return res.json({
        success: true,
        rol: admin.rol, // 'admin'
        usuario: admin
      });
    }

    // ============================================================
    // 🧩 2️⃣ Si no es administrador, buscar en la tabla USUARIOS
    // ============================================================
    const [rows]: any = await pool.query(
      `SELECT u.id, u.usuario, u.idMiembro, u.rol,
              m.nombreMiembros, m.apellidoPaterno, m.apellidoMaterno,
              m.categoria, m.correoMiembro
       FROM usuarios u
       LEFT JOIN miembros m ON u.idMiembro = m.idMiembros
       WHERE BINARY u.usuario = ? AND BINARY u.contrasena = ?`,
      [usuario.trim(), contrasena.trim()]
    );

    if (rows.length > 0) {
      const user = rows[0];
      console.log('✅ Miembro encontrado:', user);

      return res.json({
        success: true,
        rol: user.rol, // 'miembro'
        usuario: user
      });
    }

    // ============================================================
    // 🧩 3️⃣ Si no se encuentra en ninguna tabla
    // ============================================================
    console.log('❌ No se encontró el usuario en ninguna tabla');
    return res
      .status(401)
      .json({ success: false, message: 'Usuario o contraseña incorrectos' });

  } catch (error) {
    console.error('💥 Error en login:', error);
    return res
      .status(500)
      .json({ success: false, message: 'Error en el servidor' });
  }
});

export default router;
