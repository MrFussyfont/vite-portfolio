import Header from "./components/Header";
import ContactLinks from "./components/ContactLinks";
import ProjectCard from "./components/ProjectCard";
import projects from "./projects.json";

function App() {
  return (
    <>
      <Header />
      <main className="container m-auto">
        <div className="flex flex-col xl:flex-row gap-6 justify-between items-center my-24">
          <div>
            <h2 className="reveal-right text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-shadow-lg text-center xl:text-left leading-tight">
              Senior Product Designer
            </h2>
            <p className="reveal-right sm:text-lg tracking-wide uppercase mt-1 opacity-85 font-light text-center xl:text-left">
              UX • Design Systems • Front-End // Kitchener-Waterloo, ON
            </p>
          </div>
          <div className="reveal-down mt-10 xl:mt-0 max-w-lg 2xl:max-w-xl font-lora">
            <blockquote className="italic sm:text-lg">
              What sets Wes apart is how completely he owns his work: he is
              thoughtful and detail-oriented, consistently raising the quality
              of the work he touches. His passion for accessibility serves him
              well when he translates design (his own or others’) into code. Wes
              has grown quickly into a dependable and self-starting builder.
              It’s an absolute pleasure working with him.
            </blockquote>
            <p className="text-right">James Barr | CEO, Strata Research</p>
          </div>
        </div>
        <div className="flex flex-col gap-y-6 gap-x-5 justify-center lg:flex-row lg:flex-wrap">
          {projects.map((project) => (
            <ProjectCard
              key={project.key}
              abbr={project.key}
              name={project.name}
              client={project.client}
              role={project.role}
              stack={project.stack}
              timeline={project.timeline}
              alt={project.alt}
              slides={project.slides}
            />
          ))}
        </div>
      </main>
      <footer className="flex flex-col items-center gap-8 pt-16 container m-auto text-center font-light">
        <a
          href="https://wes.reimer-reason.ca"
          target="_blank"
          rel="noreferrer"
          className="underline underline-offset-2 hover:bg-white hover:text-yellow-900 transition-colors"
        >
          Older design work and case studies
        </a>
        <ContactLinks />
      </footer>
    </>
  );
}

export default App;
