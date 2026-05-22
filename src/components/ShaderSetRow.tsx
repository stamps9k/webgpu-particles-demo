import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import { logger } from "../libs/debug_config.mjs";

const ShaderSetRow = () => {
  // #region --- State and refs ------------------------------------------------
  const [search_params, set_search_params] = useSearchParams();
  const [shader_sets, set_shader_sets] = useState([
    {
      shader_set_id: 1,
      shader_set_name: "scatter-fade",
      shader_set_display_name: "Scatter Fade",
    },
  ]);
  // #endregion ----------------------------------------------------------------

  // #region --- Page load processing ------------------------------------------
  useEffect(() => {
    logger.info_webapp("[ShaderSetRow] - Mounted.");

    logger.verbose_webapp("[ShaderSetRow] - Fetching shader sets.");
    fetch("/api/shader-sets")
      .then((response) => response.json())
      .then((data) => {
        logger.verbose_webapp("[ShaderSetRow] - Shader sets fetched.", {
          count: data.message.length,
        });
        set_shader_sets(data.message);
      })
      .catch((error) =>
        logger.error_webapp("[ShaderSetRow] - Failed to fetch shader sets.", {
          error,
        }),
      );

    return () => logger.info_webapp("[ShaderSetRow] - Unmounted.");
  }, []);
  // #endregion ----------------------------------------------------------------

  // #region --- Event handlers ------------------------------------------------
  const handle_shader_change = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const shader_name = e.target.value;
    logger.info_webapp("[ShaderSetRow] - Shader set selected.", {
      shader_name,
    });
    set_search_params({ "shader-set": shader_name });
  };
  // #endregion ----------------------------------------------------------------

  // #region --- Render page ---------------------------------------------------
  return (
    <div id="shaderRow" className="ms-auto text-start py-1 row">
      <div id="shaderLabel" className="col-3">
        <label htmlFor="shader">Shader: </label>
      </div>
      <div id="shaderElement" className="col-1">
        <select
          id="shader-set"
          name="shader-set"
          onChange={handle_shader_change}
          value={search_params.get("shader-set") ?? ""}>
          {shader_sets.map((shader_set) => (
            <option
              key={shader_set.shader_set_id}
              value={shader_set.shader_set_name}>
              {shader_set.shader_set_display_name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
  // #endregion ----------------------------------------------------------------
};

export default ShaderSetRow;
