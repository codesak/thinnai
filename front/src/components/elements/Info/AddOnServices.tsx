import { Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { object, string } from 'yup';

import { CssBaseline, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import '../../styles/Info/info.scss';
import UploadImage from '../Common/ImageSelector';
import AddIcon from './AddIcon';

const AddOnServices = () => {
	const [viewSubmit, setViewSubmit] = useState(true);
	const [submittedImg, setSubmittedImg] = useState<string[]>([]);
	const [imageUrl, setImageUrl] = useState<string[]>([]);
	const [clicked, setClicked] = useState(false);
	const [addOnArr, setAddonArr] = useState<
		{
			locality: string;
			PriceAmt: string;
			informBefore: string;
			loading: boolean;
		}[]
	>([]);
	const [addOn, setAddOn] = useState({
		locality: '',
		PriceAmt: '',
		informBefore: '',
		loading: false,
	});

	useEffect(() => {
		const store = submittedImg[0];
		if (store === undefined) return;
		setImageUrl([...imageUrl, store]);

		
	}, [addOn]);
	//    useEffect(() => {

	// }, [viewSubmit])

	return (
		<>
			<Formik
				initialValues={addOn}
				validationSchema={object({
					locality: string().required('Please enter Description'),

					PriceAmt: string().required('Please enter Price'),

					informBefore: string().required('Please enter Days'),
				})}
				onSubmit={(values, formikHelpers) => {
					setAddOn({ ...values, loading: true });
					setAddonArr([...addOnArr, values]);
					formikHelpers.resetForm();
				}}
			>
				{({ errors, isValid, touched, submitForm, dirty, handleSubmit }) => (
					<Form onSubmit={handleSubmit} className=''>
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'space-between',
								// width:'100%'
							}}
						>
							<label className='label'>Add-On Services</label>

							<AddIcon onClick={submitForm} right='15px' bottom='8px' />
						</Box>
						<Grid container style={{ width: '100%' }}>
							<Box
								sx={{
									display: 'flex',
									width: '100%',
									height: '181.45px',
									border: '1px solid #C9C9C9',
									borderRadius: '6px',
									background: '#FFFFFF',
									gap: '15.4px',
								}}
							>
								<Grid item xs={3} sm={4} md={3.5}>
									<Box
										sx={{
											margin: '15.49px 0 0 1.42rem',
										}}
									>
										<UploadImage
											required={true}
											aspectRatio={1}
											setExportPic={setSubmittedImg}
											name='image'
											height='74.13px'
											width='88%'
										/>
										{/* {clicked && !submittedImg[0]?<span className='error-msg'>*Required</span>:null} */}
									</Box>
								</Grid>
								<Grid item xs={9} sm={8} md={8.5} sx={{ paddingRight: '0.844rem' }}>
									<Box sx={{ marginTop: '0.968rem' }}>
										<label className='small-label' htmlFor='locality'>
											Add Title
										</label>
										<Field
											className='input-field small-input-field'
											type='text'
											name='locality'
											style={{ height: '34.3px', fontSize: '0.625rem' }}
											placeholder='Add description'
											size='lg'
											required
										/>
										{touched.locality && errors.locality ? (
											<span className='error-msg'>*{errors.locality}</span>
										) : null}

										<Box height={16.6} />
										<Box sx={{ display: 'flex', gap: '0.75rem' }}>
											<div>
												<label className='small-label' htmlFor='city'>
													Price Amount
												</label>
												<Field
													className='input-field small-input-field'
													style={{ height: '34.3px', fontSize: '0.625rem' }}
													type='text'
													name='PriceAmt'
													placeholder='₹'
													required
												/>
												{touched.PriceAmt && errors.PriceAmt ? (
													<span className='error-msg'>*{errors.PriceAmt}</span>
												) : null}
											</div>
											<Box height={20} />
											<div>
												<label className='small-label' htmlFor='pincode'>
													Inform Before
												</label>
												<Field
													className='input-field small-input-field'
													style={{ height: '34.3px', fontSize: '0.625rem' }}
													type='text'
													name='informBefore'
													placeholder='Days'
													// size='lg'
													// onKeyDown='submit'
													label='Pincode'
													required
												/>
												{touched.informBefore && errors.locality ? (
													<span className='error-msg'>*{errors.informBefore}</span>
												) : null}
											</div>
										</Box>
									</Box>
								</Grid>
							</Box>
						</Grid>
					</Form>
				)}
			</Formik>
			<Box height={20} />
			{viewSubmit &&
				addOnArr?.map((item, index) => (
					<>
						<Grid
							container
							sx={{
								height: '140px',
								background: index % 2 === 0 ? '#EEFCEC' : '#E7F0F4',
								borderRadius: '6px',
								overflow: 'hidden',
							}}
							key={index}
						>
							<CssBaseline />
							<Grid
								item
								xs={3}
								sm={4}
								md={3.5}
								//  sx={{
								//     background:'green'
								//  }}
							>
						

								<Box
									style={{
										height: '74.13px',
										width: '112.93px',
										overflow: 'hidden',
										borderRadius: '6px',
										margin: '0.938rem 0 0 0.5rem',
									}}
								>
									{imageUrl.map((image, i) => (
										<>
											<img
												key={i}
												style={{
													height: '74.13px',
													width: '112.93px',
													objectFit: 'contain',
												}}
												src={image}
												alt=''
											/>
										</>
									))}
								</Box>
							</Grid>
							<Grid item xs={9} sm={8} md={8.5} sx={{ padding: '0.938rem' }}>
								<Box sx={{ height: '100%', position: 'relative' }}>
									<Grid item xs={12} sm={12} md={12} sx={{ display: 'flex' }}>
										<Box sx={{ flex: 1 }}>Topic</Box>
										<Box
											sx={{
												border: '1px solid #24BA0E',
												color: '#24BA0E',
												borderRadius: '30px',
												width: 'auto',
												textAlign: 'center',
												padding: '0px 0.625rem',
											}}
										>
											₹ {item.PriceAmt}
										</Box>
									</Grid>
									<Grid item xs={12} sm={12} md={12} sx={{ flex: '1' }} height='auto'>
										{' '}
										<Box sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}>
											{item.locality}
										</Box>
									</Grid>
									<Grid
										item
										xs={12}
										sm={12}
										md={12}
										sx={{
											position: 'absolute',
											bottom: '0.625rem',
											display: 'flex',
											fontSize: '0.75rem',
											fontWeight: '600',
										}}
									>
										Notify Before:&nbsp;
										<Box sx={{ color: index % 2 === 0 ? '#2F8C21' : '#126B93' }}>
											{item.informBefore} Days
										</Box>
									</Grid>
								</Box>
							</Grid>
						</Grid>
						{/* <Box height={20} /> */}
					</>
				))}
		</>
	);
};

export default AddOnServices;
