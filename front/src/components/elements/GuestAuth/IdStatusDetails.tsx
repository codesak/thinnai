import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { S3_BASE } from '../../../utils/consts';
import { ROUTES } from '../../../utils/routing/routes';

const IdStatusDetails = ({
	isApprovedByHost,
	showEditForm,
	currentUser,
	propertyId,
	isRequestedReupload,
	showingWithDetails,
}: {
	isApprovedByHost: boolean;
	isRequestedReupload: boolean;
	showEditForm: any;
	currentUser: any;
	propertyId: string;
	showingWithDetails: boolean;
}) => {
	const navigate = useNavigate();

	return (
		<Grid container>
			<Grid item xs={12} sm={12} md={12} position='relative'>
				<Box height={{ xl: 30, md: 30, sm: 60, xs: 10 }} />
				<Box
					display='flex'
					alignItems={{
						xl: 'center',
						md: isApprovedByHost ? 'flex-start' : 'center',
						sm: isApprovedByHost ? 'flex-start' : 'center',
						xs: isApprovedByHost ? 'flex-start' : 'center',
					}}
					gap={{
						xl: '1.5rem',
						md: '1rem',
						sm: '1rem',
						xs: '1rem',
					}}
					flexDirection='row'
					justifyContent={isApprovedByHost ? 'space-between' : 'unset'}
				>
					<Typography
						fontSize={{
							xl: '2rem',
							md: '1.5rem',
							sm: '2.5rem',
							xs: '1.8rem',
						}}
						fontWeight='700'
						letterSpacing='0.015em'
						fontFamily='Montserrat'
						lineHeight='1.4em'
					>
						ID Uploaded!
					</Typography>
					{isApprovedByHost ? (
						<Box
							width={{
								xl: '3.25rem',
								md: '2.7rem',
								sm: '2.125rem',
								xs: '2.125rem',
							}}
							height={{
								xl: '3.25rem',
								md: '2.7rem',
								sm: '2.125rem',
								xs: '2.125rem',
							}}
							sx={{
								marginLeft: '1rem',
							}}
						>
							<img width='100%' height='100%' src='/assets/images/success.svg' alt='' />
						</Box>
					) : (
						<Box
							bgcolor='#FFE7E7'
							paddingX='1rem'
							paddingY='0.5rem'
							borderRadius='164px'
							sx={{
								marginLeft: 'auto',
							}}
						>
							<Typography
								fontSize='0.7rem'
								lineHeight='1.4em'
								letterSpacing='0.015em'
								fontWeight={400}
								color='#861212'
								textAlign='center'
							>
								Host {isRequestedReupload ? 'Requested Re-Upload' : 'Verifying'}
							</Typography>
						</Box>
					)}
				</Box>
				<Box
					display='flex'
					justifyContent='center'
					alignItems='center'
					flexDirection='column'
					marginTop={{
						xl: '3rem',
						md: '3rem',
						sm: '3rem',
						xs: '3rem',
					}}
					marginBottom={{
						xl: '2rem',
						md: '2rem',
						sm: '4rem',
						xs: '2rem',
					}}
				>
					<Box
						width='9.75rem'
						height='9.75rem'
						borderRadius='50%'
						overflow='hidden'
						border='1px dashed #8F7EF3'
					>
						<img width='100%' height='100%' src={`${S3_BASE}${currentUser.profileImage}`} alt='' />
					</Box>
					<Typography
						marginTop={{
							xl: '1.5rem',
							md: '1.5rem',
							sm: '2.1rem',
							xs: '2.1rem',
						}}
						fontSize={{
							xl: '2.188rem',
							md: '2.188rem',
							sm: '2.188rem',
							xs: '2.188rem',
						}}
						fontWeight='600'
						fontFamily='Open Sans'
						textAlign='center'
						lineHeight='1.4em'
					>
						{currentUser.fullName}
					</Typography>
				</Box>

				<Box
					display='flex'
					gap={{
						xl: '0.8rem',
						md: '0.5rem',
						xs: '0rem',
					}}
					flexDirection={{
						xl: 'row',
						md: 'row',
						sm: 'column',
						xs: 'column',
					}}
					marginBottom={{
						xl: '2rem',
						md: '1rem',
						sm: '1.5rem',
						xs: '1.5rem',
					}}
				>
					<Typography
						fontWeight={600}
						lineHeight='1.5em'
						color='#1A191E'
						fontSize={{
							md: '1.3rem',
						}}
					>
						ID Type :
					</Typography>
					<Typography
						fontWeight={400}
						lineHeight='1.5em'
						color='#1A191E'
						fontSize={{
							md: '1.3rem',
						}}
					>
						{currentUser.idProofType}
					</Typography>
				</Box>
				<Box
					display='flex'
					gap={{
						xl: '0.8rem',
						md: '0.5rem',
						xs: '0rem',
					}}
					flexDirection={{
						xl: 'row',
						md: 'row',
						sm: 'column',
						xs: 'column',
					}}
					marginBottom={{
						xl: '2rem',
						md: '1rem',
						sm: '1.5rem',
						xs: '1.5rem',
					}}
				>
					<Typography
						fontWeight={600}
						lineHeight='1.5em'
						color='#1A191E'
						fontSize={{
							md: '1.3rem',
						}}
					>
						ID Number :
					</Typography>
					<Typography
						fontWeight={400}
						lineHeight='1.5em'
						color='#1A191E'
						fontSize={{
							md: '1.3rem',
						}}
					>
						{currentUser.idProofNumber}
					</Typography>
				</Box>
				<Box
					display='flex'
					gap={{
						xl: '0.8rem',
						md: '0.5rem',
						xs: '0rem',
					}}
					flexDirection='column'
					marginBottom={{
						xl: '2rem',
						md: '1rem',
						sm: '3rem',
						xs: '3rem',
					}}
				>
					<Typography
						fontWeight={600}
						lineHeight='1.4em'
						color='#1A191E'
						fontSize={{
							md: '1.3rem',
						}}
					>
						Photo ID :
					</Typography>
					<Box
						display='flex'
						flexDirection={{
							xl: 'row',
							md: 'row',
							sm: 'column',
							xs: 'column',
						}}
						gap={{
							xl: '0rem',
							md: '0rem',
							sm: '1rem',
							xs: '1rem',
						}}
					>
						<Box
							width={{
								xl: '50%',
								md: '50%',
								sm: '100%',
								xs: '100%',
							}}
							height='8.875rem'
						>
							<img
								width='100%'
								height='100%'
								style={{
									objectFit: 'contain',
								}}
								src={`${S3_BASE}${currentUser.idProofFront}`}
								alt=''
							/>
						</Box>
						<Box
							width={{
								xl: '50%',
								md: '50%',
								sm: '100%',
								xs: '100%',
							}}
							height='8.875rem'
						>
							<img
								width='100%'
								height='100%'
								style={{
									objectFit: 'contain',
								}}
								src={`${S3_BASE}${currentUser.idProofBack}`}
								alt=''
							/>
						</Box>
					</Box>
				</Box>
				<Box
					display='flex'
					alignItems='center'
					gap='1rem'
					marginBottom={{
						md: '2rem',
						xs: '0rem',
					}}
					marginTop={{
						md: '2rem',
						xs: '0rem',
					}}
					sx={{
						'@media (max-width: 405px)': {
							gap: '0.5rem',
						},
					}}
				>
					<Button
						onClick={showEditForm}
						variant='contained'
						sx={{
							width: '25%',
							border: '1px solid black',
							textTransform: 'none',
							background: 'transparent',
							color: '#000000',
							paddingY: '0.3rem',
							fontSize: '1.1rem',
							'&:hover': {
								background: 'transparent',
								border: '1px solid #1976d2',
							},
							'@media (max-width: 405px)': {
								width: '35%',
								fontSize: '1.125rem',
							},
						}}
					>
						Edit
					</Button>
					{!showingWithDetails && (
						<Button
							onClick={() => navigate(`${ROUTES.PROPERTY_DETAIL}/${propertyId}`)}
							variant='contained'
							sx={{
								width: '60%',
								background: 'black',
								textTransform: 'none',
								border: '1px solid black',
								paddingY: '0.625rem',
								fontSize: '1.375rem',
								'&:hover': {
									border: '1px solid #1976d2',
									background: 'black',
								},
								'@media (max-width: 405px)': {
									width: '65%',
									fontSize: '1.125rem',
									px: '0px',
								},
							}}
						>
							Checkout Thinnai
						</Button>
					)}
				</Box>
			</Grid>
			<Grid item xs={false} sm={false} md={1}></Grid>
		</Grid>
	);
};

export default IdStatusDetails;
