import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';
import { useState } from 'react';
import { object, string } from 'yup';

const CommunityRes = () => {
	const [communityData, setCommunityData] = useState({
		name: '',
		email: '',
		about: '',

		loading: false,
	});

	return (
		<Formik
			initialValues={communityData}
			validationSchema={object({
				name: string().required('Please enter Name'),
				email: string().email('Enter Valid Email').required('Please enter Email'),
				about: string(),
				//   .required('Please Upload Photo'),
			})}
			onSubmit={(values, formikHelpers) => {
				setCommunityData({ ...values, loading: true });
				// dispatch(login(values));
				formikHelpers.resetForm();
			}}
		>
			{({ errors, isValid, touched, dirty, handleSubmit }) => (
				<Form onSubmit={handleSubmit}>
					<Box className='communityRes'>
						<Box>
							<img width='100%' src='/assets/images/page/community.jpg' alt='' />
						</Box>
						<Box
							sx={{ background: '#F2E1C8' }}
							borderRadius='8px'
							padding='2.5rem 1.375rem'
							width='90%'
							margin='0 auto'
							position='relative'
							top={{
								xl: '-260px',
								md: '-260px',
								sm: '-160px',
								xs: '-160px',
							}}
						>
							<Box
								textAlign='center'
								fontWeight='600'
								fontSize='1.375rem'
								lineHeight='1.4em'
								color='#000000'
							>
								Join the community!
							</Box>
							<Box height={10} />
							<Box margin='0 auto' display='flex'>
								<img
									style={{ margin: '0 auto' }}
									src='/assets/images/page/communityavt.svg'
									alt=''
								/>
							</Box>
							<Box height={30} />
							<Box>
								<label className='label' htmlFor=''>
									Name
								</label>
								<Box height={8} />
								<Field
									className='input-field'
									type='text'
									name='name'
									size='lg'
									label='Name'
									required
								/>
								{touched.name && errors.name ? (
									<span className='error-msg'>*{errors.name}</span>
								) : null}
							</Box>
							<Box height={25} />
							<Box>
								<label className='label' htmlFor=''>
									Email
								</label>
								<Box height={8} />
								<Field
									className='input-field'
									type='text'
									name='email'
									size='lg'
									label='Email'
									required
								/>
								{touched.email && errors.email ? (
									<span className='error-msg'>*{errors.email}</span>
								) : null}
							</Box>
							<Box height={25} />
							<Box>
								<label className='label' htmlFor=''>
									Tell us more about you!
								</label>
								<Box height={8} />
								<Field
									className='input-field-area'
									type='text'
									name='about'
									size='lg'
									label='About'
									required
								/>
								{touched.about && errors.about ? (
									<span className='error-msg'>*{errors.about}</span>
								) : null}
							</Box>
							<Box height={25} />
							<Box>
								<Button
									type='submit'
									style={{
										width: '100%',
										background: 'black',
										color: 'white',
										height: '56px',
									}}
								>
									Submit
								</Button>
							</Box>
						</Box>
					</Box>
				</Form>
			)}
		</Formik>
	);
};

export default CommunityRes;
