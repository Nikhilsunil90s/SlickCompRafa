/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Button, Form } from 'react-bootstrap';
import { postMatch } from 'api/match';
import { getParticipants } from 'api/participants';
import Section from 'components/common/Section';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as yup from 'yup';
import { connect } from 'react-redux';
import Select from 'react-select';
import { useTranslation } from 'react-i18next';
import map from 'lodash/map';
import range from 'lodash/range';

let schema = yup.object().shape({
  academyId: yup.number().required(),
  participant1_id: yup.number().required().positive().integer(),
  participant2_id: yup.number().required().positive().integer(),
  matchType: yup.string().required(),
  matchGender: yup.string().required(),
  giNogi: yup.string().required(),
  weight: yup.string().required(),
  duration: yup.string().required(),
  seniority: yup.string().required(),
  matchDateTime: yup.string().str,
  matchTimeZone: yup.string().required()
});

const mapStateToProp = state => ({
  academyId: state.auth.academyId
});

const CreateMatch = ({ hasLabel, academyId }) => {
  const [formData, setFormData] = useState({
    academyId: academyId,
    participant1_id: '',
    participant2_id: '',
    matchType: 'Single Match',
    matchGender: 'Male',
    giNogi: '1',
    weight: '80kg',
    duration: '300',
    seniority: 'Adult',
    matchDateTime: new Date(),
    matchTimeZone: ''
  });

  const [creating, setCreating] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [submitButton, setSubmitButton] = useState(false);
  const [matchDateTime, setMatchDateTime] = useState(new Date());
  const { t } = useTranslation();

  useEffect(() => {
    (async () => {
      const response = await getParticipants(academyId);
      setParticipants(response);
    })();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const timeZone = new Date(formData.matchDateTime)
      .toTimeString()
      .slice(9, 17);
    formData.matchTimeZone = timeZone;
    formData.matchDateTime = moment(formData.matchDateTime).format(
      'YYYY-MM-DD hh:mm:ss'
    );
    try {
      setCreating(true);
      await postMatch(formData);
      toast.success(t('createMatch.successToast'));
      toast.dismiss();
      window.location.href = `/dashboard/matches/`;
      setCreating(false);
    } catch (e) {
      setCreating(false);
      toast.error(t('createMatch.errorToast'));
      toast.dismiss();
    }
  };

  const handleDateChange = async date => {
    const timeZone = new Date(date).toTimeString().slice(9, 17);
    const updatedData = {
      ...formData,
      matchDateTime: date,
      matchTimeZone: timeZone
    };
    setMatchDateTime(date);
    setSubmitButton(await schema.isValid(updatedData));
    setFormData(updatedData);
  };

  const handleFieldChange = async e => {
    const timeZone = new Date(formData.matchDateTime)
      .toTimeString()
      .slice(9, 17);
    formData.matchTimeZone = timeZone;
    const updatedData = {
      ...formData,
      [e.target.name]: e.target.value
    };
    setFormData(updatedData);
    setSubmitButton(await schema.isValid(updatedData));
  };
  const handleSelectChange = name => async value => {
    const timeZone = new Date(formData.matchDateTime)
      .toTimeString()
      .slice(9, 17);
    formData.matchTimeZone = timeZone;

    const updatedData = {
      ...formData,
      [name]: value.value
    };

    setFormData(updatedData);
    setSubmitButton(await schema.isValid(updatedData));
  };

  return (
    <Section bg="light" className="py-3 shadow-sm">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="participant1" className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel1')}</Form.Label>}
          <Select
            options={participants?.map(participant => ({
              value: participant.id,
              label: participant.name
            }))}
            placeholder={t('createMatch.fieldPlaceholder1')}
            classNamePrefix="react-select"
            onChange={handleSelectChange('participant1_id')}
            name="participant1_id"
          />
        </Form.Group>
        <Form.Group controlId="participant2" className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel2')}</Form.Label>}
          <Select
            options={participants?.map(participant => ({
              value: participant.id,
              label: participant.name
            }))}
            placeholder={t('createMatch.fieldPlaceholder2')}
            classNamePrefix="react-select"
            onChange={handleSelectChange('participant2_id')}
            name="participant2_id"
          />
        </Form.Group>
        <Form.Group controlId="matchType" className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel3')}</Form.Label>}
          <Form.Select
            aria-label="matchType"
            name="matchType"
            onChange={handleFieldChange}
            required
          >
            <option selected value="Single Match">
              {t('createMatch.fieldMatchValue1')}
            </option>
            {/* <option value="Quarter Finals">
              {t('createMatch.fieldMatchValue2')}
            </option>
            <option value="Semi Finals">
              {t('createMatch.fieldMatchValue3')}
            </option>
            <option value="Final">{t('createMatch.fieldMatchValue4')}</option> */}
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="matchGender" className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel4')}</Form.Label>}
          <Form.Select
            aria-label="matchGender"
            name="matchGender"
            onChange={handleFieldChange}
            required
          >
            <option selected value="Male">
              {t('createMatch.fieldGenderValue1')}
            </option>
            <option value="Female">{t('createMatch.fieldGenderValue2')}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="seniority" className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel5')}</Form.Label>}
          <Form.Select
            aria-label="seniority"
            name="seniority"
            onChange={handleFieldChange}
            required
          >
            <option selected value="Adult">
              {t('createMatch.fieldSeniorityValue1')}
            </option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="giNogi" className="mb-3">
          {hasLabel && <Form.Label>Gi / NoGi</Form.Label>}
          <Form.Select
            aria-label="giNogi"
            name="giNogi"
            onChange={handleFieldChange}
            required
          >
            <option selected value="1">
              Gi
            </option>
            <option value="0">NoGi</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel6')}</Form.Label>}
          <Select
            options={map(range(50, 121), val => {
              return {
                value: `${val}kg`,
                label: `${val}kg`
              };
            })}
            defaultValue={{ value: '80kg', label: '80kg' }}
            placeholder={t('createMatch.fieldLabel6')}
            classNamePrefix="react-select"
            onChange={handleSelectChange('weight')}
            name="weight"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel7')}</Form.Label>}
          <Select
            options={[
              { value: '180', label: '3:00' },
              { value: '240', label: '4:00' },
              { value: '300', label: '5:00' },
              { value: '360', label: '6:00' },
              { value: '420', label: '7:00' },
              { value: '480', label: '8:00' },
              { value: '540', label: '9:00' },
              { value: '600', label: '10:00' },
              { value: '660', label: '11:00' },
              { value: '720', label: '12:00' },
              { value: '780', label: '13:00' },
              { value: '840', label: '14:00' },
              { value: '900', label: '15:00' },
              { value: '960', label: '16:00' },
              { value: '1020', label: '17:00' },
              { value: '1080', label: '18:00' },
              { value: '1140', label: '19:00' },
              { value: '1200', label: '20:00' }
            ]}
            defaultValue={{ label: '5:00', value: '300' }}
            placeholder={t('createMatch.fieldPlaceholder7')}
            classNamePrefix="react-select"
            onChange={handleSelectChange('duration')}
            name="duration"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="endDate">
          {hasLabel && <Form.Label>{t('createMatch.fieldLabel8')}</Form.Label>}
          <DatePicker
            selected={matchDateTime}
            onChange={date => handleDateChange(date)}
            className="form-control"
            placeholderText="DD-MM-YYYY H:M"
            dateFormat="dd-MM-yyyy h:mm"
            required
            showTimeSelect
            timeFormat="HH:mm"
          />
        </Form.Group>

        <Form.Group>
          <Button
            type="submit"
            color="primary"
            className="mt-3"
            size="lg"
            disabled={!submitButton || creating}
          >
            {t('createMatch.matchButton')}
          </Button>
        </Form.Group>
      </Form>
    </Section>
  );
};

CreateMatch.propTypes = {
  layout: PropTypes.string,
  hasLabel: PropTypes.bool
};

CreateMatch.defaultProps = {
  layout: 'simple',
  hasLabel: true
};

export default connect(mapStateToProp)(CreateMatch);
