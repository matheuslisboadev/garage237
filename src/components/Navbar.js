import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/home">Home</Link>
      <Link href="/carros">Carros</Link>
      <Link href="/garagens">Garagens</Link>
    </nav>
  );
}
