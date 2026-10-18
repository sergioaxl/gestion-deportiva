import express, { Application } from 'express';
import indexRoutes from './routes/indexRoutes';
import disciplinasRoutes from './routes/disciplinasRoutes';
import miembrosRoutes from './routes/miembrosRoutes';
import eventoDeportivoRoutes from './routes/eventoDeportivoRoutes';
import inscripcionesRoutes from './routes/inscripcionesRoutes';
import miembrosEventoDeportivoRoutes from './routes/miembrosEventoDeportivoRoutes';
import entrenadoresRoutes from './routes/entrenadoresRouter'; 
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoutes from './routes/loginRoutes'; // <── AGREGAR ESTA LÍNEA
import usuarioRoutes from './routes/usuarioRoutes';



class Server {
    public app: Application;

    constructor() {
        this.app = express();
        this.config();
        this.rutas();
        dotenv.config();
    }
    

    config(): void {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan('dev'));
        this.app.use(cors());

        // ✅ Aumentar límite de tamaño del cuerpo (por ejemplo, hasta 10 MB)
        this.app.use(express.json({ limit: '10mb' }));
        this.app.use(express.urlencoded({ limit: '10mb', extended: true }));
    }

    rutas(): void {
        this.app.use('/', indexRoutes);
        this.app.use('/app/disciplinas', disciplinasRoutes);
        this.app.use('/app/miembros', miembrosRoutes);
        this.app.use('/app/eventoDeportivo', eventoDeportivoRoutes);
        this.app.use('/app/inscripciones', inscripcionesRoutes);
        this.app.use('/app/miembrosEventosDeportivo', miembrosEventoDeportivoRoutes);
        this.app.use('/app/entrenadores', entrenadoresRoutes);
        this.app.use('/app/entrenadores', entrenadoresRoutes);
        this.app.use('/api', miembrosRoutes);
        this.app.use('/app/usuarios', usuarioRoutes);
        this.app.use('/api', loginRoutes); // <── NUEVA RUTA PARA EL LOGIN

    }

    start(): void {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor en puerto', this.app.get('port'));
        });
    }
}

const server = new Server();
server.start();
