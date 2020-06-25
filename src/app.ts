import express from "express"
import bodyParser from "body-parser"
import { Request, Response, Application } from "express"
import morgan from 'morgan' 

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
        this.app.set('port', process.env.process || 4000)
    }

    middlewares() {
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.urlencoded({ extended: false }))
        this.app.use(bodyParser.json())
    }

    routes() {
        this.app.use(indexRoutes)
        this.app.use('/posts', postRoutes)
    }

    async listen() {
        await this.app.listen(this.app.get('port'))
        console.log('Server Running on port', this.app.get('port'))
    }
}
