import { EmitterConfig, ParticleEffect, ParticleEngine, ScatterFadeEffect, ScatterSwirlEffect, FireworksEffect } from "webgpu-particles";

async function init_particle_engine(canvas: HTMLCanvasElement, shader_set: string, shader_config: Record<string, string>, emitter_type: string): Promise<ParticleEngine> {
	const effect = generate_particle_effect(shader_set, shader_config);
	var emitter_config = undefined;
	switch (shader_set) {
		case "fireworks":
			emitter_config = generate_emitter_config("RECTANGLE", [canvas.width / 2, canvas.height], canvas.width, 0);
			break;
		default:
			emitter_config = generate_emitter_config(emitter_type, [canvas.width / 2, canvas.height / 2], canvas.width, canvas.height);
			break;
	}

	var engine: ParticleEngine = await ParticleEngine.init(canvas, effect, emitter_config)

	return engine;
}

function generate_particle_effect(shader_set: string, shader_config: Record<string, string>): ParticleEffect {
	switch (shader_set.toUpperCase()) {
		case "SCATTER-FADE":
			return new ScatterFadeEffect(Number.parseInt(shader_config["max-particles"]));
		case "SCATTER-SWIRL":
			return new ScatterSwirlEffect(Number.parseInt(shader_config["max-particles"]));
		case "FIREWORKS":
			return new FireworksEffect(Number.parseInt(shader_config["max-particles"]), Number.parseInt(shader_config["rocket-count"]));
		default:
			throw new Error("Unknown shader set " + shader_set + "given.");
	}
}

function generate_emitter_config(emitter_type: string, emitter_pos: [number, number], emitter_p1: number, emitter_p2: number): EmitterConfig {
	switch (emitter_type.toUpperCase()) {
		case "POINT":
			return new EmitterConfig("point", emitter_pos, null, null);
		case "CIRCLE":
			return new EmitterConfig("circle", emitter_pos, 50, null);
		case "RECTANGLE":
			return new EmitterConfig("rect", emitter_pos, emitter_p1, emitter_p2);
		default:
			throw new Error("Unkown emitter type " + emitter_type + "given.");	
	}
} 

export { init_particle_engine }
