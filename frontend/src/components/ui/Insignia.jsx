// Insignia (chip) con punto de color. color: 'indigo' | 'turquesa' | 'neutro'
export default function Insignia({ color = 'indigo', children }) {
  return <span className={`insignia insignia--${color}`}>{children}</span>;
}
