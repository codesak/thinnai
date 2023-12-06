import { Alert, Checkbox } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import MenuItem from '@mui/material/MenuItem/MenuItem'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography/Typography'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker'
import { Field, Form, Formik } from 'formik'
import { Dispatch, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updateProfile } from '../../../actions/profile'
import { startLoading } from '../../../actions/root'
import { RootState } from '../../../store'
import { GENDERS } from '../../../utils/consts'
import { ROUTES } from '../../../utils/routing/routes'
import '../../styles/OtpAuth/otp.scss'
import ImageSelector from '../Common/ImageSelector'
import login from '../../styles/Login/login.module.css'
import * as yup from 'yup'
import { object, string } from 'yup'
import { register } from '../../../actions/register'

import '../../styles/number.scss'
import numb from '../../styles/GuestLogin/number.module.css'

const SelectChipListItem = styled(Paper)(({ theme }) => ({
  fontSize: '1rem',
  height: '43px',
  width: 'auto',
  border: '0.5px solid #000000',
  padding: '0.25rem 0.5rem',
  borderRadius: '6px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: 'none',
  color: '#383838',
  fontFamily: 'Open Sans',
  fontStyle: 'normal',
  fontWeight: '400',
  textAlign: 'center',
  lineHeight: '16px',
  cursor: 'pointer',
  gap: '0.422rem',
}))

interface IGuestRegistrationProps {
  currentUserData: any
  bookingId?: string
  isRegistrationForBooking?: boolean
  onCompleteNavigateFromBooking?: Function
  isMyBooking?: boolean
}

