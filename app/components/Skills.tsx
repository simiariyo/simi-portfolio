"use client";
import { useEffect, useRef, useState } from "react";
import {
  DiReact, DiNodejsSmall, DiGit, DiPostgresql,
} from "react-icons/di";
import {
  SiTypescript, SiTailwindcss, SiRedux, SiGithub,
  SiFigma, SiSupabase, SiVercel, SiJirasoftware,
  SiReactquery, SiFramer,
} from "react-icons/si";
import { VscAzureDevops } from "react-icons/vsc";
import { TbApi, TbCalendarEvent, TbChartPie4, TbRefresh } from "react-icons/tb";
import content from "@/content.json";

const { learning, certifications } = content.skills;

// Map skill name -> icon component
const iconMap: Record<string, React.ReactNode> = {
  "React":              <DiReact className="text-[#61DAFB]" />,
  "TypeScript":         <SiTypescript className="text-[#3178C6]" />,
  "Tailwind CSS":       <SiTailwindcss className="text-[#38BDF8]" />,
  "Redux Toolkit":      <SiRedux className="text-[#764ABC]" />,
  "React Query":        <SiReactquery className="text-[#FF4154]" />,
  "Framer Motion":      <SiFramer className="text-cream-muted" />,
  "HTML5 / CSS3":       <DiReact className="text-[#E34F26] opacity-70" />,
  "Node.js":            <DiNodejsSmall className="text-[#6DA55F]" />,
  "REST APIs":          <TbApi className="text-cream-muted" />,
  "Supabase":           <SiSupabase className="text-[#3ECF8E]" />,
  "NextAuth":           <SiVercel className="text-cream-muted" />,
  "PostgreSQL":         <DiPostgresql className="text-[#4169E1]" />,
  "JSON / JWT":         <TbApi className="text-cream-muted" />,
  "Azure DevOps":       <VscAzureDevops className="text-[#0078D4]" />,
  "Git / GitHub":       <SiGithub className="text-cream-muted" />,
  "Vercel":             <SiVercel className="text-cream" />,
  "CI/CD Pipelines":    <DiGit className="text-[#F05032]" />,
  "Scrum / Agile":      <TbRefresh className="text-[#0052CC]" />,
  "Sprint Planning":    <TbCalendarEvent className="text-[#0052CC]" />,
  "Power BI":           <TbChartPie4 className="text-[#F2C811]" />,
  "Figma":              <SiFigma className="text-[#F24E1E]" />,
  "VS Code":            <VscAzureDevops className="text-[#007ACC]" />,
  "Jira":               <SiJirasoftware className="text-[#0052CC]" />,
};

export default function Skills() {
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
    <section id="skills" className="py-28 px-6 bg-navy-mid">
      <div className="max-w-6xl mx-auto">
        <div
          ref={ref}
          className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className="text-teal text-xs font-semibold tracking-widest uppercase mb-4">Technical skills</p>
          <h2 className="text-4xl font-bold text-cream mb-12">What I work with</h2>

          {/* Core skills */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {content.skills.core.map((group) => (
              <div
                key={group.category}
                className="bg-navy border border-white/5 rounded-2xl p-6 hover:border-teal/20 transition-colors duration-300"
              >
                <h3 className="text-teal text-xs font-semibold tracking-widest uppercase mb-5">
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 bg-navy-light px-3 py-2 rounded-xl border border-white/5 hover:border-teal/30 transition-all duration-200 group"
                    >
                      <span className="text-lg leading-none">
                        {iconMap[skill] ?? <span className="w-4 h-4 rounded-full bg-teal/20 inline-block" />}
                      </span>
                      <span className="text-cream-muted text-sm group-hover:text-cream transition-colors">
                        {skill}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Currently levelling up */}
          <div className="bg-navy border border-white/5 rounded-2xl p-6 mb-6">
            <h3 className="text-teal text-xs font-semibold tracking-widest uppercase mb-4">
              Currently levelling up
            </h3>
            <div className="flex flex-wrap gap-2">
              {learning.map((skill) => (
                <span
                  key={skill}
                  className="text-cream-muted/70 text-sm bg-navy-light px-3 py-1.5 rounded-full border border-white/5 border-dashed"
                >
                  {skill}
                </span>
              ))}
            </div>
            <p className="text-cream-muted/40 text-xs mt-3">
              Skills I&apos;m actively building — not listed as core competencies yet.
            </p>
          </div>

          {/* Certs */}
          <div className="flex flex-wrap gap-4">
            {certifications.map((cert) => (
              <div
                key={cert}
                className="flex items-center gap-3 bg-teal/10 border border-teal/20 rounded-full px-5 py-2.5"
              >
                <div className="w-2 h-2 rounded-full bg-teal flex-shrink-0" />
                <span className="text-teal text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}