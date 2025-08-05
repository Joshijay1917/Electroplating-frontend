import React, { useContext, useState } from 'react'
import './Login.css'
import { Store } from '../../Context/Store'

const Login = ({Animation, revAnimation, setisAuthenticated}) => {
    const data = useContext(Store)
    const [formData, setformData] = useState({
        username: "",
        password: ""
    })

    const handleInput = (e) => {
        setformData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const Login = async () => {
        if(!formData.username || !formData.password) {
            data.showNotification("Username and Password is required!", "error");
            return;
        }

        Animation();

        const data2 = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/login`, {
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
            setisAuthenticated(true)
        }
    }

    return (
        <div className='mt-[7vh] snap-center gap-6 flex flex-col justify-center items-center'>
            <h1 className='font-bold text-2xl  underline underline-offset-10 decoration-7 decoration-blue-400'>Login</h1>
            <div className='flex bg-gray-300 p-2 rounded-2xl w-[85%] gap-3'>
                <label>Username:</label>
                <input onChange={handleInput} className='outline-0' type="text" name='username' placeholder='username' />
            </div>
            <div className='flex bg-gray-300 p-2 rounded-2xl w-[85%] gap-3'>
                <label>Password:</label>
                <input onChange={handleInput} className='outline-0' type="password" name='password' placeholder='password' />
            </div>
            <button onClick={() => Login()} className='text-white bg-blue-400 px-3 py-2 rounded-2xl'>Login</button>
        </div>
    )
}

export default Login
