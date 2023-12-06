import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';

interface props {
	onClick?: () => void;
}

const What = ({ onClick }: props) => {
	return (
		<Box>
			<Grid container display='flex' direction={{md: 'row', sm: 'column-reverse', xs: 'column-reverse'}} justifyContent='space-evenly' position='relative'>
				<CssBaseline />
				<Grid
					item
					md={5.5}
					sm={12}
					xs={12}
					margin={{ lg: '0 0 0 95px', sm: '0 20px 0 20px'}}
					padding={{ md: '30px 80px', xs: '10px 20px' }}
				>
					<Box
						fontSize={{ md: '36px', xs: '20px' }}
						lineHeight={{ md: '44px', xs: '24.38px' }}
						sx={{
							fontWeight: '700',
						}}
						className='what__header'
					>
						What is Thinnai's Private Dinning?
					</Box>
					
					<Box
						
						fontSize={{ md: '18px', xs: '12px' }}
						lineHeight={{ md: '25px', xs: '16.34px' }}
						sx={{
							fontFamily: 'Open Sans',
							fontStyle: 'normal',
							fontWeight: '300',
						}}
						paddingTop={{
							md: '3rem',
							sm: '3rem',
						}}
						className='what__p'
					>
						Private Dining or Space means a unique, inspired and a secluded space where you can dine, work, read or watch a movie peacefully without the interference of the general Public. Private Dining is not a Private Room. The host( their representative) might be around to assist you, as and when required.
					</Box>
					<Box height={30} />
					<Box display={{ md: 'block', xs: 'none' }}>
						<Button
							variant='contained'
							sx={{
								fontFamily: 'Montserrat',
								fontStyle: 'normal',
								background: '#1A191E',
								color: 'white',
								textTransform: 'none',
								fontWeight: '500',
								fontSize: '18px',
								lineHeight: '22px',
								marginTop: {
									md: '2rem',
									sm: '2rem',
								},
								padding: '12px 40px',
							}}
							onClick={onClick}
						>
							Book Your's Now
						</Button>
					</Box>
				</Grid>
				<Grid
					item
					md={5.5}
					sm={12}
					xs={12}
					width={{
						xs: '80%',
						md: '50%'
					}}
					className='what__img__cont'
					marginTop='1rem'
				>
					<img 
						src='/assets/images/Page/private_dinning_space.png'
						alt=''

					/>
				</Grid>
			</Grid>
			<Box display={{ md: 'none', xs: 'flex' }}>
				<Button
					variant='contained'
					sx={{
						fontFamily: 'Montserrat',
						fontStyle: 'normal',
						background: '#1A191E',
						color: 'white',
						textTransform: 'none',
						fontWeight: '500',
						fontSize: '18px',
						lineHeight: '22px',
						padding: '12px 40px',
						margin: '0 auto',
					}}
					onClick={onClick}
				>
					Check Out Spaces
				</Button>
			</Box>
		</Box>
	);
};

export default What;


