import { faker } from '@faker-js/faker';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { parse } from 'jsonc-parser';
import { IHostUserData } from '../models/HostUserData';
import { IGuestUserData } from '../models/GuestUserData';
import { IProperties } from '../models/Property';
import { IInquiry } from '../models/Inquiry';
import { IBooking } from '../models/Booking';

const config = parse(fs.readFileSync(path.resolve(__dirname, 'config.jsonc'), 'utf-8'));

const writeToJSON: boolean = config.writeToJSON;
const hostUserCount: number = config.hostUserCount;
const guestUserCount: number = config.guestUserCount;
const reviewsPerGuest: number = config.reviewsPerGuest;
const propertiesPerHost: number = config.propertiesPerHost;

const pendingInquiries: number = config.pendingInquiries;
const confirmedInquiries: number = config.confirmedInquiries;
const cancelledInquiriesByHost: number = config.cancelledInquiriesByHost;
const cancelledInquiriesByGuest: number = config.cancelledInquiriesByGuest;

const confirmedBookings: number = config.confirmedBookings;
const completedInquiries: number = config.completedInquiries;
const cancelledBookingsByHost: number = config.cancelledBookingsByHost;
const cancelledBookingsByGuest: number = config.cancelledBookingsByGuest;
const completedBookings: number = config.completedBookings;

const hostReviewedByGuest: number = config.hostReviewedByGuest;
const propertyReviewedByGuest: number = config.propertyReviewedByGuest;
const guestReviewedByHost: number = config.guestReviewedByHost;

const totalUsers: number = hostUserCount + guestUserCount;
const cancelledInquiries: number = cancelledInquiriesByHost + cancelledInquiriesByGuest;
const totalInquiries: number =
	pendingInquiries + confirmedInquiries + completedInquiries + cancelledInquiries;
const cancelledBookings: number = cancelledBookingsByHost + cancelledBookingsByGuest;
const totalBookings: number = confirmedBookings + completedBookings + cancelledBookings;

const baseUrl: string = 'http://127.0.0.1:5001/api';

const checkConfig = () => {
	if (reviewsPerGuest > hostUserCount) {
		throw new Error(
			'Total number of reviews per guest user is greater than the number of host users'
		);
	}

	if (totalInquiries > guestUserCount) {
		throw new Error('Total number of inquiries is greater than the number of guests');
	}

	if (totalBookings > totalInquiries) {
		throw new Error('Total number of bookings is greater than the total number of inquiries');
	}

	if (completedBookings !== completedInquiries) {
		throw new Error(
			'Total number of completed bookings is not equal to the total number of completed inquiries'
		);
	}

	if (hostReviewedByGuest > completedBookings) {
		throw new Error(
			'Total number of host reviewed by guest is greater than the total number of completed bookings'
		);
	}

	if (propertyReviewedByGuest > completedBookings) {
		throw new Error(
			'Total number of property reviewed by guest is greater than the total number of completed bookings'
		);
	}

	if (guestReviewedByHost > completedBookings) {
		throw new Error(
			'Total number of guest reviewed by host is greater than the total number of completed bookings'
		);
	}
};

const makeRequest = async (url: string, body: any, token: string, patchReq?: boolean) => {
	const config = {
		headers: {
			'x-auth-token': token,
			'Content-type': 'application/json; charset=UTF-8',
		},
	};

	try {
		let response;
		if (!patchReq) {
			response = await axios.post(url, body, config);
			return response.data;
		} else {
			response = await axios.patch(url, body, config);
		}
		return response.data;
	} catch (error: any) {
		if (error.response) {
			console.log(error.response.data);
			console.log(error.response.status);
			console.log(error.response.headers);
		} else if (error.request) {
			console.log(error.request);
			console.log('Error', error.message);
		}
		console.log(error.config);
		process.exit(1);
	}
};

const writeJSONFile = (fileName: string, data: any) => {
	fs.writeFileSync(path.resolve(__dirname, `${fileName}.json`), JSON.stringify(data));
	console.log(`${fileName}.json created`);
};

