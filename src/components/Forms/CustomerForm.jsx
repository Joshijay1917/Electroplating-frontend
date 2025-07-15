import React, { useContext, useState } from 'react'
import { Store } from '../../Context/Store'
import { useNavigate } from 'react-router-dom'

const CustomerForm = ({ toggleForm }) => {
    const store = useContext(Store)
    const navigate = useNavigate()
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
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/addcustomer`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(FormData)
        })
        const res = await data.json();

        console.log(res);
        

        if(res.status == 400) {
            store.showNotification(res.msg, "error")
        } else {
            navigate('/customer')
            window.location.reload()
            store.showNotification("Add successfully", "success")
        }

        toggleForm();
    }

    return (
        <div className='bg-black/30 absolute w-full h-full top-0 z-10'>
            <div className='h-full flex items-center flex-col justify-center'>
            <form onSubmit={handlesubmit} className='flex p-6 rounded-2xl items-start gap-3 flex-col justify-center bg-white'>
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
    )
}

export default CustomerForm
