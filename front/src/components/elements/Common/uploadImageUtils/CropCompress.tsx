import { imgPreview } from './imgPreview';
import { useDebounceEffect } from './useDebounceEffect';
import { Alert, Box, Button, Typography } from '@mui/material';
import Compressor from 'compressorjs';
import React, { useState, useRef } from 'react';
import ReactCrop, { PixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

interface cropCompressProps {
	imgSrc: string | null;
	handleCrop: any;
	aspectRatio: any;
	closePreview: any;
	cropErr:boolean;
}

const CropCompress = ({ imgSrc, handleCrop, aspectRatio, closePreview, cropErr }: cropCompressProps) => {
	const imgRef = useRef<HTMLImageElement>(null);
	const [crop, setCrop] = useState<PixelCrop>();
	const [scale, setScale] = useState(1);
	const [rotate, setRotate] = useState(0);

	const [croppedImageFile, setCroppedImageFile] = useState<Blob>();
	const [croppedImageUrl, setCroppedImageUrl] = useState<string>();

	useDebounceEffect(
		async () => {
			if (crop?.width && crop?.height && imgRef?.current) {
				const { imageFile, previewUrl }: { imageFile: Blob | null; previewUrl: string } =
					await imgPreview(imgRef.current, crop, scale, rotate);
				if (imageFile) {
					setCroppedImageFile(imageFile);
				}
				if (previewUrl) {
					setCroppedImageUrl(previewUrl);
				}
			}
		},
		100,
		[crop, scale, rotate]
	);

	const handleSave = () => {
		if (croppedImageFile) {
			new Compressor(croppedImageFile as Blob, {
				quality: 0.7,
				success: async file => {
					handleCrop(file, croppedImageUrl);
				},
			});
			setCrop(undefined);
			setCroppedImageFile(undefined)
		} else {
			handleCrop(null, null);
		}
	};

	const handleCancel = () => {
		closePreview();
		setCrop(undefined);
		setScale(1);
		setRotate(0);
	};

	return (
		<Box textAlign={'end'}>
			<Typography
			style={{color:"aqua",textAlign:"center"}}
			sx={{top:'0', position: 'relative', zIndex: 199, width:{xs:'6rem',md:'6rem'},left:{xs:'40%',md:'none'}, marginBottom:{xs:'.5rem', md:'.5rem'} }}
			>
				Crop Image
			</Typography>
			{cropErr && <Box>
			<Alert
							//className='fade error-alert slide-in-top'
							sx={{top:'0', position: 'relative', zIndex: 199, width:{xs:'22rem',md:'30rem'},left:{xs:'2%',md:'30%'}, marginBottom:{xs:'1rem', md:'1rem'} }}
							severity={'info'}
						>
							{'Please Crop Image to required aspect ratio'}
						</Alert>
			</Box>}
			<Box display={'block'} textAlign="center">
				{imgSrc && (
					<ReactCrop crop={crop} onChange={(crop, _) => setCrop(crop)} aspect={aspectRatio}>
						<img
							ref={imgRef}
							alt='Crop me'
							src={imgSrc}
							style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, maxHeight: '80vh' }}
						/>
					</ReactCrop>
				)}
			</Box>
			<Button
				variant='contained'
				color='primary'
				onClick={handleCancel}
				sx={{ background: '#1A191E' }}
			>
				{' '}
				CANCEL{' '}
			</Button>
			<Button
				variant='contained'
				color='primary'
				onClick={handleSave}
				sx={{ marginLeft: '1rem', background: '#1A191E' }}
			>
				{' '}
				DONE{' '}
			</Button>
		</Box>
	);
};

export default CropCompress;
