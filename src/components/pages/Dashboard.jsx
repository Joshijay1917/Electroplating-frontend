import React, { useContext, useEffect } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import StasCard from '../Content/StasCard'
import "../setheight.css"
import { Store } from '../../Context/Store'
import { Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Link } from 'react-router-dom'

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const data = useContext(Store)
  const data2 = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales 2025',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sales Data',
      },
    },
  };
  
  useEffect(() => {
    data.setcurrentPage("Dashboard")
  }, [])
  
  
  return (
    <div className='[&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'>
      <div className={`rounded-xl md:p-5 m-5 grid grid-cols-2 gap-10 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg`}>

        <Link to={'/customer'}><StasCard value={data.customers.length} label={"Customers"} bg={"bg-teal-500 dark:bg-teal-700"} /></Link>
        <Link to={'/orders'}><StasCard value={data.orders.length} label={"Orders"} bg={"bg-yellow-500 dark:bg-yellow-700"} /></Link>
        <Link to={'/orders'}><StasCard value={data.orders.filter(o => o.status === "false").length} label={"Pending"} bg={"bg-blue-400 dark:bg-blue-800"} /></Link>
        <Link to={'/orders'}><StasCard value={data.orders.filter(o => o.status === "true").length} label={"Completed"} bg={"bg-orange-500 dark:bg-purple-800"} /></Link>
      </div>

      <div className={`rounded-xl m-5 md:m-8 text-gray-700 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
      <div className='p-6 flex items-center'>
        <h1 className='font-bold text-4xl'>₹{data.orders.filter(o => o.status === "true").reduce((sum, order)=>sum+order.total, 0)}</h1>
        <div className='px-2 py-4'>
          <h1 className='text-3xl'>Revenue</h1>
          <p className='text-sm'>From Completed Orders</p>
        </div>
      </div>
      <div className={`bg-cover pb-4 md:py-4 md:bg-[url('/bgimage.jpg')]`}>
        <div className='bg-gray-400/40 dark:bg-gray-600 dark:md:bg-gray-400/85 dark:text-white dark:md:text-gray-800 backdrop-blur-xs mx-10 rounded-2xl'>
          {/* <h1 className='font-bold text-center text-3xl'>Orders:</h1>
          <div className='py-4'>
            <div className='flex mx-8 gap-4 text-xl'>
            <label>Completed:</label><p>8</p>
            </div>
            <div className='flex mx-8 gap-4 text-xl'>
            <label>completed:</label><p>8</p>
            </div>
            <div className='flex mx-8 gap-4 text-xl'>
            <label>completed:</label><p>8</p>
            </div>
          </div> */}
          <Bar data={data2} options={options}/>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Dashboard
