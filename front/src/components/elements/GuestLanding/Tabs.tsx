import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import * as React from 'react';

interface TabPanelProps {
	children?: React.ReactNode;
	index: number;
	value: number;
}

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role='tabpanel'
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: number) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}

export default function MenuTabs() {
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.SyntheticEvent, newValue: number) => {
		setValue(newValue);
	};

	const tabStyle = {
		active_tab: {
			display: 'inline',
			background: 'white',
			textAlign: 'center',
			lineHeight: '60px',
			height: '60px',
			width: '160px',
			fontWeight: '400',
			color: '#292732 !important',
			'>img': { filter: value === 1 ? 'invert(100%)' : '' },
			'@media (max-width: 600px)': {
				width: '120px',
				height: '100%',
				lineHeight: '40px',
				minHeight: '10px',
			},
		},
		default_tab: {
			display: 'inline',
			background: '#292732',
			textAlign: 'center',
			lineHeight: '60px',
			height: '60px',
			width: '160px',
			fontWeight: '400 !important',
			color: 'white',
			'>img': { filter: value === 1 ? 'invert(100%)' : '' },
			'@media (max-width: 600px)': {
				width: '120px',
				height: '100%',
				lineHeight: '40px',
				minHeight: '10px',
			},
		},
	};
	function getStyle(isActive: boolean) {
		return isActive ? tabStyle.active_tab : tabStyle.default_tab;
	}

	return (
		<Box sx={{ width: '100%', position: 'relative' }}>
			<Box sx={{ borderColor: 'divider' }}>
				<Tabs
					value={value}
					onChange={handleChange}
					aria-label='basic tabs example'
					sx={{ '>div': { '>span': { display: 'none' } } }}
				>
					<Tab
						sx={getStyle(value === 0)}
						icon={
							<img
								style={{
									margin: 'auto',
									position: 'relative',
									top: '5px',
									right: '5px',
								}}
								alt='test avatar'
								src='/assets/images/page/beenhere.svg'
							/>
						}
						style={{ borderRadius: '20px 0px 0px 0px' }}
						label='Book'
						{...a11yProps(0)}
					/>
					<Tab
						sx={getStyle(value === 1)}
						icon={
							<img
								style={{
									margin: 'auto',
									position: 'relative',
									top: '3px',
									right: '6px',
								}}
								alt='test avatar'
								src='/assets/images/page/gite.svg'
							/>
						}
						style={{ borderRadius: '0px 20px 0px 0px' }}
						label='Host'
						{...a11yProps(1)}
					/>
				</Tabs>
			</Box>
			<TabPanel value={value} index={0}>
				<Box width='100%' minHeight='144px' sx={{ padding: '0px', color: 'black' }}>
					<Grid
						container
						height='100%'
						alignItems='center'
						gap={{ sm: 1, xs: 0.8 }}
						padding={{ md: '3rem', sm: '3.375rem 3rem', xs: '1.875rem 1.25rem' }}
						color='black'
					>
						<Grid item md={4.5} xs={12}>
							<Button
								startIcon={
									<img className='tab__icon' src='/assets/images/page/my_location.svg' alt='' />
								}
								sx={{
									borderRadius: '6px',
									border: '0.5px solid #B1B1B1',
									width: '95%',
									color: 'black',
									textTransform: 'capitalize',
									'@media (max-width: 900px)': {
										width: '100%',
										fontSize: '0.875rem',
									},
								}}
							>
								Location
							</Button>
						</Grid>
						<Grid item md={2} xs={3.225}>
							<Button
								startIcon={
									<img className='tab__icon' src='/assets/images/page/calendar_month.svg' alt='' />
								}
								sx={{
									borderRadius: '6px',
									border: '0.5px solid #B1B1B1',
									width: '95%',
									color: 'black',
									textTransform: 'capitalize',
									'@media (max-width: 900px)': {
										width: '100%',
										fontSize: '0.875rem',
									},
								}}
							>
								Date
							</Button>
						</Grid>
						<Grid item md={2} xs={3.225}>
							<Button
								startIcon={<img className='tab__icon' src='/assets/images/page/group.svg' alt='' />}
								sx={{
									borderRadius: '6px',
									border: '0.5px solid #B1B1B1',
									width: '95%',
									color: 'black',
									textTransform: 'capitalize',
									'@media (max-width: 900px)': {
										width: '100%',
										fontSize: '0.875rem',
									},
								}}
							>
								Guest
							</Button>
						</Grid>
						<Grid item md={3} xs={5}>
							<Button
								startIcon={
									<img className='tab__icon__diff' src='/assets/images/page/groups_2.svg' alt='' />
								}
								sx={{
									borderRadius: '6px',
									border: '0.5px solid #B1B1B1',
									width: '95%',
									color: 'black',
									textTransform: 'capitalize',
									'@media (max-width: 900px)': {
										width: '100%',
										fontSize: '0.875rem',
									},
								}}
							>
								Group Type
							</Button>
						</Grid>
					</Grid>
				</Box>
				<Box height={{ xs: 20, md: 0 }} />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<Box width='100%' sx={{ padding: '0px', color: 'black', height: '144px' }}>
					<Grid container>
						<Grid item>
							<Button></Button>
						</Grid>
						<Grid item>
							<Button></Button>
						</Grid>
						<Grid item>
							<Button></Button>
						</Grid>
						<Grid item>
							<Button></Button>
						</Grid>
					</Grid>
				</Box>
			</TabPanel>
			<Button
				sx={{
					position: 'absolute',
					fontFamily: 'Montserrat',
					fontWeight: '400',
					fontSize: '1.125rem',
					background: '#1A191E',
					color: 'white',
					width: '203px',
					height: '48px',
					top: '91%',
					right: '5%',
					'@media (max-width: 900px)': {
						transform: 'translate(-50%, -50%)',
						left: '50%',
						top: '100%',
						width: '250px',
					},
					textTransform: 'none',
					'&:hover': { background: 'black', color: 'white', scale: '1.01' },
					transition: '0.3s',
				}}
			>
				Search
			</Button>
		</Box>
	);
}
