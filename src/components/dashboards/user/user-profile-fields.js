/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import getProfile from 'api/user/get-profile';
import updateProfile from 'api/user/update-profile';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import CountrySelect from 'react-bootstrap-country-select';
import Select from 'react-select';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import range from 'lodash/range';

let schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required(),
  weight: yup.string().required(),
  belt: yup.string().required(),
  age: yup.string().required(),
  instagram: yup.string().required(),
  country: yup.string().required()
});

const UserProfileFields = ({ uuid }) => {
  const academyId = useSelector(state => state.auth.academyId);
  const [submitButton, setSubmitButton] = useState(false);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    weight: '',
    belt: '',
    age: '',
    instagram: '',
    country: ''
  });
  useEffect(() => {
    (async () => {
      const data = await getProfile(uuid);
      if (data) {
        setFormData({
          name: data[0].name,
          email: data[0].email,
          weight: data[0].weight,
          belt: data[0].belt,
          age: data[0].age,
          instagram: data[0].instagram,
          country: data[0].country,
          academyId
        });
      }
    })();
  }, []);

  const handleChange = async e => {
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(updatedData);
    setSubmitButton(await schema.isValid(updatedData));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitButton(await schema.isValid(formData));
    try {
      await updateProfile(uuid, formData);
      toast.success(t('profile.userForm.successToast'));
      toast.dismiss();
    } catch (e) {
      toast.error(t('profile.userForm.errorToast'));
      toast.dismiss();
    }
  };

  const handleCountryFlag = async e => {
    let updatedData = {
      ...formData,
      country: e
    };
    if (e && e.alpha2) {
      updatedData = {
        ...formData,
        country: e.alpha2
      };
    }
    setSubmitButton(await schema.isValid(updatedData));
    setFormData(updatedData);
  };

  const handleSelectChange = name => async e => {
    const updatedData = {
      ...formData,
      [name]: e.value
    };
    setFormData(updatedData);
    setSubmitButton(await schema.isValid(updatedData));
  };

  return (
    <Card>
      <FalconCardHeader title={t('profile.editProfile')} />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={12} controlId="firstName">
              <Form.Label>{t('profile.userForm.name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('profile.userForm.name')}
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={6} controlId="email">
              <Form.Label>{t('profile.userForm.email')}</Form.Label>
              <Form.Control
                type="email"
                placeholder={t('profile.userForm.email')}
                value={formData.email}
                name="email"
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group as={Col} lg={6} controlId="age">
              <Form.Label>{t('profile.userForm.age')}</Form.Label>
              <Select
                options={map(range(1, 100), val => {
                  return {
                    value: val,
                    label: val
                  };
                })}
                defaultValue={{ value: formData.age, label: formData.age }}
                value={{ value: formData.age, label: formData.age }}
                placeholder={t('profile.userForm.age')}
                classNamePrefix="react-select"
                onChange={handleSelectChange('age')}
                name="age"
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3">
            <Form.Label>{t('profile.userForm.weight')}</Form.Label>
            <Select
              options={map(range(50, 121), val => {
                return {
                  value: `${val}kg`,
                  label: `${val}kg`
                };
              })}
              defaultValue={{ value: formData.weight, label: formData.weight }}
              value={{ value: formData.weight, label: formData.weight }}
              placeholder={t('profile.userForm.weight')}
              classNamePrefix="react-select"
              onChange={handleSelectChange('weight')}
              name="weight"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('profile.userForm.belt')}</Form.Label>
            <Select
              options={[
                {
                  value: t('profile.beltItems.item1'),
                  label: t('profile.beltItems.item1')
                },
                {
                  value: t('profile.beltItems.item2'),
                  label: t('profile.beltItems.item2')
                },
                {
                  value: t('profile.beltItems.item3'),
                  label: t('profile.beltItems.item3')
                },
                {
                  value: t('profile.beltItems.item4'),
                  label: t('profile.beltItems.item4')
                },
                {
                  value: t('profile.beltItems.item5'),
                  label: t('profile.beltItems.item5')
                }
              ]}
              defaultValue={{ value: formData.belt, label: formData.belt }}
              value={{ value: formData.belt, label: formData.belt }}
              placeholder={t('profile.userForm.belt')}
              classNamePrefix="react-select"
              onChange={handleSelectChange('belt')}
              name="belt"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="intro">
            <Form.Label>{t('profile.userForm.instagram')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('profile.userForm.instagram')}
              value={formData.instagram}
              name="instagram"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>{t('profile.userForm.country')}</Form.Label>
            <CountrySelect
              value={formData.country}
              placeholder={t('profile.userForm.country')}
              name="country"
              onChange={handleCountryFlag}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit" disabled={!submitButton}>
              {t('profile.userForm.buttonText')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserProfileFields;
