//NPM imports
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import db_import from 'better-sqlite3';

import { logger_api } from '../src/libs/debug_config.mjs';

// Variables
const dbPath = path.join(process.cwd(), "database/app.db");

const db = db_import(dbPath);

const models_routes = express.Router();

var shader_sets_query_string = (
	`SELECT
	shader_sets.shader_set_id AS shader_set_id,
	shader_sets.name AS shader_set_name,
	shader_sets.display_name AS shader_set_display_name,
	shader_sets.description AS shader_set_description
	FROM shader_sets`
);

var shader_configs_query_string = (
	`SELECT
	shader_configs.shader_config_id AS shader_config_id, 
	shader_configs.name AS shader_config_name, 
	shader_configs.display_name AS shader_config_display_name,
	config_types.name AS config_type_name
	FROM shader_configs
	INNER JOIN config_types ON shader_configs.config_type_id = config_types.config_type_id 
	WHERE shader_configs.shader_id = ?`
);

var shader_config_selection_items_query_string = (
	`SELECT
	config_values.config_value_id AS config_value_id,
	shader_configs.shader_config_id AS shader_config_id, 
	config_values.config_value AS config_value
	FROM shader_configs
	INNER JOIN config_values ON shader_configs.shader_config_id = config_values.shader_config_id 
	WHERE shader_configs.shader_config_id = ?`
)

var shader_set_shaders_query_string = (
	`SELECT
	shader_sets.shader_set_id AS shader_set_id,
	shader_sets.name AS shader_set_name,
	shaders.shader_id AS shader_id,
	shaders.name AS shader_name,
	shader_types.name AS shader_type,
	shaders.description AS shader_description,
	shaders.display_name AS shader_display_name
	FROM shader_sets
	INNER JOIN shader_sets_shaders ON shader_sets.shader_set_id = shader_sets_shaders.shader_set_id
	INNER JOIN shaders ON shader_sets_shaders.shader_id = shaders.shader_id
	INNER JOIN shader_types ON shaders.shader_type_id = shader_types.shader_type_id;`
);

const shader_sets_query_promise = () => {
	return new Promise(
		(resolve, reject) => {
			logger_api["super_verbose_api_db"]("Running query " + shader_set_shaders_query_string + "...");
			const results = db.prepare(shader_sets_query_string).all();
			logger_api["super_verbose_api_db"]("... query completed.");
			resolve(results);
		}
	)
}

const shader_configs_query_promise = (shader_id: string) => {
	return new Promise(
		(resolve, reject) => {
			logger_api["super_verbose_api_db"]("Running query " + shader_configs_query_string + "...");
			const results = db.prepare(shader_configs_query_string).all(shader_id);
			logger_api["super_verbose_api_db"]("... query completed.");
			resolve(results);
		}
	)
}

const shader_config_selection_items_query_promise = (shader_id: string) => {
	return new Promise(
		(resolve, reject) => {
			logger_api["super_verbose_api_db"]("Running query " + shader_config_selection_items_query_string + "...");
			const results = db.prepare(shader_config_selection_items_query_string).all(shader_id);
			logger_api["super_verbose_api_db"]("... query completed.");
			resolve(results);
		}
	)
}

const shader_set_shaders_query_promise = (shader_set_name: string) => {
	return new Promise(
		(resolve, reject) => {
			logger_api["super_verbose_api_db"]("Running query " + shader_set_shaders_query_string + "...");
			const results = db.prepare(shader_set_shaders_query_string).all(shader_set_name);
			logger_api["super_verbose_api_db"]("... query completed.");
			resolve(results);
		}
	)
}

// API Route to get all shaders for a given shader set
models_routes.get('/api/model/shader-set-shaders', async (req, res) => {
	logger_api["info_api_db"]("Processing request: " + req.url);
	if (req.query.shader_set_name == null || req.query.shader_set_name == undefined) {
		var shader_set_name = "vert-colors";
	} else {
		var shader_set_name = req.query.shader_set_name as string;
	} try {
  	logger_api["info_api_db"]("Querying database...");
		var message = await shader_set_shaders_query_promise(shader_set_name);
		logger_api["info_api_db"]("...database query complete.");
		logger_api["super_verbose_api_db"]("Returning " + JSON.stringify(message));
		res.json({ success: true, message });
	} catch (err) {
		var e = err as Error;
		logger_api["error_api_db"]("Error processing query: " + err);  
		res.status(500).json({ success: false, error: e.message });  
	}
});

// API Route to get all shader sets
models_routes.get('/api/shader-sets', async (req, res) => {
	logger_api["info_api_db"]("Processing request: " + req.url);
	try {
  	logger_api["info_api_db"]("Querying database...");
		var message = await shader_sets_query_promise();
		logger_api["info_api_db"]("...database query complete.");
		logger_api["super_verbose_api_db"]("Returning " + JSON.stringify(message));
		res.json({ success: true, message });
	} catch (err) {
		var e = err as Error;
		logger_api["error_api_db"]("Error processing query: " + err);  
		res.status(500).json({ success: false, error: e.message });  
	}
});

// API Route to get all config optinos for a shader set
models_routes.get('/api/shader-configs', async (req, res) => {
	if (req.query.shader_id == null || req.query.shader_id == undefined) {
		var shader_id = "1";
	} else {
		var shader_id = req.query.shader_id as string;
	logger_api["info_api_db"]("Processing request: " + req.url);
	} try {
  	logger_api["info_api_db"]("Querying database...");
		var message = await shader_configs_query_promise(shader_id);
		logger_api["info_api_db"]("...database query complete.");
		logger_api["super_verbose_api_db"]("Returning " + JSON.stringify(message));
		res.json({ success: true, message });
	} catch (err) {
		var e = err as Error;
		logger_api["error_api_db"]("Error processing query: " + err);  
		res.status(500).json({ success: false, error: e.message });  
	}
});

// API Route to get all config optinos for a shader set
models_routes.get('/api/shader-config-selection-items', async (req, res) => {
	if (req.query.shader_config_id == null || req.query.shader_config_id == undefined) {
		var shader_config_id = "1";
	} else {
		var shader_config_id = req.query.shader_config_id as string;
	logger_api["info_api_db"]("Processing request: " + req.url);
	} try {
  	logger_api["info_api_db"]("Querying database...");
		var message = await shader_config_selection_items_query_promise(shader_config_id);
		logger_api["info_api_db"]("...database query complete.");
		logger_api["super_verbose_api_db"]("Returning " + JSON.stringify(message));
		res.json({ success: true, message });
	} catch (err) {
		var e = err as Error;
		logger_api["error_api_db"]("Error processing query: " + err);  
		res.status(500).json({ success: false, error: e.message });  
	}
});

// API Route to test working
models_routes.get('/api/hello', async (req, res) => {
    res.json({ success: true, message: "hello" });
})

export { models_routes };