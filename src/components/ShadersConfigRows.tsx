import { response } from "express";
import { useContext, useEffect, useState } from "react";

const ShaderConfigRows = () => {
	const [shader_configs, set_shader_configs] = useState<Array<Record<string,string>>>([{}]);
	const [options_map, set_options_map] = useState<Record<string, Array<string>>>({});

	//Get initial values for configuration items
	useEffect( () => {
		const fetchAll = async () => {
			const results = await fetchConfigItems("1");
			set_shader_configs(results);
		}
		fetchAll();
	}, []);

	//Get initial values for configuration values
	useEffect( () => {
		const fetchAll = async () => {
			const results: Record<string, Array<string>> = {};
			for (const shader_config of shader_configs) {
				switch (shader_config.config_type_name) {
					case "SELECTION":
						const options = await fetchOptions(shader_config.shader_config_id.toString());
						const shader_config_id = shader_config.shader_config_id.toString();
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

	async function fetchConfigItems(shader_id: string): Promise<Array<Record<string, string>>> {
		try {
			const result = await fetch("/api/shader-configs")
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
								<input id={config_item.shader_config_display_name} name={config_item.shader_config_name} type="field" />
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
									<select id={ config_item.shader_config_name } name={ config_item.shader_config_name }> 	
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