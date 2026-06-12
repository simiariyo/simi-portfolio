import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import HowIWork from "./components/HowIWork";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <About />
      <HowIWork />
      <Skills />
      <Projects />
      <Contact />
    </main>
  );
}
