import * as Yup from 'yup';

const verifyOTPSchema = Yup.object().shape({
    otp: Yup.string().required('Required'),
});


const EditProfilechema = Yup.object().shape({
    fullName: Yup.string().required('Please enter fullname').matches(/^[A-Za-z\s]+$/, 'Name contains only alphabetic characters').max(25),    
    email: Yup.string().required('Please enter email').email(), 
    isEmailVerified:Yup.boolean().required('Email is not verified!'),
    userImage: Yup.mixed()
    .test('fileType', 'Image must be in PNG, JPEG, or GIF format', value => {
        if (!value) return true; // No file uploaded, validation passes
        return ['image/jpeg', 'image/png', 'image/gif', 'image/PNG'].includes(value.type); // Allowed image file types
    }),
  });

export {
    verifyOTPSchema,
    EditProfilechema
};