const randomArrayElements = (array: string[], numOfElements?: number) => {
	const length: number = array.length;
	const reqNumOfElements: number = numOfElements
		? numOfElements
		: Math.floor(Math.random() * length) + 1;

	const randomElements: string[] = [];
	while (randomElements.length !== reqNumOfElements) {
		const randomIndex = Math.floor(Math.random() * length);
		if (!randomElements.includes(array[randomIndex])) {
			randomElements.push(array[randomIndex]);
		}
	}
	return reqNumOfElements === 1 ? randomElements[0] : randomElements;
};

//create host users
interface IHostUsers {
	id?: string;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phone: string;
	profileImage: string;
	emailVerified: boolean;
	registered: boolean;
	token?: string;
}
const hostUsers: IHostUsers[] = [];
const createHostUsers = async () => {
	for (let i = 0; i < hostUserCount; i++) {
		const body = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			password: faker.internet.password(),
			phone: faker.phone.number('+91##########'),
			altPhone: faker.phone.number('+91##########'),
			profileImage: faker.image.avatar(),
			emailVerified: true,
			registered: true,
		};

		const createResponse = await makeRequest(`${baseUrl}/auth/user/register/host`, body, '');

		if (createResponse) {
			const updateResponse = await makeRequest(
				`${baseUrl}/auth/user/update`,
				body,
				createResponse.token,
				true
			);

			if (updateResponse) {
				let newUser = updateResponse.user;
				newUser.token = createResponse.token;
				hostUsers.push(newUser);
			}
		}
	}
	if (writeToJSON) {
		writeJSONFile('hostUsers', hostUsers);
	}
};

//create guest users
interface IGuestUsers {
	id?: string;
	phone: number;
	firstName: string;
	lastName: string;
	email: string;
	profileImage: string;
	emailVerified: boolean;
	registered: boolean;
	token?: string;
}
const guestUsers: IGuestUsers[] = [];
const createGuestUsers = async () => {
	for (let i = 0; i < totalUsers; i++) {
		const body = {
			firstName: faker.name.firstName(),
			lastName: faker.name.lastName(),
			email: faker.internet.email(),
			phone: faker.phone.number('+91##########'),
			profileImage: faker.image.avatar(),
			emailVerified: true,
			registered: true,
		};

		const token = await makeRequest(`${baseUrl}/auth/guest/login`, body, '');

		const response = await makeRequest(`${baseUrl}/auth/user/update`, body, token.token, true);

		if (response) {
			let newUser: IGuestUsers = response;
			newUser.token = token.token;
			guestUsers.push(newUser);
		}
	}
	if (writeToJSON) {
		writeJSONFile('hostUsers', guestUsers);
	}
};

//create hostUserData
const hostUserData: IHostUserData[] = [];
const createHostUserData = async () => {
	const genders = ['Male', 'Female', 'Transgender'];
	const idProofType = ['adhaar card', 'pan card', 'passport', 'driving license'];

	for (let i = 0; i < hostUserCount; i++) {
		const body = {
			aboutYourself: faker.lorem.paragraph(),
			interests: faker.lorem.paragraph(),
			address: faker.address.streetAddress(),
			city: faker.address.city(),
			state: faker.address.state(),
			zipCode: faker.address.zipCode('######'),
			profession: faker.name.jobTitle(),
			gender: randomArrayElements(genders, 1),
			dateOfBirth: faker.date.past(20, '2000-01-09T00:00:00Z'),
			languagesKnown: faker.random.word(),
			idProofFront: faker.image.imageUrl(),
			idProofBack: faker.image.imageUrl(),
			idProofType: randomArrayElements(idProofType, 1),
			idProofNumber: faker.random.numeric(12),
			suggestion: faker.lorem.sentence(),
			anythingElse: faker.lorem.sentence(),
			anythingWeShouldKnow: faker.lorem.sentence(),
			accHolder: faker.name.fullName(),
			accNumber: faker.finance.account().toString(),
			IFSC: faker.phone.number('######'),
			guestsHosted: faker.random.numeric(2),
			ratings: {
				good: faker.random.numeric(2),
				neutral: faker.random.numeric(2),
				bad: faker.random.numeric(2),
			},
			acceptanceRate: faker.random.numeric(2),
			avgResponseTime: faker.random.numeric(2),
			cancellationRate: faker.random.numeric(2),
		};

		const token = hostUsers[i].token as string;
		const response = await makeRequest(`${baseUrl}/profile/updateUserData`, body, token, true);

		if (response) {
			hostUserData.push(response.userData);
			hostUsers[i].id = response.userData.user._id;
		}
	}
	if (writeToJSON) {
		writeJSONFile('hostUserData', hostUserData);
		writeJSONFile('hostUsers', hostUsers);
	}
};

