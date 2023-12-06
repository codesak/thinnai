import { Box, Grid, Paper, styled, Typography, useMediaQuery } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

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

const Permits = ({ services }: { services: string[] }) => {
	const [servicesNotAllowed, setServicesNotAllowed] = useState<string[]>([]);
	const allowedActivitiesMap:any = {
        "alcohol": {
            "id": "alcohol",
            "title": "Alcohol",
            "icon": "/guestAllowed/ic_alcohol.svg",
            "_id": "635ffda844b3622bbfc179b0"
        },
        "hookah": {
            "id": "hookah",
            "title": "Hookah",
            "icon": "/guestAllowed/ic_hookah.svg",
            "_id": "635ffda844b3622bbfc179b1"
        },
        "smoking": {
            "id": "smoking",
            "title": "Smoking",
            "icon": "/guestAllowed/ic_smoke.svg",
            "_id": "635ffda844b3622bbfc179b2"
        },
        "non_veg": {
            "id": "non_veg",
            "title": "Non Veg",
            "icon": "/guestAllowed/ic_non_veg.svg",
            "_id": "635ffda844b3622bbfc179b3"
        },
        "cake": {
            "id": "cake",
            "title": "Cake",
            "icon": "/guestAllowed/ic_cake.svg",
            "_id": "635ffda844b3622bbfc179b4"
        },
        "tableDecorations": {
            "id": "table_decor",
            "title": "Table Decor",
            "icon": "/guestAllowed/ic_table_decor.svg",
            "_id": "635ffda844b3622bbfc179b5"
        },
        "floorDecorations": {
            "id": "floor_decor",
            "title": "Floor Decor",
            "icon": "/guestAllowed/ic_floor_decor.svg",
            "_id": "635ffda844b3622bbfc179b6"
        },
        "egg": {
            "id": "egg",
            "title": "Egg",
            "icon": "/guestAllowed/ic_non_veg.svg",
            "_id": "635ffda844b3622bbfc179b7"
        },
        "candleLightDinner": {
            "id": "beef",
            "title": "Beef",
            "icon": "/guestAllowed/ic_non_veg.svg",
            "_id": "635ffda844b3622bbfc179b8"
        },
        "movieScreening": {
            "id": "pork",
            "title": "Pork",
            "icon": "/guestAllowed/ic_non_veg.svg",
            "_id": "635ffda844b3622bbfc179b9"
        },
        "decorations": {
            "id": "decoration",
            "title": "Decoration",
            "icon": "/guestAllowed/ic_decoration.svg",
            "_id": "639448cdfc6b466fdde2ad3a"
        },
        "cutlery": {
            "id": "cutlery",
            "title": "Cutlery",
            "icon": "/assets/images/cutlery.svg",
            "_id": "639448cdfc6b466fdde2ad3a"
        }
    }

	const staticAssetPath = useSelector<RootState, string>(
		state => state.appSettings.staticAssetPath
	);
	const xsDevice = useMediaQuery('(max-width:400px)');

	useEffect(() => {
		setServicesNotAllowed(
			Object.keys(allowedActivitiesMap).filter(
				(allowedActivity: string) => services.includes(allowedActivity)
			)
		);
	}, [services]);

	return (
		<Box>
			<h2 className='aboutPlace__header'>Permits Added</h2>
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
								src={service !== 'cutlery' ? `${staticAssetPath}${allowedActivitiesMap[service]?.icon}`: `${allowedActivitiesMap[service]?.icon}` }
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

export default Permits;
