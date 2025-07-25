import { createContext, useState, useEffect } from "react";
import MyNotification from "../components/MyNotification";

export const Store = createContext(null);

const StoreProvider = (props) => {
    const [customers, setcustomers] = useState([])
    const [orders, setorders] = useState([])
    const [plating, setplating] = useState([{id:1, type:"Chrome"},{id:2, type:"Nickel"},{id:3, type:"Gold"},{id:4, type:"Silver"},{id:5, type:"Zinc"},{id:6, type:"Copper"}])
    const [currentPage, setcurrentPage] = useState("")
    const [notification, setNotification] = useState(null)
    const [loading, setloading] = useState(0)
    const [currcusorder, setcurrcusorder] = useState([])

    const showNotification = (message, type) => {
        setNotification({ message, type })
        setTimeout(() => setNotification(null), 3000)
    }

    const deleteCustomer = async (id, type) => {//customer //order
        setloading(!loading)

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
            setloading(0)
            showNotification(res.msg, "error")
        } else {
            if(type === "customer") {
                setcustomers(customers.filter(c => c._id !== id))
                setorders(orders.filter(o => o.customerid !== id))
                setloading(0)
                showNotification(res.msg, "success")
            } else {
                setorders(orders.filter(o => o._id !== id))
                setloading(0)
                showNotification(res.msg, "success")
            }
        }
    }

    const changeStatus = async (id, status) => {
        setloading(!loading)
        console.log("data send:", {id, status});
        changeOrder(id);

        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/changestatus`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ orderID: id, status: status })
        })
        const res = await data.json();

        if(res.status === 400) {
            setloading(0)
            showNotification(res.msg, "error")
        } else {
            console.log("setloading",loading)
            setloading(0)
            showNotification("Status changed successfully", "success")
            console.log("seted",loading)
        }
    }

    const currentCustomerOrder = async(id) => {
        setloading(!loading);
        console.log("ID:",id);
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/api/currentcustomerorder`, {
            method: 'POST',
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify({customersid: id})
        })
        const res = await data.json();

        console.log("Res:",res);

        if(res === 400) {
            setloading(0)
            showNotification(res.msg, "error")
        } else {
            setloading(0)
            showNotification("Current customer orders geted", "success")
            setcurrcusorder(res)
        }
    }

    //console.log("orders:",currcusorder);

    const changeOrder = (id) => {
        let idx = 0;
        for (let i = 0; i < orders.length; i++) {
            if (orders[i]._id == id) {
                idx = i;
            }
        }
        console.log((!JSON.parse(orders[idx].status)).toString());
        orders[idx].status = (!JSON.parse(orders[idx].status)).toString();
        console.log(orders[idx])
        return;
    }
console.log("customer:",customers)
        const getcustomers = async () => {
            setloading(!loading)
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/allcustomer`)
            const res = await data.json();

            if (res.status === 400) {
                setloading(0)
                showNotification(res.msg, "error")
            } else {
                setloading(0)
                // showNotification("Get All Customers Successfully", "success")
                setcustomers(res)
            }
        }
        const getorders = async () => {
            setloading(!loading)
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/allorders`)
            const res = await data.json();

            if (res.status === 400) {
                setloading(0)
                showNotification(res.msg, "error")
            } else {
                setloading(0)
                // showNotification("Get All Orders Successfully", "success")
                setorders(res)
            }
        }
    useEffect(() => {
        getcustomers()
        getorders()
    }, [])


    const ContextValue = {
        customers,
        orders,
        plating,
        currcusorder,
        currentCustomerOrder,
        setloading,
        loading,
        getcustomers,
        getorders,
        setplating,
        setcurrentPage,
        currentPage,
        changeStatus,
        showNotification,
        deleteCustomer
    }

    return (
        <Store.Provider value={ContextValue}>
            {loading ? <div className="bg-black/30 fixed z-40 w-full h-full flex justify-center items-center">
                <div className="animate-spin rounded-full border-4 border-solid border-t-transparent text-blue-800 h-19 w-19"></div>
                </div> : null}
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
