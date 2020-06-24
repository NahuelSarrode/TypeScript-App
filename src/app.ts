import express from "express";
import bodyParser from "body-parser";
import { Request, Response } from "express";

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => res.send('Hello'))

const PORT = process.env.PORT || 3000 

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
