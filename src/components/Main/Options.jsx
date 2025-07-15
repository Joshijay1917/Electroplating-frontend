import React from 'react'
import { FaClipboardList, FaList, FaStamp, FaUser } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Options = ({ currentPage, setcurrentPage }) => {

  const handleClick = (e, page) => {
    setcurrentPage(page)
  }

  

  return (
    <div className='flex justify-center gap-5 bg-blue-400 dark:bg-gray-500 rounded-t-4xl fixed bottom-0 w-full'>
      <Link to={'/'}><div onClick={(e)=>handleClick(e, "Dashboard")} className={` p-4 text-center flex flex-col items-center text-lg ${currentPage === "Dashboard" ? 'text-white': 'text-blue-300 dark:text-gray-900'}`}>
        <FaStamp className='mx-1 md:p-2 text-[27px] md:text-5xl'/>
      </div></Link>
      <Link to={'/customer'}><div onClick={(e)=>handleClick(e, "Customers")} className={` p-4 text-center flex flex-col items-center text-lg ${currentPage === "Customers" ? 'text-white': 'text-blue-300 dark:text-gray-900'}`}>
        <FaUser className='mx-1 md:p-2 text-[27px] md:text-5xl'/>
      </div></Link>
      <Link to={'/orders'}><div onClick={(e)=>handleClick(e, "Orders")} className={` p-4 text-center flex flex-col items-center text-lg ${currentPage === "Orders" ? 'text-white': 'text-blue-300 dark:text-gray-900'}`}>
        <FaClipboardList className='mx-1 md:p-2 text-[27px] md:text-5xl'/>
      </div></Link>
      <Link to={'/bills'}><div onClick={(e)=>handleClick(e, "Bills")} className={`value p-4 text-center flex flex-col items-center text-lg ${currentPage === "Bills" ? 'text-white': 'text-blue-300 dark:text-gray-900'}`}>
        <FaList className='mx-1 md:p-2 text-[27px] md:text-5xl'/>
      </div></Link>
    </div>
  )
}

export default Options
