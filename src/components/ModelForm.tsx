import { useEffect, useRef, useState } from "react";
import { Collapse } from "bootstrap";
import { logger } from "../libs/debug_config.mjs";

import ShaderSetRow from "./ShaderSetRow.js";
import ShaderConfigRows from "./ShadersConfigRows.js";

const ModelForm = () => {
  // #region --- State and refs ------------------------------------------------
  const collapse_ref = useRef<Collapse | null>(null);
  const [toggle, set_toggle] = useState(false);
  // #endregion ----------------------------------------------------------------

  // #region --- Page load processing ------------------------------------------
  useEffect(() => {
    logger.info_webapp("[ModelForm] - Mounted.");

    const my_collapse = document.getElementById("collapseOne") as HTMLElement;
    if (!my_collapse) {
      logger.error_webapp("[ModelForm] - collapseOne element not found.");
      return;
    }
    collapse_ref.current = new Collapse(my_collapse, { toggle: false });

    return () => {
      collapse_ref.current?.dispose();
      logger.info_webapp("[ModelForm] - Unmounted.");
    };
  }, []);
  // #endregion ----------------------------------------------------------------

  // #region --- Collapse toggle processing ------------------------------------
  useEffect(() => {
    logger.verbose_webapp("[ModelForm] - Applying collapse state", { toggle });

    if (!collapse_ref.current) {
      logger.error_webapp("[ModelForm] - Collapse instance not initialised.");
      return;
    }

    toggle ? collapse_ref.current.show() : collapse_ref.current.hide();
  }, [toggle]);
  // #endregion ----------------------------------------------------------------

  // #region --- Event handlers ------------------------------------------------
  const handle_collapse_click = () => {
    logger.info_webapp("[ModelForm] - Collapse toggled", {
      new_state: !toggle,
    });
    set_toggle((t) => !t);
  };
  // #endregion ----------------------------------------------------------------

  // #region --- Render page ---------------------------------------------------
  return (
    <div id="accordion">
      <div
        className="card-header py-3 row justify-content-center"
        id="collapseHeading">
        <div className="col-3">
          <a
            className="btn btn-primary"
            onClick={handle_collapse_click}
            aria-expanded={toggle}
            aria-controls="collapseOne">
            Choose Shaders
          </a>
        </div>
      </div>
      <div
        id="collapseOne"
        className="collapse py-3"
        data-bs-parent="#accordion">
        <div className="border border-light card-body py-1">
          <form id="model" target="_self" method="get" action="/index.html">
            <div id="headingRow" className="ms-auto text-start row">
              <h3 className="text-decoration-underline">Shader Selection</h3>
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
      <div
        id="collapseTwo"
        className="collapse py-3"
        data-bs-parent="#accordion">
        <div className="border border-light card-body py-1"></div>
      </div>
    </div>
  );
  // #endregion ----------------------------------------------------------------
};

export default ModelForm;
