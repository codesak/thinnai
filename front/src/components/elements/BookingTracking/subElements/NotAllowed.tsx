import { Box, Grid, Paper, styled, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const CircleTagg = styled(Paper)(({ theme }) => ({
	fontSize: '0.85rem',
	height: '70.8px',
	borderRadius: '50%',
	aspectRatio: '1',
	display: 'flex',
	border: '0.5px solid #656565',
	justifyContent: 'center',
	alignItems: 'center',
	flexWrap: 'wrap',
	margin: 'auto',
	boxShadow: 'none',
	cursor: 'pointer',
	'@media (max-width: 400px)': {
		height: '55px',
	},
}));

const NotAllowed = ({ services }: { services: string[] }) => {
	const [servicesNotAllowed, setServicesNotAllowed] = useState<string[]>([]);
	const allowedActivitiesMap = useSelector<RootState, any>(
		state => state.appSettings.allowedActivitiesMap
	);
	const staticAssetPath = useSelector<RootState, string>(
		state => state.appSettings.staticAssetPath
	);
	const xsDevice = useMediaQuery('(max-width:400px)');

	useEffect(() => {
		setServicesNotAllowed(
			Object.keys(allowedActivitiesMap).filter(
				(allowedActivity: string) => services.indexOf(allowedActivity) === -1
			)
		);
	}, [services]);

	return (
		<Box>
			{servicesNotAllowed.length > 0 &&
			<h2 className='sub-Headings-DetailsPage'>Things Not Allowed</h2>
            }
			<Box height={20} />
			<Grid spacing={4} container>
				{servicesNotAllowed?.map((service: string) => (
					//property.services?.includes(item.text) && (
					<Grid item xs={3} sm={1.8} key={allowedActivitiesMap[service].id}>
						<CircleTagg style={{ backgroundColor: '#FFF6F6' }}>
							<img
								style={{
									maxWidth: xsDevice ? '24px' : '33px',
									height: xsDevice ? '24px' : '33px',
								}}
								src={`${staticAssetPath}${allowedActivitiesMap[service]?.icon}`}
								alt=''
							/>
						</CircleTagg>
						<Box height={5} />
						<div
							style={{
								textAlign: 'center',
								color: '#383838',
								fontFamily: 'Inter',
								fontStyle: 'normal',
								fontWeight: '400',
								lineHeight: '1.2rem',
								fontSize: xsDevice ? '0.8rem' : '1rem',
								marginTop: '0.875rem',
							}}
						>
							{allowedActivitiesMap[service].title}
						</div>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default NotAllowed;
