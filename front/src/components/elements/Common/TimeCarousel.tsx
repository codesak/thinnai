import Box from '@mui/material/Box';
import { useState } from 'react';
import Slider from 'react-slick';
import '../../styles/Detail/timeCarousel.scss';
import { useEffect, useRef } from 'react';
import { timeArray } from '../../../utils/consts';
import React from 'react';
import Slot from '../Detail/Slot';
import '../../styles/Main/slick.scss';
interface timeProps {
	data: { time: string; key:number }[];
	onClick: (i: number) => void;
	setTimeOnSlide: (value: number) => void;
	currentIndex: number | null;
	sliderRef?: any;
	unavailableSlots?: string[];
}


const TimeCarousel = ({ data, onClick, setTimeOnSlide, currentIndex,sliderRef,unavailableSlots }: timeProps) => {

	
	const settings = {
		focusOnSelect: true,
		speed: 300,
		slidesToShow: 9,
		slidesToScroll: 1,
		centerMode: true,
		centerPadding: '0px',
		className: 'centered',
		initialSlide: currentIndex ?? 0,
		swipeToSlide: true,
		swipe: true,
		draggable: true,
		afterChange: function (currentSlide: number) {
			var i = currentSlide ? currentSlide : 0;
			setTimeOnSlide(i);
			onClick(i)
		},
	};

	const isSlotUnavailable = (time: string) => {
		return unavailableSlots?.includes(time)
	  }

	return (
		<Box className='timeCarousel' height={{ md: '3rem', xs: '3.5rem' }}>
			<Slider ref={sliderRef} {...settings}>
				{data.map((time, index) => (
					<div key={index}>
						<Box
						display='flex'
						justifyContent='center'
						gap={0.7}
						// onClick={() => onClick(index)}
						key={time.key}
					>
						<Slot time={time.time} key={time.key} isUnavailable={isSlotUnavailable(time.time)} />
						<Box
							display='flex'
							height={12}
							width='1.2px'
							margin='auto'
							sx={{ background: '#A2E898' }}
						/>
						{index % 2 === 0 && (
							<Box
								height='5px'
								width='5px'
								margin='auto'
								borderRadius='50%'
								sx={{ background: '#24BA0E' }}
							/>
						)}
						{index % 2 === 0 && (
							<Box fontSize='0.27rem' textAlign='center' className='time'>
								{time.time}
							</Box>
						)}
					</Box>
					</div>
					
				))}
			</Slider>
			
		</Box>
	);
};

export default TimeCarousel