//create guestUserData
const guestUserData: IGuestUserData[] = [];
const createGuestUserData = async () => {
	const genders = ['Male', 'Female', 'Transgender'];
	/* const idProofType = ['adhaar card', 'pan card', 'passport', 'driving license']; */

	for (let i = 0; i < guestUserCount; i++) {
		const body = {
			profession: faker.name.jobTitle(),
			gender: randomArrayElements(genders, 1),
			dateOfBirth: faker.date.past(20, '2000-01-09T00:00:00Z'),
			/* idProofFront: faker.image.imageUrl(),
			idProofBack: faker.image.imageUrl(),
			idProofType: randomArrayElements(idProofType, 1),
			idProofNumber: faker.random.numeric(12), */
		};

		const token = guestUsers[i].token as string;
		const response = await makeRequest(`${baseUrl}/profile/addGuestUserData`, body, token);

		if (response) {
			guestUserData.push(response.userData);
		}
	}
	if (writeToJSON) {
		writeJSONFile('guestUserData', guestUserData);
		writeJSONFile('guestUsers', guestUsers);
	}
};

//create property
const properties: IProperties[][] = [];
const createProperties = async () => {
	const propertyType = ['Apartment', 'Individual Villa', 'Commercial Space'];
	const propertyOwnership = ['Rented', 'Owned', 'Leased'];
	const thinnaiLocation = ['Balcony', 'Lawn', 'Common Area', 'Terrace', 'Room', 'Backyard'];
	const amenities = [
		'Card games',
		'Board Games',
		'Wifi',
		'Pet friendly',
		'Oven',
		'Refrigerator',
		'Restroom',
		'Drinking water',
		'Wine glasses',
		'Water glasses',
		'AC',
		'Fan',
		'Air Cooler',
		'Mosquito repellent spray',
		'Mosquito coils',
		'Candles on table',
		'Tissues',
	];
	const preferredGuests = [
		'Allow All',
		'Women Only',
		'Men Only',
		'Men & Women',
		'Family with Kids',
		'Couple',
		'Family without Kids',
		'LGBTQ Friendly',
	];
	const activities = [
		'Casual Dining',
		'Business Meeting',
		'Dinner dates',
		'Late night celebrations',
		'Workshop',
		'Music Jamming',
		'Reading',
		'Writing',
		'Lunch Dates',
		'Friends get-together',
		'Family Outing',
		'Shooting',
	];
	const parkingType = ['Two Wheelers', 'Four Wheelers', 'No Parking'];
	const services = [
		'Alcohol',
		'Hookah',
		'Smoking',
		'Non Veg',
		'Cake',
		'Table Decor',
		'Floor Decor',
		'Egg',
		'Beef',
		'Pork',
	];
	const alcoholAllowedFor = [
		'Allowed For All',
		'Women Only',
		'Men Only',
		'Men and Women',
		'Couple',
		'Family without kids',
		'Family with kids',
		'Allowed For None',
	];

	for (let k = 0; k < hostUserCount; k++) {
		const property: IProperties[] = [];
		for (let i = 0; i < propertiesPerHost; i++) {
			const body = {
				approvalStatus: 'approved',
				propertyPictures: [
					faker.image.imageUrl(),
					faker.image.imageUrl(),
					faker.image.imageUrl(),
					faker.image.imageUrl(),
				],
				propertyThumbnails: [
					faker.image.imageUrl(),
					faker.image.imageUrl(),
					faker.image.imageUrl(),
					faker.image.imageUrl(),
				],
				propertyName: faker.name.fullName(),
				propertyDescription: faker.lorem.sentence(),
				houseNumber: faker.address.buildingNumber(),
				tower: faker.address.secondaryAddress(),
				street: faker.address.street(),
				locality: faker.address.secondaryAddress(),
				landmark: faker.address.street(),
				city: faker.address.city(),
				state: faker.address.state(),
				zipCode: faker.address.zipCode('######'),
				thinnaiLocationUrl: faker.internet.url(),
				geoLocation: {
					lat: faker.address.latitude(),
					lng: faker.address.longitude(),
				},
				directions: faker.address.street(),
				propertyType: randomArrayElements(propertyType, 1),
				propertyOwnership: randomArrayElements(propertyOwnership, 1),
				thinnaiLocation: randomArrayElements(thinnaiLocation),
				amenities: randomArrayElements(amenities),
				preferredGuests: randomArrayElements(preferredGuests),
				activities: randomArrayElements(activities),
				parkingType: randomArrayElements(parkingType),
				services: randomArrayElements(services),
				alcoholAllowedFor: randomArrayElements(alcoholAllowedFor),
				residentialSpaceIn30m: Boolean(Math.random() < 0.5),
				maxGuestCount: faker.random.numeric(1),
				directBooking: Boolean(Math.random() < 0.5),
				houseRules: [faker.lorem.sentence(), faker.lorem.sentence(), faker.lorem.sentence()],
				minDuration: faker.random.numeric(1),
				foodJoints: [
					{
						restaurantName: faker.name.firstName(),
						restaurantImage: faker.image.imageUrl(),
						cuisineType: faker.lorem.word(),
						foodSuggestions: faker.lorem.sentence(),
					},
					{
						restaurantName: faker.name.firstName(),
						restaurantImage: faker.image.imageUrl(),
						cuisineType: faker.lorem.word(),
						foodSuggestions: faker.lorem.sentence(),
					},
				],
				ratings: {
					good: faker.random.numeric(2),
					neutral: faker.random.numeric(2),
					bad: faker.random.numeric(2),
				},
				totalBookings: faker.random.numeric(2),
				happyCustomers: faker.random.numeric(2),
				totalReviews: faker.random.numeric(2),
				pricing: {
					joyHour: {
						withAlcohol: {
							oneAndHalfHour: 150,
							twoAndHalfHour: 250,
							threeAndHalfHour: 350,
							fourHour: 450,
						},
						withoutAlcohol: {
							oneHour: 100,
							oneAndHalfHour: 200,
							twoAndHalfHour: 300,
							threeAndHalfHour: 400,
						},
					},
					galaHour: {
						withAlcohol: {
							oneAndHalfHour: 150,
							twoAndHalfHour: 250,
							threeAndHalfHour: 350,
							fourHour: 450,
						},
						withoutAlcohol: {
							oneHour: 100,
							oneAndHalfHour: 200,
							twoAndHalfHour: 300,
							threeAndHalfHour: 400,
						},
					},
					guestPricing: [
						{
							guestCount: '1-2',
							GuestCountPrice: 100,
						},
						{
							guestCount: '3-4',
							GuestCountPrice: 110,
						},
						{
							guestCount: '5-6',
							GuestCountPrice: 120,
						},
					],
					candleLight: {
						price: 100,
						description: faker.lorem.sentence(),
						imageUrl: faker.image.imageUrl(),
					},
					privateScreening: {
						price: 120,
						description: faker.lorem.sentence(),
						imageUrl: faker.image.imageUrl(),
					},
					decors: {
						price: 140,
						description: faker.lorem.sentence(),
						imageUrl: faker.image.imageUrl(),
					},
					cake: {
						price: 100,
						description: faker.lorem.sentence(),
						imageUrl: faker.image.imageUrl(),
					},
					tableDecor: {
						price: 100,
						description: faker.lorem.sentence(),
						imageUrl: faker.image.imageUrl(),
					},
					floorDecor: {
						price: 200,
						description: faker.lorem.sentence(),
						imageUrl: faker.image.imageUrl(),
					},
				},
			};

			const token = hostUsers[k].token as string;
			const createResponse = await makeRequest(`${baseUrl}/property/addProperty`, body, token);

			if (createResponse) {
				const updateResponse = await makeRequest(
					`${baseUrl}/property/updateProperty/${createResponse.property._id}`,
					body,
					token,
					true
				);

				if (updateResponse) {
					properties.push(updateResponse.property);
				}
			}
		}

		if (property.length > 0) {
			properties.push(property);
		}
	}
	if (writeToJSON) {
		writeJSONFile('properties', properties);
	}
};

