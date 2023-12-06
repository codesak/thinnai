const config = require('config');
import passport from 'passport';
import passportLocal from 'passport-local';
import passportGoogle from 'passport-google-oauth20';
import passportJwt from 'passport-jwt';
import { compare } from 'bcryptjs';
import User, { IUser } from '../models/User';
import { Types } from 'mongoose';

const LocalStrategy = passportLocal.Strategy;
const GoogleStrategy = passportGoogle.Strategy;
const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;

passport.serializeUser<any, any>((req, user, done) => {
	done(undefined, user);
});

passport.deserializeUser((userObj: { id: Types.ObjectId; type: string }, done) => {
	User.findById(userObj.id, (err: NativeError, user: IUser) => {
		done(err, user);
	});
});

passport.use(
	new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
		User.findOne({ email: email.toLowerCase() }, (err: NativeError, user: IUser) => {
			if (err) {
				return done(err);
			}
			if (!user) {
				return done(undefined, false, { message: `Email ${email} not found.` });
			} else if (!password || !user.password) {
				return done(undefined, false, { message: 'Invalid email or password.' });
			}
			compare(password, user.password).then(credentialCheck => {
				if (!credentialCheck) {
					return done(undefined, false, { message: 'Invalid email or password.' });
				} else return done(undefined, user);
			});
		});
	})
);

passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
			callbackURL: '/api/auth/google/callback',
			passReqToCallback: true,
		},
		(req: any, accessToken: string, refreshToken: string, profile: any, done: any) => {
			// Here, you can generate a JWT using the profile data or any other relevant information
			// const jwtPayload = { userId: profile.id, email: profile.emails[0].value };

			// // Generate JWT token
			// const token = sign(jwtPayload,config.get('jwtSecret'),{ expiresIn: '30d' });
			
	  
			// Pass the token to the callback function
			done(null,profile);
			
			// if (req.user) {
			// 	User.findOne({ google: profile.id }, (err: NativeError, existingUser: IUser) => {
			// 		if (err) {
			// 			return done(err);
			// 		}
			// 		if (existingUser) {
			// 			req.flash('errors', {
			// 				msg: 'There is already a Google account that belongs to you. Sign in with that account or delete it, then link it with your current account.',
			// 			});
			// 			done(err);
			// 		} else {
			// 			User.findById(req.user.id, async (err: NativeError, user: any) => {
			// 				if (err) {
			// 					return done(err);
			// 				}
			// 				user.google = profile.id;
			// 				user.tokens.push({ kind: 'google', accessToken });
			// 				user.firstName = profile.name.givenName;
			// 				user.lastName = profile.name.familyName;
			// 				user.profileImage = profile.photos.value;
			// 				user.emailVerified = true;
			// 				if (req.query.state === 'admin') {
			// 					user.userType = 'admin';
			// 				} else if (req.query.state === 'host') {
			// 					user.userType = 'host';
			// 				} else if (req.query.state === 'guest') {
			// 					user.userType = 'guest';
			// 				}
			// 				await user.save((err: Error) => {
			// 					req.flash('info', { msg: 'Google account has been linked.' });
			// 					done(err, user);
			// 				});
			// 			});
			// 		}
			// 	});
			// } else {
			// 	User.findOne({ google: profile.id }, (err: NativeError, existingUser: IUser) => {
			// 		if (err) {
			// 			return done(err);
			// 		}
			// 		if (existingUser) {
			// 			return done(undefined, existingUser);
			// 		}
			// 		User.findOne(
			// 			{ email: profile._json.email },
			// 			(err: NativeError, existingEmailUser: IUser) => {
			// 				if (err) {
			// 					return done(err);
			// 				}
			// 				if (existingEmailUser) {
			// 					req.flash('errors', {
			// 						msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.',
			// 					});
			// 					done(err);
			// 				} else {
			// 					const user: any = new User();
			// 					user.email = profile._json.email;
			// 					user.google = profile.id;
			// 					user.tokens.push({ kind: 'google', accessToken });
			// 					if (req.query.state === 'admin') {
			// 						user.userType = 'admin';
			// 					} else if (req.query.state === 'host') {
			// 						user.userType = 'host';
			// 					} else if (req.query.state === 'guest') {
			// 						user.userType = 'guest';
			// 					}
			// 					user.firstName = profile.name.givenName;
			// 					user.lastName = profile.name.familyName;
			// 					user.profileImage = profile.photos.value;
			// 					user.emailVerified = true;
			// 					user.save((err: Error) => {
			// 						done(err, user);
			// 					});
			// 				}
			// 			}
			// 		);
			// 	});
			// }

			// User.findOne({ email: profile.email }, (err: NativeError, existingUser: IUser) => {
			// 	if (err) {
			// 		return done(err);
			// 	}
			// 	if (existingUser) {
			// 		return done(undefined, existingUser);
			// 	}
			// 	User.findOne(
			// 		{ email: profile._json.email },
			// 		(err: NativeError, existingEmailUser: IUser) => {
			// 			if (err) {
			// 				return done(err);
			// 			}
			// 			if (existingEmailUser) {
			// 				// req.flash('errors', {
			// 				// 	msg: 'There is already an account using this email address. Sign in to that account and link it with Google manually from Account Settings.',
			// 				// });
			// 				done(err);
			// 			} else {
			// 				const user: any = new User();
			// 				user.email = profile._json.email;
			// 				//user.google = profile.id;
			// 				user.verificationToken = token ;
			// 				if (req.query.state === 'admin') {
			// 					user.userType = 'admin';
			// 				} else if (req.query.state === 'host') {
			// 					user.userType = 'host';
			// 				} else if (req.query.state === 'guest') {
			// 					user.userType = 'guest';
			// 				}
			// 				user.firstName = profile.name.givenName;
			// 				user.lastName = profile.name.familyName;
			// 				user.profileImage = profile.photos.value;
			// 				user.emailVerified = true;
			// 				user.save((err: Error) => {
			// 					done(err, user);
			// 				});
			// 			}
			// 		}
			// 	);
			// });
			
			} 

			

			
		
		
	)
);

const opts: passportJwt.StrategyOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('x-auth-token'),
	secretOrKey: config.jwtSecret,
};
passport.use(
	new JwtStrategy(opts, function (jwt_payload, done) {
		User.findOne({ id: jwt_payload.user.id }, function (err: any, user: IUser) {
			if (err) {
				return done(err, false);
			}
			if (user) {
				return done(null, user);
			} else {
				return done(null, false);
			}
		});
	})
);

export default passport;
