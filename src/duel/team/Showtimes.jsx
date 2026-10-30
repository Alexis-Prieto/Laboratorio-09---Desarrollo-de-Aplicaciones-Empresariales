// Task 4
// Props: times (array of strings such as "19:30").
export default function Showtimes({ times }) {
  if (!times || times.length === 0) {
    return <p>Sin funciones hoy</p>;
  }
  return (
    <ul>
      {times.map((time) => (
        <li key={time}>{time}</li>
      ))}
    </ul>
  );
}
