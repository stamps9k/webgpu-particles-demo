import { useEffect, useState } from "react";
import { logger } from "../libs/debug_config.mjs";

import ShaderSetRow from "./ShaderSetRow.js";
import ShaderConfigRows from "./ShadersConfigRows.js";

const ModelForm = () => {
  // #region --- State and refs ------------------------------------------------
  const [expanded, set_expanded] = useState(false);
  // #endregion ----------------------------------------------------------------

  // #region --- Page load processing ------------------------------------------
  useEffect(() => {
    logger.info_webapp("[ModelForm] - Mounted.");
    return () => logger.info_webapp("[ModelForm] - Unmounted.");
  }, []);
  // #endregion ----------------------------------------------------------------

  // #region --- Event handlers ------------------------------------------------
  const handle_tab_click = () => {
    logger.info_webapp("[ModelForm] - Panel toggled.", {
      new_state: !expanded,
    });
    set_expanded((e) => !e);
  };
  // #endregion ----------------------------------------------------------------

  // #region --- Render page ---------------------------------------------------
  return (
    <div className="sim-panel">
      <button
        type="button"
        className="sim-panel-tab"
        onClick={handle_tab_click}
        aria-expanded={expanded}
        aria-controls="simPanelBody"
        aria-label={
          expanded
            ? "Collapse simulation parameters"
            : "Expand simulation parameters"
        }>
        <i className={`bi ${expanded ? "bi-chevron-right" : "bi-sliders"}`} />
      </button>
      <div
        id="simPanelBody"
        className={`sim-panel-body card${expanded ? " sim-panel-open" : ""}`}>
        <div className="card-header">Simulation parameters</div>
        <div className="card-body">
          <form id="model" target="_self" method="get" action="/index.html">
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
    </div>
  );
  // #endregion ----------------------------------------------------------------
};

export default ModelForm;
