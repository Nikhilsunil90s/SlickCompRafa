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
import { useTranslation } from 'react-i18next';

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});
const UserInvitationForm = ({ academyId }) => {
  const history = useHistory();
  const { t } = useTranslation();
  const handleSubmitBtn = async (values, { setSubmitting }) => {
    try {
      setSubmitting = true;
      await userInvitation(values).then(response => {
        toast.success(t('inviteUser.toastSuccess'));
        toast.dismiss();
        history.push('/dashboard/matches');
      });
    } catch (e) {
      toast.error(t('inviteUser.toastError'));
      toast.dismiss();
    }
  };

  const formSchema = yup.object().shape({
    name: yup.string().required(t('inviteUser.error1')),
    email: yup
      .string()
      .email(t('inviteUser.error2'))
      .required(t('inviteUser.error3')),
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
              <Form.Label className="text-left">
                {t('inviteUser.inviteFormLabel1')}
              </Form.Label>
              <Form.Control
                name="name"
                placeholder={t('inviteUser.inviteFormPlaceholder1')}
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
              <Form.Label>{t('inviteUser.inviteFormLabel2')}</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder={t('inviteUser.inviteFormPlaceholder2')}
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
              <Form.Label>{t('inviteUser.inviteFormLabel3')}</Form.Label>
              <Form.Control
                name="message"
                as="textarea"
                placeholder={t('inviteUser.inviteFormPlaceholder3')}
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
                {t('inviteUser.inviteButton')}
              </Button>
            </Form.Group>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default connect(mapStateToProp)(UserInvitationForm);
