import React, { useState, useEffect, useContext, useRef } from 'react'
import { FaList, FaPlus, FaUser } from 'react-icons/fa'
import { Store } from '../../Context/Store'
import { Link } from 'react-router-dom'
import OrderForm from './OrderForm'

const AllOrders = () => {
    const data = useContext(Store)
    const [orders, setorders] = useState([])
    const [customer, setcustomer] = useState({
        customer: '',
        customerid: ''
    })
    const [Form, setForm] = useState([{ id: 1 }])
    const formRef = useRef([]);

    const CustomerDetailes = async(customer, event) => {
        setcustomer(prev => ({
            ...prev,
            customer: customer.name,
            customerid: customer._id
        }))
    }

    const handleClick = () => {
        setForm([...Form, { id: Date.now() }])
    }

    const removeForm = () => {
        if (Form.length > 1) {
            setForm(Form.slice(0, -1))
        }
    }

    const submitall = (e) => {
        e.preventDefault();

        const allformdata = formRef.current.map(ref => {
            if (ref) return ref.handleSubmit();
            return null;
        }).filter(Boolean);
        console.log("all data:", allformdata);
    }

    useEffect(() => {
        formRef.current = formRef.current.slice(0, Form.length)
      }, [Form])

    useEffect(() => {
        if (customer.customer !== '') {
            data.currentCustomerOrder(customer.customerid)
        }
        
    }, [customer])
    
    //console.log("orders:",data.currcusorder);


    return (
        <div className='setheight2 text-gray-700 dark:text-white p-3'>
            <h1 className='text-2xl font-bold underline underline-offset-10 decoration-7 dark:text-gray-300 decoration-blue-400'>Order Form</h1>
            {customer.customer === ''
                ? <div className='mx-3 flex flex-col my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
                    <div className='flex items-center p-2'>
                        <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                        <h2 className="text-xl font-semibold">Select Customer</h2>
                    </div>
                    <hr className='my-3 border border-blue-400' />

                    <div>
                        {data.customers.map(c => {
                            return <div key={c._id} onClick={(e) => CustomerDetailes(c, e)} className={`rounded-xl flex justify-between items-center p-3 px-8 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
                                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>
                                <div className='flex justify-between gap-6 w-[80%]'>
                                    <span className='name'>{c.name}</span>
                                    <span className='phone'>{c.phone}</span>
                                </div>
                            </div>
                        })}
                    </div>

                </div>
                : <>
                    {Form.map((form, index) => {
                        // return <Form key={form.id} ref={el => formRef.current[index] = el} />
                        return <OrderForm key={form.id} ref={el => formRef.current[index] = el} customer={customer.customer} customerid={customer.customerid} />
                    })}
                    <div className='flex flex-col w-full mx-auto pb-16 gap-3 items-center'>
                        <button onClick={handleClick} className='bg-blue-400 dark:bg-blue-400/50 text-white font-semibold w-fit px-20 rounded-2xl p-2'>Add Form</button>
                        <button onClick={removeForm} className='bg-red-200 dark:bg-red-800/50 text-white font-semibold w-fit px-20 rounded-2xl p-2'>Remove Form</button>
                        <button onClick={submitall} className='bg-green-500 dark:bg-green-800/50 text-white font-semibold w-fit px-20 rounded-2xl p-2'>Submit All Orders</button>
                    </div>
                </>}
        </div>
    )
}

export default AllOrders
