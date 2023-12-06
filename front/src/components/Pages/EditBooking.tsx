import {useState} from 'react'
import style from '../styles/editBooking.module.css'
import Services from '../elements/BookingTracking/Services';
import BookingCard from '../elements/BookingTracking/BookingCard';
import Card from '../elements/BookingTracking/Card';
import EditBookin from '../elements/BookingTracking/EditBooking';
import { Box } from '@mui/material';
const EditBooking = () => {
    const [additionalServices,setAdditionalServices] = useState(false);
    const [screen,setScreen] = useState(0)
    const handleProceed = () => {
      if(screen <= 2){
        setScreen((prev) => prev+1)
      }
      else {

      }
    }
    const handleBack = () => {
      if(screen > 0) {
        setScreen((prev) => prev-1)
      }
      else {
        window.history.back()
      }
    }
  return (
    // <div className={style.mainContainer}>
    //   <nav className={style.mobileNav}>
		// 	<div onClick={handleBack}>
		// 		<img src={process.env.PUBLIC_URL + '/assets/images/enquiry/back.png'} alt="" />
		// 	</div>
		// 	<h4>Edit Booking</h4>
	  // </nav>
    //     {/* Property Image */}
    //     <div className={style.propImgContainer}>
    //       <img src="/assets/images/dummy.png" alt="" />
    //     </div>
    //     <div className={style.detailsContainer}>
    //         <div className={style.detailsWrapper}>
    //           {
    //             screen === 0 && <div>
    //             <h4>Group Details</h4>
    //               <div>
    //                   <h5>No. of Guests</h5>
    //                   <div className={style.groupBtn}>
    //                       <button>-</button>
    //                       <h6>2</h6>
    //                       <button>+</button>
    //                   </div>
    //               </div>
    //               <div>
    //                   <div className={style.permitOne}>
    //                       <h5>Select To Add Permits To Bring</h5>
    //                       <div className={style.cardsContainer}>
    //                           <Card/>
    //                           <Card/>
    //                           <Card/>
    //                       </div>
    //                   </div>
    //                   <div className={style.servicesWithCharge}>
    //                       <h5>Select To Add Permits To Bring</h5>
    //                       <p>Cleaning charges are applicable</p>
    //                       <Services/>
    //                   </div>
    //               </div>
    //             </div>
    //           }
    //           {
    //             screen === 1 && <div>
    //             <div>
    //               <h5>Do You Require Plates/Glasses/Cutlery?</h5>
    //               <p>Get <span>5% discount</span>on the booking price by selecting ‘No’</p>
    //             </div>
    //             <div className={style.cardsContainer}>
    //               <Card/>
    //               <Card/>
    //             </div>
    //           </div>
    //           }
    //           {
    //             screen === 2 && <div className={style.additionalCard}>
    //             <h5>Select Additional Services</h5>
    //             <BookingCard/>
    //           </div>
    //           }
              
              
                
    //         </div>
    //     </div>
    //     <div className={style.proceedContainer}>
    //         <div className={style.mobileProceedBar}>
    //             <div className={style.priceContainer}>
    //               <p>To be Paid</p>
    //               <h5 className={style.discountedPrice}>
    //                 ₹ 100
    //               </h5>
    //             </div>
    //             <button className={style.proceedBtn} onClick={handleProceed}>Proceed</button>
    //         </div>
    //     </div>
    // </div>
    <>
    <Box padding='2rem 1rem'>
    <EditBookin/>
    </Box>
    </>
  )
}

export default EditBooking