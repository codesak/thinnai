const config = require('config');
const clientOrigin = config.get('clientOrigin');

const confirm = (id: string) => ({
	subject: 'Confirmation Link',
	html: `
      <a href='${clientOrigin}/confirm/${id}'>
        Click here to verify your Email!
      </a>
    `,
	text: `Copy and paste this link: ${clientOrigin}/confirm/${id}`,
});

const forgot = (id: string) => ({
	subject: 'Forgot Password?',
	html: `
    <a href='https://canary.bookmythinnai.com/reset-password/${id}'>
      Click here to verify your Email!
    </a>
  `,
	text: `Copy and paste this link: ${clientOrigin}/confirm/${id}`,
});

export { confirm, forgot };
