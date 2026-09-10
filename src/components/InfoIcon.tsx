import { useEffect, useRef } from "react";
import { Tooltip } from "bootstrap";

interface InfoIconProps {
  text: string;
  label: string;
}

/**
 * A small "i" affordance that shows a Bootstrap tooltip with `text` on
 * hover/focus. Used next to simulation parameter labels so their purpose is
 * clear without needing extra data from the API.
 */
const InfoIcon = ({ text, label }: InfoIconProps) => {
  // #region --- State and refs ------------------------------------------------
  const icon_ref = useRef<HTMLSpanElement>(null);
  const tooltip_ref = useRef<Tooltip | null>(null);
  // #endregion ----------------------------------------------------------------

  // #region --- Tooltip lifecycle ----------------------------------------------
  useEffect(() => {
    const el = icon_ref.current;
    if (!el) return;

    tooltip_ref.current = new Tooltip(el, {
      title: text,
      placement: "top",
      trigger: "hover focus",
      // Bootstrap's default [0, 6] offset reads as a gap floating above the
      // tiny info icon, disconnected from what it's explaining. Tighten it
      // so the tooltip arrow sits right against the icon.
      offset: [0, 3],
    });

    return () => {
      tooltip_ref.current?.dispose();
      tooltip_ref.current = null;
    };
  }, [text]);
  // #endregion ----------------------------------------------------------------

  // #region --- Render page ---------------------------------------------------
  return (
    <span
      ref={icon_ref}
      className="info-icon"
      tabIndex={0}
      role="img"
      aria-label={`${label}: ${text}`}>
      i
    </span>
  );
  // #endregion ----------------------------------------------------------------
};

export default InfoIcon;
