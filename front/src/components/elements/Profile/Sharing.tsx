import {
	Box,
	Divider,
	FormControlLabel,
	styled,
	Switch,
	SwitchProps,
	Typography,
} from '@mui/material';

const Sharing = () => {
	const IOSSwitch = styled((props: SwitchProps) => (
		<Switch focusVisibleClassName='.Mui-focusVisible' disableRipple {...props} />
	))(({ theme }) => ({
		width: 42,
		height: 26,
		padding: 0,
		'& .MuiSwitch-switchBase': {
			padding: 0,
			margin: 2,
			transitionDuration: '300ms',
			'&.Mui-checked': {
				transform: 'translateX(16px)',
				color: '#fff',
				'& + .MuiSwitch-track': {
					backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#0E0E0E',
					opacity: 1,
					border: 0,
				},
				'&.Mui-disabled + .MuiSwitch-track': {
					opacity: 0.5,
				},
			},
			'&.Mui-focusVisible .MuiSwitch-thumb': {
				color: '#33cf4d',
				border: '6px solid #fff',
			},
			'&.Mui-disabled .MuiSwitch-thumb': {
				color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
			},
			'&.Mui-disabled + .MuiSwitch-track': {
				opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
			},
		},
		'& .MuiSwitch-thumb': {
			boxSizing: 'border-box',
			width: 22,
			height: 22,
		},
		'& .MuiSwitch-track': {
			borderRadius: 26 / 2,
			backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
			opacity: 1,
			transition: theme.transitions.create(['background-color'], {
				duration: 500,
			}),
		},
	}));
	return (
		<Box>
			<Typography
				letterSpacing='0.015em'
				fontWeight={600}
				fontFamily='Montserrat'
				mt='1.563rem'
				fontSize='2.25rem'
				color='#1A191E'
			>
				Activity Sharing
			</Typography>
			<Typography
				color='#6D6D6D'
				fontFamily='Open Sans'
				fontSize='1.375rem'
				fontWeight={400}
				mb='1.25rem'
			>
				Decide how your profile and activity are shown to others
			</Typography>

			<Box mt='2.5rem' mb='2.5rem'>
				<Typography
					letterSpacing='0.015em'
					fontWeight={500}
					fontFamily='Montserrat'
					mt='1.563rem'
					fontSize='1.25rem'
					color='#1A191E'
				>
					Include my profile & listing in search engines
				</Typography>
				<Typography
					color='#9E9E9E'
					fontFamily='Open Sans'
					fontSize='1.125rem'
					fontWeight={400}
					mb='0.625rem'
				>
					Turning this on means search engines, like Google , will display your profile & listing
					pages in search pages
				</Typography>
				<FormControlLabel
					sx={{
						mb: '1.25rem',
					}}
					control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
					label=''
				/>
				<Divider />
			</Box>

			<Typography
				letterSpacing='0.015em'
				fontWeight={600}
				fontFamily='Montserrat'
				mt='1.563rem'
				fontSize='2.25rem'
				color='#1A191E'
			>
				Data Sharing
			</Typography>
			<Typography
				color='#6D6D6D'
				fontFamily='Open Sans'
				fontSize='1.375rem'
				fontWeight={400}
				mb='1.25rem'
			>
				Decide how your data is used for Thinnai research
			</Typography>

			<Box mt='2.5rem' mb='2.5rem'>
				<Typography
					letterSpacing='0.015em'
					fontWeight={500}
					fontFamily='Montserrat'
					mt='1.563rem'
					fontSize='1.25rem'
					color='#1A191E'
				>
					Include my profile & listing in search engines
				</Typography>
				<Typography
					color='#9E9E9E'
					fontFamily='Open Sans'
					fontSize='1.125rem'
					fontWeight={400}
					mb='0.625rem'
				>
					Turning this on means search engines, like Google , will display your profile & listing
					pages in search pages
				</Typography>
				<FormControlLabel
					sx={{
						mb: '1.25rem',
					}}
					control={<IOSSwitch sx={{ m: 1 }} defaultChecked />}
					label=''
				/>
				<Divider />
			</Box>
		</Box>
	);
};

export default Sharing;
