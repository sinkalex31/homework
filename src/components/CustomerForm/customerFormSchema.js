import yup from 'yup';

const customerCreateFormSchema = yup.object().shape({
    email: yup
        .string()
        .email()
        .required(),

    fullName: yup.string().required(),

    address: yup.string(),
});

export default customerCreateFormSchema;