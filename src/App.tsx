import Header from "./components/Header";
import ProjectCard from "./components/ProjectCard";
import projects from "./projects.json";

function App() {
  return (
    <>
      <Header />
      <main className="container m-auto">
        <div className="flex flex-col lg:flex-row gap-6 justify-between items-center my-24">
          <div>
            <h2 className="text-5xl font-bold tracking-tight text-shadow-lg">
              Senior Product Designer
            </h2>
            <p className="text-lg tracking-wide uppercase mt-3 opacity-85 font-light">
              ux • design systems • front-end // kitchener-waterloo, on
            </p>
          </div>
          <div className="lg:max-w-1/3 font-lora">
            <blockquote className="italic text-lg">
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
        <div className="flex flex-col md:flex-row gap-6">
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
    </>
  );
}

export default App;
