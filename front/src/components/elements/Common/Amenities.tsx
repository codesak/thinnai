import { Box, Button, Grid, Paper, styled } from '@mui/material';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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
		gap: '0.188rem',
		display:'flex',
		alignItems:'center',
		minHeight: '43.8px',
	},
}));

const Amenities = ({ amenities }: { amenities: string[] }) => {
	const amenitiesMap = useSelector<RootState, any>(state => state.appSettings.amenitiesMap);
	const staticAssetPath = useSelector<RootState, string>(
		state => state.appSettings.staticAssetPath
	);
	const [amenitiesfilter, setAmenitiesfilter] = useState(5)

	return (
		<Box>
			<Box display='flex' justifyContent='space-between' alignItems='center'>
				<h2 className='aboutPlace__header'>Amenities</h2>
				{ amenities?.length >5 && <Button
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
				onClick={()=>amenitiesfilter === 5? setAmenitiesfilter(amenities.length): setAmenitiesfilter(5)}> View {window.innerWidth>600 ?(amenitiesfilter===5?'More':'Less'): (amenitiesfilter===5?'All':'Less')}</Button>}
			</Box>
			<Box height={20} />
			<Box>
				<Grid container spacing={1.2}>
					{amenities?.slice(0,amenitiesfilter).map((amenity: string) => (
						<Grid item xs={'auto'} key={amenitiesMap[amenity]?.id}>
							<Tagg style={{ backgroundColor: '#EEFCEC', flexWrap: 'nowrap' }}>
								<img height='15rem' src={`${staticAssetPath}${amenitiesMap[amenity]?.icon}`} alt='' />
								<div style={{ whiteSpace: 'nowrap' }}>{amenitiesMap[amenity]?.title}</div>
							</Tagg>
						</Grid>
					))}
				</Grid>
			</Box>
		</Box>
	);
};

export default Amenities;