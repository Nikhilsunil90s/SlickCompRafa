import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import forgetPassword from 'api/auth/forget-password';
import { useTranslation } from 'react-i18next';

const ForgetPasswordForm = () => {
  // State
  const { userType } = useParams();
  const [email, setEmail] = useState('');
  const { t } = useTranslation();

  // Handler
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      if (email) {
        await forgetPassword(email, userType === 'academy');
        toast.success(
          `${t('forgetPassword.successToastMessageBefore')}${email} ${t(
            'forgetPassword.successToastMessageAfter'
          )}`
        );
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch (e) {
      if (e.message) {
        toast.error(e.message);
      } else {
        toast.error(
          `${t('forgetPassword.failedToastMessageBefore')}${email} ${t(
            'forgetPassword.failedToastMessageAfter'
          )}`
        );
      }
    }
  };

  return (
    <Form className="mt-4" onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Control
          placeholder={t('forgetPassword.emailInput')}
          value={email}
          name="email"
          onChange={({ target }) => setEmail(target.value)}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Button className="w-100" type="submit" disabled={!email}>
          {t('forgetPassword.sendResetLink')}
        </Button>
      </Form.Group>
    </Form>
  );
};

ForgetPasswordForm.propTypes = {
  layout: PropTypes.string
};

ForgetPasswordForm.defaultProps = { layout: 'simple' };

export default ForgetPasswordForm;
