import { RootState } from '../../../../store';
import { styled, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Slider from '@mui/material/Slider';
import * as React from 'react';
import { useSelector } from 'react-redux';

const marks = [
	{
		value: 0,
		label: '1 Hr',
	},
	{
		value: 25,
		label: '1.5 Hr',
	},
	{
		value: 50,
		label: '2.5 Hr',
	},
	{
		value: 75,
		label: '3.5 Hr',
	},
	{
		value: 100,
		label: '4 Hr',
	},
];

// const marksWithAlcohol = [
// 	{
// 		value: 0,
// 		label: '1 Hr',
// 	},
// 	{
// 		value: 25,
// 		label: '1.5 Hr',
// 	},
// 	{
// 		value: 50,
// 		label: '2.5 Hr',
// 	},
// 	{
// 		value: 75,
// 		label: '3.5 Hr',
// 	},
// 	{
// 		value: 100,
// 		label: '4 Hr',
// 	},
	
// ];



const PriceSlider = styled(Slider)({
	color: '#52af77',
	fontSize: '2.5rem',
	'& .MuiSlider-markLabel': {
		fontSize: '1rem',
		color:'#3D3D3D',
		'@media screen and (max-width: 600px)': {
			fontSize: '0.85rem',
		},
	},
	'& .MuiSlider-rail': {
		color: '#000',
		height: '0.1rem',
	},
	'& .MuiSlider-track': {
		border: 'none',
		color: '#000',
	},
	'& .MuiSlider-slider': {
		color: '#8f7ef3',
	},
	'& .MuiSlider-thumb': {
		height: 12,
		width: 12,
		// backgroundColor: '#8F7EF3',
		'&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
			boxShadow: 'inherit',
		},
		'&:before': {
			display: 'none',
		},
	},
	'& .MuiSlider-valueLabel': {
		top: '80px',
		fontFamily: 'Open Sans',
		fontStyle: 'normal',
		fontWeight: 'bold',
		fontSize: '0.65rem',
		lineHeight: '1rem',
		color: '#000000',
		padding: '0.438rem 0.938rem',
		'@media screen and (max-width: 600px)': {
			padding: '0.25rem 0.5rem',
			fontSize: '0.5rem',
		},
		'&:before': { display: 'none' },
		'&.MuiSlider-valueLabelOpen': {
			transform: 'translateY(-100%) scale(1.5) !important',
			marginTop: '1rem',
			marginBottom: '1rem',
			'@media screen and (max-width: 600px)': {},
		},
		'& > *': {
			fontFamily: 'Open Sans',
			'@media screen and (max-width: 600px)': {
				fontSize: '0.6rem',
				fontWeight: 500,
			},
		},
	},
});

