import React from 'react'
import Whatsapp from './elements/Common/Whatsapp'

const Wrap = (Component:any)=> function() {
  return (
    <div>
        <Component/>
        <Whatsapp/>
    </div>
  )
}

export default Wrap