import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import TagFacesIcon from '@mui/icons-material/TagFaces';
import Box from '@mui/material/Box';

interface ratingProps {
	data: { neutral: number; good: number; bad: number };
	height?: number | { sm: number; xs: number };
	fontSize?: string;
	iconsize?: string;
}

const Rating = ({ data, height = 35, fontSize, iconsize }: ratingProps) => {
	const total = data?.bad + data?.good + data?.neutral;
	const good = (data?.good / total) * 100;
	const neutral = (data?.neutral / total) * 100;
	const bad = (data?.bad / total) * 100;

	return (
		<Box display='flex' borderRadius='5px' overflow='hidden'>
			<Box
				height={height}
				paddingLeft='0.375rem'
				width={good + '%'}
				display='flex'
				alignItems='center'
				minWidth='68px'
				fontSize={fontSize}
				sx={{ background: '#74EDB3', color: '#39A772' }}
			>
				<TagFacesIcon sx={{ fontSize: iconsize }} /> &nbsp; {data?.good}
			</Box>
			<Box
				height={height}
				paddingLeft='0.375rem'
				width={neutral + '%'}
				display='flex'
				alignItems='center'
				minWidth='68px'
				fontSize={fontSize}
				sx={{ background: '#EED893', color: '#C6AA53' }}
			>
				<SentimentSatisfiedAltIcon sx={{ fontSize: iconsize }} /> &nbsp; {data?.neutral}
			</Box>
			<Box
				height={height}
				paddingLeft='0.375rem'
				width={bad + '%'}
				display='flex'
				alignItems='center'
				minWidth='68px'
				fontSize={fontSize}
				sx={{ background: '#F4977E', color: '#C1583C' }}
				borderRadius="0 5px 5px 0"
			>
				<SentimentVeryDissatisfiedIcon sx={{ fontSize: iconsize }} /> &nbsp; {data?.bad}
			</Box>
		</Box>
	);
};

export default Rating;