export default function Price() {
	const guestCount:any = useSelector<RootState, string>(state => state.search.guestCount);
	const pricing: any = useSelector<RootState, any>(state => state.details.property.pricing);
	const addServices: any = useSelector<RootState, any>(state => state.details.property.services);
	

	const [checked, setChecked] = React.useState(false);
	const [checked2, setChecked2] = React.useState(false);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked(event.target.checked);
	};
	const handleChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
		setChecked2(event.target.checked);
	};
	const offers = [
		{
			offerName: `Price For ${guestCount > 1?`${guestCount} Guests`:`${guestCount} Guest`}` ,
			offerId: 'galaHours',
			offerDescription: 'Most HAPPENING HOURS of the Day',
			offerImg: '/assets/images/detail/fire.svg',
			startTimeMtoF: '4 PM',
			endTimeMtoF: '6 AM',
			startTimeStoS: '12 PM',
			endTimeStoS: '6 AM',
		},
		// {
		// 	offerName: 'For Joy Hours',
		// 	offerId: 'joyHours',
		// 	offerDescription: 'Exclusive DISCOUNTS and OFFERS',
		// 	offerImg: '/assets/images/detail/sale.svg',
		// 	startTimeMtoF: '6 AM',
		// 	endTimeMtoF: '4 PM',
		// 	startTimeStoS: '6 AM',
		// 	endTimeStoS: '12 PM',
		// }
	];

	function valuetext(value: number, offerType: string) {
		if (!pricing) return '₹0';
		let timeCategory: string = '';
		switch (value) {
			case 0:
				timeCategory = 'oneHour';
				break;
			case 25:
				timeCategory = 'oneAndHalfHour';
				break;
			case 50:
				timeCategory = 'twoAndHalfHour';
				break;
			case 75:
				timeCategory = 'threeAndHalfHour';
				break;
			case 100:
				timeCategory = 'four';
				break;
		}

		let price = 0;
		const alcoholStatus = checked || checked2 ? 'withAlcohol' : 'withoutAlcohol';

		let guestCountCategory = Math.ceil(Number(guestCount) / 2) - 1;

		if (offerType === 'joyHours') {
			price = pricing.joyHour[guestCountCategory][alcoholStatus][timeCategory];
		} else if (offerType === 'galaHours') {
			price = pricing?.galaHour[guestCountCategory][alcoholStatus][timeCategory];
		}
		return `₹ ${price}`;
		
	}

	// function formatTime(time: string) {
	// 	const date = new Date(time);
	// 	const hours = date.getUTCHours();
	// 	const ampm = hours >= 4 ? 'pm' : 'am';
	// 	const hours12 = hours % 12 || 12;
	// 	return `${hours12} ${ampm}`;
	// }

	return (
		<Box
			mt={{
				xl: '1.2rem',
				md: '1.2rem',
				sm: '1rem',
				xs: '1rem',
			}}
		>
			<Box
				display={{ md: 'block', xs: 'block' }}
				width={{ sm: '100%', xs: '100%' }}
				fontSize={{ sm: 'initial', xs: '0.625rem' }}
			>
				<Box
					display={{xs:'flex', md:'grid'}}
					justifyContent={{xs:'center'}}
					gridTemplateColumns={{
						xl: 'repeat(2, 1fr)',
						md: 'repeat(2, 1fr)',
						sm: 'repeat(1, 1fr)',
						xs: 'repeat(1, 1fr)',
					}}
					gap={1.1}
				>
				{addServices?.includes('alcohol') &&	<Box
					gap={{xs:'5px',sm:'0px',md:'0px'}}
						sx={{
							border: '0.5px solid #868686',
							paddingX:{xs:'.5rem', md:'1.875rem'},
							paddingY: {xs:'.1rem', md:'0.313rem'},
							width:'-webkit-fill-available',
							borderRadius: '5px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<FormControlLabel
							sx={{
								margin: '0',
							}}
							control={<Checkbox sx={{padding:'9px 4px'}}
								checked={checked} onChange={handleChange} />}
							label={
								<Typography sx={{ paddingLeft:{xs:'.1', md:'0.625rem'}, fontSize:{xs:'.9rem', md:'1.125rem'}, whiteSpace:'nowrap' }}>
									Alcohol Permit
								</Typography>
							}
						/>
						<Box>
							<img
								style={{
									maxHeight: '2.3rem',
									width:window.innerWidth<600 ? '20px':'45px'
								}}
								src='/assets/images/detail/alcohol.svg'
								alt=''
							/>
						</Box>
					</Box>}
				{addServices?.includes('hookah') &&	<Box
					gap={{xs:'5px',sm:'0px',md:'0px'}}
						sx={{
							border: '0.5px solid #868686',
							paddingX:{xs:'.5rem', md:'1.875rem'},
							paddingY: {xs:'.1rem', md:'0.313rem'},
							borderRadius: '5px',
							display: 'flex',
							width:'-webkit-fill-available',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<FormControlLabel
							sx={{
								margin: '0',
							}}
							control={
								<Checkbox
									sx={{
										padding:'9px 4px'
									}}
									checked={checked2}
									onChange={handleChange2}
								/>
							}
							label={
								<Typography sx={{ paddingLeft:{xs:'.1', md:'0.625rem'}, fontSize:{xs:'.9rem', md:'1.125rem'}, whiteSpace:'nowrap' }}>
									Hookah Permit
								</Typography>
							}
						/>
						<Box>
							<img
								style={{
									width:window.innerWidth<600 ? '20px':'45px',
									maxHeight: '2.3rem',
								}}
								src='/assets/images/detail/hooka.svg'
								alt=''
							/>
						</Box>
					</Box>}
				</Box>
				<Box height={20} />
				{offers.map((item, index) => (
					<>
					<Box
						sx={{
							fontFamily: 'Open Sans',
							fontStyle: 'normal',
							overflow: 'hidden',
							borderRadius: '14px',
							paddingBottom: {xs:'0.4rem', md:'1.4rem'},
						}}
						bgcolor={item.offerName === 'For Joy Hours' ? '#FEFCEF' : '#F7F5FF '}
						position='relative'
						className={
							item.offerName === 'For Joy Hours'
								? 'gala_hours pricing-container'
								: 'pricing-container'
						}
						key={index}
					>
						<Box
							sx={{
								bgcolor: item.offerName === `Price For ${guestCount > 1?`${guestCount} Guests`:`${guestCount} Guest`}` ? '#F7F5FF' : '#FEFCEF',
							}}
							className='pricing-hour-container'
							mt={3.5}
						>
							<Box
								className='aboutPlace__header'
								sx={{
									fontWeight: '600',
									fontSize: '1.2rem',
									lineHeight: '25px!important',
									textAlign: 'center',
								}}
								mt={{
									xl: item.offerName === 'For Gala Hours' ? 0 : 3,
									md: item.offerName === 'For Gala Hours' ? 0 : 5,
									sm: item.offerName === 'For Gala Hours' ? 0 : 5,
									xs: item.offerName === 'For Gala Hours' ? 0 : index===0?0:5,
								}}
							>
								{item.offerName}
							</Box>
							<Box height={10} />

							{item.offerId === "joyHours" && (<Box className='price-time-container'>
								<Box
									display='flex'
									flexDirection='row'
									justifyContent='space-evenly'
									sx={{
										fontWeight: '400',
										fontSize: '0.625rem',
										lineHeight: '14px',
									}}
								>
									<Box>
										<Box
											textAlign='center'
											fontFamily='Open Sans'
											fontWeight='400'
											fontSize='0.9rem'
										>
											Mon-Fri
										</Box>
										<Box
											textAlign='center'
											mt='0.625rem'
											fontSize='0.9rem'
											fontWeight='600'
											fontFamily='Open Sans'
											textTransform='uppercase'
										>
											{item.startTimeMtoF} - {item.endTimeMtoF}
										</Box>
									</Box>
									<Box>
										<Box
											textAlign='center'
											fontFamily='Open Sans'
											fontWeight='400'
											fontSize='0.9rem'
										>
											Sat-Sun
										</Box>
										<Box
											textAlign='center'
											mt='0.625rem'
											fontSize='0.9rem'
											fontWeight='600'
											fontFamily='Open Sans'
											textTransform='uppercase'
										>
											{item.startTimeStoS} - {item.endTimeStoS}
										</Box>
									</Box>
								</Box>
							</Box>)}
						</Box>
						<Box height={5} />
						<Box className='pricing-slider-container'>
							<PriceSlider
								disabled
								getAriaLabel={val => val.toString()}
								sx={{
									'& .MuiSlider-thumb': {
										background: item.offerId !== 'joyHours' ? '#8F7EF3' : '#D0B629',
									},
									'& .MuiSlider-valueLabel': {
										background: item.offerId !== 'joyHours' ? '#EBE9F8' : '#F5EDD1',
									},
								}}
								track={false}
								defaultValue={[0, 25, 50, 75, 100]}
								getAriaValueText={val => valuetext(val, item.offerId)}
								valueLabelFormat={val => valuetext(val, item.offerId)}
								step={34}
								marks={marks}
								valueLabelDisplay='on'
							/>
						</Box>
						<Box height={50} />
					</Box>
					{index=== 0 && <Box height={30}/>}
					</>
				))}
			</Box>
		</Box>
	);
}
