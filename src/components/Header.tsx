import ContactLinks from "./ContactLinks";

export default function Header() {
  return (
    <header className="container m-auto flex justify-between border-b border-white">
      <h1 className="text-3xl font-semibold pb-2 text-shadow-lg">Wes Reimer</h1>
      <ContactLinks />
    </header>
  );
}
