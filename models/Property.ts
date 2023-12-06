import { ADDONSERVICES_REQUESTED } from '../utils/requestNames'
import { Schema, Types, model } from 'mongoose'

export interface IProperties {
  _id: Types.ObjectId
  userData: Types.ObjectId
  user: Types.ObjectId
  isActive: boolean
  showProperty: boolean
  approvalStatus: string
  propertyPictures: string[]
  propertyThumbnails: string[]
  propertyName: string
  propertyDescription: string
  houseNumber: string
  tower: string
  street: string
  locality: string
  landmark: string
  city: string
  state: string
  area: string
  nearbyArea: string[]
  dailyUnavailablity:string[]
  zipCode: string
  slugString: string
  thinnaiLocationUrl: string
  approximateLocationUrl: string
  geoLocation: {
    type: String
    coordinates: {
      type: [Number]
      index: '2dsphere'
    }
  }
  directions: string[]
  propertyType: string
  propertyOwnership: string
  thinnaiLocation: string[]
  amenities: string[]
  preferredGuests: string[]
  activities: string[]
  parkingType: string[]
  services: string[]
  alcoholAllowedFor: string[]
  residentialSpaceIn30m: boolean
  maxGuestCount: number
  directBooking: boolean
  houseRules: string[]
  minDuration: number
  visibility: number
  properties: {
    ratings: {
      cleanliness: { good: number; neutral: number; bad: number }
      checkin: { good: number; neutral: number; bad: number }
    }
  }

  reviews: {
    _id: Types.ObjectId
    showReview: boolean
    reviewer: Types.ObjectId
    review: string
    rating: string
    cleanliness: string
    checkIn: string
    reviewedOn: Date
    helpful: number
  }[]
  totalBookings: number
  happyCustomers: number
  totalReviews: number
  hostSchedule: {
    unavailableFrom: Date
    unavailableTo: Date
  }[]
  pricing: {
    joyHour: {
      lowGuestCount: number
      highGuestCount: number
      withAlcohol: {
        oneHour: number
        oneAndHalfHour: number
        twoAndHalfHour: number
        threeAndHalfHour: number
        four: number
      }
      withoutAlcohol: {
        oneHour: number
        oneAndHalfHour: number
        twoAndHalfHour: number
        threeAndHalfHour: number
        four: number
      }
    }[]
    galaHour: {
      lowGuestCount: number
      highGuestCount: number
      withAlcohol: {
        oneHour: number
        oneAndHalfHour: number
        twoAndHalfHour: number
        threeAndHalfHour: number
        four: number
      }
      withoutAlcohol: {
        oneHour: number
        oneAndHalfHour: number
        twoAndHalfHour: number
        threeAndHalfHour: number
        four: number
      }
    }[]
  }
  addOnServices: {
    _id: Types.ObjectId
    addOnServiceId: string
    addOnThumbnail: string
    addOnImage: string[]
    addOnServiceTitle: string
    addOnDescription: string
    addonServiceAbout: string
    addOnServicePriceRange: string
    addOnPrice: number
    addOnServiceStatus: string
    addOnServiceVisibility: string
    addedOn: Date
  }[]
  foodJoints: {
    restaurantName: string
    restaurantImage: string
    cuisineType: string
    foodSuggestions: string
  }[]
  nearbyMetro: {
    metroName: string
    distance: number
  }
  nearbyBusStop: {
    busStopName: string
    distance: number
  }
  faqs: {
    question: string
    answer: string
  }[]
  subAreas: string[]
}

