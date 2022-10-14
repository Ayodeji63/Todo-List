import React from 'react'

const Loading = () => {
  return (
    <div className='absolute top-0 w-screen h-screen bg-[#7b7e9477] flex justify-center items-center z-[1000] flex-col'><img src="../todo_icon.JPG" alt="" className='h-[40px] rounded-[50%] animate-bounce' />
    <h1>Loading...</h1>
    </div>
  )
}

export default Loading