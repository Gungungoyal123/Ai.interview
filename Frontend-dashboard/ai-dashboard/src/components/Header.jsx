import './Header.css'

function Header() {
  return (
    <header className="header">
      {/* Hamburger + Search */}
      <div className="header-left">
        <button className="hamburger">☰</button>
        <div className="search-bar">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
      </div>

      {/* Icons + Avatar */}
      <div className="header-right">
        <button className="icon-btn">✉️</button>
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
        <div className="avatar">👤</div>
      </div>
    </header>
  )
}

export default Header