//create inquiry
const inquiries: IInquiry[][] = [];
const createInquiries = async () => {
	const groupType = ['Friends', 'Family'];
	const services = [
		'Alcohol',
		'Hookah',
		'Smoking',
		'Non Veg',
		'Cake',
		'Table Decor',
		'Floor Decor',
		'Egg',
		'Beef',
		'Pork',
	];
	const paidServices = ['candleLight', 'privateScreening', 'decors'];

	for (let k = 0; k < guestUserCount; k++) {
		const inquiry: IInquiry[] = [];

		for (let i = 0; i < totalInquiries; i++) {
			let bookingFrom;
			if (i >= 0 && i < completedInquiries) {
				bookingFrom = faker.date.between('2022-06-18T00:00:00.000Z', '2022-07-18T00:00:00.000Z');
			} else {
				bookingFrom = faker.date.between('2022-07-19T00:00:00.000Z', '2022-07-30T00:00:00.000Z');
			}
			const bookingTo = new Date(new Date(bookingFrom).setHours(bookingFrom.getHours() + 2));

			const body = {
				amount: faker.random.numeric(4),
				guestCount: faker.random.numeric(1),
				bookingFrom: bookingFrom,
				bookingTo: bookingTo,
				groupType: randomArrayElements(groupType, 1),
				servicesRequested: randomArrayElements(services),
				paidServicesRequested: randomArrayElements(paidServices, 1),
				plateGlassCutlery: Boolean(Math.random() < 0.5),
				additionalNotes: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/inquiry/addInquiry/${
					properties[Math.floor(Math.random() * hostUserCount)][
						Math.floor(Math.random() * propertiesPerHost)
					]._id
				}`,
				body,
				token
			);

			if (response) {
				inquiry.push(response.inquiry);
			}
		}
		if (inquiry.length > 0) {
			inquiries.push(inquiry);
		}
	}
	if (writeToJSON) {
		writeJSONFile('inquiries', inquiries);
	}
};

//set inquiry status
const setInquiryStatus = async () => {
	for (let k = 0; k < guestUserCount; k++) {
		for (let i = 0; i < completedInquiries; i++) {
			const body = {
				inquiryStatus: 'completed',
				statusUpdateReason: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/inquiry/setInquiryStatus/${inquiries[k][i]._id}`,
				body,
				token
			);

			if (response) {
				inquiries[k][i] = response.inquiry;
			}
		}

		for (let i = completedInquiries; i < confirmedInquiries + completedInquiries; i++) {
			const body = {
				inquiryStatus: 'confirmed',
				statusUpdateReason: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/inquiry/setInquiryStatus/${inquiries[k][i]._id}`,
				body,
				token
			);

			if (response) {
				inquiries[k][i] = response.inquiry;
			}
		}

		for (
			let i = confirmedInquiries + completedInquiries;
			i < confirmedInquiries + completedInquiries + cancelledInquiries;
			i++
		) {
			let cancelledBy = {
				host: false,
				guest: false,
			};
			if (
				i >= confirmedInquiries + completedInquiries &&
				i < confirmedInquiries + completedInquiries + cancelledInquiriesByHost
			) {
				cancelledBy.host = true;
			} else if (
				i >= confirmedInquiries + completedInquiries + cancelledInquiriesByHost &&
				i < confirmedInquiries + completedInquiries + cancelledInquiries
			) {
				cancelledBy.guest = true;
			}

			const body = {
				inquiryStatus: 'cancelled',
				cancelledBy: cancelledBy,
				statusUpdateReason: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/inquiry/setInquiryStatus/${inquiries[k][i]._id}`,
				body,
				token
			);

			if (response) {
				inquiries[k][i] = response.inquiry;
			}
		}
	}
	if (writeToJSON) {
		writeJSONFile('inquiries', inquiries);
	}
};

