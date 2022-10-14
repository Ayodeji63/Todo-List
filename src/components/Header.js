import React from 'react'
import { AiFillSetting } from 'react-icons/ai'

const Header = () => {
  return (
    <header>
      <div className="TodoPage__header z-[1] sticky">
          <h1>UltiToDo</h1>
          <p>
            <AiFillSetting size={30} className=" cursor-pointer" />
          </p>
        </div>
        <img
        src="./todo-app-main/images/bg-desktop-dark.jpg"
        className="h-[250px] w-full img"
        alt=""
      />
    </header>
  )
}

export default Header