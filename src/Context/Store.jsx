import { createContext, useState, useEffect } from "react";
import MyNotification from "../components/MyNotification";

export const Store = createContext(null);

const StoreProvider = (props) => {
    const [customers, setcustomers] = useState([])
    const [orders, setorders] = useState([])
    const [plating, setplating] = useState([{id:1, type:"Chrome"},{id:2, type:"Nickel"},{id:3, type:"Gold"},{id:4, type:"Silver"},{id:5, type:"Zinc"},{id:6, type:"Copper"}])
    const [currentPage, setcurrentPage] = useState("")
    const [notification, setNotification] = useState(null)


    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    const deleteCustomer = async (id, type) => {//customer //order

        const idData = (type === "customer") ? { customerID: id } : { orderID: id }

        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/delete`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(idData)
        })
        const res = await data.json();

        if (res.status === 400) {
            showNotification(res.msg, "error")
        } else {
            showNotification(res.msg, "success")
            updateArray(id, type);
        }
    }

    const changeStatus = async (id, status) => {
        console.log("data send:", {id, status});
        changeOrder(id);

        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/changestatus`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderID: id, status: status })
        })
        const res = await data.json();

        if(res.status === 400) {
            showNotification(res.msg, "error")
        } else {
            showNotification("Status changed successfully", "success")
        }
    }

    const updateArray = (id, type) => {
        if(type === "customer") {
            setcustomers(customers.filter(c => c._id !== id))
        } else {
            setorders(orders.filter(o => o._id !== id))
        }
    }

    const changeOrder = (id) => {
        let idx = 0;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i]._id == id) {
                idx = i;
            }
        }
        orders[idx].status = !orders[idx].status;
        return;
    }

    useEffect(() => {
        const getcustomers = async () => {
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/allcustomer`)
            const res = await data.json();

            if (res.status === 400) {
                showNotification(res.msg, "error")
            } else {
                // showNotification("Get All Customers Successfully", "success")
                setcustomers(res)
            }
        }
        const getorders = async () => {
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/allorders`)
            const res = await data.json();

            if (res.status === 400) {
                showNotification(res.msg, "error")
            } else {
                // showNotification("Get All Orders Successfully", "success")
                setorders(res)
            }
        }
        getcustomers()
        getorders()
    }, [])


    const ContextValue = {
        customers,
        orders,
        plating,
        setplating,
        setcurrentPage,
        changeStatus,
        showNotification,
        deleteCustomer
    }

    return (
        <Store.Provider value={ContextValue}>
            {notification && (
                <MyNotification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}
            {props.children}
        </Store.Provider>
    )
}

export default StoreProvider