import { Box } from '@mui/material';
import Skeleton from 'react-loading-skeleton';

const LoadingAboutPlace = () => {
	return (
		<Box
			marginX={{
				md: '4rem',
				xs: '1.5rem',
			}}
		>
			<Box
				display={{
					md: 'flex',
					xs: 'none',
				}}
				justifyContent='space-between'
				paddingY={3}
				alignItems='center'
			>
				<Box width='6%' marginLeft={6}>
					<Skeleton width='100%' height='65px' />
				</Box>
				<Box width='40%'>
					<Skeleton width='100%' height='8vh' />
				</Box>
				<Box width='28%' display='flex' justifyContent='space-between' alignItems='center' gap={5}>
					<Box width='65%'>
						<Skeleton width='100%' height='8vh' />
					</Box>
					<Box width='45%'>
						<Skeleton width='100%' height='8vh' />
					</Box>
				</Box>
			</Box>
			<Box>
				<Skeleton width='100%' height='1px' />
			</Box>
			<Box width='100%' marginTop={2}>
				<Skeleton width='100%' height='60vh' />
			</Box>
			<Box
				marginTop={5}
				width='100%'
				display='flex'
				justifyContent='space-between'
				alignItems='flex-start'
				flexDirection={{
					md: 'row',
					xs: 'column',
				}}
			>
				<Box
					width={{
						md: '60%',
						xs: '100%',
					}}
				>
					<Skeleton width='40%' height='7vh' />
					<Skeleton
						width='20%'
						height='5vh'
						style={{
							marginTop: '1rem',
						}}
					/>
					<Skeleton
						width='40%'
						height='5vh'
						style={{
							marginTop: '0.5rem',
						}}
					/>
					<Skeleton
						width='30%'
						height='3vh'
						style={{
							marginTop: '2rem',
						}}
					/>
					<Box width='80%' display='flex' justifyContent='space-between' alignItems='center'>
						<Box>
							<Skeleton
								circle
								width='4rem'
								height='4rem'
								style={{
									marginTop: '2rem',
									marginBottom: '0.5rem',
								}}
							/>
							<Skeleton />
						</Box>
						<Box>
							<Skeleton
								circle
								width='4rem'
								height='4rem'
								style={{
									marginTop: '2rem',
									marginBottom: '0.5rem',
								}}
							/>
							<Skeleton />
						</Box>
						<Box>
							<Skeleton
								circle
								width='4rem'
								height='4rem'
								style={{
									marginTop: '2rem',
									marginBottom: '0.5rem',
								}}
							/>
							<Skeleton />
						</Box>
						<Box>
							<Skeleton
								circle
								width='4rem'
								height='4rem'
								style={{
									marginTop: '2rem',
									marginBottom: '0.5rem',
								}}
							/>
							<Skeleton />
						</Box>
						<Box>
							<Skeleton
								circle
								width='4rem'
								height='4rem'
								style={{
									marginTop: '2rem',
									marginBottom: '0.5rem',
								}}
							/>
							<Skeleton />
						</Box>
					</Box>
					<Box paddingY={3} marginRight={7}>
						<Skeleton width='100%' height='1px' />
					</Box>
					<Box paddingBottom={4} marginRight={7} display='flex' justifyContent='space-between'>
						<Box width='20%'>
							<Skeleton width='100%' height='2vh' />
						</Box>
						<Box width='20%'>
							<Skeleton width='100%' height='2vh' />
						</Box>
					</Box>
					<Skeleton width='20%' height='2vh' />
					<Skeleton
						width='40%'
						height='4vh'
						style={{
							marginBottom: '1rem',
						}}
					/>
					<Skeleton width='20%' height='2vh' />
					<Skeleton width='40%' height='4vh' />
					<Box paddingY={3} marginRight={7}>
						<Skeleton width='100%' height='1px' />
					</Box>
					<Skeleton width='40%' height='3vh' />
				</Box>
				{/* Booking Card */}
				<Box
					width={{
						md: '40%',
						xs: '100%',
					}}
					border='1px solid #C5C5C5'
					boxShadow='2px 4px 8px 7px rgb(0 0 0 / 4%)'
					borderRadius='20px'
					padding={2.5}
					marginTop={{
						md: 0,
						xs: 5,
					}}
				>
					<Box width='40%' marginLeft='auto'>
						<Skeleton width='100%' height='3vh' />
					</Box>
					<Box width='100%' marginTop={3}>
						<Skeleton width='100%' height='3vh' />
					</Box>
					<Box
						width='100%'
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						paddingY={3}
					>
						<Box>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
						<Box>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
						<Box>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
						<Box>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
						<Box>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
						<Box>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
						<Box
							display={{
								md: 'flex',
								xs: 'none',
							}}
						>
							<Skeleton circle width='3rem' height='3rem' />
						</Box>
					</Box>
					<Box width='100%'>
						<Skeleton width='100%' height='2vh' />
					</Box>
					<Box width='100%' marginTop={7}>
						<Skeleton width='50%' height='4vh' />
					</Box>
					<Box width='100%' marginTop={2} display='flex' justifyContent='space-between'>
						<Box width='30%'>
							<Skeleton width='100%' height='3vh' />
							<Skeleton
								width='100%'
								height='5vh'
								style={{
									marginTop: '0.5rem',
								}}
							/>
						</Box>
						<Box width='30%'>
							<Skeleton width='100%' height='3vh' />
							<Skeleton
								width='100%'
								height='5vh'
								style={{
									marginTop: '0.5rem',
								}}
							/>
						</Box>
					</Box>
					<Skeleton
						width='100%'
						height='3vh'
						style={{
							marginTop: '1rem',
						}}
					/>
					<Skeleton
						width='100%'
						height='10vh'
						style={{
							marginTop: '2rem',
						}}
					/>
					<Skeleton
						width='100%'
						height='8vh'
						style={{
							marginTop: '2rem',
						}}
					/>
					<Skeleton
						width='100%'
						height='5vh'
						style={{
							marginTop: '2rem',
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default LoadingAboutPlace;
