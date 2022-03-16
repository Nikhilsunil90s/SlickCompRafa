/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import getAcademy from 'api/academy/get-academy';
import updateProfile from 'api/user/update-profile';
import FalconCardHeader from 'components/common/FalconCardHeader';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

let schema = yup.object().shape({
  name: yup.string().required(),
  intro: yup.string().required(),
  instagram: yup.string().required()
});

const AcademyProfileFields = ({ id }) => {
  const [uuid, setUuid] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    intro: '',
    instagram: ''
  });
  useEffect(() => {
    (async () => {
      const data = await getAcademy(id);
      if (data) {
        setUuid(data[0].uuid);
        setFormData({
          name: data[0].name,
          intro: data[0].intro,
          instagram: data[0].instagram
        });
      }
    })();
  }, []);
  const [submitButton, setSubmitButton] = useState(false);
  const { t } = useTranslation();

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
      await updateProfile(uuid, formData, true);
      toast.success(t('profile.academyForm.successToast'));
      toast.dismiss();
    } catch (e) {
      toast.error(t('profile.academyForm.errorToast'));
      toast.dismiss();
    }
  };

  return (
    <Card>
      <FalconCardHeader title={t('profile.editProfile')} />
      <Card.Body className="bg-light">
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={12} controlId="firstName">
              <Form.Label>{t('profile.academyForm.name')}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t('profile.academyForm.name')}
                value={formData.name}
                name="name"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row className="mb-3 g-3">
            <Form.Group as={Col} lg={12} controlId="intro">
              <Form.Label>{t('profile.academyForm.intro')}</Form.Label>
              <Form.Control
                type="text"
                as="textarea"
                placeholder={t('profile.academyForm.intro')}
                value={formData.intro}
                name="intro"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Form.Group className="mb-3" controlId="instagram">
            <Form.Label>{t('profile.academyForm.instagram')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('profile.academyForm.instagram')}
              value={formData.instagram}
              name="instagram"
              onChange={handleChange}
            />
          </Form.Group>
          <div className="text-end">
            <Button variant="primary" type="submit" disabled={!submitButton}>
              {t('profile.academyForm.buttonText')}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default AcademyProfileFields;
