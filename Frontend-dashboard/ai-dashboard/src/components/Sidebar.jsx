import './Sidebar.css'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Dashboard', icon: '🏠', path: '/dashboard' },
]

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">🤖</div>
        <span className="logo-text">AI Interview</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <div
            key={item.label}
            className={`nav-item ${location.pathname === item.path ? 'nav-item--active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar