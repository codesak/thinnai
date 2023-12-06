import axios from 'axios';

const sendSMS = async (phone: string, OTP: String) => {
	const apiKey = process.env.FAST2SMS_API_KEY;
	phone = phone.replace('+91', '');

  const headers = {
    'authorization': apiKey
  };
  const url = `https://www.fast2sms.com/dev/bulkV2`

const params = {
  'route': 'dlt',
  'sender_id': 'BMTEXP',
  'message':  156447,
  'variables_values': OTP,
  'numbers': phone,
  'flash': '1',
  'authorization': apiKey
};
axios.get(url, { headers, params })
    .catch((err) => {
      console.log(err);
    });

};

export default sendSMS;
