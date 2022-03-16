/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import schema from '../schemas/new-user-registration';
import { useHistory } from 'react-router-dom';
import CountrySelect from 'react-bootstrap-country-select';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import { createUser } from 'api/user';
const RegistrationForm = ({ hasLabel, academyId }) => {
  const history = useHistory();
  const [registerationError, setRegisterationError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      academyId: academyId,
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      country: null
    },
    validationSchema: schema,
    onSubmit: async (values, actions) => {
      setIsSubmitting(true);
      setRegisterationError(null);
      try {
        await createUser({
          ...values,
          country: values?.country?.id
        });
        setIsSubmitting(false);
        actions.resetForm();
        toast.success(`User successfully inserted!`, {
          autoClose: 2000
        });
        history.push('/');
      } catch (e) {
        setIsSubmitting(false);
        toast.error(
          <>
            <strong>User can't be created!</strong>
            {/* <br /> */}
            {/* <span style={{ color: 'orange' }}>{e.message}</span> */}
          </>,
          {
            autoClose: 2000
          }
        );
        setTimeout(() => {
          toast.dismiss();
        }, 2000);
      }
    }
  });

  const { errors, touched, values, handleSubmit, getFieldProps, setValues } =
    formik;

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="g-2 mb-3">
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>First Name</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'First Name' : ''}
            {...getFieldProps('firstName')}
            name="firstName"
            type="text"
            isInvalid={Boolean(touched.firstName && errors.firstName)}
          />
          <Form.Text className="text-danger">
            {touched.firstName && errors.firstName}
          </Form.Text>
        </Form.Group>
        <Form.Group as={Col} sm={6}>
          {hasLabel && <Form.Label>Last Name</Form.Label>}
          <Form.Control
            placeholder={!hasLabel ? 'Last Name' : ''}
            {...getFieldProps('lastName')}
            name="lastName"
            type="text"
            isInvalid={Boolean(touched.lastName && errors.lastName)}
          />
          <Form.Text className="text-danger">
            {touched.lastName && errors.lastName}
          </Form.Text>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Email address</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Email address' : ''}
          {...getFieldProps('email')}
          name="email"
          type="email"
          isInvalid={Boolean(touched.email && errors.email)}
        />
        <Form.Text className="text-danger">
          {touched.email && errors.email}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Password</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? 'Password' : ''}
          {...getFieldProps('password')}
          name="password"
          type="password"
          isInvalid={Boolean(touched.password && errors.password)}
        />
        <Form.Text className="text-danger">
          {touched.password && errors.password}
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>Country Name</Form.Label>}
        <CountrySelect
          value={values.country}
          onChange={e => setValues({ ...values, country: e })}
        />
        <Form.Text className="text-danger">
          {touched.country && errors.country}
        </Form.Text>
      </Form.Group>

      {registerationError && (
        <Alert variant={'danger'} style={{ padding: 8 }}>
          {registerationError}
        </Alert>
      )}

      <Form.Group className="mb-4">
        <Button className="w-100" type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <Spinner
              animation="grow"
              style={{ width: 15, height: 15, marginTop: 4 }}
            />
          ) : (
            'Register'
          )}
        </Button>
      </Form.Group>
    </Form>
  );
};

RegistrationForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default RegistrationForm;
