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

// Species endpoint (for demonstration purposes)
// Can be deleted later
app.get('/species', (req: Request, res: Response) => {
    res.send('species');
});

// Risk endpoint
// Needs to be implemented (obviously)
app.get('/risk', (req: Request, res: Response) => {
    res.send('risk');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
  });