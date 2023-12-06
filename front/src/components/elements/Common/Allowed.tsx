import { Box, Button, Grid, Paper, useMediaQuery } from '@mui/material';
import styled from '@mui/styles/styled';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import DetailsSectionDivider from './DetailsSectionDivider';

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
	overflow:'auto',
	'@media (max-width: 400px)': {
		height: '55px',
	},
}));


const Recreational = [
	{
		"id": "alcohol",
		"title": "Alcohol",
		"icon": "/guestAllowed/ic_alcohol.svg",
	},
	{
		"id": "hookah",
		"title": "Hookah",
		"icon": "/guestAllowed/ic_hookah.svg",
	},
	{
		"id": "smoking",
		"title": "Smoking",
		"icon": "/guestAllowed/ic_smoke.svg",
	},
	{
		"id": "veg",
		"title": "Veg",
		"icon": "/guestAllowed/ic_veg.svg",
	},
	{
		"id": "non_veg",
		"title": "Non Veg",
		"icon": "/guestAllowed/ic_non_veg.svg",
	},
	// {
	// 	"id": "decoration",
	// 	"title": "Decoration",
	// 	"icon": "/guestAllowed/ic_decoration.svg",
	// }
]

const Celebration = [
	// {
	// 	"id": "cake",
	// 	"title": "Cake",
	// 	"icon": "/guestAllowed/ic_cake.svg",
	// },
	{
		"id": "table_decor",
		"title": "Table Decor",
		"icon": "/guestAllowed/ic_table_decor.svg",
	},
	{
		"id": "floor_decor",
		"title": "Floor Decor",
		"icon": "/guestAllowed/ic_floor_decor.svg",
	},
]

const Food = [
	{
		"id": "non_veg",
		"title": "Non Veg",
		"icon": "/guestAllowed/ic_non_veg.svg",
	},
	{
		"id": "egg",
		"title": "Egg",
		"icon": "/guestAllowed/ic_non_veg.svg",
	},
	{
		"id": "beef",
		"title": "Beef",
		"icon": "/guestAllowed/ic_non_veg.svg",
	},
	{
		"id": "pork",
		"title": "Pork",
		"icon": "/guestAllowed/ic_non_veg.svg",
	}
]

const Allowed = ({ services }: { services: string[] }) => {
	const allowedActivitiesMap = useSelector<RootState, any>(
		state => state.appSettings.allowedActivitiesMap
	);
	const staticAssetPath = useSelector<RootState, string>(
		state => state.appSettings.staticAssetPath
	);
	const xsDevice = useMediaQuery('(max-width:400px)');
	// const [dataSlice, setdataSlice] = useState(services.length)

	const servicesData:string[] = []

	function servicesFinder(){
       services?.map((item)=>(
         servicesData.push(item)
	   ))
	   return servicesData
    }
	

	return (
		<Box>
			{/* <Box display='flex' justifyContent='space-between' alignItems='center'>
			<h2 className='aboutPlace__header'>This Space Allows</h2>
			{ services?.length >5 && <Button
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
				onClick={()=>dataSlice !== 5? setdataSlice(5): setdataSlice(services.length)}> View {window.innerWidth>600 ?(dataSlice===5?'More':'Less'): (dataSlice===5?'All':'Less')}
				</Button>}
			</Box> */}
			{/* <Box height={20} /> */}
			{/* <Grid
				rowGap={4}
				columnGap={0}
				container
				sx={{
					'@media (max-width: 1040px)': {
						gap: 2,
					},
				}}
			>
				{services?.slice(0,dataSlice).map((service: string) => (
					//property.services?.includes(item.text) && (
					<Grid item xs={3} sm={1.8} key={allowedActivitiesMap[service]?.id}>
						<CircleTagg style={{ backgroundColor: '#EBF8FE' }}>
							<Box>
								<img
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
									}}
									src={`${staticAssetPath}${allowedActivitiesMap[service]?.icon}`}
									alt=''
								/>
							</Box>
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
								whiteSpace:'nowrap'
							}}
						>
							{allowedActivitiesMap[service]?.title}
						</div>
					</Grid>
				))}
			</Grid> */}

			<h2 className='aboutPlace__header'>Bring Your Own </h2>
			<Grid
			rowGap={4}
			columnGap={0}
			container
			sx={{
				'@media (max-width: 1040px)': {
					gap: 2,
				},
			}}
			>
                {Recreational?.map((item, index) => (
					<Grid item xs={3} sm={1.8} key={index}>
						<CircleTagg style={{ backgroundColor: servicesFinder().includes(item.id)?'#EBF8FE':'#FFF6F6'  }}>
							{!servicesFinder().includes(item.id) && <Box width={{xs:'55px',sm:'70px', md:'70px', lg:'70px'}} style={{ height:'0.2vh', background:'#656565', transform:'rotate(135deg)', position:'absolute'}} />}
							<Box>
								<img
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
									}}
									src={staticAssetPath + item.icon}
									alt='img'
								/>
							</Box>
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
								whiteSpace:'nowrap'
							}}
						>
							{item?.title}
						</div>
					</Grid>
				))}
			</Grid>
			<DetailsSectionDivider/>
			<h2 className='aboutPlace__header'>Celebration Permits </h2>
			<Grid
			rowGap={4}
			columnGap={0}
			container
			sx={{
				'@media (max-width: 1040px)': {
					gap: 2,
				},
			}}
			>
                {Celebration?.map((item, index) => (
					<Grid item xs={3} sm={1.8} key={index}>
						<CircleTagg style={{ backgroundColor: servicesFinder().includes(item.id)?'#EBF8FE':'#FFF6F6'  }}>
						{!servicesFinder().includes(item.id) && <Box width={{xs:'55px',sm:'70px', md:'70px', lg:'70px'}} style={{ height:'0.2vh', background:'#656565', transform:'rotate(135deg)', position:'absolute'}} />}
							<Box>
								<img
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
									}}
									src={staticAssetPath + item.icon}
									alt='img'
								/>
							</Box>
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
								whiteSpace:'nowrap'
							}}
						>
							{item?.title}
						</div>
					</Grid>
				))}
			</Grid>
			{/* <DetailsSectionDivider/>
			<h2 className='aboutPlace__header'>Food Permits </h2>
			<Grid
			rowGap={4}
			columnGap={0}
			container
			sx={{
				'@media (max-width: 1040px)': {
					gap: 2,
				},
			}}
			>
                {Food?.map((item, index) => (
					<Grid item xs={3} sm={1.8} key={index}>
						<CircleTagg style={{ backgroundColor: servicesFinder().includes(item.id)?'#EBF8FE':'#FFF6F6'  }}>
						{!servicesFinder().includes(item.id) && <Box width={{xs:'55px',sm:'70px', md:'70px', lg:'70px'}} style={{ height:'0.2vh', background:'#ff3333', transform:'rotate(135deg)', position:'absolute'}} />}
							<Box>
								<img
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'contain',
									}}
									src={staticAssetPath + item.icon}
									alt='img'
								/>
							</Box>
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
								whiteSpace:'nowrap'
							}}
						>
							{item?.title}
						</div>
					</Grid>
				))}
			</Grid> */}
		</Box>
	);
};

export default Allowed;
