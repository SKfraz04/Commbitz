import * as Yup from 'yup';

const ChangePasswordSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Required"),
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
    confpassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref('newPassword'), null], 'New passwords do not match')
      .test('password-match', 'Confirm password must match with new password', function(value) {
        const { confpassword, newPassword } = this.parent;

        return confpassword === newPassword;
      }),
  });

export {
    ChangePasswordSchema
};