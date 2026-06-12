"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import content from "@/content.json";

const { headline, paragraphs, stats, beyond } = content.about;

export default function About() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Top row — text left, photo right */}
          <div className="grid md:grid-cols-2 gap-16 mb-12">

            {/* Left — copy */}
            <div>
              <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-4">Who I am</p>
              <h2 className="text-4xl font-bold text-cream mb-6 leading-tight">
                {headline}
              </h2>
              <div className="space-y-4 text-cream-muted leading-relaxed">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              {/* Beyond card — sits naturally under the copy */}
              <div className="mt-8 bg-navy-light border border-white/5 rounded-2xl p-6">
                <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-3">
                  Beyond the job title
                </p>
                <p className="text-cream-muted text-sm leading-relaxed">{beyond}</p>
              </div>
            </div>

            {/* Right — photo + floating badges */}
            <div className="flex flex-col gap-6">

              {/* Photo frame */}
              <div className="relative w-full max-w-sm mx-auto md:mx-0">
                {/* Teal glow behind photo */}
                <div
                  className="absolute -inset-2 rounded-3xl opacity-20 blur-xl pointer-events-none"
                  style={{ background: "radial-gradient(circle, #00D4AA 0%, transparent 70%)" }}
                />

                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden border-2 border-teal/25 shadow-2xl shadow-teal/10 aspect-[4/5]">
                  <Image
                    src="/images/profile.png"
                    alt="Victoria Ariyo — Frontend Lead & Scrum Master"
                    fill
                    className="object-cover object-top"
                  />
                  {/* Subtle dark overlay to blend with site theme */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

                  {/* Name badge — overlaid bottom of photo */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-navy/80 backdrop-blur-sm border border-teal/20 rounded-xl px-4 py-3">
                      <p className="text-cream font-semibold text-sm">Victoria Ariyo</p>
                      <p className="text-teal text-xs">Frontend Lead · Scrum Master</p>
                    </div>
                  </div>
                </div>

                {/* Floating badge — top right corner */}
                <div className="absolute -top-3 -right-3 bg-teal text-navy text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                  Lagos, Nigeria 🇳🇬
                </div>
              </div>

              {/* Stats grid — below photo */}
              <div className="grid grid-cols-2 gap-3">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-navy-light border border-white/5 rounded-2xl p-5 hover:border-teal/20 transition-colors duration-300"
                  >
                    <div className="text-3xl font-bold text-teal mb-1">{s.value}</div>
                    <div className="text-cream-muted text-xs leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}