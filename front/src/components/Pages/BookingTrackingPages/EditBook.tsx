import { Box, Button, Typography } from '@mui/material';
import style from '../../styles/Booking/editBook.module.css'
import { useNavigate } from 'react-router-dom';
const EditBook = (props:any) => {
	const navigate = useNavigate();
	return (
		<div className={style.editBook}>
			<Button
				sx={{
					width: '100%',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '0.5rem',
					display: 'flex',
					borderRadius: '5px',
					cursor: 'pointer',
					transition: '0.3s',
					textTransform: 'none',
					':hover': {
						background: '#f7f5ffad',
					},
				}}
				{...props}
				onClick={()=> navigate('/track/confirmed/edit')}
			>
				<Box
					display='flex'
					alignItems='center'
					gap={{
						md: '1rem',
						sm: '0.396rem',
						xs: '0.396rem',
					}}
				>
					<Box
						display='flex'
						justifyContent='center'
						alignItems='center'
						width={{
							xs: '40px',
						}}
					>
						<img width='100%' src='/assets/images/profile/payments.svg' alt='' />
					</Box>
					<Typography
						fontFamily='Montserrat'
						textAlign='center'
						fontSize='1rem'
						fontWeight={600}
						color='#272F3D'
					>
						Edit Booking
					</Typography>
				</Box>
				<Box
					fontWeight='700'
					fontSize='1.25rem'
					sx={{
						transform: 'rotate(180deg)',
					}}
				>
					<img src='/assets/images/detail/arrowBack.svg' alt='' />
				</Box>
			</Button>
		</div>
	);
};

export default EditBook;
