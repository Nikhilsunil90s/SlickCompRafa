/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Form, Row, Col } from 'react-bootstrap';
import Divider from 'components/common/Divider';
import SocialAuthButtons from './SocialAuthButtons';
import { bindActionCreators } from 'redux';
import * as allActionCreators from 'dux/allActionCreators';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

const mapStateToProps = state => state.auth;
const mapDispatchAsProp = dispatch =>
  bindActionCreators(allActionCreators, dispatch);

const AthleteLoginForm = ({
  hasLabel,
  layout,
  loginWithCredentials,
  loggedIn,
  loginFailed
}) => {
  // State
  const [formData, setFormData] = useState({
    email: window.localStorage.getItem('username') || '',
    password: window.localStorage.getItem('password') || '',
    remember: !!window.localStorage.getItem('rememberMe')
  });
  const { t } = useTranslation();

  useEffect(() => {
    // if (loggedIn) {
    //   toast.success(`Logged In as ${formData.email}`);
    // }
    if (loginFailed) {
      toast.error(`Logged Failed as ${formData.email}`);
    }
  }, [loggedIn, loginFailed]);
  // Handler
  const handleSubmit = e => {
    e.preventDefault();
    loginWithCredentials(
      formData.email,
      formData.password,
      formData.remember,
      false
    );
  };

  const handleFieldChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        {hasLabel && (
          <Form.Label>{t('athleteLoginForm.fieldLabel1')}</Form.Label>
        )}
        <Form.Control
          placeholder={!hasLabel ? t('athleteLoginForm.fieldLabel1') : ''}
          value={formData.email}
          name="email"
          onChange={handleFieldChange}
          type="email"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        {hasLabel && (
          <Form.Label>{t('athleteLoginForm.fieldLabel2')}</Form.Label>
        )}
        <Form.Control
          placeholder={!hasLabel ? t('athleteLoginForm.fieldLabel2') : ''}
          value={formData.password}
          name="password"
          onChange={handleFieldChange}
          type="password"
        />
      </Form.Group>
      <Row className="justify-content-between align-items-center">
        <Col xs="auto">
          <Form.Check type="checkbox" id="rememberMe">
            <Form.Check.Input
              type="checkbox"
              name="remember"
              checked={formData.remember}
              onChange={e =>
                setFormData({
                  ...formData,
                  remember: e.target.checked
                })
              }
            />
            <Form.Check.Label className="ms-2 mb-0">
              {t('athleteLoginForm.fieldCheckBox')}
            </Form.Check.Label>
          </Form.Check>
        </Col>

        <Col xs="auto">
          <Link className="fs--1 mb-0" to={`/forgot-password`}>
            {t('athleteLoginForm.forgetPassword')}
          </Link>
        </Col>
      </Row>

      <Form.Group>
        <Button
          type="submit"
          color="primary"
          className="mt-3 w-100"
          disabled={!formData.email || !formData.password}
        >
          {t('athleteLoginForm.loginButton')}
        </Button>
      </Form.Group>

      {false && (
        <>
          <Divider className="mt-4">
            {t('athleteLoginForm.loginOptions')}
          </Divider>

          <SocialAuthButtons />
        </>
      )}
    </Form>
  );
};

AthleteLoginForm.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool,
  loginWithCredentials: PropTypes.func
};

AthleteLoginForm.defaultProps = {
  layout: 'simple',
  hasLabel: false
};

export default connect(mapStateToProps, mapDispatchAsProp)(AthleteLoginForm);
