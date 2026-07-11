
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import FirstPage from './components/Firstpage'
import Dashboard from './Pages/Dashboard';
import Form from './components/Interview_Exp_Form';
// Note the "BrowserRouter as Router" change here
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-area">
          <Header />
          

          <Routes>
            {/* When URL is http://localhost:5173/ */}
            <Route path="/" element={<FirstPage />} />
             
            {/* When URL is http://localhost:5173/dashboard */}
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/share-interview-experience" element={<Form/>}/>

          </Routes>

        </div>
      </div>
    </Router>
  )
}

export default App