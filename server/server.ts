require('dotenv').config();

import express, { Request, Response } from 'express';
import { getSpeciesById } from './services/species-service';
import { getStrikeHistoryById } from './services/history-service';

const app = express();
const PORT = process.env.PORT || 5002;

const bodyParser = require('body-parser'); 

app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

app.get('/', (req: Request, res: Response) => {
    res.send('Hi');
});

// Species endpoint (for demonstration purposes)
// Can be deleted later
app.get('/species/:id', async (req: Request, res: Response) => {
    const { id } = req.params; // This param is named and defined in the line above
    if (!id) {
        // Missing required param
        res.status(400);
    } else {
        try {
            const species = await getSpeciesById(Number(id));
            if (species) {
                res.send(species);
            } else {
                // No species exists with that id
                res.status(204);
            }
        } catch (er) {
            // Server error
            res.status(500);
        }
    }
});

app.get('/strikeHistory/:id', async (req: Request, res: Response) => {
    const { id } = req.params; // This param is named and defined in the line above
    if (!id) {
        // Missing required param
        res.status(400).send();
    } else {
        try {
            const strikeHistory = await getStrikeHistoryById(Number(id));
            if (strikeHistory) {
                res.send(strikeHistory);
            } else {
                // No strike history exists with that id
                res.status(204).send();
            }
        } catch (er) {
            // Server error
            res.status(500).send();
        }
    }
});

// Risk endpoint
// Needs to be implemented (obviously)
app.get('/risk', (req: Request, res: Response) => {
    res.send('risk');
});

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`);
});