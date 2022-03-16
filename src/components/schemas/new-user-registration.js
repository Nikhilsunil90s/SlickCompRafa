/* eslint-disable no-useless-escape */
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup
    .string()
    .required('First Name is required!')
    .test('len', 'Must be at least 3 characters', val => val?.length >= 3),
  lastName: yup
    .string()
    .required('Last Name is required!')
    .test('len', 'Must be at least 3 characters', val => val?.length >= 3),
  email: yup
    .string()
    .email('Invalid email format!')
    .required('Email is required!'),
  password: yup
    .string()
    .required('Password is required!')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase and One Number'
    ),
  country: yup.object().required('Country name is required!')
});

export default schema;
