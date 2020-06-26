import express from "express"
import bodyParser from "body-parser"
import { Request, Response, Application } from "express"
import morgan from 'morgan'

// Config constants
import { config } from "./config/config"; 

// Routes 
import indexRoutes from "./routes/index.routes";
import postRoutes from "./routes/post.routes";


export class App {

    private app: Application

    constructor(private port?: number | string) {
        this.app = express()
        this.settings()
        this.middlewares()
        this.routes()
    }

    settings() {
        this.app.set('port', config.port || process.env.process || 3000)
    }

    middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.urlencoded({ 
            limit: '50mb',
            extended: false  
        }))
        this.app.use(bodyParser.json({limit: '50mb'}))
    }

    routes() {
        this.app.use(indexRoutes)
        this.app.use('/posts', postRoutes)
    }
    // borré el async y await de la funcion para ver si esto genera el error al resetear el server. 
    listen() {
        this.app.listen(this.app.get('port'))
        console.log('Server Running on port', config.port)
    }
}
