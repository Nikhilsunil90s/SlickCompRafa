import React from 'react';
import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm';
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h5 className="mb-0">{t('forgetPassword.forgotYourPassword')}</h5>
      <small>{t('forgetPassword.emailLabel')}</small>
      <ForgetPasswordForm />
    </div>
  );
};

export default ForgetPassword;
