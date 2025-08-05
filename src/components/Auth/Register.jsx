import React, { useContext, useState } from 'react'
import './Login.css'
import { Store } from '../../Context/Store'

const Register = ({Animation, revAnimation}) => {
    const data = useContext(Store)
    const [formData, setformData] = useState({
        username: "",
        email: "",
        password: ""
    })

    const handleInput = (e) => {
        setformData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const Register = async () => {
        if(!formData.username || !formData.password || !formData.email) {
            data.showNotification("Username Password and Email is required!", "error");
            return;
        }

        Animation();

        const data2 = await fetch('http://localhost:3000/api/register', {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(formData)
        })
        const res = await data2.json();

        if(res.status === 400) {
            revAnimation()
            data.showNotification(res.msg, "error")
        } else {
            revAnimation()
            data.showNotification("Register successfully!", "success")
        }
    }

    return (
        <div className='mt-[7vh] snap-center gap-6 flex flex-col justify-center items-center p-3'>
            <h1 className='font-bold text-2xl  underline underline-offset-10 decoration-7 decoration-blue-400'>Register</h1>
            <div className='flex bg-gray-300 p-2 rounded-2xl w-[85%] gap-3'>
                <label>Username:</label>
                <input onChange={handleInput} className='outline-0' type="text" name='username' placeholder='username' />
            </div>
            <div className='flex bg-gray-300 p-2 rounded-2xl w-[85%] gap-3'>
                <label>Password:</label>
                <input onChange={handleInput} className='outline-0' type="password" name='password' placeholder='password' />
            </div>
            <div className='flex bg-gray-300 p-2 rounded-2xl w-[85%] gap-3'>
                <label>Email:</label>
                <input onChange={handleInput} className='outline-0' type="text" name='email' placeholder='email' />
            </div>
            <button onClick={() => Register()} className='text-white bg-blue-400 px-3 py-2 rounded-2xl'>Register</button>
        </div>
    )
}

export default Register
