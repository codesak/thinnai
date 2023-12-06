declare namespace Express {
	export interface Request {
		userData?: {
			id: string;
		};
		roles?: string[];
		postReq?:Record<string, any>;
	}
}
declare module "fcm-node"
