import axios from 'axios';
import fs from 'fs';
import path from 'path';

const users = require('./users.json');
const profile = require('./profile.json');
const property = require('./property.json');

const baseUrl: string = 'http://127.0.0.1:5001/api';

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

const hostUsers: any = [];
const createHostUsers = async () => {
	for (const user of users.users) {
		const createResponse = await makeRequest(`${baseUrl}/auth/user/register/host`, user, '');

		if (createResponse) {
			const updateResponse = await makeRequest(
				`${baseUrl}/auth/user/update`,
				user,
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
	writeJSONFile('hostUsers', hostUsers);
};

//create hostUserData
const hostUserData: any = [];
const createHostUserData = async () => {
	for (let i = 0; i < profile.profile.length; i++) {
		const token = hostUsers[i].token as string;

		const response = await makeRequest(
			`${baseUrl}/profile/updateUserData`,
			profile.profile[i],
			token,
			true
		);

		if (response) {
			hostUserData.push(response.userData);
		}
	}
	writeJSONFile('hostUserData', hostUserData);
};

const properties: any = [];
const createProperties = async () => {
	for (let i = 0; i < 5; i++) {
		const token = hostUsers[i].token as string;

		const createResponse = await makeRequest(
			`${baseUrl}/property/addProperty`,
			property[i],
			token
		);

		if (createResponse) {
			const updateResponse = await makeRequest(
				`${baseUrl}/property/updateProperty/${createResponse.property._id}`,
				property[i],
				token,
				true
			);

			if (updateResponse) {
				properties.push(updateResponse.property);
			}
		}
	}
	writeJSONFile('properties', properties);
};

(async () => {
	await createHostUsers();
	await createHostUserData();
	await createProperties();
})();
