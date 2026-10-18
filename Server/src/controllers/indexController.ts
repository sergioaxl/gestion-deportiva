import { Request, Response } from "express";


class IndexController{
    public index(req: Request, res: Response){
        res.json({text: 'Puedes acceder a /app/disciplinas'})
    }
}

export const indexController = new IndexController();
