import { Box, Button, Grid, Paper, styled } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store';

const Tagg = styled(Paper)(({ theme }) => ({
	fontSize: '0.85rem',
	minHeight: '41.8px',
	borderRadius: '10px',
	display: 'flex',
	justifyContent: 'left',
	padding: '0.75rem 1rem',
	alignItems: 'center',
	flexWrap: 'wrap',
	gap: '0.375rem',
	boxShadow: 'none',
	color: '#383838',
	fontFamily: 'Open Sans',
	fontStyle: 'normal',
	fontWeight: '400',
	textAlign: 'center',
	lineHeight: '27px',
	cursor: 'default',
	'@media (max-width: 600px)': {
		fontSize: '0.8rem',
		gap: '3px',
		minHeight: '43.8px',
	},
}));

export default function BestSuitedFor({ activities }: { activities: string[] }) {
	const activityTypeMap = useSelector<RootState, any>(state => state.appSettings.activityTypeMap);
	const staticAssetPath = useSelector<RootState, string>(
		state => state.appSettings.staticAssetPath
	);
	const [activitiesfilter, setActivitiesfilter] = useState(5)

	return (
		<Box>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<Box className='aboutPlace__header'>Best Suited For</Box>
				{ activities?.length >5 && <Button
				sx={{border:{md:'0.4px solid #000000'}, borderRadius:'64px', width:'100px', height:'34px',fontFamily: 'Open Sans',
				fontStyle: 'normal',
				fontWeight:{xs:'800',md:'500'},
				fontSize: {xs:'10px', md:'12px'},
				textDecoration:{xs:'underline', md:'none'},
				lineHeight: '15px',
				display: 'flex',
				alignItems: 'center',
				textAlign: 'center',
				color: '#000000'}}
				onClick={()=>activitiesfilter === 5? setActivitiesfilter(activities.length): setActivitiesfilter(5)}> View {window.innerWidth>600 ?(activitiesfilter===5?'More':'Less'): (activitiesfilter===5?'All':'Less')}</Button>}
			</Box>
			<Box height={20} />
			<Box>
				<Grid container spacing={1.2}>
					{activities?.slice(0,activitiesfilter).map((activityType: string) => (
						<Grid item xs={'auto'} key={activityTypeMap[activityType].id}>
							<Tagg style={{ backgroundColor: '#F3F1FF',flexWrap: 'nowrap' }}>
								<img height='15rem' src={`${staticAssetPath}${activityTypeMap[activityType].icon}`} alt='' />
								<div>{activityTypeMap[activityType].title}</div>
							</Tagg>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
}
