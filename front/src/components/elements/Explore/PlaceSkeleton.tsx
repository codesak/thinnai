import { Box, Grid } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Skeleton from 'react-loading-skeleton';

const useStyles: any = makeStyles({
	placeCard: {
		background: '#FFFFFF',
		padding: '0.5rem',
		overflow: 'hidden',
		paddingBottom: '1.25rem',
		borderRadius: '20px',
		boxShadow: '0px 2.5px 3px rgba(0, 0, 0, 0.1)',
	},
});

const PlaceSkeleton = () => {
	const classes = useStyles();
	return (
		<Box
			display={{
				xl: 'block',
				md: 'block',
				sm: 'none',
				xs: 'none',
			}}
		>
			<Grid
				container
				rowGap={3}
				columnGap={3}
				flexDirection={{
					xl: 'row',
					md: 'row',
					sm: 'column',
					xs: 'column',
				}}
				justifyContent={{
					sm: 'center',
					xs: 'center',
				}}
				alignItems={{
					//   xl: 'space-between',
					//   md: 'space-between',
					sm: 'center',
					xs: 'center',
				}}
			>
				{[...Array(10)].map((item, index) => (
					<Grid
						item
						xs={12}
						sm={12}
						md={2.7}
						xl={2.5}
						key={index}
						position='relative'
						className={classes.placeCard}
					>
						<Skeleton width='100%' height='16rem' />
						<Box position='absolute' right='18px' top='17px' zIndex='2'>
							<Skeleton width='75px' height='17px' />
						</Box>
						<Box marginTop='0.5rem'>
							<Skeleton count={3} height='1.2rem' style={{ marginBottom: '0.2rem' }} />
						</Box>
					</Grid>
				))}
			</Grid>
		</Box>
	);
};

export default PlaceSkeleton;
