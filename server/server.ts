require("dotenv").config();

import express, {Request, Response} from 'express';

const app = express();
const PORT = process.env.PORT || 5002;

const bodyParser = require("body-parser"); 

app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hi');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });