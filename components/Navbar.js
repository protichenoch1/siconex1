import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div>🛍️ Siconex</div>

      <input className="search" placeholder="Search..." />

      <div className="nav-links">
        <Link href="/">Home</Link>
        <Link href="/cart">Cart</Link>
      </div>
    </nav>
  );
}