//create booking
const bookings: IBooking[][] = [];
const createBookings = async () => {
	for (let k = 0; k < guestUserCount; k++) {
		const booking: IBooking[] = [];
		for (let i = 0; i < totalBookings; i++) {
			const body = {};
			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/booking/addBooking/${inquiries[k][i]._id}`,
				body,
				token
			);

			if (response) {
				booking.push(response.booking);
			}
		}
		if (booking.length > 0) {
			bookings.push(booking);
		}
	}
	if (writeToJSON) {
		writeJSONFile('bookings', bookings);
	}
};

//set booking status
const setBookingStatus = async () => {
	for (let k = 0; k < guestUserCount; k++) {
		for (let i = 0; i < completedBookings; i++) {
			const body = {
				bookingStatus: 'completed',
			};

			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/booking/setBookingStatus/${bookings[k][i]._id}`,
				body,
				token
			);

			if (response) {
				bookings[k][i] = response.booking;
			}
		}

		for (
			let i = confirmedBookings + completedBookings;
			i < confirmedBookings + completedBookings + cancelledBookings;
			i++
		) {
			let cancelledBy = {
				host: false,
				guest: false,
			};
			if (
				i >= confirmedBookings + completedBookings &&
				i < confirmedBookings + completedBookings + cancelledBookingsByHost
			) {
				cancelledBy.host = true;
			} else if (
				i >= confirmedBookings + completedBookings + cancelledBookingsByHost &&
				i < confirmedBookings + completedBookings + cancelledBookings
			) {
				cancelledBy.guest = true;
			}

			const body = {
				bookingStatus: 'cancelled',
				cancelledBy: cancelledBy,
				statusUpdateReason: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			const response = await makeRequest(
				`${baseUrl}/booking/setBookingStatus/${bookings[k][i]._id}`,
				body,
				token
			);

			if (response) {
				bookings[k][i] = response.booking;
			}
		}
	}
	if (writeToJSON) {
		writeJSONFile('bookings', bookings);
	}
};

