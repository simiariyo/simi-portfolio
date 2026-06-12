"use client";
import { useEffect, useRef, useState } from "react";
import { Mail, Link2, GitFork, MapPin } from "lucide-react";
import content from "@/content.json";

const { heading, subheading, email, linkedin, github } = content.contact;

export default function Contact() {
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
    <section id="contact" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-2xl mb-20">
            <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-4">Get in touch</p>
            <h2 className="text-4xl font-bold text-cream mb-4 leading-tight">{heading}</h2>
            <p className="text-cream-muted text-lg leading-relaxed mb-10">{subheading}</p>

            <a
              href={`mailto:${email}`}
              className="inline-flex items-center gap-3 bg-teal text-navy font-semibold px-8 py-4 rounded-full hover:bg-teal-dim transition-colors duration-200 text-lg"
            >
              <Mail size={20} />
              Say hello
            </a>
          </div>

          <div className="flex flex-col gap-4 mb-20">
            <div className="flex items-center gap-3 text-cream-muted">
              <MapPin size={16} className="text-teal flex-shrink-0" />
              <span className="text-sm">Lagos, Nigeria · Available for on-site roles</span>
            </div>
            <div className="flex items-center gap-3 text-cream-muted">
              <Link2 size={16} className="text-teal flex-shrink-0" />
              <a href={linkedin} target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-cream transition-colors">
                {linkedin.replace("https://", "")}
              </a>
            </div>
            {/* <div className="flex items-center gap-3 text-cream-muted">
              <GitFork size={16} className="text-teal flex-shrink-0" />
              <a href={github} target="_blank" rel="noopener noreferrer"
                className="text-sm hover:text-cream transition-colors">
                {github.replace("https://", "")}
              </a>
            </div> */}
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-cream-muted text-sm">
              © 2026 Victoria Ariyo · Built with Next.js 14 + Tailwind CSS
            </p>
            <p className="text-cream-muted/40 text-xs">Designed &amp; developed by Simi</p>
          </div>
        </div>
      </div>
    </section>
  );
}