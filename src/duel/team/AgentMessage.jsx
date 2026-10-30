// Task 8
// Props: author (string), text (string produced by an AI agent).
export default function AgentMessage({ author, text }) {
  return (
    <p>
      <strong>{author}:</strong> <span>{text}</span>
    </p>
  );
}
