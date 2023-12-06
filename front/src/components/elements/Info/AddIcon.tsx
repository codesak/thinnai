import { MouseEventHandler } from 'react';

interface posPorp {
	right: string;
	bottom: string;
	onClick: MouseEventHandler;
}

const AddIcon = ({ right, bottom, onClick }: posPorp) => {
	return (
		<div
			onClick={onClick}
			style={{
				width: '36px',
				height: '23px',
				background: ' #F8F8F8',
				border: '1px dashed #827777',
				borderRadius: '4px',
				fontFamily: 'Open Sans',
				fontStyle: 'normal',
				fontWeight: '400',
				fontSize: '1.125rem',
				lineHeight: '25px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				textAlign: 'center',
				cursor: 'pointer',
				color: '#827777',
				position: 'relative',
				right: right,
				bottom: bottom,
			}}
		>
			+
		</div>
	);
};

export default AddIcon;
