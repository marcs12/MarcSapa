import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Landing() {
  const [hovered, setHovered] = useState(null);

  const titleStackRef = useRef(null);
  const whiteRef = useRef(null);
  const redRef = useRef(null);
  const greenRef = useRef(null);
  const blueRef = useRef(null);
  const moveTimeout = useRef(null);

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 65;
    const y = (e.clientY - window.innerHeight / 2) / 85;

    const transform = `translate(${x}px, ${y}px)`;

    whiteRef.current.style.transform = transform;
    redRef.current.style.transform = transform;
    greenRef.current.style.transform = transform;
    blueRef.current.style.transform = transform;

    titleStackRef.current?.classList.add("is-moving");

    clearTimeout(moveTimeout.current);

    moveTimeout.current = setTimeout(() => {
      titleStackRef.current?.classList.remove("is-moving");
    }, 70);
  };

  return (
    <main
      className={`landing ${hovered ? `is-${hovered}` : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div className={`background-words ${hovered ? "is-visible" : ""}`}>
        {hovered === "code" && (
          <>
            <span>REACT</span>
            <span>JAVASCRIPT</span>
            <span>THREEJS</span>
            <span>GSAP</span>
            <span>UX/UI</span>
          </>
        )}

        {hovered === "create" && (
          <>
            <span>PHOTO</span>
            <span>FILM</span>
            <span>MOTION</span>
            <span>EDIT</span>
            <span>STORY</span>
          </>
        )}
      </div>

      <motion.div
        className="content"
        animate={{ scale: hovered ? 1.015 : 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div ref={titleStackRef} className="title-stack">
          <h1 ref={blueRef} className="title title-blue">
            MARC
          </h1>

          <h1 ref={greenRef} className="title title-green">
            MARC
          </h1>

          <h1 ref={redRef} className="title title-red">
            MARC
          </h1>

          <h1 ref={whiteRef} className="title title-white">
            MARC
          </h1>
        </div>

        <div className="selector">
          <button
            type="button"
            onMouseEnter={() => setHovered("code")}
            onMouseLeave={() => setHovered(null)}
          >
            code
          </button>

          <span>/</span>

          <button
            type="button"
            onMouseEnter={() => setHovered("create")}
            onMouseLeave={() => setHovered(null)}
          >
            create
          </button>
        </div>
      </motion.div>

      <p className="location">Based in British Columbia.</p>

      <div className="socials">
        <a href="#">instagram</a>
        <a href="#">linkedin</a>
        <a href="#">github</a>
      </div>
    </main>
  );
}
