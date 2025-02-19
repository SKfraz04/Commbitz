import { isPossiblePhoneNumber, isValidPhoneNumber, parsePhoneNumber } from "react-phone-number-input";
import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
    firstName: Yup.string()
        .required("First Name is required")
        .matches(/^[A-Za-z\s]+$/, "First Name contains only alphabetic characters")
        .max(25, "Maximum 25 characters allowed")
        .test("no-whitespace", "First Name should not start or end with whitespace", (value) =>
            value ? value === value.trim() : true
        ),
    lastName: Yup.string()
        .required("Last Name is required")
        .matches(/^[A-Za-z\s]+$/, "Last Name contains only alphabetic characters")
        .max(25, "Maximum 25 characters allowed")
        .test("no-whitespace", "Last Name should not start or end with whitespace", (value) =>
            value ? value === value.trim() : true
        ),
    email: Yup.string().email("Invalid email address").required("Email is required"),
    message: Yup.string().required("Message is required"),
    phoneNumber: Yup.string()
        .required("Phone number is required")
        .test("phoneNumber", "Invalid mobile number", (value) => 
            value ? isPossiblePhoneNumber(value) && isValidPhoneNumber(value) : false
        ),
});

export default function customIsValidPhoneNumber(value?: string): boolean {
    if (!value) return false;
    try {
        const phoneNumber = parsePhoneNumber(value);
        return phoneNumber ? isValidPhoneNumber(phoneNumber.number) : false;
    } catch (error) {
        console.error("Error validating phone number:", error);
        return false;
    }
}