import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { FaIndustry, FaMoon, FaSun } from 'react-icons/fa'
import { HiAdjustmentsHorizontal } from 'react-icons/hi2'
import { TfiAlignJustify } from 'react-icons/tfi'

const Navbar = ({ toggleDarkMode, darkmode }) => {
    return (
        <div className="nav px-3 bg-gray-200 dark:bg-gray-500 rounded-b-4xl top-0 flex text-3xl w-full justify-between items-center">
            <div className='flex items-center gap-3'>
                <HiAdjustmentsHorizontal className='text-[30px] md:text-[45px]'/>
                <div className='flex'>
                    <img className='w-[70px] md:w-[82px] h-[70px] md:h-[82px] rounded-full m-auto' src="logo2nobg.png" alt="" />
                    <div className='px-2 py-4'>
                        <h1 className='text-[22px] md:text-3xl'>Electroplating</h1>
                        <p className='text-[15px] md:text-xl'>Order Management</p>
                    </div>
                </div>
            </div>
            <button  onClick={()=>toggleDarkMode()} className="m-2 top-6 right-1 md:right-8 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full text-gray-900/70 w-12 h-12 flex items-center justify-center cursor-pointer transition-all hover:scale-105 hover:bg-white/30 dark:bg-black/30 dark:border-black/40 dark:text-amber-400 shadow-lg">{darkmode ? <FaSun /> : <FaMoon />}</button>
        </div>

    )
}

export default Navbar
