import { isPossiblePhoneNumber, isValidPhoneNumber } from 'react-phone-number-input';
import * as Yup from 'yup';

// Helper function to parse dates correctly
const parseDateString = (value: any, originalValue: any): Date => {
    const parsedDate = Date.parse(originalValue);
    return isNaN(parsedDate) ? new Date() : new Date(parsedDate);
};

// Get the current date and set the time to 00:00:00 to ensure only the date part is compared
const today = new Date();
today.setHours(0, 0, 0, 0);

const BasicDetailSchema = Yup.object().shape({
    firstName: Yup.string()
        .required('Please enter first name')
        .matches(/^[A-Za-z\s]+$/, 'Name contains only alphabetic characters')
        .max(25)
        .test('no-whitespace', 'Full name should not start or end with whitespace', value => {
            if (value) {
                return value === value.trim();
            }
            return true;
        }),
    lastName: Yup.string()
        .required('Please enter last name')
        .matches(/^[A-Za-z\s]+$/, 'Name contains only alphabetic characters')
        .max(25)
        .test('no-whitespace', 'Full name should not start or end with whitespace', value => {
            if (value) {
                return value === value.trim();
            }
            return true;
        }),
    travellingCountry: Yup.string()
        .required('Please enter country name')
        .matches(/^[A-Za-z\s]+$/, 'Name contains only alphabetic characters')
        .max(25)
        .test('no-whitespace', 'Full name should not start or end with whitespace', value => {
            if (value) {
                return value === value.trim();
            }
            return true;
        }),
    phoneNumber: Yup.string()
        .required('Phone number is required field!')
        .test('phone-number', function (value) {
            if (value) {
                if (!isPossiblePhoneNumber(value) || !isValidPhoneNumber(value)) {
                    return this.createError({ message: 'Invalid mobile number', path: this.path });
                }
                return true;
            }
            return true;
        }),
    email: Yup.string()
        .required('Please enter email')
        .email(),
    travellingDate: Yup.date()
        .notRequired()
        .typeError('Invalid date format')
        .transform(parseDateString)
        .min(today, 'Travelling date must be today or later'),
    returnDate: Yup.date()
        .notRequired()
        .typeError('Invalid date format')
        .transform(parseDateString)
        .when('travellingDate', (travellingDate: Date | undefined, schema: Yup.DateSchema) => {
            return schema.min(travellingDate ?? today, 'Return date must be later than or equal to travelling date');
        }),
    handsetModelNo: Yup.string()
        .required('Handset model number is required'),
});

export {
    BasicDetailSchema
};
