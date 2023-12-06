import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import { Backdrop, FormLabel } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ALERT_TYPE, S3_BASE } from '../../../utils/consts'
import '../../styles/Info/info.scss'
import CropCompress from './uploadImageUtils/CropCompress'
import { setAlert } from '../../../actions/alert'
import heic2any from 'heic2any'

interface UploadImageProps {
  width: string
  height: string
  widthPhone?: string
  heightPhone?: string
  setExportPic?: (value: string[]) => void
  name?: string
  initialImage?: string
  required: boolean
  background?: string
  border?: string
  iconcolor?: string
  contWidth?: string
  borderRadius?: string
  setCroppedImageFile?: any
  aspectRatio: number
  multiple?: boolean
}

const ImageSelector = ({
  height,
  width,
  widthPhone = '150px',
  heightPhone = '150px',
  name,
  borderRadius,
  required,
  background = '#EEEEEE',
  border = '2px dashed #B8B6B6',
  iconcolor = '#B8B6B6',
  contWidth,
  aspectRatio,
  initialImage,
  setCroppedImageFile,
  multiple = false,
}: UploadImageProps) => {
  const dispatch = useDispatch()
  const inputElementRef = useRef<HTMLInputElement>(null)
  const [imgSrc, setImgSrc] = useState<string | null>(null)
  const [dbImageSrc, setDbImageSrc] = useState<string | null>('')
  const [croppedImageUrl, setCroppedImageUrl] = useState<string>()
  const [showPreview, setShowPreview] = useState(false)
  const [loader, setLoader] = useState(false)

  const convertor = async (event: any) => {
	 setLoader(true)
    const file = event.target.files[0]
    if (file && (file.type === 'image/heic' || file.name.slice(-4).toLowerCase()) === 'heic') {
      try {
        const jpgBlob = await heic2any({
          blob: file,
          toType: 'image/jpeg',
          quality: 1.0, // Adjust the quality as needed
        })

        const jpgFile: File = new File(
          [jpgBlob as any],
          file.name.replace(/\.heic$/, '.jpg'),
          { type: 'image/jpeg' }
        )

        // Use the converted JPG file as needed, e.g., upload or display it
        let myPromise = new Promise(function (myResolve: any, myReject: any) {
          // "Producing Code" (May take some time)
		  const reader = new FileReader()
        reader.addEventListener('load', () =>
          setImgSrc(reader.result?.toString() || '')
        )
        reader.readAsDataURL(jpgFile)
        event.target.value = null
          myResolve() // when successful
          myReject() // when error
        })
        // "Consuming Code" (Must wait for a fulfilled Promise)
        myPromise.then(()=>{setShowPreview(true) as any; setLoader(false)})
      } catch (error) {
        console.error('Conversion error:', error)
      }
    }
  }

  const validateFile = (e: any) => {
    if (e.target.files && e.target.files?.length > 0) {
      let allowedExtension = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/bmp',
      ]
      if (allowedExtension.indexOf(e.target.files[0]?.type) > -1) {
        onSelectPic(e)
      } else if (e.target.files[0]?.name.slice(-4).toLowerCase() === 'heic') {
        convertor(e)
      } else {
        dispatch(setAlert('Please Select Only Images', ALERT_TYPE.DANGER))
      }
    }
  }

  const onSelectPic = (event: any) => {
	setLoader(false)
    if (event.target.files && event.target.files.length > 0) {
		const reader = new FileReader()
        reader.addEventListener('load', () =>
          setImgSrc(reader.result?.toString() || '')
        )
        reader.readAsDataURL(event.target.files[0])
        setShowPreview(true)
        event.target.value = null
    }
  }

  const [cropErr, setCropErr] = useState<boolean>(false)

  const handleCrop = (imageFile: any, imageUrl: string) => {
    if (imageFile) {
      setCroppedImageFile(imageFile)
      setCroppedImageUrl(imageUrl)
      setShowPreview(false)
      setCropErr(false)
    } else {
      setCropErr(true)
    }
  }

  const closePreview = () => {
    setCroppedImageFile()
    setCroppedImageUrl('')
    setShowPreview(false)
    setImgSrc(null)
    setCropErr(false)
    if (inputElementRef && inputElementRef.current) {
      inputElementRef.current.value = ''
    }
  }

  useEffect(() => {
    if (initialImage) {
      setDbImageSrc(initialImage)
    }
  }, [initialImage])

  return (
    <>
	{ loader && <div className='loader' style={{ position:'absolute', zIndex:'1'}}></div>}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 10 }}
        open={showPreview}
      >
        <CropCompress
          aspectRatio={aspectRatio}
          imgSrc={imgSrc}
          handleCrop={handleCrop}
          closePreview={closePreview}
          cropErr={cropErr}
        />
      </Backdrop>
      <section style={{ width: contWidth }}>
        <FormLabel
          className="input-file"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            height: height,
            width: width,
            '@media (max-width: 600px)': {
              width: widthPhone,
              height: heightPhone,
            },
            alignItems: 'center',
            border: border,
            cursor: 'pointer',
            fontSize: 'large',
            backgroundColor: background,
            overflow: 'hidden',
            position: 'relative',
            borderRadius: borderRadius,
          }}
        >
          {!croppedImageUrl && !dbImageSrc && (
            <AddPhotoAlternateIcon
              style={{
                color: iconcolor,
                height: '38.25px',
                width: '37.55px',
                zIndex: '1',
              }}
            />
          )}
          {croppedImageUrl && (
            <div style={{ position: 'absolute' }}>
              <div className=""></div>
              <img
                style={{ height: height, objectFit: 'contain' }}
                src={croppedImageUrl}
                alt="cropped img"
              />
            </div>
          )}
          {dbImageSrc && !croppedImageUrl && (
            <div style={{ position: 'absolute' }}>
              <div className="overlay"></div>
              <img
                style={{ height: height, objectFit: 'contain' }}
                src={`${S3_BASE}${dbImageSrc.replace(/\+/g, '%2B')}`}
                alt=""
              />
            </div>
          )}
          <input
            id="imgg"
            style={{ display: 'none' }}
            ref={inputElementRef}
            type="file"
            name={name}
            multiple={multiple}
            accept="image/png, image/jpeg, image/webp, image/svg, .heic"
            onChange={(e: any) => validateFile(e)}
          />
        </FormLabel>
      </section>
      {required && !dbImageSrc ? (
        <span className="error-msg">*Required</span>
      ) : null}
    </>
  )
}

export default ImageSelector
