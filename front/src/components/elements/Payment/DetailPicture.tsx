import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { RootState } from '../../../store'
import { S3_BASE_URL } from '../../../utils/consts'
import '../../styles/search.scss'

const DetailPicture = ({ selected, handleSelected }: any) => {
  const location = useLocation()
  const pathName = location.pathname

	const enquiries = useSelector<RootState, any>(state => state.cart.items);
	// const enquiryStatus = useSelector<RootState, any>(state => state.booking.enquiryStatus);

	const [enquiry, setEnquiry] = useState<any>([]);
	// useEffect(() => {
	// 	if (pathName === '/inquiry') {
	// 		setEnquiry(enquiryStatus);
	// 	} else {
	// 		setEnquiry(enquiries);
	// 	}
	// }, [enquiries, enquiryStatus]);

	return (
		<Box
			display={{
				xl: 'block',
				md: 'block',
				sm: 'block',
				xs: 'block',
			}}
			padding={
				pathName === '/inquiry' ? '0rem 0px 0px 0px' : '0rem 0rem 0.938rem 0rem'
			}
		>
			<Box
				display='flex'
				gap={3}
				marginBottom={pathName === '/inquiry' ? '5px' : '2.5rem'}
				justifyContent='center'
			>
				{enquiries.map((enq: any, index: any) => (
					<img
					    className='detailPictureImg'
						key={index}
						width='130px'
						height={145}
						// src={`https://simplem-static.s3.ap-south-1.amazonaws.com/${
						// 	pathName === '/inquiry' ? enq.property.propertyPictures[0] : enq.property.propertyPictures[0]
						// }`}
						src={`https://simplem-static.s3.ap-south-1.amazonaws.com/${enq.property.propertyPictures[0]}`}
						alt='img'
						style={{
							borderRadius: '10px',
							border: selected === index ? '3px solid #FF5A5F' : 'none',
							cursor: 'pointer',
						}}
					/>
				))}
			</Box>
		</Box>
	);
};

export default DetailPicture
