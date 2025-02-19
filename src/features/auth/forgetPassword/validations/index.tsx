import * as Yup from 'yup';

const forgetPasswordSchema = Yup.object().shape({
    loginIdentifier: Yup.string().required('Required'),
});

const verifyOTPSchema = Yup.object().shape({
    otp: Yup.string().required('Required'),
});

const resetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
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
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
      .required('Confirm password is required'),
  });

export {
    forgetPasswordSchema,
    verifyOTPSchema,
    resetPasswordSchema
};