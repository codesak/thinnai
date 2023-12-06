import Box from '@mui/material/Box';
import { borderRadius } from '@mui/system';
import { S3_BASE } from '../../../../utils/consts';

export default function PropertySummary({
	propertyName,
	propertyAddressString,
	propertyThumbnail,
}: {
	propertyName: string;
	propertyAddressString: string;
	propertyThumbnail?: string;
}) {
	return (
		// <Box
		// 	height={{ sm: 118 }}
		// 	display='flex'
		// 	justifyContent='space-between'
		// 	padding='1rem 0.5rem'
		// 	zIndex='2'
		// 	position='relative'
		// 	sx={{
		// 		background: '#E7F0F4',
		// 		fontFamily: 'Open Sans',
		// 		fontStyle: 'normal',
		// 		margin:{xs:'0 0 1rem 0', md:'0'}
		// 	}}
		// 	borderRadius='6px'
		// 	gap={1}
		// >
		// 	<Box width='100%' display='flex' justifyContent='center' alignItems='center'>
		// 		<Box
		// 			height={{ xs: '80%', sm: '100%' }}
		// 			width='80%'
		// 			borderRadius='6px'
		// 			overflow='hidden'
		// 			sx={{ aspectRatio: '1' }}
		// 		>
		// 			<img
		// 				style={{
		// 					width: '100%',
		// 					height: '100%',
		// 					objectFit: 'cover',
		// 				}}
		// 				src={`${S3_BASE}${propertyThumbnail}`}
		// 				alt=''
		// 			/>
		// 		</Box>
		// 	</Box>
		// 	<Box flexGrow='1'>
		// 		<Box display='flex' flexDirection='column' justifyContent='space-between' height='100%'>
		// 			<Box>
		// 				<Box
		// 					sx={{
		// 						fontWeight: '600',
		// 						fontSize: '1rem',
		// 						lineHeight: '22px',
		// 					}}
		// 					display='flex'
		// 					alignItems='center'
		// 					gap={0.3}
		// 				>
		// 					{propertyName}
		// 					{/* <Rating name='rating' value={rating} size='small' readOnly /> */}
		// 				</Box>
		// 				<Box height={5} />
		// 				<Box display='flex' gap={0.4}>
		// 					<Box display='flex' alignItems='center'>
		// 						{/* <img src='/assets/images/mapLocation.svg' alt='' /> */}
		// 						{propertyAddressString}
		// 					</Box>
		// 					<Box
		// 						sx={{
		// 							fontWeight: '400',
		// 							fontSize: '0.75rem',
		// 							lineHeight: '16px',
		// 							textAlign: 'center',
		// 						}}
		// 					></Box>
		// 				</Box>
		// 			</Box>
		// 		</Box>
		// 	</Box>
		// </Box>
         <Box 
		    height='24vh'
			display='flex'
			justifyContent='space-between'
			zIndex='2'
			position='relative'
			sx={{
				background: '#ffffff',
				fontFamily: 'Open Sans',
				fontStyle: 'normal',
				margin:{xs:'0 0 1rem 0', md:'0'}
			}}>
			<img
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover',
							borderRadius:'5px'
						}}
						src={`${S3_BASE}${propertyThumbnail}`}
						alt='img'
					/>
		 </Box>
	);
}
