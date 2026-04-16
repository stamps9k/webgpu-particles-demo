import debug from "debug";

/*---------------------------------------------------------------------------*/
const logger_api =
{
    //Predefined model lookups, query results
    super_super_verbose_api_model: debug("api:model:SUPER_SUPER_VERBOSE"),
    super_verbose_api_model: debug("api:model:SUPER_VERBOSE"),
    verbose_api_model: debug("api:model:VERBOSE"),
    info_api_model: debug("api:model:INFO"),
    warn_api_model: debug("api:model:WARN"),
    error_api_model: debug("api:model:ERROR"),

    //Texture record lookups, cache hit/miss
    super_super_verbose_api_texture: debug("api:texture:SUPER_SUPER_VERBOSE"),
    super_verbose_api_texture: debug("api:texture:SUPER_VERBOSE"),
    verbose_api_texture: debug("api:texture:VERBOSE"),
    info_api_texture: debug("api:texture:INFO"),
    warn_api_texture: debug("api:texture:WARN"),
    error_api_texture: debug("api:texture:ERROR"),    

    //Raw DB connection, query timing, errors
    super_super_verbose_api_db: debug("api:db:SUPER_SUPER_VERBOSE"),
    super_verbose_api_db: debug("api:db:SUPER_VERBOSE"),
    verbose_api_db: debug("api:db:VERBOSE"),
    info_api_db: debug("api:db:INFO"),
    warn_api_db: debug("api:db:WARN"),
    error_api_db: debug("api:db:ERROR"),
}

logger_api["super_super_verbose_api_model"]("Super Super Verbose debugging enabled for API model queries.");
logger_api["super_verbose_api_model"]("Super Verbose debugging enabled for API model queries.");
logger_api["verbose_api_model"]("Verbose debugging enabled for API model queries.");
logger_api["info_api_model"]("Info debugging enabled for API model queries.");
logger_api["warn_api_model"]("Warn debugging enabled  for API model queries.");
logger_api["error_api_model"]("Error debugging enabled for API model queries.");

logger_api["super_super_verbose_api_texture"]("Super Super Verbose debugging enabled for API texture queries.");
logger_api["super_verbose_api_texture"]("Super Verbose debugging enabled for API texture queries.");
logger_api["verbose_api_texture"]("Verbose debugging enabled for API texture queries.");
logger_api["info_api_texture"]("Info debugging enabled for API texture queries.");
logger_api["warn_api_texture"]("Warn debugging enabled  for API texture queries.");
logger_api["error_api_texture"]("Error debugging enabled for API texture queries.");

logger_api["super_super_verbose_api_db"]("Super Super Verbose debugging enabled for API db connections.");
logger_api["super_verbose_api_db"]("Super Verbose debugging enabled for API db connections.");
logger_api["verbose_api_db"]("Verbose debugging enabled for API db connections.");
logger_api["info_api_db"]("Info debugging enabled for API db connections.");
logger_api["warn_api_db"]("Warn debugging enabled  for API db connections.");
logger_api["error_api_db"]("Error debugging enabled for API db connections.");
/*---------------------------------------------------------------------------*/


/*---------------------------------------------------------------------------*/
const logger = 
{
    // Resources fetch logging. outbound requests, response codes, timing, retries, etc.
    super_super_verbose_js_fetch: debug("js:fetch:SUPER_SUPER_VERBOSE"),
    super_verbose_js_fetch: debug("js:fetch:SUPER_VERBOSE"),
    verbose_js_fetch: debug("js:fetch:VERBOSE"),
    info_js_fetch: debug("js:fetch:INFO"),
    warn_js_fetch: debug("js:fetch:WARN"),
    error_js_fetch: debug("js:fetch:ERROR"),

    // Rust wasm logging. Anything created in rust.
    super_super_verbose_js_wasm: debug("js:wasm:SUPER_SUPER_VERBOSE"),
    super_verbose_js_wasm: debug("js:wasm:SUPER_VERBOSE"),
    verbose_js_wasm: debug("js:wasm:VERBOSE"),
    info_js_wasm: debug("js:wasm:INFO"),
    warn_js_wasm: debug("js:wasm:WARN"),
    error_js_wasm: debug("js:wasm:ERROR"),

    // OPFS logging. OPFS file reads/writes, cache hits, errors
    super_super_verbose_js_opfs: debug("js:opfs:SUPER_SUPER_VERBOSE"),
    super_verbose_js_opfs: debug("js:opfs:SUPER_VERBOSE"),
    verbose_js_opfs: debug("js:opfs:VERBOSE"),
    info_js_opfs: debug("js:opfs:INFO"),
    warn_js_opfs: debug("js:opfs:WARN"),
    error_js_opfs: debug("js:opfs:ERROR")
}

logger["super_super_verbose_js_fetch"]("Super Super Verbose debugging enabled for JavaScript fetch.");
logger["super_verbose_js_fetch"]("Super Verbose debugging enabled for JavaScript fetch.");
logger["verbose_js_fetch"]("Verbose debugging enabled for JavaScript fetch.");
logger["info_js_fetch"]("Info debugging enabled for JavaScript fetch.");
logger["warn_js_fetch"]("Warn debugging enabled  for JavaScript fetch.");
logger["error_js_fetch"]("Error debugging enabled for JavaScript fetch.");

logger["super_super_verbose_js_wasm"]("Super Super Verbose debugging enabled for JavaScript wasm.");
logger["super_verbose_js_wasm"]("Super Verbose debugging enabled for JavaScript wasm.");
logger["verbose_js_wasm"]("Verbose debugging enabled for JavaScript wasm.");
logger["info_js_wasm"]("Info debugging enabled for JavaScript wasm.");
logger["warn_js_wasm"]("Warn debugging enabled  for JavaScript wasm.");
logger["error_js_wasm"]("Error debugging enabled for JavaScript wasm.");

logger["super_super_verbose_js_opfs"]("Super Super Verbose debugging enabled for JavaScript OPFS.");
logger["super_verbose_js_opfs"]("Super Verbose debugging enabled for JavaScript OPFS.");
logger["verbose_js_opfs"]("Verbose debugging enabled for JavaScript OPFS.");
logger["info_js_opfs"]("Info debugging enabled for JavaScript OPFS.");
logger["warn_js_opfs"]("Warn debugging enabled  for JavaScript OPFS.");
logger["error_js_opfs"]("Error debugging enabled for JavaScript OPFS.");
/*---------------------------------------------------------------------------*/

// Export from this module for access in rest of project 
export { logger };