import { Schema, Types, model } from 'mongoose';

export interface IAppSettings {
	_id: Types.ObjectId;
	propertyTypes: {
		id: String;
		title: String;
	}[];
	propertOwnerships: {
		id: String;
		title: String;
	}[];
	thinnaiLocations: {
		id: String;
		title: String;
	}[];
	amenities: {
		id: String;
		title: String;
		icon: String;
	}[];
	allowedActivities: {
		id: String;
		title: String;
		icon: String;
	}[];
	preferredGuests: {
		id: String;
		title: String;
	}[];
	cities: {
		id: String;
		name: String;
		thumbnail: String;
		images: String[];
		landmarks: {
			name: String;
			nearbyPlace: String;
			foodJoints: {
				name: String;
				cuisine: String;
				recommendation: String[];
				review: String[];
			}[];
		};
		description: String;
	}[];
	activityTypes: {
		id: String;
		title: String;
		icon: String;
	}[];
	alcoholAllowedFor: {
		id: String;
		title: String;
	}[];
	addOnServices: {
		uniqueServiceId: string;
		addOnServiceTitle: String;
		addOnDescription: String;
		maxPrice: number;
		addOnPrice: number;
		addOnServiceIcon: String;
	}[];
	cleaningChargeCake: number;
	cleaningTableDecor: number;
	cleaningFloorDecor: number;
	hostLandingPage: {
		blogs: {
			title: String;
			description: String;
			image: String;
		}[];
		testimonials: String[];
		faq: {
			question: String;
			answer: String;
		}[];
		featuredOn: String[];
	};
	guestLandingPage: {
		pinnedSpaces: string[];
		blogs: {
			title: String;
			description: String;
			image: String;
		}[];
		testimonials: String[];
		faq: {
			question: String;
			answer: String;
		}[];
		featuredOn: String[];
	};
	pricing: {
		spaceType: string;
		typeOfHour: {
			name: string;
			perGuest: {
				count: number;
				withAlcohol: {
					hour: number;
					price: number;
				};
				withoutAlcohol: {
					hour: number;
					price: number;
				};
			}[];
		}[];
	}[];
	staticAssetPath: String;
	createdAt: Date;
	version: String;
}

const AppSettingsSchema = new Schema<IAppSettings>({
	propertyTypes: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	propertOwnerships: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	thinnaiLocations: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	amenities: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
			icon: {
				type: String,
			},
		},
	],
	preferredGuests: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	activityTypes: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
			icon: {
				type: String,
			},
		},
	],
	allowedActivities: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
			icon: {
				type: String,
			},
		},
	],
	alcoholAllowedFor: [
		{
			id: {
				type: String,
			},
			title: {
				type: String,
			},
		},
	],
	cities: [
		{
			id: {
				type: String,
			},
			name: {
				type: String,
			},
			thumbnail: {
				type: String,
			},
			images: [String],
			landmarks: [
				{
					name: {
						type: String,
					},
					nearbyPlace: {
						type: String,
					},
					foodJoints: [
						{
							name: {
								type: String,
							},
							cuisine: {
								type: String,
							},
							recommendation: [String],
							review: {
								type: String,
							},
						},
					],
				},
			],
			description: {
				type: String,
			},
		},
	],
	addOnServices: [
		{
			uniqueServiceId: {
				type: String,
			},
			addOnServiceTitle: {
				type: String,
			},
			addOnDescription: {
				type: String,
			},
			maxPrice: {
				type: Number,
			},
			addOnPrice: {
				type: Number,
				default: 0,
			},
			addOnServiceIcon: {
				type: String,
			},
		},
	],
	hostLandingPage: {
		blogs: [
			{
				title: {
					type: String,
					trim: true,
					required: true,
				},
				description: {
					type: String,
					trim: true,
					required: true,
				},
				image: {
					type: String,
					trim: true,
					required: true,
				},
			},
		],
		testimonials: [String],
		faq: [
			{
				question: {
					type: String,
					trim: true,
					required: true,
				},
				answer: {
					type: String,
					trim: true,
					required: true,
				},
			},
		],
		featuredOn: [String],
	},
	guestLandingPage: {
		pinnedSpaces: [String],
		blogs: [
			{
				title: {
					type: String,
					trim: true,
					required: true,
				},
				description: {
					type: String,
					trim: true,
					required: true,
				},
				image: {
					type: String,
					trim: true,
					required: true,
				},
			},
		],
		testimonials: [String],
		faq: [
			{
				question: {
					type: String,
					trim: true,
					required: true,
				},
				answer: {
					type: String,
					trim: true,
					required: true,
				},
			},
		],
		featuredOn: [String],
	},
	pricing: [
		{
			spaceType: {
				type: String,
				trim: true,
				required: true,
			},
			typeOfHour: [
				{
					name: {
						type: String,
						trim: true,
						required: true,
					},
					perGuest: [
						{
							count: {
								type: Number,
								required: true,
							},
							withAlcohol: {
								hour: {
									type: Number,
									required: true,
								},
								price: {
									type: Number,
									required: true,
								},
							},
							withoutAlcohol: {
								hour: {
									type: Number,
									required: true,
								},
								price: {
									type: Number,
									required: true,
								},
							},
						},
					],
				},
			],
		},
	],
	staticAssetPath: {
		type: String,
		required: true,
	},
	cleaningChargeCake: { type: Number, default: 99 },
	cleaningTableDecor: { type: Number, default: 99 },
	cleaningFloorDecor: { type: Number, default: 99 },
	createdAt: {
		type: Date,
		required: true,
		default: Date.now,
	},
	version: {
		type: String,
		required: true,
	},
});

export default model<IAppSettings>('appSettings', AppSettingsSchema);
