import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

const ShaderConfigRows = () => {
	//State variables
	const [all_shader_configs, set_all_shader_configs] = useState<Record<string, Array<Record<string,string>>>>({});
	const [shader_configs, set_shader_configs] = useState<Array<Record<string, string>>>([{}]);
	const [options_map, set_options_map] = useState<Record<string, Array<string>>>({});

	//Configuration values in query string
	const [search_params, set_search_params] = useSearchParams();

	//Get list of configuration items
	useEffect( () => {
		var shader_set_name = "scatter-fade"
		if (search_params.get("shader-set") !== null && search_params.get("shader-set") !== undefined) {
			shader_set_name = search_params.get("shader-set") as string;	
		}

		const fetchAll = async () => {
			const results = await fetchConfigItems();
			const cached_configurations = parse_configs(results);
			set_all_shader_configs(cached_configurations);
			if (cached_configurations[shader_set_name] !== undefined) {
				set_shader_configs(cached_configurations[shader_set_name]);
			} else {
				set_shader_configs([]);
			}
		}
		fetchAll();
	}, [search_params]);

	//Get initial values for configuration values
	useEffect( () => {
		var shader_set_name = "scatter-fade"
		if (search_params.get("shader-set") !== null && search_params.get("shader-set") !== undefined) {
			shader_set_name = "";	
		}
		
		const fetchAll = async () => {
			const results: Record<string, Array<string>> = {};
			for (var shader_config of shader_configs) {
			//for (const [key, value] of Object.entries(shader_configs[shader_set_name])) { 
				switch (shader_config["config_type_name"]) {
					case "SELECTION":
						const options = await fetchOptions(shader_config["shader_config_id"]);
						const shader_config_id = shader_config["shader_config_id"].toString();
						var allOptions: Array<string> = [] ;
						for (const option of options) {
							allOptions.push(option["config_value"]);
						}
						results[shader_config_id] = (allOptions);
					default:
						break;
				}
			}
			set_options_map(results);
		}
		fetchAll();
	}, [shader_configs]);

	async function fetchConfigItems(): Promise<Array<Record<string, string>>> {
		try {
			const shader_set = search_params.get("shader-set");
			const result = await fetch("/api/shader-configs");
			const data = await result.json();
			return data.message;
		} catch (e) {
			console.error("Error fetching data:", e);
			return [{}];
		}
	}

	async function fetchOptions(shader_config_id: string): Promise<Array<Record<string, string>>> {
		try {
			const response = await fetch("/api/shader-config-selection-items?shader_config_id=" + shader_config_id)
			const data = await response.json();
			return(data.message);
			} catch(e) {
				console.error("Error fetching data:", e);
				return [{}];
			};
	};

	function parse_configs(configs: Array<Record<string, string>>): Record<string, Array<Record<string, string>>> {
		var results: Record<string, Array<Record<string, string>>> = {};

		for (const shader_config of configs) {
			const shader_name = shader_config["shader_set_name"]
			delete shader_config[shader_name];
			if (results[shader_name] === undefined) {
				results[shader_name] = [shader_config];	
			} else {
				results[shader_name].push(shader_config);
			}
		}

		return results;
	}

	return (
		shader_configs.map((config_item, index) => {
			switch (config_item.config_type_name) {
				case "FREE_TEXT":
					return (
						<div key={index.toString()} id={index.toString()} className="ms-auto text-start py-1 row">
							<div id="configLabel" className="col-3">
								<label htmlFor="config">{config_item.shader_config_name}:</label>
							</div>
							<div id="configElement" className="col-1">
								<input id={config_item.shader_config_display_name} name={config_item.shader_config_name} type="field" defaultValue={search_params.get(config_item.shader_config_name) ?? undefined}/>
							</div>
						</div>
					);
				case "SELECTION":
					return (
						<div key={index.toString()} id={index.toString()} className="ms-auto text-start py-1 row">
							<div id="configLabel" className="col-3">
								<label htmlFor="config">{ config_item.shader_config_display_name }:</label>
							</div>
							<div id="configElement" className="col-1">
								<select 
									key={ options_map[config_item.shader_config_id]?.join(',') }
									id={ config_item.shader_config_name } 
									name={ config_item.shader_config_name } 
									defaultValue={ search_params.get(config_item.shader_config_name) ?? undefined }
								> 	
								{ options_map[config_item.shader_config_id]?.map((config_option, index) => {
									return (
										<option key={index} value={config_option}>{config_option}</option>
									);
								})}
								</select>
							</div>
						</div>
					);
				default:
					return (<div key="sadf">Test</div>);
			}
		})
	)
}

export default ShaderConfigRows;