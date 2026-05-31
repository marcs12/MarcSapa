import { useEffect, useRef } from "react";
import * as THREE from "three";
import CELLS from "vanta/dist/vanta.cells.min";

export default function VantaBackground() {
  const vantaRef = useRef(null);

  useEffect(() => {
    let effect = CELLS({
      el: vantaRef.current,
      THREE,

      mouseControls: true,
      touchControls: true,
      gyroControls: false,

      minHeight: 200,
      minWidth: 200,

      scale: 1,
      scaleMobile: 1,

      color1: 0x000000,
      color2: 0x111111,

      size: 0.3,
      speed: 1.2,
    });

    return () => {
      if (effect) effect.destroy();
    };
  }, []);

  return <div ref={vantaRef} className="vanta-bg" />;
}
