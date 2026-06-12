"use client";
import { useEffect, useRef, useState } from "react";
import { ExternalLink, GitFork, RotateCcw, Briefcase, Zap } from "lucide-react";
import content from "@/content.json";

const { shipped, inProgress } = content.projects;

type Project = {
  title: string;
  tag: string;
  description: string;
  stack: string[];
  highlight?: boolean;
  github?: string;
  liveUrl?: string;
  role?: string;
  outcome?: string;
};

// Unique gradient per card so they're visually distinct on the back face
const gradients = [
  "from-teal/20 via-navy-mid to-navy-mid",
  "from-blue-500/15 via-navy-mid to-navy-mid",
  "from-violet-500/15 via-navy-mid to-navy-mid",
  "from-amber-500/15 via-navy-mid to-navy-mid",
  "from-rose-500/15 via-navy-mid to-navy-mid",
  "from-teal/10 via-navy-mid to-navy-mid",
  "from-cyan-500/15 via-navy-mid to-navy-mid",
  "from-emerald-500/15 via-navy-mid to-navy-mid",
];

function FlipCard({ p, index, dimmed = false }: { p: Project; index: number; dimmed?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  const gradient = gradients[index % gradients.length];

  return (
    <div
      className="group relative min-h-72"
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Flip container */}
      <div
        className="relative w-full transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* ── FRONT FACE ── */}
        <div
          className={`relative rounded-2xl p-6 border flex flex-col ${
            p.highlight
              ? "bg-navy-mid border-teal/30"
              : dimmed
              ? "bg-navy-light/50 border-white/5"
              : "bg-navy-light border-white/5"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          {p.highlight && (
            <span className="absolute top-4 right-4 text-xs bg-teal/10 text-teal border border-teal/20 px-2.5 py-1 rounded-full font-medium">
              Featured
            </span>
          )}
          {dimmed && (
            <span className="absolute top-4 right-4 text-xs bg-white/5 text-cream-muted border border-white/10 px-2.5 py-1 rounded-full">
              {p.tag.includes("Concept") ? "Concept" : "In progress"}
            </span>
          )}

          <p className="text-teal/70 text-xs font-medium tracking-wide uppercase mb-2">{p.tag}</p>
          <h3 className={`font-bold text-lg mb-3 ${dimmed ? "text-cream/70" : "text-cream"}`}>
            {p.title}
          </h3>
          <p className={`text-sm leading-relaxed flex-1 line-clamp-3 ${dimmed ? "text-cream-muted/60" : "text-cream-muted"}`}>
            {p.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-4">
            {p.stack.slice(0, 3).map((s) => (
              <span key={s}
                className={`text-xs px-2.5 py-1 rounded-full border border-white/5 ${
                  dimmed ? "text-cream-muted/50 bg-navy/50" : "text-cream-muted bg-navy"
                }`}>
                {s}
              </span>
            ))}
            {p.stack.length > 3 && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-white/5 text-cream-muted/40 bg-navy">
                +{p.stack.length - 3}
              </span>
            )}
          </div>

          {/* Hover hint */}
          <div className="absolute bottom-3 right-4 flex items-center gap-1 opacity-30">
            <RotateCcw size={10} />
            <span className="text-xs">hover to flip</span>
          </div>
        </div>

        {/* ── BACK FACE ── */}
        <div
          className={`absolute inset-0 rounded-2xl p-6 border border-teal/20 flex flex-col bg-gradient-to-br ${gradient} overflow-y-auto`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-10"
            style={{
              background: "radial-gradient(circle at top right, #00D4AA, transparent 70%)"
            }}
          />

          <p className="text-teal/70 text-xs font-medium tracking-wide uppercase mb-3">{p.tag}</p>
          <h3 className="text-cream font-bold text-lg mb-4">{p.title}</h3>

          {/* Role */}
          {p.role && (
            <div className="flex items-start gap-2 mb-3">
              <Briefcase size={13} className="text-teal flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-teal/60 text-xs uppercase tracking-wide mb-0.5">My role</p>
                <p className="text-cream-muted text-sm">{p.role}</p>
              </div>
            </div>
          )}

          {/* Outcome */}
          {p.outcome && (
            <div className="flex items-start gap-2 mb-4 flex-1">
              <Zap size={13} className="text-teal flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-teal/60 text-xs uppercase tracking-wide mb-0.5">Outcome</p>
                <p className="text-cream-muted text-sm leading-relaxed">{p.outcome}</p>
              </div>
            </div>
          )}

          {/* Full stack + links */}
          <div className="mt-auto">
            <div className="flex flex-wrap gap-1.5 mb-4">
              {p.stack.map((s) => (
                <span key={s}
                  className="text-xs text-teal/80 bg-teal/10 border border-teal/20 px-2 py-0.5 rounded-full">
                  {s}
                </span>
              ))}
            </div>

            <div className="flex gap-3">
              {p.github && (
                <a href={p.github} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cream-muted hover:text-teal text-xs transition-colors">
                  <GitFork size={13} />
                  GitHub
                </a>
              )}
              {p.liveUrl && (
                <a href={p.liveUrl} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-cream-muted hover:text-teal text-xs transition-colors">
                  <ExternalLink size={13} />
                  Live site
                </a>
              )}
              {!p.github && !p.liveUrl && (
                <span className="text-cream-muted/30 text-xs italic">Internal project</span>
              )}
            </div>
          </div>
        </div>

      </div>

      {/* Mobile tap handler — visible only on touch screens */}
      <button
        className="absolute bottom-3 left-4 md:hidden flex items-center gap-1 text-cream-muted/40 text-xs"
        onClick={() => setFlipped((f) => !f)}
        aria-label="Flip card"
      >
        <RotateCcw size={11} />
        tap to flip
      </button>
    </div>
  );
}

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="projects" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-4">Work</p>
          <h2 className="text-4xl font-bold text-cream mb-2">Selected projects</h2>
          <p className="text-cream-muted mb-2 max-w-xl leading-relaxed">
            Five products shipped end-to-end at Sidmach Technologies, plus personal builds in progress.
          </p>
          <p className="text-cream-muted/40 text-xs mb-12 flex items-center gap-1.5">
            <RotateCcw size={11} />
            Hover any card to see my role and outcome
          </p>

          {/* Shipped */}
          <h3 className="text-cream/40 text-xs font-semibold tracking-widest uppercase mb-5">
            Shipped
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
            {shipped.map((p, i) => (
              <FlipCard key={p.title} p={p} index={i} />
            ))}
          </div>

          <div className="border-t border-white/5 mb-10" />

          {/* In Progress */}
          <h3 className="text-cream/40 text-xs font-semibold tracking-widest uppercase mb-2">
            In progress &amp; concepts
          </h3>
          <p className="text-cream-muted/40 text-xs mb-6">
            Projects I&apos;m actively building or planning — not yet shipped end-to-end.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {inProgress.map((p, i) => (
              <FlipCard key={p.title} p={p} index={shipped.length + i} dimmed />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}