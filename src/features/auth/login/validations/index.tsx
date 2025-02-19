import * as Yup from 'yup';

const loginEmailSchema = Yup.object().shape({
    loginIdentifier: Yup.string().required('Please enter a email, or phone number')
});
const loginPasswordSchema = Yup.object().shape({
    password: Yup.string().required("Password is required field!").min(8),
});
const loginSchema = Yup.object().shape({
    loginIdentifier: Yup.string().required('Please enter a email, or phone number'),
    password: Yup.string().required("Password is required field!").min(8),
    rememberme: Yup.boolean()
});

export {
    loginSchema,
    loginEmailSchema,
    loginPasswordSchema
};