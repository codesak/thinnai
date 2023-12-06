import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/system/Stack';
import _ from 'lodash';
import * as React from 'react';

export interface IChipIconElement {
	id: string;
	title: string;
	icon: string;
}

export interface IChipTextElement {
	id: string;
	title: string;
}

interface IChipInputProps {
	baseTextList: IChipTextElement[];
	baseIconList: IChipIconElement[];
	isIcon: boolean;
	selectMultiple: boolean;
	selected: boolean[];
	baseIconImageLocation: string;
	selectedBackgroundColor: string;
	selectedTextColor: string;
	onChange: Function;
}

export default function ChipInput({
	baseTextList,
	baseIconList,
	isIcon,
	selectMultiple,
	selected,
	baseIconImageLocation,
	selectedBackgroundColor,
	selectedTextColor,
	onChange,
}: IChipInputProps) {
	const handleClick = (index: number) => {
		let selectedInternal = _.cloneDeep(selected);
		if (selectMultiple) {
			selectedInternal[index] = !selectedInternal[index];
		} else {
			selectedInternal.forEach((selection, index) => (selectedInternal[index] = false));
			selectedInternal[index] = true;
		}
		onChange(selectedInternal);
	};
	const list = isIcon ? baseIconList : baseTextList;
	return (
		<Stack direction='row'>
			{list.length > 0 &&
				list.map((_, index) => (
					<ListItem key={index}>
						<Chip
							icon={
								isIcon ? (
									<Avatar src={`${baseIconImageLocation}/${baseIconList[index].icon}`} alt='' />
								) : undefined
							}
							clickable
							style={{
								background: selected[index] ? selectedBackgroundColor : 'white',
								color: selected[index] ? selectedTextColor : 'black',
								borderColor: selectedTextColor,
							}}
							variant={selected[index] ? undefined : 'outlined'}
							onClick={__ => handleClick(index)}
							label={isIcon ? baseIconList[index].title : baseTextList[index].title}
						/>
					</ListItem>
				))}
		</Stack>
	);
}

export const getCheckedArrayString = (value: string, values: string[]) =>
	Array.from(new Array(values.length), (val, index) => values[index] == value);

export const getCheckedArrayArray = (value: string[], values: string[]) =>
	Array.from(new Array<boolean>(values.length), (val, index) => value.indexOf(values[index]) != -1);
