import { useState, useEffect } from 'react';
import AddIcon from './AddIcon';

// import React {useState} from 'react'
import '../../styles/Info/tagInput.scss';
interface tagProp {
	check: (value: boolean) => void;
	placeHolder: string;
}
const TagInput = ({ check, placeHolder }: tagProp) => {
	const [tags, setTags] = useState<string[]>([]);
	const [clicked, setClicked] = useState(false);
	const handleKeyDown = (e: any) => {
		if (e.key !== 'Enter') return;
		const value = e.target.value;
		if (!value.trim()) return;
		setTags([...tags, value]);
		e.target.value = '';
	};
	const checked = clicked && tags.length === 0;
	const removeTag = (index: number) => {
		setTags(tags.filter((el, i) => i !== index));
	};

	useEffect(() => {
		checked && check(true);
	}, [tags]);

	return (
		<div className='app__tag-item-container'>
			{tags.map((tag, index) => (
				<div className='app__tag-item' key={index}>
					<div></div>
					<span className='app__tag-text'>{tag}</span>
					<span className='app__tag-close' onClick={() => removeTag(index)}>
						X
					</span>
				</div>
			))}
			<div className='app__tags-input-container'>
				<div className='app__tags-input-field'>
					<input
						onClick={() => setClicked(true)}
						onKeyDown={handleKeyDown}
						type='text'
						placeholder={placeHolder}
					/>
				</div>
				<AddIcon onClick={() => console.log('tos')} right='' bottom='' />
			</div>
			{clicked && tags.length === 0 ? <span className='error-msg'>*Required</span> : null}
		</div>
	);
};

export default TagInput;
