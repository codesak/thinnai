import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	Box,
	Button,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormGroup,
	FormHelperText,
	OutlinedInput,
	Radio,
	RadioGroup,
	TextField,
	Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store';
import otherpayment from '../../styles/Payment/otherPayment.module.css'

const OtherPayment = ({ bookingDetails, setMark, setMark1, mark1 }: any) => {
	const paymentMethods = useSelector((state: RootState) => state.profile.userData.paymentMethods);
	const [date, setDate] = useState<Dayjs | null>(null);
	const [CVV, setCVV] = useState<Dayjs | null>(null);

	const [expanded2, setExpanded2] = React.useState<string | false>(false);

	const handleChange2 = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded2(isExpanded ? panel : false);
		setMark("")
	};
	return (
		<Box>
			<Box
				margin={{
					xl: '0px 3.75rem',
					md: '0px 3.75rem',
					sm: '0px 1.875rem',
					xs: '0px 1.5rem 1.5rem',
				}}
			>
				<Typography className={otherpayment.title}>Other Payment Methods</Typography>
				<Box>
					<FormControl>
						<RadioGroup
							aria-labelledby='demo-radio-buttons-group-label'
							defaultValue='female'
							value={mark1}
							name='radio-buttons-group'
						>
							<Accordion
								expanded={expanded2 === 'panel11'}
								onChange={handleChange2('panel11')}
								sx={{
									boxShadow: 'none',
								}}
							>
								<AccordionSummary
									aria-controls='panel1bh-content'
									id='panel1bh-header'
									expandIcon={<ExpandMoreIcon />}
									className={otherpayment.summary}
								>
									<FormControlLabel value='upi' control={<Radio />} label='UPI' onClick={()=>setMark1("upi")} />
								</AccordionSummary>
								<AccordionDetails className={otherpayment.accordionDetails}>
									<FormControl variant='outlined'>
										<Typography className={otherpayment.existingUpi}>Please enter existing UPI ID</Typography>
										<Box className={otherpayment.upiWrapper}>
											<OutlinedInput className={otherpayment.upiInput} id='outlined-adornment-weight' aria-describedby='outlined-weight-helper-text'/>
											<Button className={otherpayment.upiBtn} variant='contained'>Verify</Button>
										</Box>
										{/* <FormHelperText
											style={{ marginLeft: '0', color: '#A1A1A1' }}
											id='outlined-weight-helper-text'
										>
											Please press proceed to complete the booking
										</FormHelperText> */}
										<FormGroup className={otherpayment.checkWrapper}>
											<FormControlLabel control={<Checkbox />} label='Save this card for future use'/>
										</FormGroup>
									</FormControl>
								</AccordionDetails>
							</Accordion>
							<Accordion
								expanded={expanded2 === 'panel12'}
								onChange={handleChange2('panel12')}
								sx={{
									boxShadow: 'none',
								}}
							>
								<AccordionSummary
									aria-controls='panel2bh-content'
									id='panel2bh-header'
									expandIcon={<ExpandMoreIcon />}
									className={otherpayment.summary}
								>
									<FormControlLabel value='credit' control={<Radio />} label='Credit / Debit' onClick={()=>setMark1("credit")} />
								</AccordionSummary>
								<AccordionDetails className={otherpayment.accordionDetails}>
									{!bookingDetails ? (
										<RadioGroup
											aria-labelledby='demo-radio-buttons-group-label'
											defaultValue='1'
											name='radio-buttons-group'
										>
											<Box
												marginBottom={4}
												border='1px solid #A5A5A5'
												padding={2}
												borderRadius='10px'
											>
												<Box display='flex' justifyContent='space-between'>
													<Box>
														<img src='assets/images/payment/visa.svg' alt='' />
													</Box>
													<Box>
														<Typography variant='subtitle2'>Canara Bank Debit Card</Typography>
														<Typography color='#A0A0A0'>**** **** **** 5026</Typography>
													</Box>
													<Typography color='#A0A0A0' variant='subtitle2'>
														Exp - 15/23
													</Typography>
													<Box
														color='#A0A0A0'
														display='flex'
														justifyContent='flex-end'
														alignItems='center'
													>
														<FormControlLabel value='canara' control={<Radio />} label='' />
													</Box>
												</Box>
												<Typography
													variant='subtitle2'
													style={{ textAlign: 'center', marginTop: '0.625rem' }}
												>
													<span style={{ color: '#A0A0A0' }}>Secure this card as per</span> RBI
													Guidelines
												</Typography>
											</Box>
											<Box
												marginBottom={4}
												border='1px solid #A5A5A5'
												padding={2}
												borderRadius='10px'
											>
												<Box display='flex' justifyContent='space-between'>
													<Box>
														<img src='assets/images/payment/mastercard.svg' alt='' />
													</Box>
													<Box>
														<Typography variant='subtitle2'>ICICI Bank Debit Card</Typography>
														<Typography color='#A0A0A0'>**** **** **** 5026</Typography>
													</Box>
													<Typography color='#A0A0A0' variant='subtitle2'>
														Exp - 15/23
													</Typography>
													<Box
														color='#A0A0A0'
														display='flex'
														justifyContent='flex-end'
														alignItems='center'
													>
														<FormControlLabel value='icici' control={<Radio />} label='' />
													</Box>
												</Box>
												<Typography
													variant='subtitle2'
													style={{ textAlign: 'center', marginTop: '0.625rem' }}
												>
													<span style={{ color: '#A0A0A0' }}>Secure this card as per</span> RBI
													Guidelines
												</Typography>
											</Box>
											<Box
												marginBottom={4}
												border='1px solid #A5A5A5'
												padding={2}
												borderRadius='10px'
											>
												<Box display='flex' justifyContent='space-between'>
													<Box>
														<img src='assets/images/payment/debit-credit.svg' alt='' />
													</Box>
													<Box>
														<Typography variant='subtitle2'>Add Debit / Credit Card</Typography>
														<Typography color='#A0A0A0'>**** **** **** 5026</Typography>
													</Box>
													<Typography color='#A0A0A0' variant='subtitle2'>
														Exp - 15/23
													</Typography>
													<Box
														color='#A0A0A0'
														display='flex'
														justifyContent='flex-end'
														alignItems='center'
													>
														<FormControlLabel value='debitCredit' control={<Radio />} label='' />
													</Box>
												</Box>
												<Typography
													variant='subtitle2'
													style={{ textAlign: 'center', marginTop: '0.625rem' }}
												>
													<span style={{ color: '#A0A0A0' }}>Secure this card as per</span> RBI
													Guidelines
												</Typography>
											</Box>
										</RadioGroup>
									) : (
										<Box component='form' noValidate autoComplete='off' className={otherpayment.cardInfoWrapper}>
												<TextField fullWidth placeholder='Card Holder' className={otherpayment.cardInput}/>
												<TextField fullWidth placeholder='Card Number' className={otherpayment.cardInput}/>
										<Box>
										<Box className={otherpayment.textWrapper}>
												<LocalizationProvider dateAdapter={AdapterDayjs}>
													<MobileDatePicker
														views={['year', 'month']}
														// label='Expiry Date'
														value={date}
														onChange={newValue => {
															setDate(newValue);
														}}
														renderInput={params => (
															<TextField placeholder='Expiry Date' fullWidth {...params} className={otherpayment.cardInput}/>
														)}
													/>
												</LocalizationProvider>
												<TextField fullWidth placeholder='CVV' className={otherpayment.cardInput}/>
										</Box>
												
											</Box>
											<FormGroup className={otherpayment.checkWrapper}>
												<FormControlLabel
													control={<Checkbox />}
													label='Save this card for future use'
												/>
											</FormGroup>
										</Box>
									)}
								</AccordionDetails>
							</Accordion>
						</RadioGroup>
					</FormControl>
				</Box>
			</Box>
		</Box>
	);
};

export default OtherPayment;
