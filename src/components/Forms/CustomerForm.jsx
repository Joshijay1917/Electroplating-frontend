import React, { useContext, useState } from 'react'
import { Store } from '../../Context/Store'

const CustomerForm = ({ toggleForm }) => {
    const store = useContext(Store)
    const [loading, setloading] = useState(0)
    const [FormData, setFormData] = useState({
        "name": '',
        "phone": ''
    })

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const handlesubmit = async(e) => {
        e.preventDefault();
        setloading(!loading);
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/addcustomer`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FormData)
        })
        const res = await data.json();

        if(res.status == 400) {
            setloading(0)
            store.showNotification(res.msg, "error")
        } else {
            setloading(0)
            store.getcustomers();
            store.showNotification("Add successfully", "success")
        }

        toggleForm();
    }

    return (
        <div className='w-full h-full fixed z-30 top-0 justify-center items-center'>
            <div className='bg-black/30 absolute w-full h-full top-0'>
                <div className='h-full flex items-center flex-col justify-center'>
                    <form onSubmit={handlesubmit} className='flex p-6 rounded-2xl items-start gap-3 z-30 flex-col justify-center bg-white'>
                        <h1 className='text-2xl font-bold mb-6'>Customer Form</h1>
                        <div className='flex gap-3 mx-auto items-center'>
                            <label>Name</label>
                            <input onChange={handleChange} className='bg-gray-300 rounded-2xl p-2' type="text" name='name' placeholder='Customer Name' />
                        </div>
                        <div className='flex gap-3 mx-auto items-center'>
                            <label className='phone'>Phone</label>
                            <input onChange={handleChange} className='bg-gray-300 rounded-2xl p-2' type="text" name='phone' placeholder='Phone Number' />
                        </div>
                        <button className='mt-3 bg-blue-500 text-white px-3 py-2 rounded-2xl' type='submit'>Add Customer</button>
                    </form>
                </div>
            </div>
            {loading ? <div className="bg-black/30 fixed z-30 w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full border-4 border-solid border-t-transparent text-blue-800 h-19 w-19"></div>
            </div> : null}
        </div>
    )
}

export default CustomerForm
