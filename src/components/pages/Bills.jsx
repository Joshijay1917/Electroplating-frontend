import React, { useContext } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import { Store } from '../../Context/Store'
import { useEffect } from 'react'
import "../setheight.css"

const Bills = () => {
    const data = useContext(Store)
    
    useEffect(() => {
        data.setcurrentPage("Bills")
    }, [])
    

    return (
        <div className={`rounded-xl setheight p-8 m-8 relative overflow-hidden shadow-gray-500 transition-all hover:-translate-y-0.5 hover:shadow-lg dark:text-white dark:bg-gray-700 dark:border-gray-600 bg-gray-50 border-gray-400 border`}>
            <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-600 to-blue-800 dark:from-blue-500 dark:to-blue-700"></div>

            <div className="flex items-center mb-6 pb-4 border-b-2 border-gray-200 dark:border-gray-600">
                <FaClipboardList className="text-xl text-blue-600 dark:text-blue-400 mr-3" />
                <h2 className="text-xl font-semibold">All Bills</h2>
            </div>
        </div>
    )
}

export default Bills
