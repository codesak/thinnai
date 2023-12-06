import { useMediaQuery } from '@mui/material';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

const ActiveLink = ({ children, to, ...props }: any) => {
	const resolved = useResolvedPath(to);
	const match = useMatch({ path: resolved.pathname, end: false });
	const breakPoint = useMediaQuery('(max-width:600px)');
	const xsDevice = useMediaQuery('(max-width:400px)');

	return (
		<Link
			className='underline'
			style={{
				textDecoration: 'none',
				paddingBottom: breakPoint ? '0.938rem' : '1.5rem',
				color: match ? '#8F7EF3' : '#959595',
				borderBottom: match ? '2px solid #8F7EF3' : '',
				fontWeight: 600,
				fontSize: breakPoint ? '0.9rem' : '1rem',
			}}
			to={to}
			{...props}
		>
			{children}
		</Link>
	);
};

export default ActiveLink;
