import { EmitterConfig, EmitterShape, ParticleEffect, ParticleEngine, ScatterFadeEffect, ScatterSwirlEffect, FireworksEffect, BoidsEffect, EmitterConfigPatch } from "webgpu-particles";
import { logger } from "./debug_config.mjs";

let emitter_config: EmitterConfig | null = null;

/**
 * Call to library's init function
 * 
 * @param canvas - The canvas element to render the particle effect on
 * @param shader_set - the name of the shader set to use for the particle effect. This will determine the visual style of the particles and how they behave. The library supports several built-in shader sets, such as "scatter-fade", "scatter-swirl", and "fireworks". Each shader set has its own unique visual style and behavior, so you can choose the one that best fits your needs.
 * @param shader_config - a record of configuration options for the shader set. The specific options will depend on the shader set you choose, but they may include things like the maximum number of particles, the size of the particles, the color of the particles, and other visual and behavioral parameters. You can refer to the library's documentation for more information on the available configuration options for each shader set.
 * @param emitter_type - the type of emitter to use for the particle effect. This will determine the shape and behavior of the particle emitter. The library supports several built-in emitter types, such as "point", "circle", and "rectangle". Each emitter type has its own unique properties and behavior, so you can choose the one that best fits your needs.
 * @returns A promise resolving to the initialized particle engine.
 */ 
async function init_particle_engine(canvas: HTMLCanvasElement, shader_set: string, shader_config: Record<string, string>, emitter_type: string): Promise<ParticleEngine> {
	logger.verbose_webapp("[Particle Engine] - Initialising particle engine.", { shader_set, emitter_type, shader_config });

	const effect = generate_particle_effect(shader_set, shader_config); // Generate the particle effect based on the shader set and configuration options provided.
	
	// Generate the emitter configuration based on the emitter type and the dimensions of the canvas.
	switch (shader_set) {
		case "fireworks":
			emitter_config = generate_emitter_config("RECTANGLE", [canvas.width / 2, canvas.height], canvas.width, 0);
			break;
		default:
			emitter_config = generate_emitter_config(emitter_type, [canvas.width / 2, canvas.height / 2], canvas.width, canvas.height);
			break;
	}

	try {
		const engine: ParticleEngine = await ParticleEngine.init(canvas, effect, emitter_config)
		logger.info_webapp("[Particle Engine] - Particle engine initialised successfully.");
		return engine;
	} catch (e) {
		// In the event of an error pass up to the app for handling
		logger.error_webapp("[Particle Engine] - Particle engine failed to initialise.", { error: e });
		throw e;
	}

}

function resize_canvas(ctx: ParticleEngine, canvas: HTMLCanvasElement) {
	if (emitter_config === null) { return }
	
	let emitter_config_patch: EmitterConfigPatch = new EmitterConfigPatch();
	switch (emitter_config.shape) {
		case EmitterShape.Point:
			emitter_config_patch.pos = [canvas.width / 2, canvas.height / 2],
			emitter_config_patch.p1 = null,
			emitter_config_patch.p2 = null
			break;
		case EmitterShape.Circle:
			emitter_config_patch.pos = [canvas.width / 2, canvas.height / 2],
			emitter_config_patch.p1 = 150,
			emitter_config_patch.p2 = null
			break;
		case EmitterShape.Rectangle:
			emitter_config_patch.pos = [canvas.width / 2, canvas.height / 2],
			emitter_config_patch.p1 = canvas.width,
			emitter_config_patch.p2 = canvas.height
			break;
	}
	

	ctx.resize(canvas);
	ctx.update_emitter(emitter_config_patch);
}

/**
 * Helper function to generate a particle effect based on the shader set and configuration options provided.
 * 
 * @param shader_set - The name of the shader set to use for the particle effect. This will determine the visual style of the particles and how they behave. The library supports several built-in shader sets, such as "scatter-fade", "scatter-swirl", and "fireworks". Each shader set has its own unique visual style and behavior, so you can choose the one that best fits your needs. 
 * @param shader_config - A record of configuration options for the shader set. The specific options will depend on the shader set you choose, but they may include things like the maximum number of particles, the size of the particles, the color of the particles, and other visual and behavioral parameters. You can refer to the library's documentation for more information on the available configuration options for each shader set.
 * @returns - A particle effect object that can be used to initialize the particle engine.
 */
function generate_particle_effect(shader_set: string, shader_config: Record<string, string>): ParticleEffect {
	logger.verbose_webapp("[Particle Engine] - Generating particle effect.", { shader_set, shader_config });
	switch (shader_set.toUpperCase()) {
		case "SCATTER-FADE":
			return new ScatterFadeEffect(Number.parseInt(shader_config["max-particles"]));
		case "SCATTER-SWIRL":
			return new ScatterSwirlEffect(Number.parseInt(shader_config["max-particles"]));
		case "FIREWORKS":
			return new FireworksEffect(Number.parseInt(shader_config["max-particles"]), Number.parseInt(shader_config["rocket-count"]));
		case "BOIDS":
			return new BoidsEffect(
				Number.parseInt(shader_config["max-particles"]),
				Number.parseInt(shader_config["perception-radius"]),
				Number.parseInt(shader_config["seperation-radius"]),
				Number.parseInt(shader_config["seperation-weight"]),
				Number.parseInt(shader_config["alignment-weight"]),
				Number.parseInt(shader_config["cohesion-weight"]),
				Number.parseInt(shader_config["max-speed"]),
				Number.parseInt(shader_config["max-force"])
			);
		default:
			logger.error_webapp("[Particle Engine] - Unknown shader set.", { shader_set });
			throw new Error("Unknown shader set " + shader_set + " given.");
	}
}

/**
 * Helper function to generate an emitter configuration based on the emitter type and the dimensions of the canvas.
 * 
 * @param emitter_type - The type of emitter to use for the particle effect. 
 * @param emitter_pos - The position of the emitter on the canvas, represented as a tuple of [x, y] coordinates.
 * @param emitter_p1 - The first parameter for the emitter configuration. The specific meaning of this parameter will depend on the emitter type.
 * @param emitter_p2 - The second parameter for the emitter configuration. The specific meaning of this parameter will depend on the emitter type.
 * @returns - An emitter configuration object that can be used to initialize the particle engine.
 */
function generate_emitter_config(emitter_type: string, emitter_pos: [number, number], emitter_p1: number, emitter_p2: number): EmitterConfig {
	logger.verbose_webapp("[Particle Engine] - Generating emitter config.", { emitter_type, emitter_pos, emitter_p1, emitter_p2 });
	switch (emitter_type.toUpperCase()) {
		case "POINT":
			return new EmitterConfig(EmitterShape.Point, emitter_pos, null, null);
		case "CIRCLE":
			return new EmitterConfig(EmitterShape.Circle, emitter_pos, 150, null);
		case "RECTANGLE":
			return new EmitterConfig(EmitterShape.Rectangle, emitter_pos, emitter_p1, emitter_p2);
		default:
			logger.error_webapp("[Particle Engine] - Unknown emitter type.", { emitter_type });
			throw new Error("Unknown emitter type " + emitter_type + " given.");	
	}
} 

export { init_particle_engine, resize_canvas }
