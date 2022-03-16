import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import changePassword from 'api/auth/change-password';
import { useFormik } from 'formik';
import * as yup from 'yup';

const PasswordResetForm = ({ hasLabel }) => {
  const { t } = useTranslation();
  let schema = yup.object().shape({
    password: yup
      .string()
      .required(`${t('forgetPassword.passwordRequired')}`)
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        `${t('forgetPassword.passwordLimit')}`
      ),
    confirmPassword: yup
      .string()
      .oneOf(
        [yup.ref('password'), null],
        `${t('forgetPassword.passwordMatch')}`
      )
  });

  // State
  const { uuid, md5 } = useParams();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: ''
    },
    validationSchema: schema,
    onSubmit: async values => {
      try {
        await changePassword(uuid, md5, values.password, false);
        toast.success(`${t('forgetPassword.newPasswordSuccessMessage')}`, {
          autoClose: 1500,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          onOpen: () => setTimeout(() => (window.location.href = '/'), 1500),
          onClick: () => (window.location.href = '/')
        });
      } catch (e) {
        toast.error(`${t('forgetPassword.newPasswordErroMessage')}`, {
          autoClose: 1000,
          pauseOnFocusLoss: false,
          pauseOnHover: false,
          onOpen: () =>
            setTimeout(() => (window.location.href = '/forgot-password'), 1000)
        });
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Form
      className={classNames('mt-3', { 'text-left': hasLabel })}
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3">
        {hasLabel && <Form.Label>{t('forgetPassword.newPassword')}</Form.Label>}
        <Form.Control
          placeholder={!hasLabel ? `${t('forgetPassword.newPassword')}` : ''}
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
        {hasLabel && (
          <Form.Label>{t('forgetPassword.confirmPassword')}</Form.Label>
        )}
        <Form.Control
          placeholder={!hasLabel ? `${t('forgetPassword.newPassword')}` : ''}
          {...getFieldProps('confirmPassword')}
          name="confirmPassword"
          type="password"
          isInvalid={Boolean(touched.confirmPassword && errors.confirmPassword)}
        />
        <Form.Text className="text-danger">
          {touched.confirmPassword && errors.confirmPassword}
        </Form.Text>
      </Form.Group>
      <Button type="submit" className="w-100">
        {t('forgetPassword.setPassword')}
      </Button>
    </Form>
  );
};

PasswordResetForm.propTypes = {
  hasLabel: PropTypes.bool
};

export default PasswordResetForm;
