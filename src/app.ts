import express from "express";
import bodyParser from "body-parser";
import morgan from 'morgan';

// Config constants
import { config } from "./config/config"; 

// Routes 
import indexRoutes from "./routes/index.routes";
import postRoutes from "./routes/post.routes";
import authRoutes from "./routes/auth.routes";

const app = express(); 

// settings
app.set('port', config.port || process.env.PORT || 3000);

// middlewares 
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ 
    limit: '50mb',
    extended: false
}));

app.use(bodyParser.json({
    limit: '50mb'
}));

// routes 
app.use(indexRoutes);
app.use('/posts', postRoutes);
app.use('/api/auth', authRoutes);

app.listen(app.get('port'));
console.log(`Server running on port ${app.get('port')}`) 

export default app; 