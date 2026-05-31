import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { animate } from "animejs";

export default function Landing() {
  const titleRef = useRef(null);
  const [hovered, setHovered] = useState(null);

  useEffect(() => {
    animate(titleRef.current, {
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1200,
      easing: "easeOutExpo",
    });
  }, []);

  const handleMouseMove = (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 80;
    const y = (e.clientY - window.innerHeight / 2) / 80;

    if (titleRef.current) {
      titleRef.current.style.transform = `translate(${x}px, ${y}px)`;
    }
  };

  return (
    <main
      className={`landing ${hovered ? `is-${hovered}` : ""}`}
      onMouseMove={handleMouseMove}
    >
      <div className="grain" />
      <div className="vignette" />

      {hovered === "code" && (
        <div className="background-words">
          <span>REACT</span>
          <span>JAVASCRIPT</span>
          <span>GSAP</span>
          <span>FRAMER</span>
          <span>UX/UI</span>
        </div>
      )}

      {hovered === "create" && (
        <div className="background-words">
          <span>PHOTO</span>
          <span>FILM</span>
          <span>EDIT</span>
          <span>MOTION</span>
          <span>STORY</span>
        </div>
      )}

      <motion.div
        className="content"
        animate={{
          scale: hovered ? 1.02 : 1,
        }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
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

      <div className="location">Based in British Columbia.</div>

      <div className="socials">
        <a href="#">
          <p>Instagram</p>
        </a>

        <a href="#">
          <p>LinkedIn</p>
        </a>

        <a href="#">
          <p>GitHub</p>
        </a>
      </div>
    </main>
  );
}