const PropertySchema = new Schema<IProperties>({
  userData: {
    type: Schema.Types.ObjectId,
    ref: 'userData',
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  showProperty: {
    type: Boolean,
    default: true,
  },
  approvalStatus: {
    type: String,
    trim: true,
    enum: ['pending', 'submitted', 'approved', 'rejected'],
    default: 'pending',
  },
  propertyPictures: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  propertyThumbnails: [
    {
      type: String,
      required: true,
      trim: true,
    },
  ],
  slugString: {
    type: String,
    trim: true,
  },
  propertyName: {
    type: String,
    trim: true,
    required: true,
  },
  propertyDescription: {
    type: String,
    trim: true,
  },
  houseNumber: {
    type: String,
    trim: true,
  },
  tower: {
    type: String,
    trim: true,
  },
  street: {
    type: String,
    trim: true,
  },
  locality: {
    type: String,
    trim: true,
  },
  landmark: {
    type: String,
    trim: true,
  },
  city: {
    type: String,
    trim: true,
  },
  state: {
    type: String,
    trim: true,
  },
  area: {
    type: String,
    trim: true,
  },
  nearbyArea: [
    {
      type: String,
      trim: true,
    },
  ],
  dailyUnavailablity:[
    {
      type: String,
      trim: true,
    },
  ],
  zipCode: {
    type: String,
    trim: true,
  },
  thinnaiLocationUrl: {
    type: String,
    trim: true,
  },
  approximateLocationUrl: {
    type: String,
    trim: true,
  },
  geoLocation: {
    type: {
      type: String,
      default: 'Point',
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
  },
  directions: [
    {
      type: String,
      trim: true,
    },
  ],
  propertyType: {
    type: String,
    trim: true,
  },
  propertyOwnership: {
    type: String,
    trim: true,
  },
  thinnaiLocation: [
    {
      type: String,
      trim: true,
    },
  ],
  amenities: [
    {
      type: String,
      trim: true,
    },
  ],
  preferredGuests: [
    {
      type: String,
      trim: true,
    },
  ],
  activities: [
    {
      type: String,
      trim: true,
    },
  ],
  parkingType: [
    {
      type: String,
      trim: true,
    },
  ],
  services: [
    {
      type: String,
      trim: true,
    },
  ],
  alcoholAllowedFor: [
    {
      type: String,
      trim: true,
    },
  ],
  residentialSpaceIn30m: {
    type: Boolean,
  },
  maxGuestCount: {
    type: Number,
  },
  directBooking: {
    type: Boolean,
    default: false,
  },
  houseRules: [
    {
      type: String,
      trim: true,
    },
  ],
  minDuration: {
    type: Number,
    default: 1,
  },
  visibility: {
    type: Number,
    default: 30,
  },
  foodJoints: [
    {
      restaurantName: {
        type: String,
        trim: true,
      },
      restaurantImage: {
        type: String,
        trim: true,
      },
      cuisineType: {
        type: String,
        trim: true,
      },
      foodSuggestions: {
        type: String,
        trim: true,
      },
    },
  ],
  faqs: [
    {
      question: {
        type: String,
        trim: true,
      },
      answer: {
        type: String,
        trim: true,
      },
    },
  ],
  properties: {
    ratings: {
      cleanliness: {
        good: {
          type: Number,
          default: 0,
        },
        neutral: {
          type: Number,
          default: 0,
        },
        bad: {
          type: Number,
          default: 0,
        },
      },
      checkin: {
        good: {
          type: Number,
          default: 0,
        },
        neutral: {
          type: Number,
          default: 0,
        },
        bad: {
          type: Number,
          default: 0,
        },
      },
    },
  },
  /* 	ratings: {
		good: {
			type: Number,
			default: 0,
		},
		neutral: {
			type: Number,
			default: 0,
		},
		bad: {
			type: Number,
			default: 0,
		},
	}, */
  reviews: [
    {
      showReview: {
        type: Boolean,
        default: true,
      },
      reviewer: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
      },
      review: {
        type: String,
        trim: true,
      },
      rating: {
        type: String,
        required: true,
        trim: true,
        enum: ['good', 'neutral', 'bad'],
      },
      cleanliness: {
        type: String,
        required: true,
        trim: true,
        enum: ['good', 'neutral', 'bad'],
      },
      checkIn: {
        type: String,
        required: true,
        trim: true,
        enum: ['good', 'neutral', 'bad'],
      },
      reviewedOn: {
        type: Date,
        required: true,
      },
      helpful: {
        type: Number,
        default: 0,
      },
    },
  ],
  totalBookings: {
    type: Number,
  },
  happyCustomers: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
  },
  hostSchedule: [
    {
      unavailableFrom: {
        type: Date,
        required: true,
      },
      unavailableTo: {
        type: Date,
        required: true,
      },
    },
  ],
  pricing: {
    joyHour: [
      {
        lowGuestCount: {
          type: Number,
        },
        highGuestCount: {
          type: Number,
        },
        withAlcohol: {
          oneHour: {
            type: Number,
          },
          oneAndHalfHour: {
            type: Number,
          },
          twoAndHalfHour: {
            type: Number,
          },
          threeAndHalfHour: {
            type: Number,
          },
          four: {
            type: Number,
          },
        },
        withoutAlcohol: {
          oneHour: {
            type: Number,
          },
          oneAndHalfHour: {
            type: Number,
          },
          twoAndHalfHour: {
            type: Number,
          },
          threeAndHalfHour: {
            type: Number,
          },
          four: {
            type: Number,
          },
        },
      },
    ],
    galaHour: [
      {
        lowGuestCount: {
          type: Number,
        },
        highGuestCount: {
          type: Number,
        },
        withAlcohol: {
          oneHour: {
            type: Number,
          },
          oneAndHalfHour: {
            type: Number,
          },
          twoAndHalfHour: {
            type: Number,
          },
          threeAndHalfHour: {
            type: Number,
          },
          four: {
            type: Number,
          },
        },
        withoutAlcohol: {
          oneHour: {
            type: Number,
          },
          oneAndHalfHour: {
            type: Number,
          },
          twoAndHalfHour: {
            type: Number,
          },
          threeAndHalfHour: {
            type: Number,
          },
          four: {
            type: Number,
          },
        },
      },
    ],
  },
  addOnServices: [
    {
      addOnServiceId: {
        // "addOnServiceId": "decorations"
        // "addOnServiceId": "movieScreening"
        // "addOnServiceId": "candleLightDinner"
        type: String,
        required: true,
        enum: ADDONSERVICES_REQUESTED,
      },
      addOnThumbnail: {
        type: String,
        required: true,
      },
      addOnImage: [
        {
          type: String,
          required: true,
        },
      ],
      addOnServiceTitle: {
        type: String,
        required: true,
      },
      addOnDescription: {
        type: String,
        required: true,
      },
      addOnPrice: {
        type: Number,
        required: true,
      },
      addOnServiceStatus: {
        type: String,
        required: true,
        enum: ['active', 'inactive'],
      },
      addOnServiceVisibility: {
        type: Number,
        required: true,
      },
      addedOn: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  nearbyMetro: {
    metroName: {
      type: String,
    },
    distance: {
      type: Number,
    },
  },
  nearbyBusStop: {
    busStopName: {
      type: String,
    },
    distance: {
      type: Number,
    },
  },
  subAreas: [
    {
      type: String,
    },
  ],
})

export { PropertySchema }

export default model<IProperties>('property', PropertySchema)
