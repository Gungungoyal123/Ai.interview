import './Sidebar.css'

const navItems = [
  { label: 'Dashboard', icon: '🏠', active: true },
  { label: 'History',   icon: '🕐', active: false },
  { label: 'Profile',   icon: '👤', active: false },
  { label: 'Settings',  icon: '⚙️', active: false },
]

function Sidebar() {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">🤖</div>
        <span className="logo-text">AI Interview</span>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`nav-item ${item.active ? 'nav-item--active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Bottom Settings */}
      <div className="sidebar-bottom">
        <div className="nav-item">
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
