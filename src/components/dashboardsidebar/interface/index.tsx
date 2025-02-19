interface UserResponse {
    statusCode: number;
    message: string;
    data:  {
        _id: string,
        avatar: string
        countryCode: string,
        countryIsoCode: string,
        currencyData: {
          _id: string,
          code: string,
          isDeleted: false,
          createdAt: string,
          updatedAt: string,
          imageUrl: string
        },
        deviceToken: string,
        deviceType: number,
        email: string,
        fullName: string,
        isAccountVerified: boolean,
        isBlocked: boolean,
        isEmailVerified: boolean,
        isPhoneNoVerified: boolean,
        latitude: number,
        loginType: number,
        longitude: number,
        loyalityPoints: number,
        phoneNumber: string,
        role: 1,
        socialId: string,
        stripeCustomerId: string,
        wallet: 0,
        location: {
          type: string,
          coordinates: any
        }
      }
};




export type{
    UserResponse
};