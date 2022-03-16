/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import * as yup from 'yup';
import userInvitation from 'api/invite-user/inviteuser';
import { Formik, Field, ErrorMessage } from 'formik';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { connect } from 'react-redux';

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const UserInvitationForm = ({ academyId }) => {
  const history = useHistory();

  const handleSubmitBtn = async (values, { setSubmitting }) => {
    try {
      setSubmitting = true;
      await userInvitation(values).then(response => {
        toast.success(`Invite Sent Successfully!`);
        toast.dismiss();
        history.push('/dashboard/matches');
      });
    } catch (e) {
      toast.error(`Invite Failed, Try again.`);
      toast.dismiss();
    }
  };

  const formSchema = yup.object().shape({
    name: yup.string().required('**Name is Required!'),
    email: yup
      .string()
      .email('**Valid Email Required!')
      .required('**Email is Required!'),
    message: yup.string()
  });

  const initialValues = {
    academyId,
    name: '',
    email: '',
    message: ''
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleSubmitBtn}
      >
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          dirty
        }) => (
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="text-left">Name</Form.Label>
              <Form.Control
                name="name"
                placeholder="Name"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.name}
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.email}
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                name="message"
                as="textarea"
                placeholder="Enter your message here..."
                rows={5}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.message}
              />
            </Form.Group>
            <Form.Group>
              <Button
                type="submit"
                color="primary"
                className="mt-3 mb-3"
                disabled={isSubmitting || !dirty}
              >
                SEND
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(mapStateToProp)(UserInvitationForm);
