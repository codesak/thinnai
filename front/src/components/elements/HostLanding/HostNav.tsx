import MenuIcon from '@mui/icons-material/Menu';
import {
	Box,
	Button,
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	MenuItem,
	SwipeableDrawer,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';



const useStyles: any = makeStyles({
	item: {
		fontSize: '20px',
		fontFamily: 'Montserrat',
		fontWeight: 500,
		'&:hover': {
			borderBottom: '2px solid white',
		},
	},
});

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const HostNav = () => {
	const classes = useStyles();
	const navigate = useNavigate();


	const [state, setState] = useState({
		top: false,
		left: false,
		bottom: false,
		right: false,
	});

	const toggleDrawer =
		(anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event &&
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return;
			}

			setState({ ...state, [anchor]: open });
		};

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{['Register now'].map((text, index) => (
					<ListItem key={text} disablePadding>
						<ListItemButton>
							<ListItemText primary={text} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);

	return (
		<>
			<Box
				height='80px'
				flexDirection='column'
				justifyContent='center'
				sx={{
					background: 'rgba(0, 0, 0)',
					boxShadow: 'none',
					top: '0',
					left: '0',
					padding: '0.5rem 6rem',
					'@media (max-width: 600px)': { padding: '10px 24px' },
				}}
				display={{
					xl: 'flex',
					md: 'flex',
					sm: 'none',
					xs: 'none',
				}}
			>
				<Box
					display='flex'
					justifyContent='space-between'
					alignItems='center'
					color='white'
					margin='0px 70px'
					paddingY='30px'
				>
					<Box
					sx={{cursor:'pointer'}}
					onClick={()=>navigate(ROUTES.ROOT)} 
					>
					 	
						<img 
							style={{
								height: '2.5rem',
							}}
							src='assets/images/logo.png' alt='' />
					</Box>
					<Box
						display='flex'
						justifyContent='space-between'
						alignItems='center'
						color='white'
						gap={15}
					>
						{/* <Box display='flex' gap={3}>
							<MenuItem className={classes.item}>Home</MenuItem>
							<MenuItem className={classes.item}>Blog</MenuItem>
							<MenuItem className={classes.item}>Media</MenuItem>
						</Box> */}
						<Box>
							<Button
								onClick={() => navigate(ROUTES.ROOT)}
								sx={{
									textTransform: 'none',
									color: 'white',
									fontSize: '20px',
									fontFamily: 'Montserrat',
								}}
							>
								Book You Space Now
							</Button>
						</Box>
					</Box>
				</Box>
			</Box>
			<Box
				bgcolor='#000000'
				height='80px'
				display={{
					xl: 'none',
					md: 'none',
					sm: 'block',
					xs: 'block',
				}}
			>
				{(['right'] as const).map(anchor => (
					<React.Fragment key={anchor}>
						<Box
							marginX={{
								sm: '40px',
								xs: '30px',
							}}
							display='flex'
							justifyContent='space-between'
							alignItems='center'
							paddingTop={2}
						>
							<img
								style={{
									marginLeft: '40px',
									height: '2.5rem',

								}}
								src='assets/images/logo.png'
								alt=''
							/>
							<Button onClick={toggleDrawer(anchor, true)}>
								<MenuIcon
									sx={{
										color: 'white',
									}}
								/>
							</Button>
						</Box>
						<SwipeableDrawer
							anchor={anchor}
							open={state[anchor]}
							onClose={toggleDrawer(anchor, false)}
							onOpen={toggleDrawer(anchor, true)}
						>
							{list(anchor)}
						</SwipeableDrawer>
					</React.Fragment>
				))}
			</Box>
		</>
	);
};

export default HostNav;
