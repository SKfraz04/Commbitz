import * as Yup from 'yup';

const CreateBlogSchema = Yup.object().shape({
    title: Yup.string().required('Please enter title').matches(/^[A-Za-z\s]+$/, 'Name contains only alphabetic characters').max(25),    
    topic: Yup.string().required('Please enter topic'), 
    rating:Yup.number().min(1).max(5).required('Rating is required!'),
    blogImage: Yup.mixed()
    .test('fileType', 'Image must be in PNG, JPEG, or GIF format', value => {
            if (!value) return true; // No file uploaded, validation passes
            return ['image/jpeg', 'image/png', 'image/gif', 'image/PNG'].includes(value.type); // Allowed image file types
        }).required('image is required!')
  });

export { CreateBlogSchema };