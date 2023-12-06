import { ROUTES } from '../../../../utils/routing/routes';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function RegistrationNavbar() {
	const navigate = useNavigate();
	return (
		<Box>
			<Box
				display={{ xs: 'none', md: 'flex', sm: 'flex', xl: 'flex' }}
				fontFamily='Open Sans'
				fontStyle='normal'
				fontWeight='400'
				fontSize='0.938rem'
				lineHeight='1.4em'
				sx={{
					position: 'absolute',
					width: '100%',
					height: '83px',
					top: '12px',
					left: '0',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					borderRadius: '50%',
					zIndex: '3',
				}}
			>
				<Box
					display={{ xs: 'none', md: 'flex', sm: 'flex', xl: 'flex' }}
					flexGrow='1'
					justifyContent='center'
				>
					<img style={{ width: '53px', height: '46px' }} src='/assets/images/logo.svg' alt='' />
				</Box>
				<Box
					display={{ xs: 'none', md: 'flex', sm: 'flex', xl: 'flex' }}
					flexGrow='1.8'
					justifyContent='space-evenly'
					alignItems='center'
				>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							// navigate(ROUTES.ROOT);
						}}
					>
						Home
					</Box>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							/* navigate(ROUTES.PAGE); */
						}}
					>
						About Us
					</Box>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							/* navigate(ROUTES.PAGE); */
						}}
					>
						Blog
					</Box>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							/* navigate(ROUTES.PAGE); */
						}}
					>
						News
					</Box>
					<Box
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							/* navigate(ROUTES.PAGE); */
						}}
					>
						Contact Us
					</Box>
				</Box>
				<Box
					display={{ xs: 'none', md: 'flex', sm: 'flex', xl: 'flex' }}
					flexGrow='0.55'
					justifyContent='center'
					alignItems='center'
					gap={5}
					sx={{}}
				>
					<Box
						color='#8F7EF3'
						zIndex='2'
						sx={{ cursor: 'pointer' }}
						onClick={() => {
							navigate(ROUTES.HOST_LANDING);
						}}
					>
						Become a host
					</Box>
					<Box>
						<Button
							variant='contained'
							style={{
								background: '#8F7EF3',
								color: 'white',
								fontFamily: 'Montserrat',
								fontStyle: 'normal',
								fontWeight: '600',
								fontSize: '0.875rem',
								lineHeight: '24px',
								textTransform: 'capitalize',
								padding: '0.406rem 1.563rem',
								cursor: 'pointer',
							}}
						  onClick={()=>{navigate(ROUTES.LOGIN)}}
						>
							Sign In
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}
