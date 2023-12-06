import React, { useState } from 'react';
interface inputProps {
	state: { text: string }[];
	setState: (value: { text: string }[]) => void;
	inputView: boolean;
	setInputView: (value: boolean) => void;
}

const InputView = ({ state, setState, inputView, setInputView }: inputProps) => {
	// New Field Input Function
	// const [inputView, setInputView] = useState(true);
	const enterInput = (
		e: any,
		input: { text: string }[],
		setInput: (value: { text: string }[]) => void
	) => {
		if (e.key !== 'Enter') return;
		const value = { text: e.target.value };
		if (!value.text.trim()) return alert('Please Enter Valid Input');
		setInput([...input, value]);
		e.target.value = '';
		setInputView(false);
	};

	return (
		<>
			{inputView && (
				<div style={{ position: 'relative' }}>
					<input
						style={{ outline: 'none' }}
						type="text"
						className="app__item-tag"
						onKeyDown={(e) => enterInput(e, state, setState)}
					/>
					<div
						className="app__info-newitemTag-close-container"
						onClick={() => setInputView(!inputView)}
					>
						<li className="app__info-newitemTag-close">X</li>
					</div>
				</div>
			)}
		</>
	);
};

export default InputView;
