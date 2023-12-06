import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import '../../styles/Detail/detail.css';
import { RootState } from '../../../store';
import { useSelector } from 'react-redux';
import { Divider } from '@mui/material';


export default function FAQs() {
	const [expanded, setExpanded] = React.useState<string | false>(false);
	const property: any = useSelector<RootState, string>(state => state.details.property);

	const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
		setExpanded(isExpanded ? panel : false);
	};
	const p = property?.faqs.length
	
	

	return (
		<>
			<Box className='aboutPlace__header'>FAQ’s</Box>
			{property?.faqs?.map((item:any,index:number)=>(
				<>
				<Accordion
				expanded={expanded === `panel${index}`}
				onChange={handleChange(`panel${index}`)}
				className='faq-container'
				key={index}
				sx={{
					'&:before': {
						display: 'none',
					}
				}}
			>
				
				<AccordionSummary
					expandIcon={<ExpandMoreIcon />}
					aria-controls='panel1bh-content'
					id='panel1bh-header'
					className='faq-sumary-title'
				>
					<Typography className='aboutPlace__p' sx={{ flexShrink: 0 }}>
						{index+1}. {item?.question}
					</Typography>
				</AccordionSummary>
				<AccordionDetails>
					<Typography className='aboutPlace__p'>
						{item?.answer}
					</Typography>
				</AccordionDetails>
			</Accordion>
			{index!== p-1 && <Divider />}
			</>
			))}
		</>
	);
}
