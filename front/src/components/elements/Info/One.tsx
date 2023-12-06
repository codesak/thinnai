import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Link } from 'react-router-dom';

// import { login } from '../../actions/register';
// import { Loading } from '../elements/Loading';
// import { RootState } from '../../store';
// import { ROUTES } from '../../utils/routing/routes';
import { Form, Field, Formik, FormikProps, ErrorMessage } from 'formik';
import { object, string } from 'yup';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
interface myProps {
	inc: () => void;
}

const One = ({ inc }: myProps) => {
	const onClick = () => {
		inc();
		window.scrollTo(0, 0);
	};
	const [oneData, setOneData] = useState({
		name: '',
		email: '',
		currentAddress: '',
		locality: '',
		city: '',
		state: '',
		pincode: '',
		mapLink: '',
		contactNumber: '',
		altNumber: '',
		profession: '',

		loading: false,
	});
	return (
		<Formik
			initialValues={oneData}
			validationSchema={object({
				email: string().required('Please enter email').email('Invalid email'),
				name: string().required('Please enter Name'),
				currentAddress: string().required('Please enter Address'),

				city: string().required('Please enter City'),
				state: string().required('Please enter State'),
				pincode: string().required('Please enter Pin Code'),
				mapLink: string().required('Please enter Map Link'),
				contactNumber: string().required('Please enter Contact Number'),

				profession: string().required('Please enter Profession'),
			})}
			onSubmit={(values, formikHelpers) => {
				setOneData({ ...values, loading: true });
				// dispatch(login(values));
				formikHelpers.resetForm();
			}}
		>
			{({ errors, isValid, touched, dirty, handleSubmit }) => (
				<Form onSubmit={handleSubmit} className='form-container'>
					<Box className='mb-2'>
						<label className='label' htmlFor='name'>
							Name :
						</label>

						<Field
							className='input-field form-control shadow'
							type='text'
							name='name'
							size='lg'
							label='Name'
							required
						/>
						{touched.name && errors.name ? <span className='error-msg'>*{errors.name}</span> : null}
					</Box>

					<Box height={14} />
					<label className='label' htmlFor='email'>
						Email Address :
					</label>
					<Field
						className='input-field'
						type='email'
						name='email'
						// placeholder='Email Address'
						size='lg'
						label='Email Address'
						required
					/>
					{touched.email && errors.email ? (
						<span className='error-msg'>*{errors.email}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor='currentAddress'>
						Current Address :
					</label>
					<Field
						className='input-field'
						type='text'
						name='currentAddress'
						size='lg'
						label='Current Address'
						required
					/>
					{touched.currentAddress && errors.currentAddress ? (
						<span className='error-msg'>*{errors.currentAddress}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor='locality'>
						Area / Locality :
					</label>
					<Field
						className='input-field'
						type='text'
						name='locality'
						// placeholder='Area / Locality'
						size='lg'
						label='Area / Locality'
						required
					/>
					<Box height={20} />
					<Grid md={12}>
						<Stack
							direction={{ xs: 'column', sm: 'column', md: 'row' }}
							spacing={{ xs: 1, sm: 1, md: 6 }}
						>
							<Grid xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
								<label className='label' htmlFor='city'>
									City :
								</label>
								<Field className='input-field' type='text' name='city' label='City' required />
								{touched.city && errors.city ? (
									<span className='error-msg'>*{errors.city}</span>
								) : null}
							</Grid>
							<Grid xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
								<label className='label' htmlFor='pincode'>
									State :
								</label>
								<Field className='input-field' type='text' name='state' label='Pincode' required />
								{touched.state && errors.state ? (
									<span className='error-msg'>*{errors.state}</span>
								) : null}
							</Grid>
						</Stack>
					</Grid>

					<Box height={20} />
					<label className='label' htmlFor='pincode'>
						Pincode :
					</label>
					<Field
						className='input-field'
						type='text'
						name='pincode'
						size='lg'
						label='Pincode'
						required
					/>
					{touched.pincode && errors.pincode ? (
						<span className='error-msg'>*{errors.pincode}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor='mapLink'>
						Paste google map's pinned link of your address :
					</label>
					<Field
						className='input-field'
						type='text'
						name='mapLink'
						// placeholder="Paste google map's pinned link of your address"
						size='lg'
						label="Paste google map's pinned link of your address"
						required
					/>
					{touched.mapLink && errors.mapLink ? (
						<span className='error-msg'>*{errors.mapLink}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor='contactNumber'>
						Contact Number :
					</label>
					<Field
						className='input-field'
						type='text'
						name='contactNumber'
						// placeholder='Contact Number'
						size='lg'
						label='Contact Number'
						required
					/>
					{touched.contactNumber && errors.contactNumber ? (
						<span className='error-msg'>*{errors.contactNumber}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor='altNumber'>
						Alternate Number :
					</label>
					<Field
						className='input-field'
						type='text'
						name='altNumber'
						size='lg'
						label='Alternate Number'
						required
					/>
					<Box height={20} />
					<label className='label' htmlFor='profession'>
						Profession :
					</label>
					<Field
						className='input-field'
						as='select'
						name='profession'
						placeholder='Profession'
						size='lg'
						label='Profession'
						required
					>
						<option value=''></option>
						<option value='dev'>Engineer</option>
						<option value='dev'>Engineer</option>
					</Field>
					{touched.profession && errors.profession ? (
						<span className='error-msg'>*{errors.profession}</span>
					) : null}
					<Box height={20} />
					<div
						style={{
							width: '100%',
							textAlign: 'center',
							display: 'flex',
							justifyContent: 'flex-end',
						}}
					>
						<Button
							style={{ margin: '0.625rem' }}
							onClick={onClick}
							disabled={!isValid || !dirty}
							type='submit'
							variant='contained'
							sx={{ background: '#8F7EF3' }}
							size='small'
						>
							Proceed
						</Button>
						<Box height={7} />
					</div>
				</Form>
			)}
		</Formik>
	);
};

export default One;
