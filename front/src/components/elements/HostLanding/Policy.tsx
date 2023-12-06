import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import axios from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { createEditor } from 'slate';
import { Editable, Slate, useFocused, useSelected, withReact } from 'slate-react';
import { ROUTES } from '../../../utils/routing/routes';
import Loading from '../Loading/Loading';
import style from '../../styles/policy.module.css'
import Footer from '../GuestLanding/Footer';
export interface IPolicyDocuments {
	id: string;
	title: string;
	content: any;
	_id: string;
}

export default function Policy() {
	const navigate = useNavigate();
	const { policyId } = useParams<{ policyId: string }>();
	const [loading, setLoading] = useState(true);
	const [policyData, setPolicyData] = useState<IPolicyDocuments>();
	const editor = useMemo(() => withReact(createEditor()), []);
	const renderElement = useCallback(props => <Element {...props} />, []);
	const renderLeaf = useCallback(props => <Leaf {...props} />, []);
	const getPolicy = async () => {
		try {
			const policyDataResult = await axios.get(
				'https://canary.bookmythinnai.com/api/public/docs/' + policyId
			);

			setPolicyData(policyDataResult.data.document);
			setLoading(false);
		} catch {
			navigate(ROUTES.ROOT);
		}
	};
	
	useEffect(() => {
		getPolicy();
	}, []);
	if (loading) {
		return (
			<Container>
				<Box height='5vh' />
				<Box
					width={{
						md: '30%',
						sm: '40%',
						xs: '60%',
					}}
				>
					<Loading />
				</Box>
			</Container>
		);
	}
	return (
		<>
		<div className={style.policyHeader}>
			<h1 className={style.title}>{policyData?.title}</h1>
			</div>
			<div className={style.wrapper}>
			<Container>
				<Box height='2vh' />
				<Slate editor={editor} value={policyData?.content}>
					<Editable
						renderElement={renderElement}
						renderLeaf={renderLeaf}
						readOnly
						placeholder='Loading Policy Data'
						/>
				</Slate>
				</Container>
			</div>
				
		<Box>
			<Footer/>
		</Box>
	</>
	);
}

const Element = (props: { attributes: any; children: any; element: any }) => {
	const { attributes, children, element } = props;
	const style = { textAlign: element.align };
	switch (element.type) {
		case 'block-quote':
			return (
				<blockquote style={style} {...attributes}>
					{children}
				</blockquote>
			);
		case 'bulleted-list':
			return (
				<ul style={style} {...attributes}>
					{children}
				</ul>
			);
		case 'heading-one':
			return (
				<h1 style={style} {...attributes}>
					{children}
				</h1>
			);
		case 'heading-two':
			return (
				<h3 style={style} {...attributes}>
					{children}
				</h3>
			);
		case 'heading-four':
			return (
				<h4 style={style} {...attributes}>
					{children}
				</h4>
			);
		case 'list-item':
			return (
				<li style={style} {...attributes}>
					{children}
				</li>
			);
		case 'numbered-list':
			return (
				<ol style={style} {...attributes}>
					{children}
				</ol>
			);
		case 'image':
			return <Image {...props} />;
		default:
			return (
				<p style={style} {...attributes}>
					{children}
				</p>
			);
	}
};

const Leaf = ({ attributes, children, leaf }: { attributes: any; children: any; leaf: any }) => {
	if (leaf.bold) {
		children = <strong>{children}</strong>;
	}

	if (leaf.code) {
		children = <code>{children}</code>;
	}

	if (leaf.italic) {
		children = <em>{children}</em>;
	}

	if (leaf.underline) {
		children = <u>{children}</u>;
	}
	return <span {...attributes}>{children}</span>;
};

const Image = ({
	attributes,
	children,
	element,
}: {
	attributes: any;
	children: any;
	element: any;
}) => {
	const selected = useSelected();
	const focused = useFocused();
	return (
		<div {...attributes}>
			{children}
			<div contentEditable={false} style={{ position: 'relative' }}>
				<img
					src={element.url}
					style={{
						display: 'block',
						maxWidth: '100%',
						maxHeight: '20em',
						boxShadow: selected && focused ? '0 0 0 3px #B4D5FF' : 'none',
					}}
					alt=''
				/>
			</div>
		</div>
	);
};
