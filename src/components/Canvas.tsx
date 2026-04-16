import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { logger } from "../libs/debug_config.mjs"
import { init, ParticleContext } from "webgpu-particles";

const Canvas = () => {
    const [ctx, setCtx] = useState<ParticleContext>();

    // Create the webgpu context on intial load of page
    useEffect(() => {
        try {
            const canvas_element = document.getElementById("webgpuCanvas");
            if (!(canvas_element instanceof HTMLCanvasElement)) {
                throw new Error("Element not found or is not a canvas");
            }

            const run = async () => {
                const newCtx = setCtx(await init(canvas_element));
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
        
        // ctx is defined here, and this runs whenever ctx updates
        const encoder = ctx.beginFrame();
        const pass = encoder.beginRenderPass(
            ctx.createRenderPassDescriptor({ r: 1, g: 0, b: 0, a: 1 })
        );
        pass.end();
        ctx.endFrame(encoder);
    }, [ctx]);

    return (
        <div>
            <h1>WebGPU Particles Demo</h1>
            <canvas id="webgpuCanvas" className="border" width="736" height="480"></canvas>
        </div>
    );
};

export default Canvas;
