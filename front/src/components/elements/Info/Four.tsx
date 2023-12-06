import React, { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Navigate, Link } from 'react-router-dom';

// import { login } from '../../actions/register';
// import { Loading } from '../elements/Loading';
// import { RootState } from '../../store';
// import { ROUTES } from '../../utils/routing/routes';
import { Form, Field, Formik } from 'formik';
import { object, string } from 'yup';

import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

import UploadImage from '../Common/ImageSelector';

interface myProps {
	bck: () => void;
}

const Four = ({ bck }: myProps) => {
	const [imgErr, setImgErr] = useState<string[]>([]);

	const [twoData, setTwoData] = useState({
		yourPic: '',
		aboutYourself: '',
		suggestions: '',
		anything: '',

		loading: false,
	});

	return (
		<Formik
			initialValues={twoData}
			validationSchema={object({
				aboutYourself: string().required('Required'),
				suggestions: string().required('Required'),
				anything: string().required('Required'),
			})}
			onSubmit={(values, formikHelpers) => {
				setTwoData({ ...values, loading: true });
				// dispatch(login(values));
				formikHelpers.resetForm();
			}}
		>
			{({ errors, isValid, touched, dirty, handleSubmit }) => (
				<Form onSubmit={handleSubmit} className='form-container'>
					<Box
						sx={{
							display: 'flex',
							flexDirection: 'column',
							margin: '0 0 14px 0',
						}}
					>
						<label className='label' htmlFor='Name'>
							Upload Your Picture
						</label>
						<label className='app__info-sublabel label'>Your face should be clearly visible</label>
					</Box>
					<UploadImage
						aspectRatio={1}
						borderRadius='50%'
						required={true}
						setExportPic={setImgErr}
						height='173px'
						width='227px'
					/>

					<Box height={14} />
					<label className='label' htmlFor=''>
						About Yourself
					</label>
					<Field
						className='input-field input-area'
						as='textarea'
						name='aboutYourself'
						placeholder='Write us a Lively description of yourself, what you do.  
            For us to understand you better'
						size='lg'
						label='About Yourself'
						required
					/>
					{touched.aboutYourself && errors.aboutYourself ? (
						<span className='error-msg'>*{errors.aboutYourself}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor=''>
						Any Suggestions For Us
					</label>
					<Field
						className='input-field input-area'
						as='textarea'
						name='suggestions'
						placeholder='Any Suggestions for our Community? 
            For betterment, efficient hosting/dining experience, safety concerns, etc. 
            (WE ARE ALL EARS)'
						size='lg'
						label='Any Suggestions For Us'
						required
					/>
					{touched.suggestions && errors.suggestions ? (
						<span className='error-msg'>*{errors.suggestions}</span>
					) : null}
					<Box height={20} />
					<label className='label' htmlFor=''>
						Anything We Should Know
					</label>
					<Field
						className='input-field input-area'
						// type='text-area'
						as='textarea'
						name='anything'
						placeholder='Anything you will like us to know '
						size='lg'
						label='Anything We Should Know'
						required
					/>
					{touched.anything && errors.anything ? (
						<span className='error-msg'>*{errors.anything}</span>
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
							disabled={!isValid || !dirty || imgErr.length === 0}
							type='submit'
							variant='contained'
							sx={{ background: '#8F7EF3', margin: '0.625rem' }}
						>
							Proceed
						</Button>
						<Button
							onClick={() => bck()}
							type='submit'
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

export default Four;
