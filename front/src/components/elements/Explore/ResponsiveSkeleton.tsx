import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Skeleton from 'react-loading-skeleton';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';

interface properties {
	_id: string;
	propertyPictures: string[];
	propertyName: string;
	slugString: string;
	city: string;
	state: string;
	happyCustomers: number;
	maxGuestCount: string;
	minDuration: string;
	price: string;
	directBooking: boolean;
	originalPrice: string;
	discount: string;
}

const useStyles: any = makeStyles({
	placeCard: {
		background: '#FFFFFF',
		padding: '0.5rem',
		overflow: 'hidden',
		paddingBottom: '20px',
		borderRadius: '20px',
		boxShadow: '0px 2.5px 3px rgba(0, 0, 0, 0.1)',
	},
});

const ResponsiveSkeleton = () => {
	const properties = useSelector<RootState, properties[]>(state => state.main.properties);
	const classes = useStyles();
	return (
		<Box
			display={{
				xl: 'none',
				md: 'none',
				sm: 'block',
				xs: 'block',
			}}
			marginX='1.875rem'
			marginTop={3.5}
		>
			{properties.map((item, index) => (
				<Box key={index} position='relative' marginBottom={3} className={classes.placeCard}>
					<Skeleton width='100%' height='16rem' />
					<Box position='absolute' right='18px' top='17px' zIndex='2'>
						<Skeleton width='75px' height='17px' />
					</Box>
					<Box marginTop='0.5rem'>
						<Skeleton count={3} height='1.2rem' style={{ marginBottom: '0.2rem' }} />
					</Box>
				</Box>
			))}
		</Box>
	);
};

export default ResponsiveSkeleton;
