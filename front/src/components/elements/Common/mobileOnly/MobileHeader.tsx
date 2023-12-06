import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

export default function MobileHeader({
	headerText,
	color = '#272F3D',
	urlPath = -1,
}: {
	headerText: string;
	color?: string;
	urlPath?: any;
}) {
	const navigate = useNavigate();
	return (
		<Box
			display={{ md: 'none', sm: 'flex' }}
			padding={{
				md: '1.875rem 0px',
				xs: '0px',
			}}
		>
			<Box display={'flex'} justifyContent='flex-start'>
				<Button
					style={{
						minWidth: '15px',
						margin: '0.6rem 0rem 0rem 1.3rem',
					}}
					onClick={() => navigate(urlPath)}
				>
					<svg
						width='0.75rem'
						height='1.25rem'
						viewBox='0 0 0.75rem 1.25rem'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M7 15.038L1 8.10908L7 1.18018'
							stroke={color}
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</Button>
				<Box
					fontWeight='700'
					fontSize='2.125rem'
					lineHeight='1.3em'
					letterSpacing='0.015em'
					color={color}
					gap={1.8}
					marginLeft='2px'
					fontFamily={'Montserrat'}
				>
					{headerText}
				</Box>
			</Box>
			<Box
				height={{
					md: 20,
					xs: 0,
				}}
			/>
		</Box>
	);
}
