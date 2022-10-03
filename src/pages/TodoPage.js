import React, {useContext} from 'react'
import { useAuth } from "../Context/AuthContext";
import {useNavigate} from 'react-router-dom'
const TodoPage = () => {
  const {logout, user} = useAuth()
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/sign')
    } catch (e) {
      alert(e.message)
    }
  }
  return (
    <section className='w-full flex justify-between items-center p-4 bg-[#c058f3]'>
      <h1 className='text-3xl'>Welcome To UltiToDO </h1>
      <button className='border px-6 py-2 my-4' onClick = {handleLogout}>Log Out</button>
    </section>
  )
}

export default TodoPage