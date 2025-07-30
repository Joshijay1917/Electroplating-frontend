import React, {useState} from 'react'
import './Login.css'

const Login = () => {
    const [anim, setanim] = useState(true)
    const [form, setform] = useState(true)

    const animfun = () => {
        setanim(false);
        setTimeout(() => {
            setform(false);
        }, 3000);
    }

    return (
        <div className='dark:bg-gray-700 bg-linear-to-r from-sky-500 to-blue-400 w-[100vw] h-[100vh]'>
            <div className='flex justify-center items-center text-white dark:text-white'>
                <img className='w-[70px] md:w-[82px] h-[70px] md:h-[82px] rounded-full' src="logo2nobg.png" alt="" />
                <div className='px-2 py-4'>
                    <h1 className='text-[21px] font-bold md:text-4xl'> Harshd Electroplating</h1>
                    <p className='text-[18px] font-bold md:text-xl'>Order Management</p>
                </div>
            </div>
            {form && <div className={`${anim ? 'login' : 'login2'} h-[80vh] bg-gray-200 dark:bg-gray-500 absolute overflow-clip w-full rounded-t-4xl top-[20vh]`}>
                <div className='w-full h-[70%] gap-4 flex flex-col justify-center items-center text-gray-800 dark:text-white'>
                    <h1 className='font-bold text-2xl  underline underline-offset-10 decoration-7 decoration-blue-400 m-8'>Login</h1>
                    <div className='flex gap-2 items-center'>
                        <label>Username:</label>
                        <input type="text" className='bg-gray-300 p-2 rounded-2xl' />
                    </div>
                    <div className='flex gap-2 items-center'>
                        <label>Password:</label>
                        <input type="text" className='bg-gray-300 p-2 rounded-2xl' />
                    </div>
                    <button onClick={()=>animfun()} className='bg-blue-400 text-white px-4 m-4 py-2 rounded-2xl'>Login</button>
                </div>
            </div>}
        </div>
    )
}

export default Login
