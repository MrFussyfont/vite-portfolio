import ContactLinks from "./ContactLinks";

export default function Header() {
  return (
    <header className="container m-auto pb-2 flex items-center justify-between border-b border-white">
      <h1 className="text-2xl md:text-3xl font-semibold text-shadow-lg">
        Wes Reimer
      </h1>
      <ContactLinks />
    </header>
  );
}
