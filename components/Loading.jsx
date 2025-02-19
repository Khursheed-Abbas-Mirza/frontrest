import React from 'react'

const page = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50">
    <div className="flex flex-col items-center bg-transparent p-6 rounded-lg shadow-lg">
      <img src="/loading.gif" alt="Loading" className="w-[360px] h-[360px]" />
    </div>
  </div>
  )
}

export default page

  