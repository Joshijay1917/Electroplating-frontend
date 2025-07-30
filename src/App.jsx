import './App.css'
import Navbar from './components/Main/Navbar'
import Options from './components/Main/Options'
import Order from './components/pages/Order'
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom'
import Dashboard from './components/pages/Dashboard'
import Customers from './components/pages/Customers'
import Bills from './components/pages/Bills'
import { useState, useEffect } from 'react'
import OrderForm from './components/Forms/OrderForm'
import OrderDetailes from './components/Content/OrderDetailes'
import AllOrders from './components/Forms/AllOrders'
import Login from './components/Auth/Login'

function App() {
  const [darkmode, setdarkmode] = useState(false)
  const [currentPage, setcurrentPage] = useState("Dashboard")
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setdarkmode(!darkmode);
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault(); // Block default behavior
      navigate('/', { replace: true }); // Redirect silently
      return ""; // No popup
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkmode)
  }, [darkmode])

  return (
    <div>
      {isAuthenticated && <Navbar darkmode={darkmode} toggleDarkMode={toggleDarkMode} />}
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={isAuthenticated ? <Dashboard /> : <Navigate to='/login'/>} />
          <Route path='/customer' element={isAuthenticated ? <Customers /> : <Navigate to='/login'/>} />
          <Route path='/orders' element={isAuthenticated ? <Order /> : <Navigate to='/login'/>} />
          <Route path='/orderdetails/:id' element={isAuthenticated ? <OrderDetailes /> : <Navigate to='/login'/>} />
          <Route path='/orderform' element={isAuthenticated ? <OrderForm /> : <Navigate to='/login'/>} />
          <Route path='/addorder' element={isAuthenticated ? <AllOrders /> : <Navigate to='/login'/>} />
          <Route path='/bills' element={isAuthenticated ? <Bills /> : <Navigate to='/login'/>} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      {isAuthenticated && <Options currentPage={currentPage} setcurrentPage={setcurrentPage} />}
    </div>
  )
}

export default App
