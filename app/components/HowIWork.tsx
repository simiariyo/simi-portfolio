"use client";
import { useEffect, useRef, useState } from "react";
import content from "@/content.json";

export default function HowIWork() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.05 },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="how-i-work" className="py-28 px-6 bg-navy-mid">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-4">
            My approach
          </p>
          <h2 className="text-4xl font-bold text-cream mb-4">How I work</h2>
          <p className="text-cream-muted max-w-xl mb-14 leading-relaxed">
            The principles that show up in every project, every sprint, every
            team I&apos;ve been part of.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {content.howIWork.map((p) => (
              <div
                key={p.number}
                className="bg-navy border border-white/5 rounded-2xl p-7 hover:border-teal/20 transition-all duration-300 group"
              >
                <div className="text-5xl font-bold text-white/5 group-hover:text-teal/10 transition-colors duration-300 mb-4 leading-none select-none">
                  {p.number}
                </div>
                <h3 className="text-cream font-semibold text-lg mb-3">
                  {p.title}
                </h3>
                <p className="text-cream-muted text-sm leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