//create reviews for completed bookings
const createReviews = async () => {
	const rating = ['good', 'neutral', 'bad'];
	for (let k = 0; k < guestUserCount; k++) {
		for (let i = 0; i < hostReviewedByGuest; i++) {
			const body = {
				rating: rating[Math.floor(Math.random() * 3)],
				review: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			await makeRequest(`${baseUrl}/booking/addHostReview/${bookings[k][i]._id}`, body, token);
		}
		for (let i = 0; i < propertyReviewedByGuest; i++) {
			const body = {
				rating: rating[Math.floor(Math.random() * 3)],
				cleanliness: rating[Math.floor(Math.random() * 3)],
				checkIn: rating[Math.floor(Math.random() * 3)],
				review: faker.lorem.sentence(),
			};

			const token = guestUsers[k].token as string;
			await makeRequest(`${baseUrl}/booking/addPropertyReview/${bookings[k][i]._id}`, body, token);
		}
		/* for (let i = 0; i < guestReviewedByHost; i++) {
			const body = {
				rating: rating[Math.floor(Math.random() * 3)],
				review: faker.lorem.sentence(),
			};

			const token = hostUsers[k].token as string;
			await makeRequest(`${baseUrl}/booking/addGuestReview/${bookings[k][i]._id}`, body, token);
		} */
	}
};

checkConfig();
(async () => {
	await createHostUsers();
	await createGuestUsers();
	await createHostUserData();
	await createGuestUserData();
	await createProperties();
	await createInquiries();
	await setInquiryStatus();
	await createBookings();
	await setBookingStatus();
	await createReviews();
})();
