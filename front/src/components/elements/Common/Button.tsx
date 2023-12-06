import React from 'react'
import style from '../../styles/button.module.css'
const Button = ({children}:any) => {
  return <button className={style.button}>{children}</button>
}

export default Button