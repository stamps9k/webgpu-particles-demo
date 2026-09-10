/**
 * Hand-written explanation for the shader-set selector's tooltip
 * (ShaderSetRow.tsx). Every other field's hover text now comes straight
 * from the database (see the `tooltip` column on `shader_configs`, read via
 * ShadersConfigRows.tsx) — "shader-set" isn't a shader_configs row, so it's
 * the one field left without a database-backed equivalent.
 */
const PARAM_HELP: Record<string, string> = {
  "shader-set": "Which particle behaviour algorithm drives this simulation.",
};

const DEFAULT_PARAM_HELP = "Configuration option for the current shader.";

/**
 * Look up the hover explanation for a config field by its machine name,
 * falling back to a generic message for anything not covered above.
 */
function get_param_help(config_name: string): string {
  return PARAM_HELP[config_name] ?? DEFAULT_PARAM_HELP;
}

export { get_param_help };
