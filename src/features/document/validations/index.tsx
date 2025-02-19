import * as Yup from 'yup';

const UploadDocumentSchema = Yup.object().shape({
    passportFront: Yup.string().required('Required'),
    passportBack: Yup.string().required('Required'),
    visa: Yup.string().required('Required'),
});

export {
    UploadDocumentSchema
};