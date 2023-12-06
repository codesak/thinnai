import { Box, Divider, Grid } from '@mui/material';
import React, { useState } from 'react';

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import MuiAccordionSummary, { AccordionSummaryProps } from '@mui/material/AccordionSummary';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Accordion = styled((props: AccordionProps) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	border: `1px solid ${theme.palette.divider}`,
	'&:not(:last-child)': {
		borderBottom: 0,
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
	<MuiAccordionSummary {...props} />
))(({ theme }) => ({
	backgroundColor:
		theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
	flexDirection: 'row-reverse',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(90deg)',
	},
	'& .MuiAccordionSummary-content': {
		marginLeft: theme.spacing(1),
	},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
	borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Faqs = () => {
	const [expanded, setExpanded] = useState<string | false>('panel1');

	const handleChange = (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
		setExpanded(newExpanded ? panel : false);
	};

	return (
		<Grid container spacing={2}>
			<Grid item xs={12} sm={12} md={6}>
				<Accordion
					expanded={expanded === 'panel1'}
					onChange={handleChange('panel1')}
					sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
				>
					<AccordionSummary
						sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
						aria-controls='panel1d-content'
						id='panel1d-header'
					>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Box
								marginRight={{
									xl: '30px',
									md: '30px',
									sm: '10px',
									xs: '10px',
								}}
							>
								<Box
									bgcolor={expanded === 'panel1' ? '#F2E1C8' : '#000000'}
									width={{
										xl: '43px',
										md: '43px',
										sm: '32px',
										xs: '32px',
									}}
									height={{
										xl: '43px',
										md: '43px',
										sm: '31px',
										xs: '31px',
									}}
									borderRadius='50%'
									display='flex'
									justifyContent='center'
									alignItems='center'
								>
									<Typography
										color={expanded === 'panel1' ? '#000000' : 'white'}
										fontWeight={600}
										fontSize={{
											xl: '20px',
											md: '20px',
											sm: '14px',
											xs: '14px',
										}}
										fontFamily='Montserrat'
									>
										1
									</Typography>
								</Box>
							</Box>
							<Typography
								fontWeight={600}
								fontSize={{
									xl: '20px',
									md: '20px',
									sm: '14px',
									xs: '14px',
								}}
								fontFamily='Montserrat'
							>
								Is it a Cafe or a Restaurant?
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}>
						<Typography
							marginLeft={{
								xl: '70px',
								md: '78px',
								sm: '50px',
								xs: '50px',
							}}
							fontSize={{
								xl: '16px',
								md: '16px',
								sm: '12px',
								xs: '12px',
							}}
						>
							Thinnai is a uniquely decorated Private dining space that allows you the freedom to
							order from anywhere through Delivery apps.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Box height={{ sm: 35, xs: 15 }} />
				<Divider />
				<Box height={{ sm: 35, xs: 15 }} />
				<Accordion
					expanded={expanded === 'panel2'}
					onChange={handleChange('panel2')}
					sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
				>
					<AccordionSummary
						sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
						aria-controls='panel2d-content'
						id='panel2d-header'
					>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Box
								marginRight={{
									xl: '30px',
									md: '30px',
									sm: '10px',
									xs: '10px',
								}}
							>
								<Box
									bgcolor={expanded === 'panel2' ? '#F2E1C8' : '#000000'}
									width={{
										xl: '43px',
										md: '43px',
										sm: '32px',
										xs: '32px',
									}}
									height={{
										xl: '43px',
										md: '43px',
										sm: '31px',
										xs: '31px',
									}}
									borderRadius='50%'
									display='flex'
									justifyContent='center'
									alignItems='center'
								>
									<Typography
										color={expanded === 'panel2' ? '#000000' : 'white'}
										fontWeight={600}
										fontSize={{
											xl: '20px',
											md: '20px',
											sm: '14px',
											xs: '14px',
										}}
										fontFamily='Montserrat'
									>
										2
									</Typography>
								</Box>
							</Box>
							<Typography
								fontWeight={600}
								fontSize={{
									xl: '20px',
									md: '20px',
									sm: '14px',
									xs: '14px',
								}}
								fontFamily='Montserrat'
							>
								Where are THINNAI spaces located?
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}>
						<Typography
							fontSize={{
								xl: '16px',
								md: '16px',
								sm: '12px',
								xs: '12px',
							}}
							marginLeft={{
								xl: '70px',
								md: '78px',
								sm: '50px',
								xs: '50px',
							}}
						>
							The Thinnai Spaces are located in a secluded portion of People’s Home like Terrace,
							Backyard or Balcony or in a Commercial Space.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Box height={{ sm: 35, xs: 15 }} />
				<Divider />
				<Box height={{ sm: 35, xs: 15 }} />
				<Accordion
					sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
					expanded={expanded === 'panel3'}
					onChange={handleChange('panel3')}
				>
					<AccordionSummary
						sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
						aria-controls='panel3d-content'
						id='panel3d-header'
					>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Box
								marginRight={{
									xl: '30px',
									md: '30px',
									sm: '10px',
									xs: '10px',
								}}
							>
								<Box
									bgcolor={expanded === 'panel3' ? '#F2E1C8' : '#000000'}
									width={{
										xl: '43px',
										md: '43px',
										sm: '32px',
										xs: '32px',
									}}
									height={{
										xl: '43px',
										md: '43px',
										sm: '31px',
										xs: '31px',
									}}
									borderRadius='50%'
									display='flex'
									justifyContent='center'
									alignItems='center'
								>
									<Typography
										color={expanded === 'panel3' ? '#000000' : 'white'}
										fontWeight={600}
										fontSize={{
											xl: '20px',
											md: '20px',
											sm: '14px',
											xs: '14px',
										}}
										fontFamily='Montserrat'
									>
										3
									</Typography>
								</Box>
							</Box>
							<Typography
								fontWeight={600}
								fontSize={{
									xl: '20px',
									md: '20px',
									sm: '14px',
									xs: '14px',
								}}
								fontFamily='Montserrat'
							>
								Do we get complete privacy? What do you mean by Private Dining?
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}>
						<Typography
							fontSize={{
								xl: '16px',
								md: '16px',
								sm: '12px',
								xs: '12px',
							}}
							marginLeft={{
								xl: '70px',
								md: '78px',
								sm: '50px',
								xs: '50px',
							}}
						>
							All Thinnai spaces are private enough for a peaceful dining experience. You may not
							expect a room like Privacy.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Box height={{ sm: 35, xs: 15 }} />
				<Divider />
				<Box height={{ sm: 35, xs: 15 }} />
			</Grid>

			<Grid
				item
				xs={12}
				sm={12}
				md={6}
				// display={{
				// 	xl: 'block',
				// 	md: 'block',
				// 	sm: 'none',
				// 	xs: 'none',
				// }}
			>
				<Accordion
					sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
					expanded={expanded === 'panel4'}
					onChange={handleChange('panel4')}
				>
					<AccordionSummary
						sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
						aria-controls='panel3d-content'
						id='panel3d-header'
					>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Box
								marginRight={{
									xl: '30px',
									md: '30px',
									sm: '10px',
									xs: '10px',
								}}
							>
								<Box
									bgcolor={expanded === 'panel4' ? '#F2E1C8' : '#000000'}
									width={{
										xl: '43px',
										md: '43px',
										sm: '32px',
										xs: '32px',
									}}
									height={{
										xl: '43px',
										md: '43px',
										sm: '31px',
										xs: '31px',
									}}
									borderRadius='50%'
									display='flex'
									justifyContent='center'
									alignItems='center'
								>
									<Typography
										color={expanded === 'panel4' ? '#000000' : 'white'}
										fontWeight={600}
										fontSize={{
											xl: '20px',
											md: '20px',
											sm: '14px',
											xs: '14px',
										}}
										fontFamily='Montserrat'
									>
										4
									</Typography>
								</Box>
							</Box>
							<Typography
								fontWeight={600}
								fontSize={{
									xl: '20px',
									md: '20px',
									sm: '14px',
									xs: '14px',
								}}
								fontFamily='Montserrat'
							>
								Do you serve food, alcohol and hookah at the THINNAI space?
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}>
						<Typography
							marginLeft={{
								xl: '70px',
								md: '78px',
								sm: '50px',
								xs: '50px',
							}}
							fontSize={{
								xl: '16px',
								md: '16px',
								sm: '12px',
								xs: '12px',
							}}
						>
							No, None of our Spaces serves Food or Alcohol. You can order your food through
							delivery apps or Bring your own, for which Plates, Cutlery, Glasses and drinking water
							will be provided.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Box height={{ sm: 35, xs: 15 }} />
				<Divider />
				<Box height={{ sm: 35, xs: 15 }} />
				<Accordion
					sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
					expanded={expanded === 'panel5'}
					onChange={handleChange('panel5')}
				>
					<AccordionSummary
						sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
						aria-controls='panel3d-content'
						id='panel3d-header'
					>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Box
								marginRight={{
									xl: '30px',
									md: '30px',
									sm: '10px',
									xs: '10px',
								}}
							>
								<Box
									bgcolor={expanded === 'panel5' ? '#F2E1C8' : '#000000'}
									width={{
										xl: '43px',
										md: '43px',
										sm: '32px',
										xs: '32px',
									}}
									height={{
										xl: '43px',
										md: '43px',
										sm: '31px',
										xs: '31px',
									}}
									borderRadius='50%'
									display='flex'
									justifyContent='center'
									alignItems='center'
								>
									<Typography
										color={expanded === 'panel5' ? '#000000' : 'white'}
										fontWeight={600}
										fontSize={{
											xl: '20px',
											md: '20px',
											sm: '14px',
											xs: '14px',
										}}
										fontFamily='Montserrat'
									>
										5
									</Typography>
								</Box>
							</Box>
							<Typography
								fontWeight={600}
								fontSize={{
									xl: '20px',
									md: '20px',
									sm: '14px',
									xs: '14px',
								}}
								fontFamily='Montserrat'
							>
								Does Thinnai provide decorations?
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}>
						<Typography
							marginLeft={{
								xl: '70px',
								md: '78px',
								sm: '50px',
								xs: '50px',
							}}
							fontSize={{
								xl: '16px',
								md: '16px',
								sm: '12px',
								xs: '12px',
							}}
						>
							No, Thinnai is not directly involved in any of the Decors. Some of our Hosts to
							provide some additional decors. Please check “Additional paid services” in the listing
							to know if the Host provides additional decors with additional charges.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Box height={{ sm: 35, xs: 15 }} />
				<Divider />
				<Box height={{ sm: 35, xs: 15 }} />
				<Accordion
					sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
					expanded={expanded === 'panel6'}
					onChange={handleChange('panel6')}
				>
					<AccordionSummary
						sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}
						aria-controls='panel3d-content'
						id='panel3d-header'
					>
						<Box display='flex' justifyContent='center' alignItems='center'>
							<Box
								marginRight={{
									xl: '30px',
									md: '30px',
									sm: '10px',
									xs: '10px',
								}}
							>
								<Box
									bgcolor={expanded === 'panel6' ? '#F2E1C8' : '#000000'}
									width={{
										xl: '43px',
										md: '43px',
										sm: '32px',
										xs: '32px',
									}}
									height={{
										xl: '43px',
										md: '43px',
										sm: '31px',
										xs: '31px',
									}}
									borderRadius='50%'
									display='flex'
									justifyContent='center'
									alignItems='center'
								>
									<Typography
										color={expanded === 'panel6' ? '#000000' : 'white'}
										fontWeight={600}
										fontSize={{
											xl: '20px',
											md: '20px',
											sm: '14px',
											xs: '14px',
										}}
										fontFamily='Montserrat'
									>
										6
									</Typography>
								</Box>
							</Box>
							<Typography
								fontWeight={600}
								fontSize={{
									xl: '20px',
									md: '20px',
									sm: '14px',
									xs: '14px',
								}}
								fontFamily='Montserrat'
							>
								Can Thinnai or Host arrange a cake and order food on the guest's behalf?
							</Typography>
						</Box>
					</AccordionSummary>
					<AccordionDetails sx={{ border: '0', bgcolor: 'white', padding: 0, margin: 0 }}>
						<Typography
							marginLeft={{
								xl: '70px',
								md: '78px',
								sm: '50px',
								xs: '50px',
							}}
							fontSize={{
								xl: '16px',
								md: '16px',
								sm: '12px',
								xs: '12px',
							}}
						>
							The Host shall collect the cake based on their availability, if you would place an
							order to the shared address or location of the Thinnai space. (But the Host shall not
							make any orders on your behalf.
						</Typography>
					</AccordionDetails>
				</Accordion>
				<Box height={{ sm: 35, xs: 15 }} />
				<Divider />
				<Box height={{ sm: 35, xs: 15 }} />
			</Grid>
		</Grid>
	);
};

export default Faqs;
