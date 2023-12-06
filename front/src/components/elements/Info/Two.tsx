import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Link } from 'react-router-dom';

import UploadImage from '../Common/ImageSelector';
// import { login } from '../../actions/register';
// import { Loading } from '../elements/Loading';
// import { RootState } from '../../store';
// import { ROUTES } from '../../utils/routing/routes';
import { Form, Field, Formik } from 'formik';
import { object, string } from 'yup';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import AddIcon from './AddIcon';
import TagInput from './TagInput';
import GoogleTest from './GoogleTest';
import InputView from './InputView';
import AddOnServices from './AddOnServices';
import Paper from '@mui/material/Paper';
import { boolean } from 'yup/lib/locale';

interface myProps {
	inc: () => void;
	bck: () => void;
}

const Two = ({ inc, bck }: myProps) => {
	const Item = styled(Paper)(({ theme }) => ({
		fontSize: '0.75rem',
		minHeight: '31.8px',
		border: '1px solid #C9C9C9',
		borderRadius: '6px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		flexWrap: 'wrap',
		boxShadow: 'none',
		color: '#383838',
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: '400',
		textAlign: 'center',
		lineHeight: '16px',
		cursor: 'pointer',
	}));

	// Selecting onClick loop function

	const selectLoop = (
		index: number,
		indexValue: number[],
		setIndexValue: (value: number[]) => void
	) => {
		setIndexValue([...indexValue, index]);

		let count = 0;

		indexValue.forEach(element => {
			if (element === index) {
				count += 1;
				if (count > 0) {
					setIndexValue(indexValue.filter((ind: number) => index !== ind));
				}
			}
		});
	};

	//Image Error
	const [imgErr, setImgErr] = useState<string[]>([]);
	// Type of Space
	const [typeOfSpace, setTypeOfSpace] = useState([
		{ text: 'Apartment' },
		{ text: 'Indicidual space' },
		{ text: 'Shared room' },
		{ text: 'Commercial Space' },
		{ text: 'Community Center' },
	]);
	const [clickedTos, setClickedTos] = useState(false);
	const [valueTypeOfSpace, setValueTypeOfSpace] = useState<number[]>([]);

	const onClickTos = (index: number) => {
		selectLoop(index, valueTypeOfSpace, setValueTypeOfSpace);
		setClickedTos(true);
	};
	const [viewTos, setViewTos] = useState(false);

	//Location
	const [location, setLocation] = useState([
		{ text: 'Balcony' },
		{ text: 'Terrace' },
		{ text: 'Backyard' },
		{ text: 'Lawn' },
		{ text: 'Room' },
	]);
	const [clickedLocation, setClickedLocation] = useState(false);
	const [valueLocation, setValueLocation] = useState<number[]>([]);
	const onClickLocation = (index: number) => {
		selectLoop(index, valueLocation, setValueLocation);
		setClickedLocation(true);
	};

	// Dining Service
	const [diningService, setDiningService] = useState([
		{ text: 'Self-service' },
		{ text: 'Service by host' },
		{ text: 'Depend on schedule' },
	]);
	const [clickedDs, setClickedDs] = useState(false);
	const [valueDiningService, setValueDiningService] = useState<number[]>([]);
	const onClickDs = (index: number) => {
		selectLoop(index, valueDiningService, setValueDiningService);
		setClickedDs(true);
	};

	// Amenties
	const [amenties, setAmenties] = useState([
		{ text: 'Dining table and chairs' },
		{ text: 'Air conditioner' },
		{ text: 'Wifi' },
		{ text: 'Drinking water' },
		{ text: 'Cutlery' },
		{ text: 'Restroom' },
		{ text: 'Fridge' },
		{ text: 'Oven' },
		{ text: 'Pet friendly' },
		{ text: 'Music system' },
	]);
	const [clickedAmenties, setClickedAmenties] = useState(false);
	const [valueAmenties, setValueAmenties] = useState<number[]>([]);
	const onClickAmenties = (index: number) => {
		selectLoop(index, valueAmenties, setValueAmenties);
		setClickedAmenties(true);
	};

	const [viewAmenties, setViewAmenties] = useState(false);

	// Preffered Guest
	const [prefferdGuest, setPrefferdGuest] = useState([
		{ text: 'Friends' },
		{ text: 'Women only' },
		{ text: 'Men only' },
		{ text: 'Married couples' },
		{ text: 'Unmarried coules' },
		{ text: 'Family with kids' },
		{ text: 'Famity without kids' },
	]);
	const [clickedPg, setClickedPg] = useState(false);
	const [valuePrefferedGuest, setValuePrefferedGuest] = useState<number[]>([]);
	const onClickPg = (index: number) => {
		selectLoop(index, valuePrefferedGuest, setValuePrefferedGuest);
		setClickedPg(true);
	};

	// Type of Activities
	const [typeOfActivities, setTypeOfActivities] = useState([
		{ text: 'Casual dining' },
		{ text: 'Reading clubs' },
		{ text: 'Business meeting' },
		{ text: 'Meditation' },
		{ text: 'Workshop' },
		{ text: 'Remote work' },
		{ text: 'Special occasions' },
		{ text: 'Community gathering' },
	]);
	const [clickedToa, setClickedToa] = useState(false);
	const [valueTypeOfActivities, setValueTypeOfActivities] = useState<number[]>([]);
	const onClickToa = (index: number) => {
		selectLoop(index, valueTypeOfActivities, setValueTypeOfActivities);
		setClickedToa(true);
	};

	const [viewToa, setViewToa] = useState(false);

	// Type of Property
	const [typeOfProperty, setTypeOfProperty] = useState([
		{ text: 'Rent' },
		{ text: 'Lease' },
		{ text: 'Own property' },
	]);
	const [clickedTop, setClickedTop] = useState(false);
	const [valueTypeOfProperty, setValueTypeOfProperty] = useState<number[]>([]);
	const onClickTop = (index: number) => {
		selectLoop(index, valueTypeOfProperty, setValueTypeOfProperty);
		setClickedTop(true);
	};

	// Parking
	const [parking, setParking] = useState([
		{ text: 'Two weelers' },
		{ text: 'Four wheelers' },
		{ text: 'No-parking' },
	]);
	const [clickedParking, setClickedParking] = useState(false);
	const [valueParking, setValueParking] = useState<number[]>([]);
	const onClickParking = (index: number) => {
		selectLoop(index, valueParking, setValueParking);
		setClickedParking(true);
	};

	// Services
	const [services, setServices] = useState<{ text: string; pic?: string }[]>([
		{
			text: 'Alcohol',
			pic: '/assets/images/beer.svg',
		},
		{
			text: 'Hookah',
			pic: '/assets/images/hooka.svg',
		},
		{
			text: 'Smoking',
			pic: '/assets/images/smoke.svg',
		},
		{
			text: 'Non Veg',
			pic: '/assets/images/nonveg.svg',
		},
		{
			text: 'Cake',
			pic: '/assets/images/cake.svg',
		},
		{
			text: 'Table Decor',
			pic: '/assets/images/table.svg',
		},
		{
			text: 'Floor Decor',
			pic: '/assets/images/floor.svg',
		},
	]);

	const [clickedServices, setClickedServices] = useState(false);
	const [valueServices, setValueServices] = useState<number[]>([]);
	const onClickServices = (index: number) => {
		selectLoop(index, valueServices, setValueServices);
		setClickedServices(true);
	};
	const [viewServices, setViewServices] = useState(false);
	const addService = () => {
		setViewServices(true);

		//  addingPic();
	};

	// Alcohol Allowed
	const [alcoholAllowed, setAlcoholAllowed] = useState([
		{ text: 'Friends' },
		{ text: 'Women only' },
		{ text: 'Men only' },
		{ text: 'Married couples' },
		{ text: 'Unmarried couples' },
		{ text: 'Family with kids' },
		{ text: 'Family without kids' },
	]);
	const [clickedAa, setClickedAa] = useState(false);
	const [valueAlcoholAllowed, setValueAlcoholAllowed] = useState<number[]>([]);
	const onClickAa = (index: number) => {
		selectLoop(index, valueAlcoholAllowed, setValueAlcoholAllowed);
		setClickedAa(true);
	};
	//tagValidation
	//  var tagValidation:boolean ;
	const [validStep, setValidStep] = useState(false);
	const [validRules, setValidRules] = useState(false);
	//  setValid(tagValidation);
	//  console.log(valid)

	// Form Input Formik

	const [twoData, setTwoData] = useState({
		// file: '',
		about: '',
		completeAddress: '',
		floor: '',
		tower: '',
		landmark: '',
		// stepToReach: '',
		// typeOfSpace: '',
		// location: '',
		// diningService: '',
		// amenties: '',
		// preferredGuest: '',
		// activities: '',
		// addOnService: '',
		// typeOfProperty: '',
		// parking: '',
		// service: '',
		// alcoholAllowed: '',
		maxGuest: '',
		// houseRules: '',

		loading: false,
	});

	return (
		<Formik
			initialValues={twoData}
			validationSchema={object({
				about: string().required('Please enter Text'),

				completeAddress: string().required('Please enter Address'),

				floor: string().required('Required'),

				// tower: string()
				// .required('Required'),

				landmark: string().required('Required'),
			})}
			onSubmit={(values, formikHelpers) => {
				setTwoData({ ...values, loading: true });
				// // dispatch(login(values));
				formikHelpers.resetForm();
			}}
		>
			{({ errors, isValid, touched, dirty }) => (
				<Form className='form-container'>
					<label className='label'>Add Photo</label>
					<Grid>
						<UploadImage
							borderRadius='50%'
							aspectRatio={1}
							required={true}
							height='14rem'
							width='14rem'
							setExportPic={setImgErr}
						/>
					</Grid>

					<Box height={14} />
					<label className='label'>About Thinnai Space</label>
					<Field
						className='input-field input-area'
						as='textarea'
						name='about'
						placeholder='Describe your property'
						size='lg'
						label='About Thinnai Space'
						required
						error={Boolean(errors.about) && Boolean(touched.about)}
						helperText={Boolean(touched.about) && errors.about}
					/>
					{touched.about && errors.about ? (
						<span className='error-msg'>*{errors.about}</span>
					) : null}
					<Box height={29.12} />
					<Box>
						<label className='label'>Address</label>
						<Field
							className='input-field small-input-field'
							style={{ height: '45px' }}
							type='text'
							name='completeAddress'
							placeholder='Complete Address'
							size='lg'
							label='Address'
							required
						/>
						{touched.completeAddress && errors.completeAddress ? (
							<span className='error-msg'>*{errors.completeAddress}</span>
						) : null}
						<Box height={29.12} />
						<Box sx={{ display: 'flex', gap: '0.938rem' }}>
							<Field
								className='input-field small-input-field'
								style={{ height: '45px' }}
								type='text'
								name='floor'
								placeholder='Floor'
								size='lg'
								label='Floor'
								required
							/>
							<Box height={29.12} />
							<Field
								className='input-field small-input-field'
								style={{ height: '45px' }}
								type='text'
								name='tower'
								placeholder='Tower/Block'
								// size='sm'
								label='Tower/Block'
							/>
							{touched.tower && errors.tower ? (
								<span className='error-msg'>*{errors.tower}</span>
							) : null}
						</Box>

						<Box height={29.12} />
						<Field
							className='input-field small-input-field'
							style={{ height: '45px' }}
							type='text'
							name='landmark'
							placeholder='Nearby Landmark'
							// size='sm'
							label='landmark'
							required
						/>
						{touched.landmark && errors.landmark ? (
							<span className='error-msg'>*{errors.landmark}</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<GoogleTest />
					<Box height={29.12} />
					<label className='label'>Steps to Reach Thinnai</label>
					<TagInput
						placeHolder='Step by Step giude to reach your Thinnai space '
						check={setValidStep}
					/>

					<Box height={29.12} />

					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<label className='label'>Type of space</label>
						<AddIcon onClick={() => setViewTos(true)} right='15px' bottom='8px' />
					</Box>

					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{typeOfSpace.map((item, index) => (
								<Grid onClick={() => onClickTos(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueTypeOfSpace.includes(index) ? '#EEFCEC' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
							<InputView
								state={typeOfSpace}
								setState={setTypeOfSpace}
								inputView={viewTos}
								setInputView={setViewTos}
							/>
						</Grid>
						{clickedTos && valueTypeOfSpace.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>

					<Box height={29.12} />
					<label className='label'>Thinnai location</label>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{location.map((item, index) => (
								<Grid onClick={() => onClickLocation(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueLocation.includes(index) ? '#F3F1FF' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
						</Grid>
						{clickedLocation && valueLocation.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<label className='label'>Type of dining service</label>

					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{diningService.map((item, index) => (
								<Grid onClick={() => onClickDs(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueDiningService.includes(index) ? '#F2F0DF' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
						</Grid>
						{clickedDs && valueDiningService.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<label className='label'>Amenties</label>
						<AddIcon onClick={() => setViewAmenties(true)} right='15px' bottom='8px' />
					</Box>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{amenties.map((item, index) => (
								<Grid onClick={() => onClickAmenties(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueAmenties.includes(index) ? '#E7F0F4' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
							<InputView
								state={amenties}
								setState={setAmenties}
								inputView={viewAmenties}
								setInputView={setViewAmenties}
							/>
						</Grid>
						{clickedAmenties && valueAmenties.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<label className='label'>Preferred Guests</label>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{prefferdGuest.map((item, index) => (
								<Grid onClick={() => onClickPg(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valuePrefferedGuest.includes(index) ? '#EEFCEC' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
						</Grid>
						{clickedPg && valuePrefferedGuest.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<label className='label'>Type of activities</label>
						<AddIcon onClick={() => setViewToa(true)} right='15px' bottom='8px' />
					</Box>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{typeOfActivities.map((item, index) => (
								<Grid onClick={() => onClickToa(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueTypeOfActivities.includes(index) ? '#F3F1FF' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
							<InputView
								state={typeOfActivities}
								setState={setTypeOfActivities}
								inputView={viewToa}
								setInputView={setViewToa}
							/>
						</Grid>
						{clickedToa && valueTypeOfActivities.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<AddOnServices />
					<Box height={29.12} />
					<label className='label'>Type of property</label>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{typeOfProperty.map((item, index) => (
								<Grid onClick={() => onClickTop(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueTypeOfProperty.includes(index) ? '#F2F0DF' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
						</Grid>
						{clickedTop && valueTypeOfProperty.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<label className='label'>Parking</label>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{parking.map((item, index) => (
								<Grid onClick={() => onClickParking(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueParking.includes(index) ? '#E7F0F4' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
						</Grid>
						{clickedParking && valueParking.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<Box
						sx={{
							display: 'flex',
							justifyContent: 'space-between',
						}}
					>
						<label className='label'>Services</label>
						<AddIcon onClick={() => addService()} right='15px' bottom='8px' />
					</Box>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{services.map((item, index) => (
								<Grid onClick={() => onClickServices(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueServices.includes(index) ? '#EEFCEC' : '',
										}}
									>
										<img src={item.pic} alt='' />
										<div>{item.text}</div>
									</Item>
								</Grid>
							))}
							<InputView
								state={services}
								setState={setServices}
								inputView={viewServices}
								setInputView={setViewServices}
							/>
						</Grid>
						{clickedServices && valueServices.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>

					<Box height={29.12} />
					<label className='label'>Alcohol Allowed For</label>
					<Box className='app__item-container'>
						<Grid container spacing={1}>
							{alcoholAllowed.map((item, index) => (
								<Grid onClick={() => onClickAa(index)} item xs={4} key={index}>
									<Item
										style={{
											backgroundColor: valueAlcoholAllowed.includes(index) ? '#EEFCEC' : '',
										}}
									>
										{item.text}
									</Item>
								</Grid>
							))}
						</Grid>
						{clickedAa && valueAlcoholAllowed.length === 0 ? (
							<span style={{ marginTop: '0.625rem' }} className='error-msg'>
								* Select at least one
							</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<Box sx={{ display: 'flex', flexDirection: 'column' }}>
						<label className='label'>Maximum Guest Number</label>
						<Field
							className='input-field'
							style={{
								height: '31.8px',
								width: '127.75px',
							}}
							as='select'
							type='maxGuest'
							name='maxGuest'
							size='lg'
							defaultValue='6'
							required
						>
							<option value='6'>6</option>
							<option value='1'>1</option>
							<option value='2'>3</option>
							<option value='4'>4</option>
							<option value='5'>5</option>
						</Field>
						{touched.maxGuest && errors.maxGuest ? (
							<span className='error-msg'>*{errors.maxGuest}</span>
						) : null}
					</Box>
					<Box height={29.12} />
					<label className='label'>House rules</label>
					<TagInput
						placeHolder='Any house rules you would like to inform the guests'
						check={setValidRules}
					/>

					<Box height={29.12} />
					<div
						style={{
							width: '100%',
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'flex-start',
							flexDirection: 'row-reverse',
						}}
					>
						<Button
							onClick={() => inc()}
							disabled={
								!isValid ||
								!dirty ||
								valueAlcoholAllowed.length === 0 ||
								valueServices.length === 0 ||
								valueParking.length === 0 ||
								valueTypeOfProperty.length === 0 ||
								valueTypeOfSpace.length === 0 ||
								validStep ||
								validRules ||
								valueTypeOfActivities.length === 0 ||
								valuePrefferedGuest.length === 0 ||
								valueAmenties.length === 0 ||
								valueDiningService.length === 0 ||
								valueLocation.length === 0 ||
								imgErr.length === 0
							}
							type='button'
							variant='contained'
							sx={{ background: '#8F7EF3', margin: '0.625rem' }}
						>
							Proceed
						</Button>
						<Button
							onClick={() => bck()}
							type='button'
							variant='outlined'
							sx={{ color: '#073A93', margin: '0.625rem' }}
						>
							Back
						</Button>
						<Box height={7} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default Two;
