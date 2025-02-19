import { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

const verifyOTPSchema = Yup.object().shape({
    otp: Yup.string().required('Required'),
});


const Signupschema = Yup.object().shape({
    fullName: Yup.string().required('Please enter fullname')
    .matches(/^[A-Za-z\s]+$/, 'Name contains only alphabetic characters')
    .max(25)
    .test('no-whitespace', 'Full name should not start or end with whitespace', value => {
        if (value) {
            return value === value.trim(); // Check if value is equal to its trimmed version
        }
        return true;
    }),
    password: Yup.string()
    .required("Password is a required field!")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[0-9]/, 'Password must contain at least one digit')
    .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    .test('not-fullname', 'Password should not contain or match the full name', function (value) {
        const { fullName } = this.parent; // Access fullName from the form values
        if (value && fullName) {
            return !value.toLowerCase().includes(fullName.toLowerCase());
        }
        return true;
    }),
    confpassword: Yup.string()
        .required("Please confirm password")
        .oneOf([Yup.ref('password'), null], 'Password and confirm password must be same'),
    phoneNumber:
        Yup.string()
            .required("Phone number is required field!")
            .test('phone-number', function (value) {
                if (value) {
                    if (!isPossiblePhoneNumber(value as string) || !isValidPhoneNumber(value as string)) {
                        return this.createError({ message: 'Invalid mobile number', path: this.path });
                    }
                    return true;
                }
                return true;
            }),
    email: Yup.string().required('Please enter email').email(),
    isEmailVerified: Yup.boolean().required('Email is not verified!'),
    isPhoneNoVerified: Yup.boolean().required('Phone number is not verified!'),
    userImage: Yup.mixed()
        .test('fileType', 'Image must be in PNG, JPEG, or GIF format', value => {
            if (!value) return true; // No file uploaded, validation passes
            return ['image/jpeg', 'image/png', 'image/gif', 'image/PNG'].includes(value.type); // Allowed image file types
        }),
    // .required('Please upload an image'),
    term_and_conditions: Yup.boolean()
        .oneOf([true], 'You must accept the terms and conditions') // Ensures value is true
        .required('Terms and conditions option is required!')

});

export {
    verifyOTPSchema,
    Signupschema
};

