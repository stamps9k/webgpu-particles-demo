import { useEffect, useState, useRef } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { logger } from "../libs/debug_config.mjs"
import { init, ParticleEngine, ParticleType } from "webgpu-particles";

const Canvas = () => {
	const buttonRef = useRef<HTMLButtonElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const initialised = useRef(false);
	const [ctx, setCtx] = useState<ParticleEngine>();

    // Create the webgpu context on intial load of page
    useEffect(() => {
				// Set up the fullscreen button callback code
				const button = buttonRef.current;
				const canvas = canvasRef.current;

				if (initialised.current || !button || !canvas) return;
				initialised.current = true;

				// Add event listener to handle button click
				button.addEventListener('click', () => {
					if (!document.fullscreenElement) {
						canvas.requestFullscreen();
					} else {
						document.exitFullscreen();
					}

					// Monitor the canvas width and height and update when it goes fullscreen
					const resizeObserver = new ResizeObserver(() => {
						canvas.width  = canvas.clientWidth;
						canvas.height = canvas.clientHeight;
					});
					resizeObserver.observe(canvas);
				});

        try {
            const canvas_element = document.getElementById("webgpuCanvas");
            if (!(canvas_element instanceof HTMLCanvasElement)) {
                throw new Error("Element not found or is not a canvas");
            }

            const run = async () => {
							const newCtx = setCtx(await init(canvas_element, 500));
            };
            run();
        } catch (error) {
            if (error instanceof Error) {
                logger["error_webgpu"](error.message);
                toast.error
                (
                    <span>
                        Error on start:
                        <br />
                        {error.message}
                    </span>
                );
                return;
            }
            throw error; // Not standard error type. Don't know when this would happen but throw for now.
        }
    }, []);

    // Set the background to red to test the context was created correctly
    useEffect(() => {
        if (!ctx) return;
        //ctx.context_check();
				requestAnimationFrame(() => ctx.animate_particles());
    }, [ctx]);

    return (
        <div>
            <h1>WebGPU Particles Demo</h1>
						<canvas id="webgpuCanvas" className="border" ref={canvasRef}></canvas>
						<button id="fullscreen-btn" ref={buttonRef}>Fullscreen</button>
        </div>
    );
};

export default Canvas;
