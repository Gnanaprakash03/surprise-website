import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "../styles/landing.css";

const BOKEH_CONFIG = [
  { size: 180, x: "12%",  y: "20%", color: "rgba(201,32,63,0.12)",  dur: 7,  driftY: "-18px", driftX: "8px",   scaleEnd: 1.08, opS: 0.6, opE: 0.9 },
  { size: 90,  x: "80%",  y: "15%", color: "rgba(201,169,110,0.1)", dur: 9,  driftY: "14px",  driftX: "-6px",  scaleEnd: 0.95, opS: 0.4, opE: 0.7 },
  { size: 240, x: "65%",  y: "70%", color: "rgba(201,32,63,0.08)",  dur: 11, driftY: "-10px", driftX: "-12px", scaleEnd: 1.05, opS: 0.5, opE: 0.8 },
  { size: 60,  x: "30%",  y: "80%", color: "rgba(201,169,110,0.12)",dur: 8,  driftY: "20px",  driftX: "10px",  scaleEnd: 1.1,  opS: 0.3, opE: 0.6 },
  { size: 130, x: "88%",  y: "50%", color: "rgba(201,32,63,0.1)",   dur: 10, driftY: "-15px", driftX: "5px",   scaleEnd: 0.93, opS: 0.5, opE: 0.85 },
  { size: 50,  x: "5%",   y: "55%", color: "rgba(232,160,176,0.1)", dur: 6,  driftY: "10px",  driftX: "14px",  scaleEnd: 1.12, opS: 0.4, opE: 0.7 },
  { size: 100, x: "45%",  y: "5%",  color: "rgba(201,32,63,0.07)",  dur: 13, driftY: "22px",  driftX: "-8px",  scaleEnd: 1.04, opS: 0.35,opE: 0.65 },
  { size: 70,  x: "20%",  y: "45%", color: "rgba(201,169,110,0.08)",dur: 8,  driftY: "-12px", driftX: "-10px", scaleEnd: 0.98, opS: 0.5, opE: 0.8 },
];

export default function Landing({ onEnter }) {
  const landingRef  = useRef(null);
  const bokehRef    = useRef(null);
  const eyebrowRef  = useRef(null);
  const titleRef    = useRef(null);
  const dividerRef  = useRef(null);
  const dividerLRef = useRef(null);
  const dividerRRef = useRef(null);
  const subtitleRef = useRef(null);
  const photoRef    = useRef(null);
  const btnRef      = useRef(null);
  const cornersRef  = useRef([]);
  const sidesRef    = useRef([]);

  // Build bokeh particles
  useEffect(() => {
    const container = bokehRef.current;
    if (!container) return;
    BOKEH_CONFIG.forEach((cfg) => {
      const dot = document.createElement("div");
      dot.className = "bokeh-dot";
      dot.style.cssText = `
        width: ${cfg.size}px;
        height: ${cfg.size}px;
        left: ${cfg.x};
        top: ${cfg.y};
        background: radial-gradient(circle, ${cfg.color} 0%, transparent 70%);
        --drift-y: ${cfg.driftY};
        --drift-x: ${cfg.driftX};
        --scale-end: ${cfg.scaleEnd};
        --op-start: ${cfg.opS};
        --op-end: ${cfg.opE};
        animation-duration: ${cfg.dur}s;
        animation-delay: ${(Math.random() * -cfg.dur).toFixed(1)}s;
      `;
      container.appendChild(dot);
    });
    return () => { container.innerHTML = ""; };
  }, []);

  // GSAP entrance sequence
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.to(cornersRef.current, {
      opacity: 1, duration: 1.2, stagger: 0.08,
    }, 0.2);

    tl.to(sidesRef.current, {
      opacity: 1, duration: 1,
    }, 0.5);

    tl.to(eyebrowRef.current, {
      opacity: 1, y: 0, duration: 0.9,
    }, 0.5);

    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50, skewY: 2 },
      { opacity: 1, y: 0, skewY: 0, duration: 1.1, ease: "power4.out" },
    0.75);

    tl.to(dividerRef.current, {
      opacity: 1, duration: 0.4,
    }, 1.3);

    tl.fromTo([dividerLRef.current, dividerRRef.current],
      { scaleX: 0 },
      { scaleX: 1, duration: 0.9, ease: "power2.inOut", stagger: 0.05 },
    1.35);

    tl.fromTo(subtitleRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.8 },
    1.7);

    tl.fromTo(photoRef.current,
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.4)" },
    1.9);

    tl.fromTo(btnRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.8 },
    2.2);

    return () => tl.kill();
  }, []);

  const handleEnter = () => {
    gsap.to(landingRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: "power2.inOut",
      onComplete: onEnter,
    });
  };

  const setCornerRef = (i) => (el) => { cornersRef.current[i] = el; };
  const setSideRef   = (i) => (el) => { sidesRef.current[i] = el; };

  return (
    <div className="landing" ref={landingRef}>

      <div className="landing__bokeh" ref={bokehRef} />

      <div className="landing__rule landing__rule--top" />
      <div className="landing__rule landing__rule--bottom" />

      <div className="landing__corner landing__corner--tl" ref={setCornerRef(0)} />
      <div className="landing__corner landing__corner--tr" ref={setCornerRef(1)} />
      <div className="landing__corner landing__corner--bl" ref={setCornerRef(2)} />
      <div className="landing__corner landing__corner--br" ref={setCornerRef(3)} />

      <span className="landing__side-label landing__side-label--left" ref={setSideRef(0)}>
        2022 — 2024
      </span>
      <span className="landing__side-label landing__side-label--right" ref={setSideRef(1)}>
        a love story
      </span>

      <div className="landing__content">

        <p className="landing__eyebrow" ref={eyebrowRef}>
          a love story
        </p>

        <h1 className="landing__title" ref={titleRef}>
          Our Story
        </h1>

        <div className="landing__divider-wrap" ref={dividerRef}>
          <div className="landing__divider-line" ref={dividerLRef} />
          <div className="landing__divider-diamond" />
          <div className="landing__divider-line landing__divider-line--right" ref={dividerRRef} />
        </div>

        <p className="landing__subtitle" ref={subtitleRef}>
          every moment, preserved forever
        </p>

        <div className="landing__photo-wrap" ref={photoRef}>
          <div className="landing__photo-ring landing__photo-ring--outer" />
          <div className="landing__photo-ring" />
          {/* Replace with your photo later:
              <img className="landing__photo" src="/images/cover.jpg" alt="Us" /> */}
          <div className="landing__photo-placeholder">
            <span>📷</span>
            <p>your photo</p>
          </div>
        </div>

        <div className="landing__btn-wrap" ref={btnRef}>
          <button className="landing__enter-btn" onClick={handleEnter}>
            Enter
          </button>
        </div>

      </div>
    </div>
  );
}