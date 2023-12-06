import {useState} from 'react'
import '../styles/success.css'
import NavBar from '../elements/Explore/NavBar'
import { useDispatch } from 'react-redux'
import { loadPlaces } from '../../actions/main'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { RootState } from '../../store'
const Success = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [stateSearched, setStateSearched] = useState(false);
    const [searchState, setSearchState] = useState(false);
    const user = useSelector<RootState, any>((state:any) => state.guestAuth.user)
	const openSearch = () => {
		setSearchState(true);
	};
	const searched = () => {
		setSearchState(false);
		setStateSearched(true);
		dispatch(loadPlaces());
	};
    const handleClick = () => {
        let newWindow = window.open();
        const token = localStorage.getItem('token')
  let url:any = null;
  if(token) {
    url = `https://wa.me/+919677790546?text=Hi%20there!%20I'm%20${user.firstName} ${user.lastName}.%20My%20User%20Id%20is%20${user.phone}.%20I’m%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20`
  } else {
    url = "https://wa.me/+919677790546?text=Hi%20there!%20I'm%20in%20need%20of%20assistance.%20Can%20you%20please%20help%20me.%20Thank%20You!%20"
  }
      if (newWindow != null) {
        newWindow.location.href = url;
      }
    }
  return (
    <>
    <div className='viewdetails' onClick={() => navigate('/explore')}>
      <img src="/assets/images/detail/arrowBack.svg" alt="" />
    </div>
    <NavBar
					stateSearched={stateSearched}
					setStateSearched={setStateSearched}
					searchTabOpen={openSearch}
					state={searchState}
					searchTabClose={() => setSearchState(false)}
					searched={searched}
				/>
        <div className='summaryWrapper'>
    
    <div className='success-mainContainer'>
        
        <div>
            <h1 className='success-title'>Enquiry Submitted<br/>Successfully!</h1>
            <p className='success-info'>Thank you for your interest, Our team will contact <br className='successbr'/>you shortly.We are excited to assist you to your <br className='successbr'/>Thinnai Experience.</p>
            <div className='successBtnsContainer'>
                <button className='successBtns' onClick={handleClick}>Contact Us</button>
                <button className='successBtns successDark' onClick={ () => navigate('/explore')}>Explore Spaces</button>
            </div>
        </div>
        <div className='successImgContainer'>
            <img src="/assets/images/enquirySubmitted.svg" alt="" />
        </div>
        <div className='successImgContainerMobile'>
          <img src="/assets/images/enquirySubmittedMobile.svg" alt="" />
        </div>
    </div>
    </div>
    </>
    
  )
}

export default Success