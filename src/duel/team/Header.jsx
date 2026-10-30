// Task 1
// Props: name (string), links (array of { href, label }).
export default function Header({ name, links }) {
  return (
    <header role="banner">
      <h1>{name}</h1>
      <nav aria-label="Principal">
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <a href={link.href}>{link.label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
