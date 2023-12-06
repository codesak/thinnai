import React from 'react'
import style from '../../styles/whatsapp.module.css'
import icon from '../../../assets/images/whatsapp.svg'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store'
const WhatsappMobile = () => {
  const user = useSelector<RootState, any>((state:any) => state.guestAuth.user)
  const token = localStorage.getItem('token')
  let url:any = null;
  if(token) {
    url = `https://wa.me/+919677790546?text=Hi%20there!%20I'm%20${user.firstName} ${user.lastName}.%20My%20User%20Id%20is%20${user.phone}.%20I’m%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20`
  } else {
    url = "https://wa.me/+919677790546?text=Hi%20there!%20I'm%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20"
  }
  return (
    <div className={`${style.whatsappContainerMobile} ${style.updown}`}>
        <div className={style.chatWrapper}>
            <p>Contact Us</p>
        </div>
        <div className={style.wrapper}>
            <a href={url} target='_blank'><img src={icon} className={style.icon} alt="" loading="lazy" /></a>  
        </div>
    </div>
  )
}

export default WhatsappMobile