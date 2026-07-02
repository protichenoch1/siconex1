import Link from "next/link";

export default function Navbar() {
  return (
    <>
      {/* TOP HEADER */}
      <nav className="navbar">
        <div className="left">
          <span className="menu">☰</span>
          <span className="logo">SICONEX</span>
        </div>

        <div className="right">
          <Link href="/account">👤</Link>
          <Link href="/cart">🛒</Link>
        </div>
      </nav>

      {/* SEARCH BAR */}
      <div className="search-container">
        <input placeholder="Search products..." />
      </div>
    </>
  );
}
