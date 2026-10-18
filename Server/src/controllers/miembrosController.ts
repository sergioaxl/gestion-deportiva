import { Request, Response } from "express";
import pool from "../database";

class MiembrosController {

    public async lista(req: Request, res: Response): Promise<Response> {
        try {
            const miembros = await pool.query('SELECT * FROM miembros');
            return res.json(miembros);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Error al obtener miembros" });
        }
    }

    public async crear(req: Request, res: Response): Promise<Response> {
    try {
        const miembro = req.body;

        // 0. Verificar si el correo ya existe
        const correoExistente: any = await pool.query(
            'SELECT * FROM miembros WHERE correoMiembro = ?',
            [miembro.correoMiembro]
        );

        if (correoExistente.length > 0) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // 1. Insertar miembro
        await pool.query('INSERT INTO miembros SET ?', [miembro]);

        // 2. Generar usuario (correo) y contraseña aleatoria
        const usuario = miembro.correoMiembro;
        const contrasena = Math.random().toString(36).slice(-8); // contrasena de 8 caracteres

        // 3. Insertar en tabla usuarios
        await pool.query('INSERT INTO usuarios SET ?', [{
            idMiembro: miembro.idMiembros,
            usuario,
            contrasena
        }]);

        // 4. Enviar correo al nuevo miembro
        const nodemailer = require('nodemailer');
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: miembro.correoMiembro,
            subject: 'Tus credenciales de acceso',
            text: `Hola ${miembro.nombreMiembros},\n\nTu cuenta fue creada exitosamente.\n\nUsuario: ${usuario}\nContrasena: ${contrasena}\n\n¡Bienvenido!`
        };

        await transporter.sendMail(mailOptions);

        return res.json({ message: 'Miembro creado y correo enviado con usuario y contrasena' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear miembro', error });
    }
}


    public async actualizar(req: Request, res: Response): Promise<Response> {
        const { idMiembros } = req.params;
        try {
            const result = await pool.query('UPDATE miembros SET ? WHERE idMiembros = ?', [req.body, idMiembros]);
            return res.json({ message: 'Miembro actualizado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar miembro' });
        }
    }

    public async borrar(req: Request, res: Response): Promise<Response> {
        const { idMiembros } = req.params;
        try {
            await pool.query('DELETE FROM miembros WHERE idMiembros = ?', [idMiembros]);
            return res.json({ message: 'Miembro eliminado correctamente' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al eliminar miembro' });
        }
    }

    public async buscar(req: Request, res: Response): Promise<Response> {
        const { idMiembros } = req.params;
        try {
            const miembro: any = await pool.query('SELECT * FROM miembros WHERE idMiembros = ?', [idMiembros]);
            if (miembro.length > 0) {
                return res.json(miembro[0]);
            }
            return res.status(404).json({ message: 'No se encontró el miembro' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al buscar miembro' });
        }
    }
    public async login(req: Request, res: Response): Promise<Response> {
    try {
        const { usuario, contrasena } = req.body;

        // Validar campos
        if (!usuario || !contrasena) {
            return res.status(400).json({ message: 'Usuario y contrasena son requeridos' });
        }

        // Buscar en la tabla usuarios
        const result: any = await pool.query(
            'SELECT * FROM usuarios WHERE usuario = ? AND contrasena = ?',
            [usuario, contrasena]
        );

        if (result.length === 0) {
            return res.status(401).json({ message: 'Usuario o contrasena incorrectos' });
        }

        // Login exitoso
        return res.json({
            message: 'Login exitoso',
            usuario: result[0]
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
}
public async recuperarContrasena(req: Request, res: Response): Promise<Response> {
  try {
    const { correo } = req.body;

    if (!correo) {
      return res.status(400).json({ message: 'Debe ingresar un correo electrónico' });
    }

    // Buscar el usuario por correo
    const result: any = await pool.query(
      'SELECT * FROM usuarios u INNER JOIN miembros m ON u.idMiembro = m.idMiembros WHERE m.correoMiembro = ?',
      [correo]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'No se encontró un usuario con ese correo' });
    }

    const usuario = result[0];

    // Configurar el envío del correo con Nodemailer
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: correo,
      subject: 'Recuperación de contraseña',
      text: `Hola ${usuario.nombreMiembros},\n\nTu contraseña es: ${usuario.contrasena}\n\nPor favor, no la compartas con nadie.`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ message: 'Tu contraseña fue enviada a tu correo electrónico.' });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al recuperar contraseña', error });
  }
}


public async verificarCorreo(req: Request, res: Response): Promise<Response> {
    try {
        const { correoMiembro } = req.body;
        const result: any = await pool.query('SELECT * FROM miembros WHERE correoMiembro = ?', [correoMiembro]);

        return res.json({ exists: result.length > 0 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al verificar correo', error });
    }
}

    
    
}

export default new MiembrosController();
