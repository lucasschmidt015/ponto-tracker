import express, { Request } from "express";
import * as dotenv from 'dotenv';
const cors = require('cors');
import path from 'path';

import erroHandler from "./middlewares/erroHandler";

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const PORT = parseInt(process.env.API_PORT || '3000', 10);
const HOST = process.env.API_HOST || 'localhost';

const app = express();

app.use(cors({ 
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

//Here we can define our routes

app.use(erroHandler);

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});