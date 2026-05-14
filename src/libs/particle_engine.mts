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
			return new ScatterFadeEffect(Number.parseInt(shader_config["max-particles"]));
	}
}

function generate_emitter_config(emitter_type: string, pos: [number, number], emitterP1: number, emitterP2: number): EmitterConfig {
	switch (emitter_type.toUpperCase()) {
		case "POINT":
			return { emitterType: "point", emitterPos: pos, emitterP1: null, emitterP2: null }
		case "CIRCLE":
			return { emitterType: "circle", emitterPos: pos, emitterP1: 50, emitterP2: null }
		case "RECTANGLE":
			return { emitterType: "rect", emitterPos: pos, emitterP1: emitterP1, emitterP2: emitterP2}
		default:
			return { emitterType: "point", emitterPos: pos, emitterP1: null, emitterP2: null }
	}
} 

export { init_particle_engine }
