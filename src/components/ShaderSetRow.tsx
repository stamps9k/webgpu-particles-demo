import { response } from "express";
import { useContext, useEffect, useState } from "react";

const ShaderSetRow = () => {
	const [shader_sets, set_shader_sets] = useState([{ 
		shader_set_id: 1, shader_set_name: "scatter-fade", shader_set_display_name: "Scatter Fade"
	}]); 

	//Get initial values for form
	useEffect( () => {
		fetch("/api/shader-sets")
			.then(response => response.json())
			.then(data => {
				set_shader_sets(data.message);
			}).catch(error => console.error("Error fetching data:", error)
		);
	}, []);

	return (
		<div id="shaderRow" className="ms-auto text-start py-1 row">
			<div id="shaderLabel" className="col-3"> 
				<label htmlFor="shader">Shader: </label>
			</div>
			<div id="shaderElement" className="col-1">
				<select id="shader-set" name="shader-set"> 
					{ shader_sets.map(
						(shader_set) => (
							<option key={shader_set.shader_set_id} value={shader_set.shader_set_name}>
								{shader_set.shader_set_display_name}
							</option>
						)
					)}
				</select>
			</div>
		</div>
	)
}

export default ShaderSetRow;