import { Box, Stack, Typography } from '@mui/material';

const DetailsListItem = ({ listItems, header }: { listItems: string[]; header: string }) => {
	return (
		<Box>
			<h2 className='aboutPlace__header'>
				{header}
			</h2>
			<Box height={20} />
			<Box className='aboutPlace__p'>
				{listItems?.filter((rule)=>rule.length)?.map((rule: any, index: any) => (
					<Stack
						alignItems='flex-start'
						direction='row'
						key={index}
						marginBottom='0.5rem'
						spacing={{
							xl: 3,
							md: 3,
							sm: 1.8,
							xs: 1.8,
						}}
					>
						<Box
							marginTop={{
								md: '0.3rem',
								xs: '0.1rem',
							}}
						>
							<Box
								height={'0.7rem'}
								width={'0.7rem'}
								mt={0.5}
								borderRadius='50%'
								bgcolor='#DFDAFF'
							/>
						</Box>
						<Typography
							className='aboutPlace__p'
						>
							{rule.charAt(0).toUpperCase() + rule.slice(1).toLowerCase()}
						</Typography>
					</Stack>
				))}
			</Box>
		</Box>
	);
};

export default DetailsListItem;
