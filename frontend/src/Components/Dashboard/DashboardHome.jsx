import React from 'react'
import { Link } from 'react-router-dom'

const DashboardHome = () => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen flex justify-center pt-20">
        <div className="flex justify-center items-center gap-16">
          <Link to="/dashboard/url-shortener" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Url Shortener</Link>
          <Link to="/dashboard/qr-generator" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Qr Generator</Link>
        </div>
      </div>
    </>
  )
}

export default DashboardHome