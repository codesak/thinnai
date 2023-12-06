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
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
interface myProps {
	inc: () => void;
	bck: () => void;
}

const Three = ({ inc, bck }: myProps) => {
	//Image Error
	const [imgErr, setImgErr] = useState<string[]>([]);
	const [imgError, setImgError] = useState<string[]>([]);

	const [twoData, setTwoData] = useState({
		accountName: '',
		accountNumber: '',
		ifscCode: '',
		areaLocality: '',
		frontFile: '',
		backFile: '',
		idUploadedType: '',
		idNumber: '',

		loading: false,
	});

	return (
		<Formik
			initialValues={twoData}
			validationSchema={object({
				accountName: string().required('Please enter Account Name'),
				// .email('Invalid email'),
				accountNumber: string().required('Please enter Account Number'),
				ifscCode: string().required('Please enter IFSC Code'),
				areaLocality: string().required('Required'),
				frontFile: string().required('Please Upload Photo'),
				backFile: string().required('Please enter Upload Photo'),
				idUploadedType: string().required('Required'),
				idNumber: string().required('Please enter ID Number'),
			})}
			onSubmit={(values, formikHelpers) => {
				setTwoData({ ...values, loading: true });
				// dispatch(login(values));
				formikHelpers.resetForm();
			}}
		>
			{({ errors, isValid, touched, dirty, handleSubmit }) => (
				<Form onSubmit={handleSubmit} className='form-container'>
					<label className='label' htmlFor=''>
						Account Holder Name
					</label>
					<Field
						className='input-field'
						type='text'
						name='accountName'
						size='lg'
						label='Account Holder Name'
						required
					/>
					{touched.accountName && errors.accountName ? (
						<span className='error-msg'>*{errors.accountName}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor=''>
						Account Number
					</label>
					<Field
						className='input-field'
						type='text'
						name='accountNumber'
						label='Account Number'
						required
					/>
					{touched.accountNumber && errors.accountNumber ? (
						<span className='error-msg'>*{errors.accountNumber}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor=''>
						IFSC Code
					</label>
					<Field className='input-field' type='text' name='ifscCode' label='IFSC Code' required />
					{touched.ifscCode && errors.ifscCode ? (
						<span className='error-msg'>*{errors.ifscCode}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor=''>
						Area / Locality
					</label>
					<Field className='input-field' type='text' name='areaLocality' required />
					{touched.areaLocality && errors.areaLocality ? (
						<span className='error-msg'>*{errors.areaLocality}</span>
					) : null}
					<Box height={20} />
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							margin: '0 0 14px 0',
						}}
					>
						<label className='label' htmlFor='Name'>
							Upload Govt. Verified Photo ID
						</label>
						<label htmlFor='Name' className='app__info-sublabel label'>
							(Aadhar, Passport, Driver's License, Voter ID)
						</label>
					</Box>
					<Grid container columnSpacing={5}>
						<Grid item md={5} sm={5} xs={6}>
							<UploadImage
								aspectRatio={16 / 9}
								required={true}
								setExportPic={setImgErr}
								height='8rem'
								width='8rem'
							/>
						</Grid>
						<Grid item md={5} sm={5} xs={6}>
							<UploadImage
								aspectRatio={16 / 9}
								required={true}
								setExportPic={setImgError}
								height='8rem'
								width='8rem'
							/>
						</Grid>
					</Grid>
					<Box height={20} />
					<label className='label' htmlFor=''>
						Id Uploaded Type
					</label>
					<Field
						className='input-field'
						type='text'
						name='idUploadedType'
						size='lg'
						label='Id Uploaded Type'
						required
					/>
					{touched.idUploadedType && errors.idUploadedType ? (
						<span className='error-msg'>*{errors.idUploadedType}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor=''>
						Id Number
					</label>
					<Field
						className='input-field'
						type='text'
						name='idNumber'
						size='lg'
						label='Id Number'
						required
					/>
					{touched.idNumber && errors.idNumber ? (
						<span className='error-msg'>*{errors.idNumber}</span>
					) : null}
					<Box height={20} />

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
							disabled={!isValid || !dirty || imgErr.length === 0 || imgError.length === 0}
							type='submit'
							variant='contained'
							sx={{ background: '#8F7EF3', margin: '0.625rem' }}
						>
							Proceed
						</Button>
						<Button
							onClick={() => bck()}
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

export default Three;
