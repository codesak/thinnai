import React from 'react'
import style from '../../styles/Booking/services.module.css'
import Card from './Card'
const Services = () => {
  return (
    <div className={style.container}>
        <Card/>
        <Card/>
        <Card/>
    </div>
  )
}

export default Services