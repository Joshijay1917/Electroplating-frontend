import { useContext, useEffect } from "react"
import { Store } from "../../Context/Store"

export default function StatsCard({ value, label, bg, page }) {
    const data = useContext(Store)
  useEffect(() => {
    data.setcurrentPage(page)
  }, [])
    return (
      <div className={`rounded-xl p-6 text-center transition-all hover:-translate-y-1 hover:shadow-lg dark:border-gray-600 ${bg} border-gray-400 border`}>
        <div className="text-3xl font-bold text-white dark:text-gray-100 mb-2">{value}</div>
        <div className="text-sm uppercase tracking-wider text-white dark:text-gray-100 font-medium">{label}</div>
      </div>
    )
  }
