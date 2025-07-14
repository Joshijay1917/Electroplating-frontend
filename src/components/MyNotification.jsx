import { useEffect } from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaTimes } from 'react-icons/fa'

export default function MyNotification({ message, type, onClose }) {
  const typeClasses = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-amber-500'
  }

  const icons = {
    success: <FaCheckCircle className="mr-2" />,
    error: <FaExclamationTriangle className="mr-2" />,
    warning: <FaExclamationTriangle className="mr-2" />
  }

  useEffect(() => {
    const timer = setTimeout(onClose, 3000)
    return () => clearTimeout(timer)
  }, [onClose])

  return (
    <div className={`fixed top-5 z-30 right-5 ${typeClasses[type]} text-white px-5 py-3 rounded-lg shadow-lg flex items-center animate-slide-in`}>
      {icons[type]}
      <span>{message}</span>
      <button onClick={onClose} className="ml-4">
        <FaTimes />
      </button>
    </div>
  )
}