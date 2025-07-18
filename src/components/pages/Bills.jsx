import React, { useContext, useState } from 'react'
import { FaClipboardList, FaUser } from 'react-icons/fa'
import { Store } from '../../Context/Store'
import { useEffect } from 'react'
import "../setheight.css"

const Bills = () => {
    const data = useContext(Store)
    const [loading, setloading] = useState(0)
    const [currCus, setcurrCus] = useState([])
    const [customerid, setcustomerid] = useState("")

    const handleChange = (e) => {
        setcustomerid(e.target.value)
    }

    const handleClick = async (e) => {
        e.preventDefault();
        setloading(!loading);

        if (!customerid) {
            data.showNotification("CustomerID not found", "error")
        }

        try {
            const data2 = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/generate-invoice`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ id: customerid })
            })
            // const res = await data2.json();

            //if (!data2.ok) {
                //const errorData = await data2.json();
                //console.log('Failed to generate invoice');
            console.log(data2);
            //}

            const blob = await data2.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `invoice_${month}.pdf`);
            document.body.appendChild(link);
            link.click();

            // Clean up
            setTimeout(() => {
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
            }, 100);

            setloading(0)
            data.showNotification("Bill generated", "success")
        } catch (error) {
            setloading(0)
            data.showNotification(error, "error")
        }
    }

    useEffect(() => {
        data.setcurrentPage("Bills")
    }, [])

    useEffect(() => {
        setcurrCus(data.customers.filter(c =>
            data.orders.find(o => o.customerid === c._id)
        ))
    }, [data.customers, data.orders])

    return (
        <div className={`rounded-xl setheight p-6 relative overflow-hidden`}>
            {/* <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div> */}

            <div className="flex items-center  border-b-2 border-gray-200 dark:border-gray-600">
                <FaClipboardList className="text-2xl text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-2xl font-semibold">All Bills</h2>
            </div>

            <div className='flex flex-col my-4 shadow-2xl border border-gray-400 rounded-2xl p-4 overflow-clip'>
                <div className='flex items-center p-2'>
                    <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                    <h2 className="text-xl font-semibold dark:text-gray-300">Select Customer</h2>
                </div>
                <hr className='my-3 border border-blue-400' />

                <div className='flex gap-3 font-medium items-center'>
                    <span>Customer:</span>
                    <select onChange={handleChange} className='border border-gray-400 rounded-2xl p-3'>
                        <option value={0}>Select Customer</option>
                        {currCus.map(c => {
                            return <option key={c._id} value={c._id}>{c.name}</option>
                        })}
                    </select>
                </div>

                <button onClick={handleClick} className='text-white bg-green-500 p-2 mx-4 my-3 mt-6 font-semibold rounded-2xl'>Generate Bill</button>
            </div>
             {loading ? <div className="bg-black/30 fixed top-0 left-0 z-30 w-full h-full flex justify-center items-center">
                 <div className="animate-spin rounded-full border-4 border-solid border-t-transparent text-blue-800 h-19 w-19"></div>
             </div> : null}
        </div>
    )
}

export default Bills
