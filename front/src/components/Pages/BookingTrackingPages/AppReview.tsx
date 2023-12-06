import { Box, TextareaAutosize, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface propsInterface {
	openAppReview: boolean;
	handleCloseAppReview: any;
}

const AppReview = ({ openAppReview, handleCloseAppReview }: propsInterface) => {
	const [appReview, setAppReview] = useState(true);
	const [appReviewComment, setAppReviewComment] = useState(false);
	const [submitted, setSubmitted] = useState(false);
	const reacts = [
		{ title: 'Very Satisfied', img: '/assets/images/review-reacts/very-satisfied.svg' },
		{ title: 'Satisfied', img: '/assets/images/review-reacts/satisfied.svg' },
		{ title: 'Not Satisfied', img: '/assets/images/review-reacts/not-satisfied.svg' },
	];
	return (
		<div>
			<Dialog
				open={openAppReview}
				onClose={handleCloseAppReview}
				aria-labelledby='responsive-dialog-title'
			>
				{appReview && (
					<Box
						paddingX={{
							md: '3rem',
							xs: '0rem',
						}}
					>
						<DialogTitle
							sx={{
								textAlign: 'center',
								paddingY: '2rem',
								fontSize: '1.7rem',
							}}
							id='responsive-dialog-title'
						>
							{'App Review'}
						</DialogTitle>
						<DialogContent>
							<Box>
								<Typography
									fontWeight={600}
									color='#50555C'
									fontFamily='Open Sans'
									fontSize={{
										md: '1rem',
										xs: '0.875rem',
									}}
								>
									How was your experience of using App?
								</Typography>
								<Box display='flex' justifyContent='space-between' marginTop='0.4rem'>
									{reacts.map((item, index) => (
										<Button
											key={index}
											sx={{
												display: 'flex',
												flexDirection: 'column',
												textTransform: 'none',
												gap: 0,
											}}
										>
											<Box
												width={{
													md: '84px',
													xs: '54px',
												}}
											>
												<img width='100%' src={item.img} alt='' />
											</Box>
											<Typography
												color='#50555C'
												textAlign='center'
												marginTop='-0.6rem'
												fontSize={{
													md: '0.8rem',
													xs: '0.625rem',
												}}
											>
												{item.title}
											</Typography>
										</Button>
									))}
								</Box>
							</Box>
						</DialogContent>
						<DialogActions
							sx={{
								justifyContent: 'center',
								marginBottom: '1rem',
								marginTop: '1rem',
							}}
						>
							<Button
								onClick={() => {
									setAppReview(false);
									setAppReviewComment(true);
								}}
								sx={{
									backgroundColor: '#272F3D',
									width: '60%',
									color: '#FFFFFF',
									textTransform: 'none',
									fontFamily: 'Open Sans',
									fontWeight: '600',
									fontSize: { xs: '0.875rem', md: '1rem' },
									':hover': {
										bgcolor: '#8F7EF3',
									},
								}}
							>
								Next
							</Button>
						</DialogActions>
					</Box>
				)}
				{appReviewComment && (
					<Box
						paddingX={{
							md: '3rem',
							xs: '0rem',
						}}
					>
						<DialogTitle
							sx={{
								textAlign: 'center',
								paddingY: '2rem',
								fontSize: '1.7rem',
							}}
							id='responsive-dialog-title'
						>
							{'Host Review'}
						</DialogTitle>
						<DialogContent>
							<Box>
								<Typography
									fontWeight={600}
									color='#50555C'
									fontFamily='Open Sans'
									fontSize={{
										md: '1rem',
										xs: '0.875rem',
									}}
								>
									Write about your experience ?
								</Typography>
								<Box
									marginTop={{
										md: '1.8rem',
										xs: '1rem',
									}}
								>
									{/* <TextareaAutosize
										aria-label='empty textarea'
										placeholder='Leave a message, if you want'
										minRows={5}
										onResize={undefined}
  										onResizeCapture={undefined}
										style={{
											width: '100%',
											padding: '0.5rem',
											fontFamily: 'Open Sans',
											fontSize: '0.8rem',
											border: '0.5px solid #383838',
										}}
									/> */}
								</Box>
							</Box>
						</DialogContent>
						<DialogActions
							sx={{
								justifyContent: 'center',
								marginBottom: '1rem',
								marginTop: '1rem',
							}}
						>
							<Button
								onClick={() => {
									setAppReviewComment(false);
									setSubmitted(true);
								}}
								sx={{
									backgroundColor: '#272F3D',
									width: '60%',
									color: '#FFFFFF',
									textTransform: 'none',
									fontFamily: 'Open Sans',
									fontWeight: '600',
									fontSize: { xs: '0.875rem', md: '1rem' },
									':hover': {
										bgcolor: '#8F7EF3',
									},
								}}
							>
								Submit
							</Button>
						</DialogActions>
					</Box>
				)}
				{submitted && (
					<Box
						paddingX={{
							md: '5rem',
							xs: '3rem',
						}}
						display='flex'
						flexDirection='column'
						alignItems='center'
						paddingY='3rem'
						width='100%'
					>
						<Box marginBottom='0.5rem'>
							<img src='/assets/images/review-reacts/submit.svg' alt='' />
						</Box>
						<DialogTitle
							sx={{
								textAlign: 'center',
								fontSize: { xs: '1rem', md: '1.7rem' },
								paddingY: '0',
								fontFamily: 'Montserrat',
								fontWeight: '600',
							}}
							id='responsive-dialog-title'
						>
							{'Review submitted'}
						</DialogTitle>
					</Box>
				)}
			</Dialog>
		</div>
	);
};

export default AppReview;
