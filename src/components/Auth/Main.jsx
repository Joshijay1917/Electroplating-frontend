import React, {useContext, useState} from 'react'
import './Login.css'
import { Store } from '../../Context/Store'
import Login from './Login'
import Register from './Register'

const Main = ({setisAuthenticated}) => {
    const data = useContext(Store)
    const [goDown, setgoDown] = useState(false)
    const [setThings, setsetThings] = useState(false)

    const Animation = () => {
        setgoDown(true)
        setTimeout(() => {
            setsetThings(true)
        }, 3000);
    }
    const revAnimation = () => {
        setgoDown(false)
        setTimeout(() => {
            setsetThings(false)
        }, 3000);
    }

    return (
        <div className='dark:bg-gray-700 bg-linear-to-r from-sky-500 to-blue-400 w-[100vw] h-[100vh]'>
            <div className={`${goDown ? "goDown" : "goUp"} ${setThings ? "h-0 top-[100%]" : "h-[80%] top-[20%]"} bg-white relative`}></div>
                <img className={`${goDown ? "logo animate-spin" : "logoUp"} ${setThings ? "settop" : ""} z-10 absolute top-[15%] setleft bg-white rounded-full`} width={80} height={80} src="./logo2nobg.png" alt="" />
                <div className={`${goDown ? "form" : "formUp"} ${setThings ? "h-[1vh] p-[15px] top-[50%]" : "h-[70%] top-[20%]"} overflow-clip bg-black/10 p-6 absolute left-[5%] rounded-2xl w-[90%] mx-auto flex flex-col justify-center items-center`}>
                <div className='snap-x snap-mandatory'>
                    <Login Animation={Animation} revAnimation={revAnimation} setisAuthenticated={setisAuthenticated}/>
                    {/* <Register Animation={Animation} revAnimation={revAnimation}/> */}
                </div>
                </div>
            
        </div>
    )
}

export default Main
