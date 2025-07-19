import React, {useContext, useState, useEffect} from 'react'
import { FaClipboardList, FaEraser, FaList, FaPlus, FaStamp } from 'react-icons/fa'
import "../setheight.css"
import CustomerForm from '../Forms/CustomerForm'
import { BiUser } from 'react-icons/bi'
import { Store } from '../../Context/Store'
import { MdDelete } from 'react-icons/md'

const Customers = () => {
  const [customerForm, setcustomerForm] = useState(false)
  const data = useContext(Store)

  useEffect(() => {
    console.log(data.customers);
    data.setcurrentPage("Customers")
  }, [])
  
  
  const toggleForm = () => {
    setcustomerForm(!customerForm)
  }

  return (
    <div className='setheight'>
      <div className='mx-5 flex items-center justify-between my-8 shadow-2xl border border-gray-400 dark:border-gray-600 rounded-2xl p-4'>
        <div className='flex items-center'>
        <FaClipboardList className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
        <h2 className="text-xl font-semibold">All Customers</h2>
        </div>
        <FaPlus onClick={()=>toggleForm()} className="text-2xl text-white p-1 rounded-sm bg-blue-500 mr-3"/>
      </div>

      {customerForm && <CustomerForm toggleForm={toggleForm} />}

      {data.customers.length !== 0
      ? data.customers.map(c => {
        return <div key={c._id} className={`rounded-xl flex justify-between items-center p-3 px-8 mx-5 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
        <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
        <div className='flex justify-between gap-6 w-[80%]'>
          <span className='name'>{c.name}</span>
          <span className='phone'>{c.phone}</span>
        </div>
        <MdDelete onClick={e=>data.deleteCustomer(c._id, "customer")} className='text-2xl text-blue-600 dark:text-blue-400' />
      </div>
      })
      :<div className='flex justify-center items-center'>
      <BiUser className="text-6xl text-blue-600 dark:text-blue-400 mr-3"/>
      <div>
      <h1 className='text-2xl font-bold'>No Customers</h1>
      <button onClick={()=>toggleForm()} className='flex bg-blue-500 rounded-2xl p-1 px-3'>Add Customer <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 mr-3"/></button>
      </div>
    </div>
    }
    </div>
  )
}

export default Customers
