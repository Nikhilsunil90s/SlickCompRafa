import React from 'react';
import ForgetPasswordForm from 'components/authentication/ForgetPasswordForm';
import AuthCardLayout from 'layouts/AuthCardLayout';
import { useTranslation } from 'react-i18next';

const ForgetPassword = () => {
  const { t } = useTranslation();
  return (
    <AuthCardLayout>
      <h4 className="mb-0">{t('forgetPassword.forgotYourPassword')}</h4>
      <p className="mb-0">{t('forgetPassword.emailLabel')}</p>
      <ForgetPasswordForm layout="card" />
    </AuthCardLayout>
  );
};

export default ForgetPassword;
