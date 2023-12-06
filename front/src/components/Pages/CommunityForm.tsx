import { makeStyles } from '@mui/styles';
import { TextareaAutosize, useMediaQuery } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';
import axios from 'axios';
import { setAlert } from '../../actions/alert';
import { ALERT_TYPE } from '../../utils/consts';
import { useDispatch } from 'react-redux';

const useStyles: any = makeStyles({
	inputField: {
		border: '0.5px dashed #000000',
		borderRadius: '6px',
		height: '40px',
		width: '100%',
		padding: '0px 10px',
	},
	inputFieldArea: {
		border: '0.5px dashed #000000',
		borderRadius: '6px',
		height: '122px',
		width: '100%',
	},
});

const CommunityForm = () => {
	const dispatch = useDispatch();
	const [communityData, setCommunityData] = useState({
		name: '',
		email: '',
		message: '',
		loading: false,
	});
	const [dataSubmitted, setDataSubmitted] = useState(false);
	const [loadingContentLogging, setLoadingContentLogging] = useState(false);
	const classes = useStyles();
	const breakPoint = useMediaQuery('(max-width:600px)');
	const mdBreakPoint = useMediaQuery('(max-width:900px)');

	return (
		<Formik
			initialValues={communityData}
			validationSchema={object({
				name: string().required('Please enter Name'),
				email: string().required('Please enter Email'),
			})}
			onSubmit={(values, formikHelpers) => {
				setCommunityData({ ...values, loading: true, message: communityData.message });
				setLoadingContentLogging(true);
				axios
					.post(
						'https://bookmythinnai.com/api/public/addContactRequest',
						{
							...values,
							message: communityData.message,
						},
						{ headers: { 'Content-Type': 'application/json' } }
					)
					.then(() => {
						dispatch(setAlert("We'll reach back soon!", ALERT_TYPE.SUCCESS));
						setLoadingContentLogging(false);
						setDataSubmitted(true);
						setCommunityData({ name: '', email: '', message: '', loading: false });
						// dispatch(login(values));
						formikHelpers.resetForm();
					});
			}}
		>
			{({ errors, isValid, touched, dirty, handleSubmit, values }) => (
				<Form onSubmit={handleSubmit}>
					<Box
						sx={{
							backgroundImage: 'url(assets/images/page/community.jpg)',
							backgroundSize: '100%',
							backgroundRepeat: 'no-repeat',
						}}
						display='flex'
						justifyContent='center'
					>
						<Grid
							container
							marginTop={{
								xl: '354px',
								md: '354px',
								sm: '111px',
								xs: '111px',
							}}
							width={{ xs: '80%', md: '70%' }}
							minHeight='540px'
							justifyContent='center'
							position='relative'
							// top="-350px"
							borderRadius={{
								xl: '31px',
								md: '31px',
								sm: '5px',
								xs: '5px',
							}}
							border={{
								xl: '0.5px solid #000000',
								md: '0.5px solid #000000',
								sm: 'none',
								xs: 'none',
							}}
							sx={{
								background: '#F2E1C8',
							}}
						>
							<Grid
								sx={{
									display: mdBreakPoint ? 'none' : 'block',
								}}
								item
								xs={5.6}
								display='flex'
								flexDirection='column'
								justifyContent='space-between'
							>
								<Box
									width='100%'
									fontWeight='600'
									fontSize='36px'
									lineHeight='44px'
									color='#000000'
									textAlign='center'
								>
									<Box margin='50px 90px'>Join the community!</Box>
								</Box>
								<Box position='relative' top='30px' display='flex' flexGrow='1'>
									<img
										style={{ margin: '0 auto' }}
										src='/assets/images/page/host-community.png'
										alt=''
									/>
								</Box>
							</Grid>
							<Grid
								item
								xl={5.6}
								md={5.6}
								sm={10.6}
								xs={10.6}
								padding={{
									xl: '46px',
									md: '46px',
									sm: '26px',
									xs: '26px',
								}}
							>
								<label className='label' htmlFor=''>
									Name
								</label>
								<Box height={8} />
								<Field
									className={classes.inputField}
									type='text'
									placeholder='Enter Name'
									minLength={3}
									name='name'
									size='lg'
									label='Name'
									required
								/>
								{touched.name && errors.name ? (
									<span className='error-msg'>*{errors.name}</span>
								) : null}
								<Box height={24} />
								<label className='label' htmlFor=''>
									Email
								</label>
								<Box height={8} />
								<Field
									className={classes.inputField}
									placeholder='Enter Email'
									type='email'
									minLength={3}
									name='email'
									size='lg'
									label='Email'
									required
								/>
								{touched.email && errors.email ? (
									<span className='error-msg'>*{errors.email}</span>
								) : null}
								<Box height={24} />
								<Box>
									<label className='label' htmlFor=''>
										Tell us more about you!
									</label>
									<Box height={8} />

									<TextareaAutosize
									onResize={undefined}
									onResizeCapture={undefined}
										placeholder='Write something!'
										className={classes.inputFieldArea}
										name='message'
										onChange={e => setCommunityData({ ...values, message: e.target.value })}
										value={communityData.message}
										maxLength={250}
										autoFocus
										style={{ height: '132px', padding: '10px 10px' , resize:'none'}}
									/>
									{touched.message && errors.message ? (
										<span className='error-msg'>*{errors.message}</span>
									) : null}
								</Box>
								<Box height={40} />
								<Button
									type='submit'
									disabled={dataSubmitted}
									style={{
										width: '100%',
										background: '#1A191E',
										borderRadius: '12px',
										color: 'white',
										height: '56px',
										fontFamily: 'Montserrat',
										fontStyle: 'normal',
										fontWeight: '500',
										fontSize: '17px',
										lineHeight: '22px',
										textTransform: 'capitalize',
									}}
								>
									{loadingContentLogging
										? 'Logging Request'
										: dataSubmitted
										? 'Submitted'
										: 'Submit'}
								</Button>
							</Grid>
						</Grid>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default CommunityForm;
