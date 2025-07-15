import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../Context/Store'
import { FaClipboardList, FaMinus, FaPlus, FaUser } from 'react-icons/fa'
import { GiCancel } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

const OrderForm = () => {
  const data = useContext(Store)
  const navigate = useNavigate()
  const [platecounter, setplatecounter] = useState(1)
  const [formData, setFormData] = useState({
    itemName: '',
    customer: '',
    material: '',
    quantity: '',
    plating: [],
    status: false,
    gstApply: 'yes(18)'
  })

  const CustomerDetailes = (customer, event) => {
    setFormData(prev => ({
      ...prev,
      customer: customer.name
    }))
  }

  const ChangeCustomer = () => {
    setFormData(prev => ({
      ...prev,
      customer: ''
    }))
  }

  const changePlate = (e) => {
    const selectedValue = e.target.value;

    if (e.target.value != 0) {
      setFormData(prev => ({
        ...prev,
        plating: prev.plating.length == 0
          ? prev.plating = [{ id: 1, type: selectedValue, price: '' }]
          : prev.plating = [...prev.plating, { id: (prev.plating[prev.plating.length - 1].id + 1), type: selectedValue, price: '' }]
      }));
    } else {
      data.showNotification(`Please select plate ${platecounter}`, error)
    }
  }

  const handlePrice = (e) => {
    const { name, value } = e.target

    formData.plating.find(p => p.id.toString() === name.toString()).price = value
  }

  const handleChange = (e) => {
    console.log(e.target.value);

    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault();

    if (formData.itemName == '') {
      data.showNotification("Please enter itemName", "error")
    }
    if (formData.material == '') {
      data.showNotification("Please select material", "error")
    }
    if (formData.quantity == '') {
      data.showNotification("Please enter quantity", "error")
    }
    if (formData.plating.length == 0) {
      data.showNotification("Please select plating", "error")
    }

    const data2 = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/addorder`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData)
    })
    const res = await data2.json();

    if (res.status == 400) {
      data.showNotification(res.msg, "error")
    } else {
      data.getorders()
      navigate('/orders')
      data.showNotification("Order Add Successfully", "success")
    }

  }

  useEffect(() => {
    data.setcurrentPage("Addorder")
  }, [])


  return (
    <div className='setheight2 p-3 md:p-6'>
      <h1 className='text-2xl font-bold underline underline-offset-10 decoration-7 dark:text-gray-300 decoration-blue-400'>Order Form</h1>

      {formData.customer === ''
        ? <div className='md:mx-3 flex flex-col my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
          <div className='flex items-center p-2'>
            <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
            <h2 className="text-xl font-semibold dark:text-gray-300">Select Customer</h2>
          </div>
          <hr className='my-3 border border-blue-400'/>

          <div>
            {data.customers.map(c => {
              return <div key={c._id} onClick={(e) => CustomerDetailes(c, e)} className={`rounded-xl flex justify-between items-center p-3 px-8 my-3 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
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
          <form onSubmit={handleSubmit}>
            <div className='md:mx-3 flex flex-col my-8 shadow-2xl border border-gray-400 rounded-2xl p-4'>
              <div className='flex items-center p-2 justify-between'>
                <div className='flex items-center'>
                  <FaUser className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                  <h2 className="text-xl font-semibold dark:text-white">{formData.customer.toLocaleUpperCase()}</h2>
                </div>
                <GiCancel onClick={e => ChangeCustomer()} className='text-3xl text-blue-600 dark:text-blue-400' />
              </div>
              <hr className='my-3 border border-blue-400'/>

              <div className={`flex p-3 px-4 relative overflow-hidden dark:text-white dark:bg-[var(--bg-dark)] bg-gray-50`}>
                <div className='flex items-center justify-between gap-3 w-full'>
                  <span className='itemname text-lg'>ItemName:</span>
                  <input className='border w-[72%] border-gray-400 rounded-2xl p-2' type='text' name="itemName" placeholder="Itemname (e.g., Handle)" onChange={handleChange} />
                </div>
              </div>

              <div className='flex px-4 p-3 dark:text-white items-center justify-between gap-3 w-full'>
                <span className='itemname text-lg'>Material:</span>
                <select
                  name="material"
                  onChange={handleChange}
                  className={`border w-[72%] border-gray-400 rounded-2xl p-3`}
                >
                  <option value="">Select Material</option>
                  <option value="Brass">Brass</option>
                  <option value="Steel">Steel</option>
                  <option value="Aluminum">Aluminum</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Copper">Copper</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className='flex px-4 p-3 dark:text-white items-center justify-between gap-3 w-full'>
                <span className='itemname text-lg'>Quntity:</span>
                <input
                  type="number"
                  name="quantity"
                  onChange={handleChange}
                  placeholder="Quantity (kg)"
                  min="0"
                  step="0.01"
                  className={`border w-[72%] dark:text-white border-gray-400 rounded-2xl p-3`}
                />
              </div>

              <div className='flex px-4 p-3 dark:text-white items-center justify-between gap-3 w-full'>
                <span className='itemname text-lg'>GST:</span>
                <select
                  name="gstApply"
                  onChange={handleChange}
                  className={`border w-[72%] border-gray-400 rounded-2xl p-3`}
                >
                  <option value="yes(18)">Apply GST (18%)</option>
                  <option value="yes(12)">Apply GST (12%)</option>
                  <option value="no">No GST</option>
                </select>
              </div>

              <div className='flex flex-col px-4 p-3 dark:text-white items-center justify-between gap-3 w-full'>
                <span className='mx-auto font-bold text-2xl'>Plating</span>
                {Array.from({ length: platecounter }, (_, i) => i + 1).map(c => {
                  return (<div key={c} className='flex justify-between w-full gap-5'>
                    <select
                      name="platingType"
                      onChange={changePlate}
                      className={`border w-[72%] border-gray-400 rounded-2xl p-3`}
                    >
                      <option value={0}>Select Plating Type</option>
                      {data.plating.map(p => {
                        return <option key={p.id} value={`${p.type}`}>{p.type} Plating</option>
                      })}
                    </select>

                    <input
                      type="number"
                      name={`${c}`}
                      onChange={handlePrice}
                      placeholder="Rate per plate (₹)"
                      min="0"
                      step="0.01"
                      className={`price-${c} border w-[72%] border-gray-400 rounded-2xl p-3`}
                    />
                  </div>)
                })}
                <div className="icons flex w-[70%] justify-between">
                  <div onClick={() => setplatecounter(Math.max(1, platecounter + 1))} className='flex gap-3'>
                    <span>Add</span>
                    <FaPlus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" />
                  </div>
                  <div onClick={() => setplatecounter(Math.max(1, platecounter - 1))} className='flex gap-1'>
                    <span>Remove</span>
                    <FaMinus className="text-2xl p-1 rounded-sm bg-blue-500 text-white dark:text-white mr-3" />
                  </div>
                </div>
              </div>

              <button type='submit' className='bg-blue-600 m-auto mt-8 text-white w-[50%] md:w-[35%] flex items-center rounded-2xl p-2'><FaClipboardList className="text-xl text-white dark:text-blue-400 mr-3" /> Add Order</button>
            </div>

          </form>
        </>}
    </div>
  )
}

export default OrderForm
