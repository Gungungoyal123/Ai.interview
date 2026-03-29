import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
// import Dashboard from './pages/Dashboard'
import FirstPage from './components/Firstpage'

function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-area">
        <Header />
        {/* <Dashboard /> */}
        <FirstPage/>
      </div>
    </div>
  )
}

export default App
