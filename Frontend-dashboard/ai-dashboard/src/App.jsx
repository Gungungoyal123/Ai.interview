// import './App.css'
// import Sidebar from './components/Sidebar'
// import Header from './components/Header'
// // import Dashboard from './pages/Dashboard'
// import FirstPage from './components/Firstpage'
// import PerformanceChart from './components/PerformanceChart'
// import {Router,Routes,Route} from 'react-router-dom'
// function App() {
//   return (
//     <>
//     <Router>
//     <div className="app-layout">
//       <Sidebar />
//       <div className="main-area">
//         <Header />
//         {/* <Dashboard /> */}
        
//       </div>
//     </div>
   
//       <Routes>
//          <Route path ='/' element={FirstPage}></Route>
//         <Route path='/dashboard' element={PerformanceChart}>

//         </Route>
//       </Routes>
//     </Router>
//    </>
//   )
// }

// export default App
import './App.css'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import FirstPage from './components/Firstpage'
import Dashboard from './Pages/Dashboard';
// Note the "BrowserRouter as Router" change here
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Sidebar />
        <div className="main-area">
          <Header />
          
          {/* ONLY this part changes based on the URL */}
          <Routes>
            {/* When URL is http://localhost:5173/ */}
            <Route path="/" element={<FirstPage />} />
             
            {/* When URL is http://localhost:5173/dashboard */}
            <Route path="/dashboard" element={<Dashboard/>} />

          </Routes>

        </div>
      </div>
    </Router>
  )
}

export default App