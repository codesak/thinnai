import { setAlert } from '../../../actions/alert';
import { RootState } from '../../../store';
import { ALERT_TYPE } from '../../../utils/consts';
import { ROUTES } from '../../../utils/routing/routes';
import GuestDataForm from '../GuestAuth/GuestDataForm';
import IdStatusDetails from '../GuestAuth/IdStatusDetails';
import PreviousGuest from './subElements/PreviousGuest';
import UploadedIDs from './subElements/UploadedIDs';
import ShareIcon from '@mui/icons-material/Share';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export default function IdVerifyAndUpdate({
	propertyId,
	bookingId,
	isMyBooking,
	invitedGuestList,
}: {
	propertyId: string;
	bookingId: string;
	isMyBooking: boolean;
	invitedGuestList: any[];
}) {
	const dispatch = useDispatch();
	const [showProfileEdit, setShowProfileEdit] = useState(false);
	const [unregisteredGuest, setUnregisteredGuest] = useState(false);
	const profile = useSelector<RootState, any>(state => state.profile.userData);
	const user = useSelector<RootState, any>(state => state.guestAuth.user);
	const [myIdStatus, setMyIdStatus] = useState('pending');

	useEffect(() => {
		if (user && !user.registered) {
			setShowProfileEdit(true);
			setUnregisteredGuest(true);
		}
	}, []);

	useEffect(() => {
		const myProfileIndex = invitedGuestList.findIndex(
			invitedGuest => invitedGuest.guest === profile._id
		);
		if (myProfileIndex > 0) {
			setMyIdStatus(invitedGuestList[myProfileIndex].idProofStatus);
		}
	}, [invitedGuestList]);

	return (
		<div>
			{showProfileEdit && (
				<GuestDataForm
					isRegistrationForBooking={true}
					bookingId={bookingId}
					currentUserData={{ ...profile, ...user }}
					onCompleteNavigateFromBooking={() => setShowProfileEdit(false)}
					isMyBooking={isMyBooking}
				/>
			)}
			{showProfileEdit && !unregisteredGuest && (
				<Box
					marginY='1rem'
					style={{
						width: '100%',
						textAlign: 'center',
						display: 'flex',
						justifyContent: 'flex-end',
						flexDirection: 'row-reverse',
					}}
				>
					<Button
						onClick={() => setShowProfileEdit(false)}
						type='submit'
						variant='contained'
						sx={{ background: '#8F7EF3' ,textTransform: 'none'}}
					>
						Cancel Updating ID
					</Button>
				</Box>
			)}
			{!showProfileEdit && (
				<IdStatusDetails
					isApprovedByHost={isMyBooking ? true : myIdStatus === 'verified'}
					isRequestedReupload={isMyBooking ? false : myIdStatus === 'reuploadRequested'}
					showEditForm={() => setShowProfileEdit(true)}
					currentUser={profile}
					propertyId={propertyId}
					showingWithDetails={true}
				/>
			)}
			{isMyBooking && (
				<>
					<Box mb='1.25rem'>
						<Typography fontSize='1.25rem' fontWeight='200' fontFamily='Open Sans'>
							Upload Id's
						</Typography>
						<Typography fontSize='0.938rem' fontWeight='200'>
							(Aadhar, Passport, Driver's License, Voter ID)
						</Typography>
						<Box
							display={'flex'}
							justifyContent='space-between'
							alignItems='center'
							bgcolor='#F1FFDE'
							padding='0.938rem'
							borderRadius='4px'
							mt='0.625rem'
							gap='0.313rem'
						>
							<Typography fontSize='0.75rem' fontWeight='200' fontFamily='Open Sans'>
								Share and ask other group members to upload their Id’s
							</Typography>
							<Button
								startIcon={
									<ShareIcon
										sx={{
											width: '15px',
											margin: 0,
											padding: 0,
										}}
									/>
								}
								onClick={() => {
									navigator.clipboard.writeText(
										`${window.location.origin}${ROUTES.ONBOARD}/${bookingId}`
									);
									dispatch(setAlert('Link Copied', ALERT_TYPE.SUCCESS));
								}}
								sx={{
									border: '1px solid #4F4C4C',
									paddingX: '1.875rem',
									paddingY: '0.313',
									borderRadius: '24px',
									fontSize: '0.563rem',
									color: '#4F4C4C',
								}}
							>
								Share
							</Button>
						</Box>
					</Box>
					<Box mt='1.563rem' mb='1.25rem'>
						<Typography fontSize='1rem'>Select from previously added guest list</Typography>
						<Box maxWidth='500px'>
							<PreviousGuest />
						</Box>
					</Box>
					<Box mt='1.563rem' mb='1.25rem'>
						<Box maxWidth='500px'>
							<UploadedIDs invitedGuestList={invitedGuestList} />
						</Box>
					</Box>
				</>
			)}
		</div>
	);
}
