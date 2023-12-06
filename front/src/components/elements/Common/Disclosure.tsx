import { Disclosure } from '@headlessui/react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import style from '../../styles/disclosure.module.css'

function MyDisclosure({title,content}:any) {
  return (
    <Disclosure>
       {({ open }) => (
        <>
          <Disclosure.Button className={style.title}>
            {title}
            <ExpandMoreIcon className={`${open ? style.open : style.close}`} />
          </Disclosure.Button>
          <Disclosure.Panel>{content}</Disclosure.Panel>
        </>
      )}
      
    </Disclosure>
  )
}

export default MyDisclosure