import React from 'react'

function Button({text, className, click}) {
  return (
    <div className={`btn ${className}`} onClick = {click}>{text}</div>
  )
}

export default Button