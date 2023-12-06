import React, { Dispatch } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { setGuestCount } from '../../../actions/search';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';

interface counterProps {
	guest?: boolean;
	maxValue: number;
	setErrMsg?:any
}
const errTime = (setErrMsg?:any)=>{
	setErrMsg(true)
	setTimeout(()=>(
     setErrMsg(false)
	),4000)
}
const Counter = ({ guest, maxValue, setErrMsg }: counterProps) => {
	const dispatch: Dispatch<any> = useDispatch();

	const guestCount = useSelector<RootState, number>(state => state.search.guestCount);
	

	const handleIncrement = () => {
		if (guestCount < maxValue) {
			dispatch(setGuestCount({ guestCount: guestCount + 1 }));			
		}
		else errTime(setErrMsg);
		
	};

	const handleDecrement = () => {
		if (guestCount > 1) {
			dispatch(setGuestCount({ guestCount: guestCount - 1 }));setErrMsg(false)
		}
	};

	return (
		<ButtonGroup
			size='small'
			style={{ border: '1px solid #868686', height: '33px', width: '100%' }}
			aria-label='small button group'
		>
			<Button onClick={handleDecrement} style={{ border: 'none', color:'#000000' }} disabled={guestCount === 0}>
				-
			</Button>
			<Button style={{ border: 'none', fontWeight:'900', fontFamily:'Open Sans', flex: '1', textTransform: 'capitalize', color:'#272F3D' }}>
				{guestCount} {guest && `Guest${guestCount > 1 ? 's' : ''}`}
			</Button>
			<Button onClick={handleIncrement} style={{ border: 'none', color:'#000000' }}>
				+
			</Button>
		</ButtonGroup>
	);
};

export default Counter;
