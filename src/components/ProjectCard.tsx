import { useRef, useState, useEffect } from "react";
import ProjectTable from "./ProjectTable";

function getAssetUrl(filename: string) {
  // console.log(filename);
  return new URL(`/src/assets/${filename}`, import.meta.url).href;
}

function processText(text: string): React.ReactElement {
  // handles some markdown-style stuff in a (very) limited way

  const textWithItalics = text.split("*"); // /\*([^\*])\*/,
  if (textWithItalics.length > 1) {
    return (
      <p>
        {textWithItalics[0]} <i>{textWithItalics[1]}</i> {textWithItalics[2]}
      </p>
    );
  }

  const textWithParagraph = text.split("<p>");
  if (textWithParagraph.length > 1) {
    return (
      <>
        <p>{textWithParagraph[0]}</p>
        <p className="pt-4">{textWithParagraph[1]}</p>
      </>
    );
  }

  // check for a numbered list
  const items = text.split(/\s\d\.\s/);
  if (items.length > 1) {
    return (
      <>
        <p>{items[0]}</p>
        <ol className="list-decimal pl-6 pt-2">
          {items.slice(1).map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ol>
      </>
    );
  }

  return <p>{text}</p>;
}

interface ProjectCardProps {
  abbr: string;
  name: string;
  client: string;
  role: string;
  stack: string;
  timeline: string;
  alt: string;
  slides: {
    title: string;
    text: string;
    link?: string;
    linkText?: string;
    gifs?: string[];
    bgColor?: string;
    format?: string;
  }[];
}

export default function ProjectCard({
  abbr,
  name,
  client,
  role,
  stack,
  timeline,
  alt,
  slides,
}: ProjectCardProps) {
  const [slideIndex, setSlideIndex] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Add keyboard navigation
  useEffect(() => {
    const prevStyle =
      dialogRef.current?.querySelector<SVGSVGElement>(".prev svg")?.style;
    const nextStyle =
      dialogRef.current?.querySelector<SVGSVGElement>(".next svg")?.style;

    const handleKeyDown = (event: KeyboardEvent) => {
      // Only handle keys if dialog is open
      if (!dialogRef.current?.open) return;

      if (event.key === "ArrowLeft" && slideIndex > 0) {
        prevStyle?.setProperty("fill", "white");
        setSlideIndex((i) => i - 1);
      } else if (event.key === "ArrowRight" && slideIndex < slides.length - 1) {
        nextStyle?.setProperty("fill", "white");
        setSlideIndex((i) => i + 1);
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!dialogRef.current?.open) return;
      if (event.key === "ArrowLeft") {
        prevStyle?.setProperty("fill", "");
      } else if (event.key === "ArrowRight") {
        nextStyle?.setProperty("fill", "");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [slideIndex, slides.length]);

  const slide = slides[slideIndex];
  const ext = slide.format || "webp";
  const threeGifs = slide.gifs && slide.gifs.length > 2;

  return (
    <>
      <button
        type="button"
        className="project-card"
        onClick={() => dialogRef.current?.showModal()}
      >
        <img
          src={getAssetUrl(`${abbr}0.${slides[0].format || "webp"}`)}
          className="rounded-t-xl"
          alt={alt}
        />
        <div className="project-description">
          <ProjectTable
            name={name}
            client={client}
            role={role}
            stack={stack}
            timeline={timeline}
          />
        </div>
      </button>

      <dialog
        ref={dialogRef}
        closedby="any"
        className="fixed rounded-xl m-auto w-[98%] 2xl:w-11/12 border-white border"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current.close();
        }}
      >
        <div className="flex flex-col xl:flex-row">
          {slide.gifs ? (
            <figure
              className={`${slide.bgColor || "bg-black"} flex xl:w-2/3 aspect-422/319 items-center justify-between ${threeGifs ? "px-8" : "px-[6%]"}`}
              aria-describedby={`caption${slideIndex}`}
            >
              {slide.gifs.map((gif, i) => (
                <img
                  key={i}
                  src={getAssetUrl(`${gif}.gif`)}
                  alt=""
                  className={`max-h-3/4 ${threeGifs && "max-w-[37%]"}`}
                />
              ))}
            </figure>
          ) : (
            <img
              src={getAssetUrl(`${abbr}${slideIndex}.${ext}`)}
              className="rounded-t-xl xl:rounded-tr-none xl:rounded-l-xl xl:w-2/3 shrink-0 object-cover"
              alt={slideIndex === 0 ? alt : slide.title}
            />
          )}

          <div className="project-description flex flex-col pb-4 xl:w-1/3 xl:px-8 2xl:p-12">
            <ProjectTable
              name={name}
              client={client}
              role={role}
              stack={stack}
              timeline={timeline}
            />
            <h4 className="mt-2 xl:mt-8 border-b border-white pb-2 mb-4">
              {slide.title}
            </h4>
            <div
              className="font-extralight text-sm 2xl:text-lg"
              id={`caption${slideIndex}`}
            >
              {processText(slide.text)}
            </div>
            {slide.link && (
              <p className="mt-4 text-sm 2xl:text-lg">
                <a
                  href={slide.link}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-2 hover:bg-white hover:text-yellow-900 transition-colors"
                  title="Opens in a new tab"
                >
                  {slide.linkText}
                </a>
              </p>
            )}

            {/* nav buttons */}
            <div className="flex align-middle justify-between items-end grow mt-4">
              <button
                type="button"
                title="Previous slide"
                disabled={slideIndex === 0}
                className="prev"
                onClick={() => setSlideIndex((i) => i - 1)}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="rotate-180"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.7505 37.8701L24.7505 29.25L8.75049 29.25L8.75049 18.75L24.7505 18.75L24.7505 10.1309L38.6206 24L24.7505 37.8701Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
              <span className="uppercase font-extralight text-sm tracking-widest mb-3.5">
                Slide {slideIndex + 1} of {slides.length}
              </span>
              <button
                type="button"
                title="Next slide"
                disabled={slideIndex === slides.length - 1}
                className="next"
                onClick={() => setSlideIndex((i) => i + 1)}
              >
                <svg
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.7505 37.8701L24.7505 29.25L8.75049 29.25L8.75049 18.75L24.7505 18.75L24.7505 10.1309L38.6206 24L24.7505 37.8701Z"
                    stroke="white"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button
          className="absolute rounded-full top-3 right-3 opacity-80 hover:opacity-100 hover:bg-white transition-all cursor-pointer"
          title="Close"
          aria-label="Close dialog box"
          onClick={() => dialogRef.current?.close()}
        >
          <svg
            className="size-6 hover:fill-yellow-900"
            viewBox="0 0 24 24"
            fill="white"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="white"
              d="M12 1.5C6.15 1.5 1.5 6.15 1.5 12C1.5 17.85 6.15 22.5 12 22.5C17.85 22.5 22.5 17.85 22.5 12C22.5 6.15 17.85 1.5 12 1.5ZM12 21C7.05 21 3 16.95 3 12C3 7.05 7.05 3 12 3C16.95 3 21 7.05 21 12C21 16.95 16.95 21 12 21Z"
            />
            <path d="M15.6643 16.75L12 13.0857L8.33571 16.75L7.25 15.6643L10.9143 12L7.25 8.33571L8.33571 7.25L12 10.9143L15.6643 7.25L16.75 8.33571L13.0857 12L16.75 15.6643L15.6643 16.75Z" />
          </svg>
        </button>
      </dialog>
    </>
  );
}
