import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { logger } from "../libs/debug_config.mjs"

const Canvas = () => {
    return (
        <div>
            <h1>WebGPU Particles Demo</h1>
            <canvas id="webgpuCanvas" className="border" width="736" height="480"></canvas>
        </div>
    );
};

export default Canvas;
