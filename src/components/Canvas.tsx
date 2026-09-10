import { useEffect, useState, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { logger } from "../libs/debug_config.mjs";
import {
  init_particle_engine,
  resize_canvas,
} from "../libs/particle_engine.mjs";
import { ParticleEngine, EmitterConfigPatch } from "webgpu-particles";

import ModelForm from "./ModelForm";

const Canvas = () => {
  // #region --- State and refs ------------------------------------------------
  const button_ref = useRef<HTMLButtonElement>(null);
  const canvas_ref = useRef<HTMLCanvasElement>(null);
  const initialised_listeners = useRef(false);
  const initialised_engine = useRef(false);
  const [error, set_error] = useState<Error | null>(null);
  const [ctx, set_ctx] = useState<ParticleEngine>();
  const [paused, set_paused] = useState<Boolean>(false);
  const [search_params] = useSearchParams();
  // #endregion --------------------------------------------------------------

  // #region --- Handle URL search params --------------------------------------
  var SHADER_CONFIG: Record<string, string> = {};
  if (search_params.size == 0) SHADER_CONFIG = { "max-particles": "500" };
  else SHADER_CONFIG = Object.fromEntries(search_params);

  const SHADER_SET = search_params.get("shader-set") ?? "scatter-fade";
  const EMITTER_SHAPE = search_params.get("emitter-shape") ?? "point";
  // #endregion --------------------------------------------------------------

  // #region --- Page load processing ------------------------------------------
  useEffect(() => {
    logger.info_webapp("[Canvas] - Mounted.");

    // #region --- Define an async function for getting the Particle Engine ----
    const run = async () => {
      logger.verbose_webapp("[Canvas] - Initialising particle engine", {
        SHADER_SET,
        EMITTER_SHAPE,
        SHADER_CONFIG,
      });
      try {
        const canvas_element = document.getElementById("webgpuCanvas");
        if (!(canvas_element instanceof HTMLCanvasElement)) {
          throw new Error("Element not found or is not a canvas");
        }

        //Fetch defined variables
        const new_ctx = await init_particle_engine(
          canvas_element,
          SHADER_SET,
          SHADER_CONFIG,
          EMITTER_SHAPE,
        );

        logger.info_webapp("[Canvas] - Particle engine ready");
        set_ctx(new_ctx);
      } catch (error) {
        logger.error_webapp("[Canvas] - Particle engine failed to initialise", {
          error,
        });
        if (error instanceof Error) set_error(error);
      }
    };
    // #endregion --------------------------------------------------------------

    //Guard against double initialisation in development mode with React.StrictMode
    if (initialised_engine.current) return;
    initialised_engine.current = true;

    run();

    return () => logger.info_webapp("[Canvas] - Unmounted");
  }, []);
  // #endregion ----------------------------------------------------------------

  // #region --- Pause processing ----------------------------------------------
  useEffect(() => {
    //Only do anything if the context is set up
    if (!ctx) return;

    if (paused) ctx.pause();
    else ctx.resume();
  }, [paused]);
  // #endregion ----------------------------------------------------------------

  // #region --- Error processing ----------------------------------------------
  useEffect(() => {
    if (!error) return;

    logger.warn_webapp("[Canvas] - Surfacing error to user via toast", {
      message: error.message,
    });
    toast.error(
      <span>
        Error on start:
        <br />
        {error.message}
      </span>,
    );
  }, [error]);
  // #endregion ----------------------------------------------------------------

  // #region --- Particles Engine update processing ----------------------------
  useEffect(() => {
    if (!ctx) return;

    const button = button_ref.current;
    const canvas = canvas_ref.current;

    if (initialised_listeners.current || !button || !canvas) return;
    initialised_listeners.current = true;

    // Monitor the canvas width and height and update when it goes fullscreen
    const resize_observer = new ResizeObserver(() => {
      logger.super_verbose_webapp("[Canvas] - Resize observed", {
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      resize_canvas(ctx, canvas);
    });
    resize_observer.observe(canvas);

    // Define the function for fullscreen click handling
    const handle_fs_click = () => {
      if (ctx !== undefined) {
        if (!document.fullscreenElement) {
          logger.info_webapp("[Canvas] - Entering fullscreen");
          canvas.requestFullscreen();
        } else {
          logger.info_webapp("[Canvas] - Exiting fullscreen");
          document.exitFullscreen();
        }
      } else {
        logger.error_webapp(
          "[Canvas] - No context defined, cannot toggle fullscreen",
        );
      }
    };

    // Add event listener to handle button click
    button.addEventListener("click", handle_fs_click);

    //Start the animation
    logger.verbose_webapp("[Canvas] - Starting animation loop");
    requestAnimationFrame(() => ctx.animate_particles());

    //Clean up event listener and observers on unmount
    return () => {
      resize_observer.disconnect();
      button.removeEventListener("click", handle_fs_click);
    };
  }, [ctx]);
  // #endregion ----------------------------------------------------------------

  // #region --- Render page ---------------------------------------------------
  return (
    <div>
      <h1 className="text-center mb-4">Particle Playground</h1>
      <div className="stage-wrap position-relative">
        <div className="card mb-3">
          <div className="card-body">
            <canvas
              id="webgpuCanvas"
              className="particle-canvas border"
              ref={canvas_ref}></canvas>
            <div className="hud d-flex flex-wrap justify-content-between text-secondary border-top pt-2 mt-2 small">
              <span>
                particles <b>{SHADER_CONFIG["max-particles"] ?? "—"}</b>
              </span>
              <span>
                shader <span className="hud-accent">{SHADER_SET}</span>
              </span>
              <span>
                emitter <b>{EMITTER_SHAPE}</b>
              </span>
            </div>
          </div>
          <div className="btn-group w-100">
            <button
              id="fullscreen-btn"
              className="btn btn-secondary w-50"
              ref={button_ref}>
              <i className="bi bi-arrows-fullscreen" /> Fullscreen
            </button>
            <button
              className={`btn btn-secondary w-50 ${paused ? "active" : ""}`}
              onClick={() => set_paused((p) => !p)}>
              <i
                className={`bi ${paused ? "bi-play-fill" : "bi-pause-fill"}`}
              />{" "}
              {`${paused ? "Play" : "Pause"}`}
            </button>
          </div>
        </div>
        <ModelForm />
      </div>
      <ToastContainer />
    </div>
  );
  // #endregion ----------------------------------------------------------------
};

export default Canvas;
