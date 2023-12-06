import React from 'react'
import style from '../../styles/Booking/additional.module.css';
const AdditionalServiceCard = () => {
  return (
    <div className={style.container}>
      <div className={style.imgContainer}>
        <img src={process.env.PUBLIC_URL + '/assets/images/host_landing/blog-1.png'} alt="" />
      </div>
      <div className={style.info}>
        <h4>Private Movie Experience</h4>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi minima illo maxime laudantium soluta distinctio pariatur magni sint eaque omnis.</p>
      </div>
    </div>
  )
}

export default AdditionalServiceCard