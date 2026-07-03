import Link from "next/link";

export default function Navbar() {
  return (
    <div className="header">
      
      {/* TOP BAR */}
      <div className="navbar">
        <div className="nav-left">
          <span className="menu">☰</span>
          <span className="logo">SICONEX</span>
        </div>

        <div className="nav-right">
          <Link href="/account" className="icon-box">👤</Link>
          <Link href="/cart" className="icon-box">🛒</Link>
        </div>
      </div>

      {/* SEARCH */}
      <div className="search-bar">
        <input type="text" placeholder="Search products..." />
        <button>Search</button>
      </div>

    </div>
  );
}
