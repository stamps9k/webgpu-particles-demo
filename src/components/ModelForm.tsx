import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Collapse } from "bootstrap";

import ShaderSetRow from "./ShaderSetRow.js";
import ShaderConfigRows from "./ShadersConfigRows.js"

const ModelForm = () => {
	const [toggle, setToggle] = useState(false);

	//Activate collapse effect 
	useEffect(() => {
		var myCollapse = document.getElementById('collapseOne') as HTMLElement;
		var bsCollapse = new Collapse(myCollapse, {toggle: false})
		toggle ? bsCollapse.show() : bsCollapse.hide()
	}, []);

	return (
		<div id="accordion">
			<div className="card-header py-3 row justify-content-center" id="collapseHeading">
				<div className="col-3">
						<a className="btn btn-primary" data-bs-toggle="collapse" href="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
								Choose Shaders
						</a>
				</div>
			</div>
			<div id="collapseOne" className="collapse py-3" data-bs-parent="#accordion">
				<div className="border border-light card-body py-1">
					<form id="model" target="_self" method="get" action="/index.html">
						<div id="headingRow" className="ms-auto text-start row">
							<h3 htmlFor="shader" className="text-decoration-underline">Shader Selection</h3>
						</div>
						<ShaderSetRow />
						<ShaderConfigRows />
							<div id="submitRow" className="ms-auto py-1 row">
								<div className="col-1 mx-1">
									<button className="btn btn-success">Submit</button>
								</div>
						</div>
					</form>
				</div>
			</div>
			<div id="collapseTwo" className="collapse py-3" data-bs-parent="#accordion">
				<div className="border border-light card-body py-1">
				</div>
			</div>
		</div>
	)
}

export default ModelForm;