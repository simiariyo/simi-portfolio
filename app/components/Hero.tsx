"use client";
import { useState, useEffect } from "react";
import { ArrowDown, Link2, Mail } from "lucide-react";
import content from "@/content.json";

const { roles, tagline, subTagline, availabilityText, linkedin, email, name } = content.hero;

function AbstractSVG() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="200" cy="200" r="160" fill="none" stroke="#00D4AA" strokeWidth="0.5" strokeDasharray="8 6" />
      <circle cx="200" cy="200" r="120" fill="none" stroke="#00D4AA" strokeWidth="0.5" strokeDasharray="4 8" />
      <circle cx="200" cy="200" r="80" fill="none" stroke="#00D4AA" strokeWidth="0.5" />
      <circle cx="200" cy="40" r="3" fill="#00D4AA" opacity="0.6" />
      <circle cx="360" cy="200" r="3" fill="#00D4AA" opacity="0.6" />
      <circle cx="200" cy="360" r="3" fill="#00D4AA" opacity="0.4" />
      <circle cx="40" cy="200" r="3" fill="#00D4AA" opacity="0.4" />
      <line x1="60" y1="60" x2="120" y2="120" stroke="#00D4AA" strokeWidth="0.5" opacity="0.4" />
      <line x1="340" y1="60" x2="280" y2="120" stroke="#00D4AA" strokeWidth="0.5" opacity="0.4" />
      <rect x="190" y="30" width="20" height="20" rx="2" fill="none" stroke="#00D4AA" strokeWidth="0.5" opacity="0.5" transform="rotate(45 200 40)" />
      <rect x="348" y="190" width="16" height="16" rx="2" fill="none" stroke="#00D4AA" strokeWidth="0.5" opacity="0.5" transform="rotate(45 356 198)" />
      <radialGradient id="heroGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#00D4AA" stopOpacity="0.15" />
        <stop offset="100%" stopColor="#00D4AA" stopOpacity="0" />
      </radialGradient>
      <circle cx="200" cy="200" r="170" fill="url(#heroGlow)" />
    </svg>
  );
}

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => { setVisible(true); }, []);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, roleIndex]);

  return (
    <section className="min-h-screen flex flex-col justify-center relative px-6 pt-20 overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "linear-gradient(#00D4AA 1px, transparent 1px), linear-gradient(90deg, #00D4AA 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Ambient glow — left */}
      <div
        className="absolute top-1/2 -left-32 -translate-y-1/2 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #00D4AA 0%, transparent 70%)" }}
      />

      <div
        className={`max-w-6xl mx-auto w-full relative transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* ── Left col: text ── */}
          <div>
            <div className="flex mb-6">
              <span className="inline-flex items-center gap-2 text-teal text-xs font-semibold tracking-widest uppercase border border-teal/20 bg-teal/5 px-4 py-2 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse" />
                {availabilityText}
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-cream leading-tight mb-3">
              {name}
            </h1>

            <div className="flex items-center gap-2 mb-5 h-11">
              <span className="text-2xl md:text-3xl font-semibold text-teal">{displayed}</span>
              <span className="w-0.5 h-7 md:h-8 bg-teal animate-blink" />
            </div>

            <p className="text-cream font-medium text-lg mb-3 leading-snug">{tagline}</p>
            <p className="text-cream-muted text-base leading-relaxed mb-8">{subTagline}</p>

            <div className="flex flex-wrap gap-4 mb-10">
              <a href="#projects"
                className="bg-teal text-navy font-semibold px-7 py-3 rounded-full hover:bg-teal-dim transition-colors duration-200">
                See my work
              </a>
              <a href="#about"
                className="border border-cream/20 text-cream px-7 py-3 rounded-full hover:border-cream/50 transition-colors duration-200">
                About me
              </a>
            </div>

            <div className="flex items-center gap-6">
              {/* <a href={github} target="_blank" rel="noopener noreferrer"
                className="text-cream-muted hover:text-teal transition-colors" aria-label="GitHub">
                <GitFork size={20} />
              </a> */}
              <a href={linkedin} target="_blank" rel="noopener noreferrer"
                className="text-cream-muted hover:text-teal transition-colors" aria-label="LinkedIn">
                <Link2 size={20} />
              </a>
              <a href={`mailto:${email}`}
                className="text-cream-muted hover:text-teal transition-colors" aria-label="Email">
                <Mail size={20} />
              </a>
              <div className="h-px flex-1 max-w-xs bg-navy-light" />
            </div>
          </div>

          {/* ── Right col: pure SVG illustration ── */}
          <div className="hidden md:flex justify-center items-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              <AbstractSVG />

              {/* Centre monogram */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-2xl bg-navy-light border border-teal/20 flex items-center justify-center shadow-xl shadow-teal/5">
                  <span
                    className="text-3xl font-bold text-teal"
                    style={{ fontFamily: "'Fira Code', monospace" }}
                  >
                    VS
                  </span>
                </div>
              </div>

              {/* Stat chips — orbit the monogram */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-navy-light border border-teal/20 rounded-full px-4 py-1.5 shadow-lg">
                <p className="text-teal text-xs font-semibold">Frontend Lead</p>
              </div>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-navy-light border border-teal/20 rounded-full px-4 py-1.5 shadow-lg">
                <p className="text-teal text-xs font-semibold">Scrum Master</p>
              </div>
              <div className="absolute left-2 top-1/2 -translate-y-1/2 bg-navy-light border border-teal/20 rounded-full px-3 py-1.5 shadow-lg">
                <p className="text-teal text-xs font-semibold">4+ yrs</p>
              </div>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 bg-navy-light border border-teal/20 rounded-full px-3 py-1.5 shadow-lg">
                <p className="text-teal text-xs font-semibold">5 products</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <a href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-cream-muted hover:text-teal transition-colors animate-bounce"
        aria-label="Scroll down">
        <ArrowDown size={20} />
      </a>
    </section>
  );
}