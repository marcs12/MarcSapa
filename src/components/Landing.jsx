import { useRef, useState } from "react";
import { motion } from "framer-motion";

export default function Landing() {
  const [hovered, setHovered] = useState(null);
  const titleRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!titleRef.current) return;

    const x = (e.clientX - window.innerWidth / 2) / 90;
    const y = (e.clientY - window.innerHeight / 2) / 120;

    titleRef.current.style.transform = `translate(${x}px, ${y}px)`;
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
        <h1 ref={titleRef} className="title" data-text="MARC">
          MARC
        </h1>

        <div className="selector">
          <button
            onMouseEnter={() => setHovered("code")}
            onMouseLeave={() => setHovered(null)}
          >
            code
          </button>

          <span>/</span>

          <button
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
