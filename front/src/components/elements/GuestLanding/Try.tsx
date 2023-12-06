import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../../utils/routing/routes';

const Try = () => {
	const navigate = useNavigate();
	return (
		<Box display='flex' flexDirection='column'>
			<Box
				display='flex'
				justifyContent='center'
				textAlign='center'
				fontWeight='600'
				fontSize={{ md: '2.25rem', xs: '1.7rem' }}
				lineHeight='64px'
				color='#000000'
				className='try__header'
				position='relative'
				marginBottom='60px'
			>
				Try Hosting For A Week?
			</Box>
			<Box>
				<Grid
					container
					direction={{ md: 'row', xs: 'column' }}
					// className="emptySpace__grid__cont"
					wrap='nowrap'
					margin='auto'
					width='73%'
					height={{ md: '354px', sm: 'auto', xs: 'auto' }}
					gap={2}
					position='relative'
					zIndex='1'
					// paddingLeft={{ xl: "28px", lg: "20px", md: "20px", xs: "0px" }}
				>
					<Grid
						item
						display='flex'
						flexDirection='column'
						width='100%'
						height='354px'
						justifyContent='flex-end'
						alignItems='center'
						md={4}
						sx={{
							background: '#FFFCF8',
							border: '1px dashed #F4CF97',
							boxShadow: '0px 4px 20px rgba(205, 205, 205, 0.25)',
							backdropFilter: 'blur(10px)',
							borderRadius: '30px',
						}}
						position='relative'
						maxWidth={{ md: '33.333% !important', xs: 'none' }}
						component={motion.div}
						initial={{ translateY: '-20px', opacity: '0' }}
						whileInView={{ translateY: '0px', opacity: '1' }}
						viewport={{ once: true }}
						transition={{
							delay: 0.2,
							x: { duration: 0.5 },
						}}
						// top={{ xs: "-228px", md: "0px" }}
						// left={{ xs: "-38px", md: "12px" }}
						// className="emptySpace__grid2"
					>
						{/* <img
                    className="emptySpace__imgs emptySpace__background__img2"
                    style={{ height: "423px", position: "absolute" }}
                    src="/assets/images/page/Vector_7.svg"
                    alt=""
                    />
                    <img
                    className="emptySpace__img__res emptySpace__back__img2"
                    src="/assets/images/page/Vector_17.svg"
                    alt=""
                    /> */}
						<Box
							width='100%'
							height='354px'
							paddingLeft={{ xl: '25px', sm: '0px' }}
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute' }}
						
						>
							<img
								className='emptySpace__img__avtar2 try_block'
								style={{ paddingLeft: '0px', width: '75%' }}
								src='/assets/images/page/emptySpace2.svg'
								alt=''
							/>
							<Box className='emptySpace-steps' position='relative' top='22px'>
								Good Income Source
							</Box>
						</Box>
					</Grid>
					{/* <Grid
                    item
                    display={{ md: "flex", xs: "none" }}
                    width="100%"
                    height="354px"
                    justifyContent="center"
                    alignItems="center"
                    md={4}
                    position="relative"
                    maxWidth={{ md: "33.333% !important", xs: "none" }}
                >
                    <img
                    style={{ width: "130%", position: "absolute" }}
                    src="/assets/images/page/Vector_9.svg"
                    alt=""
                    />
                    <Box
                    width="100%"
                    height="354px"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ position: "absolute", left: "0px", top: "0px" }}
                    >
                    <img
                        style={{ padding: "35px 0 0 25px", width: "70%" }}
                        src="/assets/images/page/emptySpace3.svg"
                        alt=""
                    />
                    <Box className="emptySpace-steps" position="relative" top="13px">
                        Meet Interesting People
                    </Box>
                    </Box>
                </Grid> */}
					<Grid
						item
						display={{ md: 'flex', xs: 'flex' }}
						width='100%'
						height='354px'
						justifyContent='center'
						alignItems='center'
						md={4}
						position='relative'
						sx={{
							background: '#FFFCF8',
							border: '1px dashed #F4CF97',
							boxShadow: '0px 4px 20px rgba(205, 205, 205, 0.25)',
							backdropFilter: 'blur(10px)',
							borderRadius: '30px',
						}}
						component={motion.div}
						initial={{ translateY: '-20px', opacity: '0' }}
						whileInView={{ translateY: '0px', opacity: '1' }}
						viewport={{ once: true }}
						transition={{
							delay: 0.2,
							x: { duration: 0.5 },
						}}
					>
						{/* <img src="/assets/images/page/Vector_16.svg" alt="" /> */}
						<Box
							width='100%'
							height='354px'
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute', left: '0px', top: '-20px' }}
						>
							<img
								className='emptySpace__img__avtar3 try_block'
								style={{ padding: '0px', width: '75%' }}
								src='/assets/images/page/emptySpace4.svg'
								alt=''
							/>
							<Box className='emptySpace-steps' position='relative' top='50px'>
								Meet Interesting People
							</Box>
						</Box>
					</Grid>

					<Grid
						item
						display='flex'
						width={{ md: '100%', xs: '100%' }}
						height='354px'
						justifyContent='center'
						alignItems='center'
						md={4}
						position='relative'
						maxWidth={{ md: '33.333% !important', xs: 'none' }}
						sx={{
							background: '#FFFCF8',
							border: '1px dashed #F4CF97',
							boxShadow: '0px 4px 20px rgba(205, 205, 205, 0.25)',
							backdropFilter: 'blur(10px)',
							borderRadius: '30px',
						}}
						component={motion.div}
						initial={{ translateY: '-20px', opacity: '0' }}
						whileInView={{ translateY: '0px', opacity: '1' }}
						viewport={{ once: true }}
						transition={{
							delay: 0.2,
							x: { duration: 0.5 },
						}}
					>
						<Box
							width='100%'
							height='354px'
							display='flex'
							flexDirection='column'
							alignItems='center'
							justifyContent='center'
							style={{ position: 'absolute', left: '0px', top: '0px' }}
						>
							<img
								className='emptySpace__img__avtar1 try_block'
								style={{ padding: '0 0 20px 25px', width: '40%' }}
								src='/assets/images/page/emptySpace1.svg'
								alt=''
							/>
							<Box
								className='emptySpace-steps'
								textAlign='center'
								position='relative'
								bottom='10px'
							>
								Add joy to your life
							</Box>
						</Box>
					</Grid>
				</Grid>
				<Box
					display='flex'
					position='relative'
					top={{
						xl: '-180px',
						md: '-180px',
						sm: '-150px',
						xs: '10px',
					}}
					zIndex='0'
					minHeight='100px'
					justifyContent='center'
					alignItems='end'
					textAlign='center'
					// sx={{ background: '#F4CF97' }}
				>
					<Box display='flex' justifyContent='center' marginBottom='40px'>
						<Button
							variant='contained'
							sx={{
								background: '#1A191E',
								fontFamily: 'Montserrat',
								fontStyle: 'normal',
								fontWeight: '400',
								fontSize: '20px',
								lineHeight: '24px',
								textTransform: 'capitalize',
								margin: 'auto',
								padding: '13px 60px',
								textAlign: 'center',
								':hover': {
									bgcolor: '#F4CF97', // theme.palette.primary.main
									color: 'black',
								}
							}}
							onClick={() => navigate(ROUTES.HOST_LANDING)}
						>
							Know More
						</Button>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};

export default Try;
