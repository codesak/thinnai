import React, { useEffect } from 'react'
import style from '../../styles/Detail/slot.module.css'


interface slot {
    time: string;
    key: number;
    isUnavailable: boolean | undefined;
}
const Slot = ({time,isUnavailable}: slot) => {
  return (
    <div className={`${style.main} ${isUnavailable ? `${style.red}` : `${style.green}`}`}></div>
  )
}

export default Slot
