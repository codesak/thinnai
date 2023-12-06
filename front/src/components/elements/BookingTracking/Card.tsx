import React from 'react'
import style from '../../styles/Booking/card.module.css'
const Card = () => {
  return (
    <div className={style.container}>
        <div>
            <img src={process.env.PUBLIC_URL + '/assets/images/cakeico.svg'} alt="" />
        </div>
        <p>Hookah</p>
        <p>Charges: <span>₹99</span></p>
    </div>
  )
}

export default Card