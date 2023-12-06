import CancelIcon from '@mui/icons-material/Cancel';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import PlaceIcon from '@mui/icons-material/Place';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import {
	Box,
	Button,
	Typography,
} from '@mui/material';
import { S3_BASE } from '../../../../utils/consts';
import style from '../../../styles/Enquiry/enquiryCard.module.css'
import Disclosure from '../../Common/Disclosure'
const InquiryCard = ({ card }: any) => {
	const Icon = (status:string) => {
		if(status === 'cancelled') {
			return <CancelIcon
			sx={{
				fontSize: '1rem',
				color: '#C1583C',
			}}/>
		}
		else if(status === 'pending') {
			return <WatchLaterIcon
			sx={{
				fontSize: '1rem',
				color: '#F79E1B'
			}}/>
		}

	

	}
	return (
		<Box className={style.cardContainer}>
			<div className={style.profileWrapper}>
					<div className={style.imgContainer}>
						<img src={`${S3_BASE}${card.property.propertyPictures[0]}`} alt='' />
					</div>
				<div className={style.profileInfo}>
					<h2>
						{card.property.propertyName}
					</h2>
					<p>6th block, kormangala, Bengaluru</p>
					{/* <Box marginBottom='1.875rem' display='flex' alignItems='center' gap='0.625rem'>
						<PlaceIcon heig='1.2rem' />
						<Typography fontFamily='Open Sans' fontSize='1.2rem' fontWeight={400}>
							{card.property.city}, {card.property.state}
						</Typography>
					</Box> */}
				</div>
			</div>
			<Box className={style.detailsWrapper}>
				<Box className={style.bookingRequested}>
					<CheckCircleIcon />
					<Typography
						fontFamily='Open Sans'
						fontSize='0.875rem'
						fontWeight={400}
						lineHeight='1.4em'
						color='#383838'
					>
						Booking requested{' '}
						<span
							style={{
								color: '#B0B0B0',
							}}
						>
							on
						</span>{' '}
						<span
							style={{
								color: '#8F7EF3',
							}}
						>
							{new Date(card.createdAt).toLocaleDateString('default', {
								month: 'long',
								day: 'numeric',
								weekday: 'long',
							})}
						</span>
					</Typography>
				</Box>
					
						<Box className={`${style.enquiryBar} ${card.inquiryStatus === 'cancelled' ? style.cancelled : style.pending}`}>
							<h4>Inquiry Status</h4>
							<Box display='flex' alignItems='center' gap='0.313rem'>
								{Icon(card.inquiryStatus)}
								<Typography
									fontSize='0.75rem'
									fontFamily='Open Sans'
									lineHeight='1.4em'
									fontWeight={400}
								>
									{card.inquiryStatus}
								</Typography>
							</Box>
						</Box>
							{card.inquiryStatus === 'cancelled' && <Disclosure title='Why was my enquiry declined ?' text={card.statusUpdateReason}/>}
				<>
				{/* <Box marginTop='1.25rem' display='flex' gap='0.625rem' justifyContent='flex-end'>
					<Button
						sx={{
							border: '1px solid #50555C',
							background: 'transparent',
							outline: 'none',
							borderRadius: '6px',
							textTransform: 'none',
							fontSize: '1rem',
							cursor: 'pointer',
							color: '#303F52',
							fontWeight: '600',
							fontFamily: 'Open Sans',
						}}
					>
						Reschedule
					</Button>
					<Button
						sx={{
							border: '1px solid #50555C',
							background: '#383838',
							outline: 'none',
							borderRadius: '6px',
							textTransform: 'none',
							fontSize: '1rem',
							cursor: 'pointer',
							color: 'white',
							fontWeight: '600',
							fontFamily: 'Open Sans',
						}}
					>
						Edit
					</Button>
				</Box> */}
				</>
				
			</Box>
		</Box>
	);
};

export default InquiryCard;
