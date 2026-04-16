import debug from "debug";

/*---------------------------------------------------------------------------*/
const logger_api =
{
    //Raw DB connection, query timing, errors
    super_super_verbose_api_db: debug("api:db:SUPER_SUPER_VERBOSE"),
    super_verbose_api_db: debug("api:db:SUPER_VERBOSE"),
    verbose_api_db: debug("api:db:VERBOSE"),
    info_api_db: debug("api:db:INFO"),
    warn_api_db: debug("api:db:WARN"),
    error_api_db: debug("api:db:ERROR"),
}

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
    // Logging for calls made to new webgpu-particles library.
    super_super_verbose_webgpu: debug("js:wasm:SUPER_SUPER_VERBOSE"),
    super_verbose_webgpu: debug("js:wasm:SUPER_VERBOSE"),
    verbose_webgpu: debug("js:wasm:VERBOSE"),
    info_webgpu: debug("js:wasm:INFO"),
    warn_webgpu: debug("js:wasm:WARN"),
    error_webgpu: debug("js:wasm:ERROR"),

    // Logging for anything managed entirely by this webapp
    super_super_verbose_webapp: debug("js:opfs:SUPER_SUPER_VERBOSE"),
    super_verbose_webapp: debug("js:opfs:SUPER_VERBOSE"),
    verbose_webapp: debug("js:opfs:VERBOSE"),
    info_webapp: debug("js:opfs:INFO"),
    warn_webapp: debug("js:opfs:WARN"),
    error_webapp: debug("js:opfs:ERROR")
}

logger["super_super_verbose_webgpu"]("Super Super Verbose debugging enabled for JavaScript wasm.");
logger["super_verbose_webgpu"]("Super Verbose debugging enabled for JavaScript wasm.");
logger["verbose_webgpu"]("Verbose debugging enabled for JavaScript wasm.");
logger["info_webgpu"]("Info debugging enabled for JavaScript wasm.");
logger["warn_webgpu"]("Warn debugging enabled  for JavaScript wasm.");
logger["error_webgpu"]("Error debugging enabled for JavaScript wasm.");

logger["super_super_verbose_webapp"]("Super Super Verbose debugging enabled for JavaScript OPFS.");
logger["super_verbose_webapp"]("Super Verbose debugging enabled for JavaScript OPFS.");
logger["verbose_webapp"]("Verbose debugging enabled for JavaScript OPFS.");
logger["info_webapp"]("Info debugging enabled for JavaScript OPFS.");
logger["warn_webapp"]("Warn debugging enabled  for JavaScript OPFS.");
logger["error_webapp"]("Error debugging enabled for JavaScript OPFS.");
/*---------------------------------------------------------------------------*/

// Export from this module for access in rest of project 
export { logger };