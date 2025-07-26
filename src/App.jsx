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

function App() {
  const [darkmode, setdarkmode] = useState(false)
  const [currentPage, setcurrentPage] = useState("Dashboard")
  const navigate = useNavigate();

  const toggleDarkMode = () => {
    setdarkmode(!darkmode);
  }

  useEffect(() => {
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      navigate('/');
      //e.returnValue = 'Are you sure you want to leave? Your data may not be saved.';
      return e;
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkmode)
  }, [darkmode])

  return (
    <div>
      <Navbar darkmode={darkmode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/customer' element={<Customers />} />
          <Route path='/orders' element={<Order />} />
          <Route path='/orderdetails/:id' element={<OrderDetailes />} />
          <Route path='/orderform' element={<OrderForm />} />
          <Route path='/addorder' element={<AllOrders />} />
          <Route path='/bills' element={<Bills />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      <Options currentPage={currentPage} setcurrentPage={setcurrentPage} />
    </div>
  )
}

export default App
