import { NextFunction, Request, Response } from 'express';
import { ErrorCode, errorWrapper } from '../utils/consts';

const checkAccess = (role: string) => {
	return (req: Request, res: Response, next: NextFunction) => {
		if (!req.roles) {
			return res.status(ErrorCode.HTTP_BAD_REQ).json(errorWrapper('Roles Not Defined'));
		}
		try {
			if (req.roles.includes(role)) {
				next();
			} else {
				res.status(ErrorCode.HTTP_FORBIDDEN).json(errorWrapper('Access Denied'));
			}
		} catch (err: any) {
			console.error('Check Access Error ' + err.message);
			res.status(ErrorCode.HTTP_SERVER_ERROR).json(errorWrapper('Server Error'));
		}
	};
};

export default checkAccess;
