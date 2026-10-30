// Task 2
// Props: contact = { address, phone, email }.
export default function Footer({ contact }) {
  return (
    <footer role="contentinfo">
      <p>{contact.address}</p>
      <a href={`tel:${contact.phone}`}>{contact.phone}</a>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </footer>
  );
}
