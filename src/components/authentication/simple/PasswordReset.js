import React from 'react';
import PasswordResetForm from 'components/authentication/PasswordResetForm';
import { useTranslation } from 'react-i18next';

const PasswordReset = () => {
  const { t } = useTranslation();
  return (
    <div className="text-center">
      <h5>{t('forgetPassword.resetYourPassword')}</h5>
      <PasswordResetForm />
    </div>
  );
};

export default PasswordReset;