const GuestDataForm = ({
  currentUserData,
  bookingId,
  isRegistrationForBooking = false,
  onCompleteNavigateFromBooking,
  isMyBooking = false,
}: IGuestRegistrationProps) => {
  
  const profileLoading = useSelector<RootState, boolean>((state) => state.profile.loading)
  const googleData = useSelector<RootState, any>((state)=>state.googleData.googleData)
  
  const [isLoading, setIsloading] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState<Date>(new Date(915148800000))

  const [selectedGenderIndex, setSelectedGenderIndex] = useState<number>()
  const [isGenderSelected, setIsGenderSelected] = useState(false)
  const [selectedGender, setSelectedGender] = useState<string>()
  const [checked,isChecked] = useState(false)
  const [isRegistration, setIsRegistration] = useState(false) //Can be used to hide fields!

  const [profileCroppedImageFile, setProfileCroppedImageFile] = useState<any>(currentUserData.profileImage)
  
  const [frontCroppedImageFile, setFrontCroppedImageFile] = useState<any>(currentUserData.idProofFront)
  const [backCroppedImageFile, setBackCroppedImageFile] = useState<any>(currentUserData.idProofBack)

  const onSelectGenderIndex = (i: number) => {
    setIsGenderSelected(true)
    if (selectedGenderIndex === i) {
      setSelectedGenderIndex(undefined)
    } else setSelectedGenderIndex(i)
    setSelectedGender(GENDERS[i].text)
  }

  const [profileFormData, setProfileFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    profession: '',
    dateOfBirth: dateOfBirth,
    idProofType: 'Aadhar',
    idProofNumber: '',
    idProofFront: '',
    idProofBack: '',
    profileImage: '',
    loading: false,
  })
  
  const maxAge = Date.now() - 568025136000
  const navigate = useNavigate()

  const dispatch: Dispatch<any> = useDispatch()

  useEffect(() => {
    if (currentUserData && currentUserData.registered) {
      setProfileFormData(currentUserData)
      setIsRegistration(false)
      const indexOfGender = GENDERS.findIndex(
        (gender) => gender.text === currentUserData.gender
      )
      if (indexOfGender !== -1) {
        setSelectedGender(currentUserData.gender)
        setIsGenderSelected(true)
        setSelectedGenderIndex(indexOfGender)
      }
    } else {
      setIsRegistration(true)
    }
  }, [currentUserData])
  const [dateview, setDateview] = useState(true)
  //EMAIL VERIFICATION

  const onlyEmail = (e: any) => {
    e.target.value = e.target.value.replace(/[^A-Za-z0-9.@]/gi, '')
  }
  const [emailValid, setEmailValid] = useState(true)
  const validate = (values: any) => {
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values)
      ? setEmailValid(false)
      : setEmailValid(true)
  }
  const handleCheck = () => {
    isChecked(!checked)
  }
  function handleChange(e: any) {
    validate(e.target.value)
  }
  //for mobile verification  use redux phone method
  //const phone = useSelector<RootState, string>((state) => state.guestAuth.phone)
  const [phNumber, setPhNumber] = useState<string>('')
  const phone = '+91' + phNumber
  
  const currentUrl = window.location.pathname;
  return (
    <Formik
      initialValues={profileFormData}
      enableReinitialize={true}
      validationSchema={object({
        //firstName: yup.string().min(2).max(50).required('Required'),
        //lastName: yup.string().min(2).max(50).required('Required'),
        //email: string().email('Enter a Valid Email').required('Required'),
        profession: yup.string().max(50).required('Required'),
      })}
      onSubmit={async (values, formikHelpers) => {
        setIsloading(true)
        setProfileFormData({
          ...values,
          gender: selectedGender as string,
          dateOfBirth: dateOfBirth as Date,
          loading: true,
        })
        const userUpdate = {
          firstName: googleData?.given_name,
          lastName: googleData?.family_name,
          email: googleData?.email,
        }
        const profileUpdate = {
          gender: selectedGender,
          profession: values.profession,
          dateOfBirth: dateOfBirth,
          idProofType: values.idProofType,
          idProofNumber: '/[^A-Za-z]/',
          idProofFront: values.idProofFront,
          idProofBack: values.idProofBack,
        }
        dispatch(startLoading('LOADING_PROFILE'))

        await dispatch(
          register(
            {
              ...profileUpdate,
              ...userUpdate,
              profileCroppedImageFile:googleData?.picture,
              frontCroppedImageFile,
              backCroppedImageFile,
              isMyBooking,
              isRegistrationForBooking,
              bookingId,
              phone,
            },
            currentUrl,
            () => currentUrl === '/manage' ? navigate(ROUTES.PROFILE) :
              isRegistrationForBooking
                ? onCompleteNavigateFromBooking &&
                  onCompleteNavigateFromBooking()
                : isRegistration
                ? navigate(ROUTES.EXPLORE)
                : navigate(ROUTES.PERSONAL_INFO)
          )
        )
        setIsloading(false)
        formikHelpers.resetForm()
      }}
    >
      {({
        errors,
        isValid,
        touched,
        dirty,
        values,
        setValues,
        handleSubmit,
      }) => (
        <Form
          className="data-form"
          onSubmit={handleSubmit}
          style={{ width: '90%' }}
        >
          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              margin: '0 0 14px 0',
            }}
          >
            <label className="label">Upload Your Picture</label>
            <label className="app__info-sublabel label">
              Your face should be clearly visible
            </label>
          </Box>
          <Box
            display="flex"
            justifyContent="center"
            marginY={{
              xl: '1.875rem',
              md: '1.875rem',
              sm: '1.25rem',
              xs: '1.25rem',
            }}
          >
            <ImageSelector
              borderRadius="50%"
              aspectRatio={1}
              required={false}
              height="173px"
              width="173px"
              background="#F3F1FF"
              border="1px dashed #8F7EF3"
              iconcolor="#8F7EF3"
              setCroppedImageFile={setProfileCroppedImageFile}
              initialImage={profileFormData.profileImage}
            />
          </Box> */}
          <Box height={14} />
          {/* <Box display={{ xl: 'block', md: 'block', sm: 'flex', xs: 'block' }}>
            <Box
              className="mb-2"
              width={{ xs: '100%', xl: '100%', md: '100%', sm: '50%' }}
            >
              <label className="label">First Name :</label>
              <Field
                className="input-field"
                type="text"
                name="firstName"
                size="lg"
                maxLength={50}
                minLength={2}
                label="Name"
                required
                onInput={(e: any) =>
                  (e.target.value = e.target.value.replace(/[^A-Za-z]/gi, ''))
                }
              />
              {touched.firstName && errors.firstName ? (
                <span className="error-msg">*{errors.firstName}</span>
              ) : null}
            </Box>
            <Box height={14} width={14} />
            <Box
              className="mb-2"
              width={{ xs: '100%', xl: '100%', md: '100%', sm: '50%' }}
            >
              <label className="label">Last Name :</label>

              <Field
                className="input-field"
                type="text"
                name="lastName"
                size="lg"
                label="Name"
                required
                maxLength={50}
                onInput={(e: any) =>
                  (e.target.value = e.target.value.replace(/[^A-Za-z]/gi, ''))
                }
              />
              {touched.lastName && errors.lastName ? (
                <span className="error-msg">*{errors.lastName}</span>
              ) : null}
            </Box>
          </Box>
          <Box height={14} /> */}



          <label className="label">Phone Number :</label>
          <Box className={numb.mobile} height='42.51px!important'>
            <Box
              id="country-selector"
              height="100%"
              display="flex"
              alignItems="center"
            >
              <Field
                select
                defaultValue="+91"
                variant="standard"
                style={{
                  width: '5rem',
                  backgroundColor: 'white',
                  border: 'none',
                  display: 'flex',
                }}
                as={TextField}
                name="code"
                InputProps={{ disableUnderline: true }}
              >
                <MenuItem value={'+91'}>
                  <Box>+91</Box>
                  <Box>
                    <img src="/assets/images/otp/flag.svg" alt="" />
                  </Box>
                </MenuItem>
              </Field>
            </Box>
            <Box
              className="mb-2"
              width={{ xs: '100%', xl: '100%', md: '100%', sm: '50%' }}
              id="number-input"
              sx={{margin:'0px!important'}}
              >
              <Field
                as={TextField}
                fullWidth
                //maxLength='10'
                className={numb.input}
                variant="outlined"
                name="number"
                type="text"
                required
                inputProps={{ maxLength: 10 }}
                onInput={(e: any) => {
                  e.target.value = e.target.value.replace(/[^0-9]/g, '')
                }}
                onChange={(e:any)=>setPhNumber(e.target.value)}
                style={{
                  underline: {
                    '&&&:before': {
                      borderBottom: 'none',
                    },
                    '&&:after': {
                      borderBottom: 'none',
                    },
                  },
                }}
              />
            </Box>
          </Box>


          {/* <Box
            className="mb-2"
            width={{ xs: '100%', xl: '100%', md: '100%', sm: '100%' }}
          >
            <label className="label">Email Id :</label>
            <Field
              className="input-field"
              type="email"
              name="email"
              size="lg"
              label="Name"
              required
              value={values.email}
              onInput={(e: any) => {
                onlyEmail(e)
                handleChange(e)
              }}
            />
            {(touched.email && errors.email) || !emailValid ? (
              <span className="error-msg">
                *{errors.email ? errors.email : 'Enter a Valid Email'}
              </span>
            ) : null}
          </Box>
          <Box height={14} /> */}
          {/* <Box className="app__item-container">
            <label className="label">Gender :</label>
            <Grid container spacing={1.5}>
              {GENDERS.map((item, index) => (
                <Grid
                  key={index}
                  onClick={() => {
                    onSelectGenderIndex(index)
                    setValues({ ...values, gender: GENDERS[index].text })
                  }}
                  item
                >
                  <SelectChipListItem
                    aria-required
                    style={{
                      backgroundColor:
                        selectedGenderIndex === index ? '#DFDAFF' : '',
                      border:
                        selectedGenderIndex === index
                          ? '0.5px solid #6053AE'
                          : '',
                    }}
                  >
                    <img
                      style={{ height: '1rem' }}
                      src={item.pic}
                      alt={item.text}
                    />
                    <Box>{item.text}</Box>
                  </SelectChipListItem>
                </Grid>
              ))}
            </Grid>
            {isGenderSelected && selectedGenderIndex === undefined ? (
              <span style={{ marginTop: '0.625rem' }} className="error-msg">
                * Select at least one
              </span>
            ) : null}
          </Box>
          <Box height={14} /> */}
          <Box
            className="mb-2"
            width={{ xs: '100%', xl: '100%', md: '100%', sm: '100%' }}
          >
            <label className="label">Profession :</label>
            <Field
              className="input-field"
              type="text"
              name="profession"
              size="lg"
              label="Name"
              required
              onInput={(e: any) =>
                (e.target.value = e.target.value.replace(/[^A-Za-z]/g, ''))
              }
            />
            {touched.profession && errors.profession ? (
              <span className="error-msg">*{errors.profession}</span>
            ) : null}
          </Box>
          <Box height={14} />
          {dateOfBirth.getTime() > maxAge && (
            <Alert severity="error">
              Less than 18 years people are not allowed
            </Alert>
          )}
          {isRegistration && (
            <Box className="mb-2" display="flex" flexDirection="column">
              <label className="label">Date of Birth :</label>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <MobileDatePicker
                  views={['day', 'month', 'year']}
                  value={dateOfBirth}
                  className="date_picker"
                  maxDate={maxAge}
                  DialogProps={{
                    sx: {
                      '& .MuiPickersToolbar-penIconButton': { display: 'none' },
                    },
                  }}
                  onChange={(newValue) => {
                    const dob = new Date(newValue!.toString()).toJSON()
                    setDateOfBirth(new Date(dob))
                    setDateview(false)
                  }}
                  renderInput={(params) => (
                    <>
                      {' '}
                      {dateview ? (
                        <TextField
                          {...params}
                          inputProps={{ placeholder: 'DD/MM/YYYY' }}
                          style={{
                            border: '0.5px solid #383838',
                            borderRadius: '6px',
                            height: '42.51px',
                          }}
                          sx={{
                            '& fieldset': { border: 'none' },
                            '& .MuiOutlinedInput-root': {
                              height: '42.51px',
                              '&.Mui-focused fieldset': {
                                border: 'none',
                              },
                            },
                          }}
                        />
                      ) : (
                        <TextField
                          {...params}
                          style={{
                            border: '0.5px solid #383838',
                            borderRadius: '6px',
                            height: '42.51px',
                          }}
                          sx={{
                            '& fieldset': { border: 'none' },
                            '& .MuiOutlinedInput-root': {
                              height: '42.51px',
                              '&.Mui-focused fieldset': {
                                border: 'none',
                              },
                            },
                          }}
                        />
                      )}
                    </>
                  )}
                />
              </LocalizationProvider>
              <Box height={14} />
            </Box>
          )}

          {/* <Box className="mb-2" width="100%">
            <Typography className="label">ID Type :</Typography>
            <TextField
              required
              style={{
                border: '0.5px solid #383838',
                borderRadius: '6px',
                height: '42.51px',
              }}
              value={values.idProofType}
              onChange={(e) =>
                setValues({ ...values, idProofType: e.target.value })
              }
              name="idProofType"
              id="id-type-label"
              fullWidth
              sx={{
                paddingY: 0,
                '& fieldset': { border: 'none' },
                '& .MuiOutlinedInput-root': {
                  height: '42.51px',
                  '& fieldset': {
                    borderColor: '#383838',
                  },
                  '&.Mui-focused fieldset': {
                    border: '1px solid #383838',
                  },
                },
              }}
              select
            >
              {['Aadhar', 'Passport', 'Driving License', 'Voter ID'].map(
                (item) => (
                  <MenuItem key={item} value={item} style={{ width: '100%' }}>
                    {item}
                  </MenuItem>
                )
              )}
            </TextField>
          </Box>
          <Box height={14} />
          <Box className="mb-2" width="100%">
            <label className="label">ID Number :</label>
            <Field
              className="input-field"
              type="text"
              name="idProofNumber"
              size="lg"
              maxLength={25}
              label="Name"
              required
              onInput={(e: any) =>
                (e.target.value = e.target.value.replace(/[^A-Za-z0-9]/g, ''))
              }
            />
            {touched.idProofNumber && errors.idProofNumber ? (
              <span className="error-msg">*{errors.idProofNumber}</span>
            ) : null}
          </Box>
          <Box height={30} /> */}
          {/* <Typography
            fontSize={{
              xl: '1.125rem',
              md: '1.125rem',
              sm: '1rem',
              xs: '1rem',
            }}
            color="#000000"
          >
            Upload Govt. Verified Photo ID
          </Typography> */}
          {/* <Typography
            fontSize={{
              xl: '1rem',
              md: '1rem',
              sm: '0.813rem',
              xs: '0.813rem',
            }}
            fontWeight="200"
            color="#1A191E"
          >
            (Aadhar, Passport, Driver's License, Voter ID)
          </Typography> */}
          {/* <Box height={15} />
          <Grid>
            <Box display="flex" height="100%">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    gap={{ md: 'inherit', xs: '15px' }}
                    justifyContent="space-between"
                    width="100%"
                    height="100%"
                  >
                    <ImageSelector
                      required={false}
                      height="10rem"
                      width="100%"
                      aspectRatio={16 / 9}
                      contWidth="100%"
                      background="#F3F1FF"
                      border="0.5px dashed #8F7EF3"
                      iconcolor="#8F7EF3"
                      setCroppedImageFile={setFrontCroppedImageFile}
                      initialImage={profileFormData.idProofFront}
                    />
                    <Box
                      className="pic-label"
                      textAlign="center"
                      position="relative"
                      top="10px"
                    >
                      Front Side
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box
                    flexDirection="column"
                    display="flex"
                    gap={{ md: 'inherit', xs: '15px' }}
                    justifyContent="space-between"
                    width="100%"
                    height="100%"
                  >
                    <ImageSelector
                      required={false}
                      contWidth="100%"
                      height="10rem"
                      width="100%"
                      aspectRatio={16 / 9}
                      background="#FCFBF4"
                      border="0.5px dashed #AD6800"
                      iconcolor="#AD6800"
                      setCroppedImageFile={setBackCroppedImageFile}
                      initialImage={profileFormData.idProofBack}
                    />
                    <Box
                      className="pic-label"
                      textAlign="center"
                      position="relative"
                      top="10px"
                    >
                      Back Side
                    </Box>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid> */}
          <Box height={30} />
          <Box style={{display:'flex',alignItems:'center',marginBottom:'2rem'}}>
          <Checkbox
            checked={checked}
            onChange={handleCheck}
            inputProps={{ 'aria-label': 'controlled' }}
          />
          <Typography>By checking this box, I acknowledge that I have read, understood, and agree to the <a href='https://bookmythinnai.com/policy/privacy-policy' target='_blank'>Privacy Policy</a> and <a href='https://canary.bookmythinnai.com/policy/guest-terms-of-use'>Terms and Conditions</a> of Thinnai.</Typography>
          </Box>
          <Box
            style={{
              width: '100%',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              flexDirection: 'row-reverse',
            }}
          >
            <Button
              disabled={
                !isValid ||
                (isGenderSelected && selectedGenderIndex === undefined) ||
                phNumber.length !== 10 ||
                checked === false
              }
              type="submit"
              variant="contained"
              sx={{
                background: '#8F7EF3',
                width: '100%',
                textTransform: 'none',
              }}
            >
              {isLoading ? 'Loading...' : isRegistration ? 'Proceed' : 'Save'}
            </Button>
          </Box>
          <Box height={30} />
        </Form>
      )}
    </Formik>
  )
}

export default GuestDataForm
