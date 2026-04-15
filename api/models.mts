//NPM imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import db_import from 'better-sqlite3';

// Variables
const dbPath = path.join(process.cwd(), "database/app.db");

const db = db_import(dbPath);

const models_routes = express.Router();

// API Route to test working
models_routes.get('/api/model/models', async (req, res) => {
    res.json({ success: true, message: "hello" });
})

export { models_routes };